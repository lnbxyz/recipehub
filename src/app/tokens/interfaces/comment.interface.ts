import { MustHaveOwner } from './must-have-owner.interface';
import { AuditedEntity } from './audited-entity.interface';
import { Entity } from './entity.interface';
import { User } from './user.interface';

export interface Comment extends Entity, AuditedEntity, MustHaveOwner {
  articleId: string;
  body: string;
  user?: User;
}
