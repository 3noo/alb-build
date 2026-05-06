export type ProjectStatus = "completed" | "in-progress";

export type PortfolioProject = {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  client: string;
  area: string;
  status: ProjectStatus;
  coverImage: string;
  summary: string;
  scope: string[];
  featured: boolean;
  createdAt: string;
};

export type ProjectInput = Omit<PortfolioProject, "id" | "createdAt">;
