import { GraphQLQueryResponseData, QuestionAttributes } from '../scripts/queries';

export interface CatalogEntry {
  qid: string;
  question: QuestionAttributes;
}

export interface PlanCatalogEntry extends CatalogEntry {
  plans: GraphQLQueryResponseData[];
}

export interface VideoCatalogEntry extends CatalogEntry {
  videos: GraphQLQueryResponseData[];
}