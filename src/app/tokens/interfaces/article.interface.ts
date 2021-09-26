import { Entity } from './entity.interface';
import { AuditedEntity } from './audited-entity.interface';
import { MustHaveOwner } from './must-have-owner.interface';
import { Recipe } from './recipe.interface';
import { User } from './user.interface';

export interface Article extends AuditedEntity, Entity, MustHaveOwner {
  name: string;
  description?: string;
  recipes?: Recipe[];
  likeCount?: number;
  liked?: boolean;
  commentCount?: number;
  user: User;
}
