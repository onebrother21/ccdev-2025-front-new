import { INJECTOR, Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { AppLocalStorageService } from 'core';
import { InMemApiNotifier } from '../workers';
import { isPlatformBrowser } from '@angular/common';
import { SuperCalculator } from 'api/workers/super-calc';

interface Job {
  id: string;
  name: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  statusTime: Date;
  creationTime: Date;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class InMemApiJobFactoryService {
  private storageKey = 'jobQueue';
  private local = inject(AppLocalStorageService);
  private jobs: Map<string, Job> = new Map();
  private jobInterval = 3000;
  private intervalId?: number;
  private workers: { [key: string]: (data: any) => Promise<any> } = {};
  private notifier = inject(InMemApiNotifier);
  private superCalc = inject(SuperCalculator);
  private isBrowser;

  constructor(
    @Inject(PLATFORM_ID) platform:Object
  ) {
    this.isBrowser = isPlatformBrowser(platform);
    this.workers = {
      'notification': this.notifier.notify.bind(this.notifier,'notification'),
      'email': this.notifier.notify.bind(this.notifier,'email'),
      'sms': this.notifier.notify.bind(this.notifier,'sms'),
      'calc-in-app': this.superCalc.calc.bind(this.superCalc,'in-app'),
      // Add more workers as needed
    };
    try {
      this.loadJobs();
      this.startJobProcessing();
    }
    catch (e) {
      console.log(e);
    }
  }

  private getJobsFromStorage(): Map<string, Job> {
    const storedJobs = this.local.load(this.storageKey);
    return new Map<string, Job>(storedJobs || []);
  }

  private saveJobsToStorage(jobs: Map<string, Job>): void {
    this.local.save(this.storageKey, Array.from(jobs.entries()));
  }

  private loadJobs(): void {
    const jobs = this.getJobsFromStorage();
    this.jobs = jobs;
  }

  private saveJob(job: Job): void {
    this.jobs.set(job.id, job);
    this.saveJobsToStorage(this.jobs);
  }

  addJob(name: string, data: any): string {
    const id = Math.random().toString(36).substring(7); // Generate a simple unique ID
    const job: Job = {
      id,
      name,
      status: 'pending',
      statusTime: new Date(),
      creationTime: new Date(),
      data
    };
    this.saveJob(job);
    return id;
  }

  private async processPendingJobs(): Promise<void> {
    for (const [id, job] of this.jobs) {
      if (job.status === 'pending') {
        const runner = this.workers[job.name];
        if (runner) {
          try {
            job.status = 'in-progress';
            job.statusTime = new Date();
            this.saveJob(job);
            
            const o = await runner(job.data);
            job.status = 'completed';
            console.log('Job completed!', job.id, o);
          }
          catch (error) {
            job.status = 'cancelled';
            console.error('Error processing job', error);
          }
          finally {
            job.statusTime = new Date();
            this.saveJob(job);
          }
        } else {
          console.warn(`No runner found for job type ${job.name}`);
        }
      }
    }
  }

  private startJobProcessing(): void {
    if(!this.isBrowser) console.warn("jobs processing is dependent on browser resource: window; none found");
    else this.intervalId = window.setInterval(() => this.processPendingJobs(),this.jobInterval); // Check every 60 seconds
  }

  private stopJobProcessing(): void {
    if (this.intervalId !== undefined) {
      clearInterval(this.intervalId);
    }
  }

  async runJob(id: string): Promise<void> {
    const job = this.jobs.get(id);
    if (!job) throw new Error('Job not found');

    const runner = this.workers[job.name];
    if (!runner) throw new Error(`No runner found for job type ${job.name}`);

    job.status = 'in-progress';
    job.statusTime = new Date();

    try {
      const o = await runner(job.data);
      job.status = 'completed';
      console.log('Job complete!', job.id, o);
    } catch (error) {
      job.status = 'cancelled';
      console.error('Error processing job', error);
    } finally {
      job.statusTime = new Date();
      this.saveJob(job);
    }
  }

  cancelJob(id: string): void {
    const job = this.jobs.get(id);
    if (job && job.status === 'pending') {
      job.status = 'cancelled';
      job.statusTime = new Date();
      this.saveJob(job);
    }
  }

  getJob(id: string): Job | undefined {
    return this.jobs.get(id);
  }

  getAllJobs(): Job[] {
    return Array.from(this.jobs.values());
  }

  ngOnDestroy(): void {
    this.stopJobProcessing();
  }
}