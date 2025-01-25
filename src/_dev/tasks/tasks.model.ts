export type Task = {
  id:string
  status:"new"|"in-progress"|"completed"
  title:string
  description:string
  createdOn:Date
  lastUpdated:Date
  tasks:Task[]
}