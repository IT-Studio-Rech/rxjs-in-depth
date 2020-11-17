import { ConnectableObservable, interval } from "rxjs";
import { take, publish } from "rxjs/operators";

import { wait } from "../misc/util";
import { namedObserver } from "../misc/namedObserver";
import { logComplete } from "../operators/logComplete";

// Multicasting via publish operator
export async function mc6publishDemo() {
  // Create cold observable. Counting starts on subscription.
  const source$ = interval(800).pipe(take(50), logComplete());

  // Memory leak alert. If source does not stop emitting, it keeps listening forever.
  const published$ = source$.pipe(
    // Same as multicast with Subject!!! If source completes, late subscribers won't trigger
    // new subscription on source.
    publish(),
  ) as ConnectableObservable<number>;
  console.log("Source published.");

  await wait("subscribe for a");

  published$.pipe(take(5)).subscribe(namedObserver("a"));

  await wait("subscribe for b");

  published$.pipe(take(5)).subscribe(namedObserver("b"));

  await wait("connect");

  published$.connect();

  await wait("subscribe for c");

  published$.pipe(take(5)).subscribe(namedObserver("c"));
}
