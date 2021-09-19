import { Entity } from './entity.interface';

export interface AuditedEntity extends Entity {
  /** Creation time, ISO8601 date string */
  createdOn?: string;
  /** Modification time, ISO8601 date string */
  modifiedOn?: string;
}
