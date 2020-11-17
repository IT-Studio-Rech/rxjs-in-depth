import { Subject, Observable, interval } from "rxjs";
import { take } from "rxjs/operators";

import { wait } from "../misc/util";
import { namedObserver } from "../misc/namedObserver";
import { logComplete } from "../operators/logComplete";

// Simplified multicast implementation. Subscribes to source, making the result subject a hot observable.
function multicast(source$: Observable<number>) {
  const subject$ = new Subject<number>();
  source$.subscribe(subject$);
  return subject$;
}

// Demonstrate simplified bogus multicast
export async function mc3simplifiedBogusMulticastDemo() {
  // Create cold observable. Counting starts on subscription.
  const source$ = interval(800).pipe(take(5), logComplete());

  // Create hot observable.
  // Memory leak alert. If source does not stop emitting, it keeps listening forever.
  const multicasted$ = multicast(source$);
  console.log("Source multicasted.");

  await wait("subscribe for a");

  multicasted$.subscribe(namedObserver("a"));

  await wait("subscribe for b");

  multicasted$.subscribe(namedObserver("b"));
}
