import { Subscription } from 'rxjs';

export class SubscriptionManager {
  public subscriptions: { [key: string]: Subscription } = {};

  public add(key: string, subscription: Subscription): Subscription {
    this.remove(key);
    this.subscriptions[key] = subscription;
    return subscription;
  }

  public remove(key: string): void {
    if (this.subscriptions[key] && !this.subscriptions[key].closed) {
      this.subscriptions[key].unsubscribe();
    }
  }

  public clear(): void {
    Object.values(this.subscriptions)
      .filter(
        (subscription) =>
          subscription instanceof Subscription && !subscription.closed
      )
      .forEach((subscription) => {
        subscription.unsubscribe();
      });
  }
}
