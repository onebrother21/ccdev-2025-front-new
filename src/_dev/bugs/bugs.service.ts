import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Bug } from './bugs.model';
import { INITIAL_BUGS } from './bugs.db';
import { CommonUtils } from '_commoncore/common';
import { Task } from '_dev/tasks/tasks.model';

enum Keynames { 
  BUGS = 'ccdevBugs',
  SELECTED_BUG = 'ccdevSelectedBug',
};

@Injectable({
  providedIn: 'root'
})
export class BugsService {
  forceReset = false;
  private bugs: Bug[] = this.loadBugsFromLocalStorage();
  private bugs_ = new BehaviorSubject<Bug[]>(this.bugs);
  public bugs$ = this.bugs_.asObservable();

  private selectedBug = this.loadSelectedBugFromLocalStorage();
  private selectedBug_ = new BehaviorSubject<string|null>(null);
  public selectedBug$ = this.selectedBug_.asObservable();

  constructor() {}

  // Create a new bug
  createBug(bugData: Partial<Bug>): Bug {
    const newBug: Bug = {
      id:CommonUtils.longId(),
      uid: this.generateId(),
      title: bugData.title || '',
      description: bugData.description || '',
      status:"new",
      createdOn:new Date(),
      lastUpdated:new Date(),
      dueDate:new Date(),
      type:"front-end",
      tasks:[],
    };
    this.bugs.push(newBug);
    this.updateBugsSubject();
    return newBug;
  }

  // Update an existing bug
  updateBug(bugId: string, updatedData: Partial<Bug>): boolean {
    const bugIndex = this.bugs.findIndex((bug) => bug.id === bugId);
    if (bugIndex === -1) return false;

    this.bugs[bugIndex] = {
      ...this.bugs[bugIndex],
      ...updatedData,
    };
    this.updateBugsSubject();
    return true;
  }

  // Save bugs to local storage
  saveBugs(): void {
    this.saveBugsToLocalStorage();
  }
  selectBug(bugId:string){
    this.selectedBug = bugId;
    this.updateSelectedBugSubject();
  }
  
  // Delete a bug
  deleteBug(bugId: string): boolean {
    const initialLength = this.bugs.length;
    this.bugs = this.bugs.filter((bug) => bug.id !== bugId);
    if (this.bugs.length === initialLength) return false;
    this.updateBugsSubject();
    return true;
  }
  // Add a new task to a bug
  addTaskToBug(bugId:string): boolean {
    const bug = this.bugs.find((bug) => bug.id === bugId);
    if (!bug) return false;

    const task: Task = {
      id: CommonUtils.longId(),
      title: 'Untitled Task',
      description:'Your content goes here',
      status:'new',
      createdOn: new Date(),
      lastUpdated:new Date(),
      tasks:[]
    };
    bug.tasks.push(task);
    bug.lastUpdated = new Date();
    this.updateBugsSubject();
    return true;
  }

  // Remove a task from a bug
  removeTaskFromBug(bugId: string, taskId: string): boolean {
    const bug = this.bugs.find((bug) => bug.id === bugId);
    if (!bug) return false;

    const taskIndex = bug.tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) return false;

    bug.tasks.splice(taskIndex, 1);
    bug.lastUpdated = new Date();
    this.updateBugsSubject();
    return true;
  }

  // Retrieve a specific task
  getTask(bugId:string,taskId:string): Bug['tasks'][0] | null {
    const bug = this.bugs.find((bug) => bug.id === bugId);
    if (!bug) return null;

    return bug.tasks.find((task) => task.id === taskId) || null;
  }

  // Update a task
  updateTask(bugId:string,taskId:string,updatedTask:Partial<Bug['tasks'][0]>): boolean {
    const bug = this.bugs.find((bug) => bug.id === bugId);
    if (!bug) return false;

    const taskIndex = bug.tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) return false;

    bug.tasks[taskIndex] = {
      ...bug.tasks[taskIndex],
      ...updatedTask,
      lastUpdated: new Date(),
    };

    bug.lastUpdated = new Date();
    this.updateBugsSubject();
    return true;
  }

  // Delete a task
  deleteTask(bugId: string, taskId: string): boolean {
    return this.removeTaskFromBug(bugId, taskId);
  }

  // Utility to generate unique IDs
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  // Load bugs from local storage
  private loadBugsFromLocalStorage(): Bug[] {
    if(this.forceReset) return INITIAL_BUGS;
    const storedBugs = localStorage.getItem(Keynames.BUGS);
    return storedBugs ? JSON.parse(storedBugs) : INITIAL_BUGS;
  }
  // Save bugs to local storage
  private saveBugsToLocalStorage(): void {localStorage.setItem(Keynames.BUGS,JSON.stringify(this.bugs));}
  // Update the BehaviorSubject with the latest bugs and save to local storage
  private updateBugsSubject(): void {
    this.bugs_.next([...this.bugs]);
    this.saveBugsToLocalStorage();
  }

  private loadSelectedBugFromLocalStorage():string|null {return localStorage.getItem(Keynames.SELECTED_BUG) || null;}
  private saveSelectedBugToLocalStorage(){localStorage.setItem(Keynames.SELECTED_BUG,this.selectedBug||"");}
  private updateSelectedBugSubject(): void {
    this.selectedBug_.next(this.selectedBug);
    this.saveSelectedBugToLocalStorage();
  }
}

