import { Project } from '../project/project';
import { User } from '../user/user';

export interface Todo {
  _id?: string;
  label: string;
  endDate: Date;
  project: Project;
  user: User;
  status: boolean;
}
