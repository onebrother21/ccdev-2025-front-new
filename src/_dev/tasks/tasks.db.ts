import { Task } from "./tasks.model";

export const INITIAL_TASKS:Task[] = [
  {
    id:"1",
    status:"new",
    title:"Update the Documentation",
    description:"Dwuamish Head, Seattle, WA 8:47 AM",
    createdOn:new Date(),
    lastUpdated:new Date(),
    tasks:[],
  },{
    id:"2",
    status:"completed",
    title:"GDPR Compliance",
    description:
      "The GDPR is a regulation that requires businesses to "+
      "protect the personal data and privacy of Europe citizens "+
      "for transactions that occur within EU member states.",
    createdOn:new Date(),
    lastUpdated:new Date(),
    tasks:[],
  },{
    id:"3",
    status:"new",
    title:"Solve the issues",
    description:
      "Fifty percent of all respondents said they would be more "+
      "likely to shop at a company",
    createdOn:new Date(),
    lastUpdated:new Date(),
    tasks:[],
  },{
    id:"4",
    status:"new",
    title:"Release v2.0.0",
    description:"Ra Ave SW, Seattle, WA 98116, SUA 11:19 AM",
    createdOn:new Date(),
    lastUpdated:new Date(),
    tasks:[],
  },{
    id:"5",
    status:"in-progress",
    title:"Export the processed files",
    description:
      "The report also shows that consumers will not easily "+
      "forgive a company once a breach exposing their personal "+
      "data occurs.",
    createdOn:new Date(),
    lastUpdated:new Date(),
    tasks:[],
  },{
    id:"6",
    status:"new",
    title:"Arival at export process",
    description:"Capitol Hill, Seattle, WA 12:34 AM",
    createdOn:new Date(),
    lastUpdated:new Date(),
    tasks:[],
  }
]