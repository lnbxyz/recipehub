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
import { DialogAction } from 'src/app/tokens';
import { DialogComponent } from './dialog.component';

@Injectable()
export class DialogService {
  private dialogComponentRef?: ComponentRef<DialogComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  public open({
    message,
    actions,
  }: {
    message: string;
    actions?: DialogAction[];
  }): Observable<string | undefined> {
    const closeSubject = new Subject<string | undefined>();
    this.append({ message, actions, closeSubject });
    return closeSubject.asObservable().pipe(
      tap(() => {
        this.remove();
      })
    );
  }

  private append({
    message,
    actions,
    closeSubject,
  }: {
    message: string;
    actions?: DialogAction[];
    closeSubject: Subject<string | undefined>;
  }) {
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(DialogComponent);
    const componentRef = componentFactory.create(this.injector);
    componentRef.instance.message = message;
    componentRef.instance.actions = actions ?? [];
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
