export type PortfolioProject = {
  id: string;
  title: string;
  city: string;
  category: string;
  year: string;
  cover_image: string;
  featured: boolean;
  created_at: string;
};

export type ProjectInput = Omit<PortfolioProject, "id" | "created_at">;
