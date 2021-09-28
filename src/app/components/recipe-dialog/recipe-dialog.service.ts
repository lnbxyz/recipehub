import {
  Injectable,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  EmbeddedViewRef,
  ComponentRef,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Recipe } from 'src/app/tokens';
import { RecipeDialogComponent } from './recipe-dialog.component';

@Injectable()
export class RecipeDialogService {
  private dialogComponentRef?: ComponentRef<RecipeDialogComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  public open(): Observable<Recipe | undefined> {
    const closeSubject = new Subject<Recipe | undefined>();
    this.append(closeSubject);
    return closeSubject.asObservable().pipe(
      tap(() => {
        this.remove();
      })
    );
  }

  private append(closeSubject: Subject<Recipe | undefined>) {
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(
        RecipeDialogComponent
      );
    const componentRef = componentFactory.create(this.injector);
    componentRef.instance.closeSubject = closeSubject;

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.dialogComponentRef = componentRef;
  }

  private remove() {
    if (!this.dialogComponentRef) {
      return;
    }

    this.appRef.detachView(this.dialogComponentRef.hostView);
    this.dialogComponentRef.destroy();
  }
}
