import { FindOptionsSelect } from 'typeorm';

export interface QueryOption<T> {
  fields?: FindOptionsSelect<T>;
  offset?: number;
  limit?: number;
}
