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

export interface Episode {
  id: number;
  novelDetailName: string;
  novelDetailIntroduce: string;
  novelDetailImageUrl: string;
  novelData: string;
  authorId: number;
  authorName: string;
  novelId: number;
  novelName: string;
  publisherType: string;
}
