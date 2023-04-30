import { Publisher } from './Publisher';

export interface Novel {
  id: number;
  publisher: Publisher;
  name: string;
  description: string;
  thumbnail: string;
  totalScore: number;
  publishedDate: Date;
}
