import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Recipe } from '../tokens';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  constructor() {}

  public getAll(): Observable<Recipe[]> {
    // TODO implement http call
    // temporarily return mock data
    return of([
      {
        name: 'Milkshake de Morango',
        description:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores eos vitae tempore explicabo laboriosam voluptatem ut blanditiis, perspiciatis animi mollitia hic provident nemo dignissimos iste id eaque fugit corporis culpa!',
        tags: [
          {
            name: 'Verão',
            color: '#ffb400',
          },
          {
            name: 'test',
          },
        ],
      },
      {
        name: 'Milkshake de Ovomaltine',
        description:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores eos vitae tempore explicabo laboriosam voluptatem ut blanditiis, perspiciatis animi mollitia hic provident nemo dignissimos iste id eaque fugit corporis culpa!',
      },
    ]);
  }
}
