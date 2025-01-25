import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from './tasks.model';
import { INITIAL_TASKS } from './tasks.db';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private readonly LOCAL_STORAGE_KEY = 'ccdevTasks';
  private tasks: Task[] = this.loadTasksFromLocalStorage();
  private tasks_ = new BehaviorSubject<Task[]>(this.tasks);
  public tasks$ = this.tasks_.asObservable();
  forceReset = false;
  constructor() {}

  // Create a new task
  createTask(taskData: Partial<Task>): Task {
    const newTask: Task = {
      id: this.generateId(),
      title: taskData.title || '',
      description: taskData.description || '',
      status:"new",
      createdOn:new Date(),
      lastUpdated:new Date(),
      tasks:[],
    };
    this.tasks.push(newTask);
    this.updateTasksSubject();
    return newTask;
  }

  // Update an existing task
  updateTask(taskId: string, updatedData: Partial<Task>): boolean {
    const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) return false;

    this.tasks[taskIndex] = {
      ...this.tasks[taskIndex],
      ...updatedData,
    };
    this.updateTasksSubject();
    return true;
  }

  // Save tasks to local storage
  saveTasks(): void {
    this.saveTasksToLocalStorage();
  }

  // Delete a task
  deleteTask(taskId: string): boolean {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    if (this.tasks.length === initialLength) return false;

    this.updateTasksSubject();
    return true;
  }
  // Add a new subtask to a task
  addSubtaskToTask(taskId: string): boolean {
    const task = this.tasks.find((task) => task.id === taskId);
    if (!task) return false;

    const subtask: Task = {
      id: this.generateId(),
      title: 'Untitled Subtask',
      description:'Your content goes here',
      status:'new',
      createdOn: new Date(),
      lastUpdated:new Date(),
      tasks:[]
    };
    task.tasks.push(subtask);
    task.lastUpdated = new Date();
    this.updateTasksSubject();
    return true;
  }

  // Remove a subtask from a task
  removeSubtaskFromTask(taskId: string, subtaskId: string): boolean {
    const task = this.tasks.find((task) => task.id === taskId);
    if (!task) return false;

    const subtaskIndex = task.tasks.findIndex((subtask) => subtask.id === subtaskId);
    if (subtaskIndex === -1) return false;

    task.tasks.splice(subtaskIndex, 1);
    task.lastUpdated = new Date();
    this.updateTasksSubject();
    return true;
  }

  // Retrieve a specific subtask
  getSubtask(taskId: string, subtaskId: string): Task | null {
    const task = this.tasks.find((task) => task.id === taskId);
    if (!task) return null;

    return task.tasks.find((subtask) => subtask.id === subtaskId) || null;
  }

  // Update a subtask
  updateSubtask(taskId: string, subtaskId: string, updatedSubtask: Partial<Task>): boolean {
    const task = this.tasks.find((task) => task.id === taskId);
    if (!task) return false;

    const subtaskIndex = task.tasks.findIndex((subtask) => subtask.id === subtaskId);
    if (subtaskIndex === -1) return false;

    task.tasks[subtaskIndex] = {
      ...task.tasks[subtaskIndex],
      ...updatedSubtask,
      lastUpdated: new Date(),
    };

    task.lastUpdated = new Date();
    this.updateTasksSubject();
    return true;
  }

  // Delete a subtask
  deleteSubtask(taskId: string, subtaskId: string): boolean {
    return this.removeSubtaskFromTask(taskId, subtaskId);
  }

  // Utility to generate unique IDs
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  // Load tasks from local storage
  private loadTasksFromLocalStorage(): Task[] {
    if(this.forceReset) return INITIAL_TASKS;
    const storedTasks = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    return storedTasks ? JSON.parse(storedTasks) : INITIAL_TASKS;
  }

  // Save tasks to local storage
  private saveTasksToLocalStorage(): void {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.tasks));
  }

  // Update the BehaviorSubject with the latest tasks and save to local storage
  private updateTasksSubject(): void {
    this.tasks_.next([...this.tasks]);
    this.saveTasksToLocalStorage();
  }
}

