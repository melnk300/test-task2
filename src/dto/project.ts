export type projectStatus = "CREATED" | "IN_PROGRESS" | "FINISHED";

export type projectFilters = {
  status?: projectStatus;
  title?: string;
  page?: number;
} | {};

export type project = {
  id: number;
  title: string;
  status: string;
}

export type projectResponse = {
  count: number;
  results?: project[];
}