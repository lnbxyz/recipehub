import { Entity } from './entity.interface';
import { AuditedEntity } from './audited-entity.interface';
import { MustHaveOwner } from './must-have-owner.interface';
import { Recipe } from './recipe.interface';
import { User } from './user.interface';
import { ArticleRecipe } from './article-recipe.interface';

export interface Article extends AuditedEntity, Entity, MustHaveOwner {
  name: string;
  description?: string;
  recipes?: Recipe[];
  likeCount?: number;
  isLiked?: boolean;
  commentCount?: number;
  user: User;
  articleRecipes?: ArticleRecipe[];
}
