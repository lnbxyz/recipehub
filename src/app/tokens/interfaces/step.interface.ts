import { Entity } from './entity.interface';

export interface Step extends Entity {
  order?: number;
  description?: string;
}
