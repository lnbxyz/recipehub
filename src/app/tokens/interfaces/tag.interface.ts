import { Entity } from './entity.interface';
import { MustHaveOwner } from './must-have-owner.interface';

export interface Tag extends Entity, MustHaveOwner {
  name?: string;
  color?: string;
}
