import { Task } from "_dev/tasks/tasks.model";

export type Bug = Task & {uid:string;dueDate:Date;type:string,progress?:number};