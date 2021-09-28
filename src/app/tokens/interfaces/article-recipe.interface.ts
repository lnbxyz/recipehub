import { Entity } from './entity.interface';

export interface ArticleRecipe extends Entity {
  articleId: string;
  recipeId: string;
}
