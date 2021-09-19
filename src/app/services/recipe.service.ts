import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
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
    ]).pipe(delay(1000));
  }

  public getById(id: string): Observable<Recipe> {
    // TODO implement http call
    // temporarily return mock data
    return of({
      name: 'Milkshake de Morango',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores eos vitae tempore explicabo laboriosam voluptatem ut blanditiis, perspiciatis animi mollitia hic provident nemo dignissimos iste id eaque fugit corporis culpa!',
      ingredients: [
        {
          name: 'sorvete de morango',
          quantity: 3,
          unit: 'bolas',
        },
        {
          name: 'leite (gelado)',
          quantity: 1,
          unit: 'copo',
        },
        {
          name: 'cobertura para sorvete de morango',
          quantity: 100,
          unit: 'ml',
        },
      ],
      steps: [
        {
          order: 1,
          description:
            'Bata o leite e o sorvete no liquidificador por 1 minuto.',
        },
        {
          order: 2,
          description: 'Decore um copo grande com cobertura de morango.',
        },
        {
          order: 3,
          description: 'Despeje o batido no copo.',
        },
      ],
      tags: [
        {
          name: 'Verão',
          color: '#ffb400',
        },
        {
          name: 'test',
        },
      ],
    }).pipe(delay(1000));
  }
}
