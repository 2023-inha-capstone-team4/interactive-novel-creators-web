import { Category } from './enums/Category';

export interface Novel {
  id: number;
  novelName: string;
  authorId: number;
  authorName: string;
  novelIntroduce: string;
  novelImageUrl: string;
  publisherType: string;
  totalScore: number;
  categoryTypeList: Category[];
}
