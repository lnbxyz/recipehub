import { Entity } from './entity.interface';
import { AuditedEntity } from './audited-entity.interface';

export interface User extends Entity, AuditedEntity {
  name: string;
  email: string;
  username: string;
  password?: string;
  image?: string;
}
