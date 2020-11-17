import { Subject, interval } from "rxjs";
import { take } from "rxjs/operators";

import { wait } from "../misc/util";
import { namedObserver } from "../misc/namedObserver";
import { logComplete } from "../operators/logComplete";

// example 2: 3 observers subscribe on subject. subject submits after 2nd
export async function mc2subjectMulticastingDemo() {
  // Create cold observable. Counting starts on subscription.
  const source$ = interval(800).pipe(take(10), logComplete());

  // Subject multicasts a value to multiple observers
  const subject$ = new Subject<number>();

  await wait("subscribe for a");

  subject$.subscribe(namedObserver("a"));

  await wait("subscribe for b");

  subject$.subscribe(namedObserver("b"));

  await wait("subscribe subject to source");

  // Subscibe to subject. Subject starts emitting.
  source$.subscribe(subject$);
  // Short for this code.
  // source$.subscribe({
  //   next: (v) => subject$.next(v),
  //   complete: () => subject$.complete(),
  //   error: (err) => subject$.error(err),
  // });

  await wait("subscribe for c");

  subject$.subscribe(namedObserver("c"));
}
