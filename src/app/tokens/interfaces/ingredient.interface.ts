import { Entity } from './entity.interface';

export interface Ingredient extends Entity {
  name?: string;
  quantity?: number | null;
  unit?: string | null;
}
