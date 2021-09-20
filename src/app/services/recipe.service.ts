import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Recipe } from '../tokens';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  // TEMPORARY
  private mockData: Recipe[] = [
    {
      id: '6f3e5eea-2064-4fb8-97e2-faa005e78a6e',
      name: 'Milkshake de Morango',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores eos vitae tempore explicabo laboriosam voluptatem ut blanditiis, perspiciatis animi mollitia hic provident nemo dignissimos iste id eaque fugit corporis culpa!',
      servings: 2,
      time: 5,
      ingredients: [
        {
          id: '7bed82fc-4f40-4572-a06f-3570173fa3ac',
          name: 'sorvete de morango',
          quantity: 3,
          unit: 'bolas',
        },
        {
          id: 'd21a3b0c-ed12-49a1-8e63-c484d0999c06',
          name: 'leite (gelado)',
          quantity: 1,
          unit: 'copo',
        },
        {
          id: 'f5ca77fa-8d24-4cc8-8987-b462c8c46fe6',
          name: 'cobertura para sorvete de morango',
          quantity: 100,
          unit: 'ml',
        },
      ],
      steps: [
        {
          id: 'fb2c3892-7985-4da4-8c23-bd120911a8d4',
          order: 1,
          description:
            'Bata o leite e o sorvete no liquidificador por 1 minuto.',
        },
        {
          id: 'e80d523c-8ee1-4112-96d9-6404962b50ac',
          order: 2,
          description: 'Decore um copo grande com cobertura de morango.',
        },
        {
          id: '4b6d8a76-9978-4e3e-8b0b-d5d672dae293',
          order: 3,
          description: 'Despeje o batido no copo.',
        },
      ],
      tags: [
        {
          id: '26907988-c47d-418e-bbf1-3b46c5cc6673',
          name: 'Verão',
          color: '#ffb400',
        },
        {
          id: 'be91277b-e405-439b-b554-d1be99754ba1',
          name: 'test',
        },
      ],
    },
    {
      id: '2579a927-9697-4d98-a562-339792267c86',
      name: 'Milkshake de Ovomaltine',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores eos vitae tempore explicabo laboriosam voluptatem ut blanditiis, perspiciatis animi mollitia hic provident nemo dignissimos iste id eaque fugit corporis culpa!',
    },
  ];

  constructor() {}

  public getAll(): Observable<Recipe[] | undefined> {
    // TODO implement http call
    // temporarily return mock data
    return of(this.mockData).pipe(delay(1000));
  }

  public getById(id: string): Observable<Recipe | undefined> {
    // TODO implement http call
    // temporarily return mock data
    return of(this.mockData.find((recipe) => recipe.id === id)).pipe(
      delay(1000)
    );
  }

  public create(recipe: Recipe): Observable<any> {
    return of({}).pipe(delay(1000));
  }

  public update(recipe: Recipe): Observable<any> {
    return of({}).pipe(delay(1000));
  }

  public delete(id: string): Observable<any> {
    return of({}).pipe(delay(1000));
  }
}
