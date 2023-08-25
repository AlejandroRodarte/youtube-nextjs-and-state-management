import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';

import { IS_SERVER } from '../constants/is-server.constant';
import { Storageable } from './storageable.interface';

interface Options<T> {
  initialValue: T;
  storageKey: string;
}

// class that hosts a behavior subject and enriches it with storage capabilities
export class BehaviorSubjectWithStorage<T> implements Storageable {
  // (1) the behavior subject itself
  // (2) we need it public so it can be accessed by hooks (useObservableState)
  public subject$: BehaviorSubject<T>;

  // (1) observable and subscription related to persistence
  // (2) the observable is derived from the behavior subject; it adds a simple
  // side-effect with tap(): save to local storage
  // (3) the subscription subscribes to this recently-created observable
  private observable$: Observable<T>;
  private subscription: Subscription | null = null;

  // initial value found in the storage system (localStorage.getItem)
  private initialStorageValue: T | null;

  // flags to check if the data hosted by the behavior subject has already synced
  // with local storage and it has subscribed to the derived observer that persists
  // its new values to the storage system
  private hasSynced = false;
  private hasSubscribed = false;

  constructor(options: Options<T>) {
    // create the behavior subject
    this.subject$ = new BehaviorSubject<T>(options.initialValue);

    // observer that derives from behavior subject: save to local storage
    this.observable$ = this.subject$.pipe(
      tap((data) => {
        localStorage.setItem(options.storageKey, JSON.stringify(data));
      })
    );

    // get initial storage value (or null if not found)...
    const initialStringStorageValue = !IS_SERVER
      ? localStorage.getItem(options.storageKey) ?? null
      : null;

    // ...and parse it
    this.initialStorageValue = initialStringStorageValue
      ? (JSON.parse(initialStringStorageValue) as T)
      : null;
  }

  // (1) method 1: sync behavior subject value with data found in storage system
  // (2) this should occur once: 'hasSynced' helps us with that
  public syncWithStorageValue() {
    if (this.hasSynced) return;
    if (this.initialStorageValue) this.subject$.next(this.initialStorageValue);
    this.hasSynced = true;
  }

  // (1) method 2: subscribed to the derived observable to trigger persistence
  // (2) this should occur one: 'hasSubscribed' helps us with that
  public startPersiting() {
    if (this.hasSubscribed) return;
    this.subscription = this.observable$.subscribe();
    this.hasSubscribed = true;
  }

  // (1) method 3: stop persisting (un-subscribe from derived observable)
  public stopPersisting() {
    if (!this.subscription) return;
    this.subscription.unsubscribe();
    this.subscription = null;
    this.hasSubscribed = false;
  }
}
