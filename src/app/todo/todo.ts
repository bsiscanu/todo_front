import { Project } from '../project/project';

export interface Todo {
  _id?: string;
  label: string;
  endDate: Date;
  project: Project;
  status: boolean;
}
