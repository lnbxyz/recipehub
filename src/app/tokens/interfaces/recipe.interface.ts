import { AuditedEntity } from './audited-entity.inferface';
import { MustHaveOwner } from './must-have-owner.interface';
import { Ingredient } from './ingredient.interface';
import { Step } from './step.interface';
import { Tag } from './tag.interface';

export interface Recipe extends AuditedEntity, MustHaveOwner {
  name: string;
  description?: string;
  servings?: number;
  time?: number;
  ingredients?: Ingredient[];
  steps?: Step[];
  tags?: Tag[];
}
