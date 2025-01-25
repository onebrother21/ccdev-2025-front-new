export interface BusinessPlanSection {
  id: string; // Unique identifier for the section
  title: string; // The title of the business plan section
  content: string[]; // Content as a collection of strings
  htmlContent: string; // Content as HTML markup
  params: Record<string, any>; // Object for subproperties and inputs relevant to the section
  metrics: Record<string, any>; // Object for metrics relevant to the section
  tags?: string[]; // Optional tags for categorization
  status?: 'draft' | 'published' | 'archived'; // Optional status of the section
  author?: { id: string; name: string; }; // Optional information about the section's creator
  createdOn?: Date; // Optional creation timestamp
  lastUpdated?: Date; // Optional last update timestamp
  priority?: number; // Optional priority for sorting
  relatedSections?: string[]; // Optional references to related sections
}
export interface BusinessPlan {
  id: string; // Unique identifier for the business plan
  title: string; // Title of the business plan
  description: string; // Brief summary of the business plan
  type:|"SP"|"LLC"|"S-Corp"; //Business entity type
  sections: BusinessPlanSection[]; // Array of sections in the business plan
  createdOn: Date; // Creation timestamp
  lastUpdated: Date; // Last update timestamp
  startDate:Date;
  owner: { id: string; name: string }; // Information about the plan's owner
  status: 'draft' | 'finalized' | 'archived'; // State of the business plan
  tags?: string[]; // Optional tags for categorization
  goals?: string[]; // Optional list of objectives
  attachments?: { name: string; url: string; type: string }[]; // Optional file links
  relatedPlans?: string[]; // Optional references to related plans
}