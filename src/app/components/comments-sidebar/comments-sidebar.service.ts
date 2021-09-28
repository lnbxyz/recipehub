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
import { CommentsSidebarComponent } from './comments-sidebar.component';

@Injectable()
export class CommentsSidebarService {
  private dialogComponentRef?: ComponentRef<CommentsSidebarComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  public open({ articleId }: { articleId: string }): Observable<void> {
    const closeSubject = new Subject<void>();
    this.append({ articleId, closeSubject });
    return closeSubject.asObservable().pipe(
      tap(() => {
        this.remove();
      })
    );
  }

  private append({
    articleId,
    closeSubject,
  }: {
    articleId: string;
    closeSubject: Subject<void>;
  }) {
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(
        CommentsSidebarComponent
      );
    const componentRef = componentFactory.create(this.injector);
    componentRef.instance.closeSubject = closeSubject;
    componentRef.instance.articleId = articleId;

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
