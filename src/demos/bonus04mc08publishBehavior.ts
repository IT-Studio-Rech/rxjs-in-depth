import { interval } from "rxjs";
import { take, refCount, publishBehavior } from "rxjs/operators";

import { wait } from "../misc/util";
import { namedObserver } from "../misc/namedObserver";
import { logComplete } from "../operators/logComplete";

// Multicasting via publishBehavior operator with refcount
export async function mc8publishBehaviorDemo() {
  // Create cold observable. Counting starts on subscription.
  const source$ = interval(3000).pipe(take(10), logComplete());

  // Multicasted source. Subscribes on source only when subscribers are present.
  const published$ = source$.pipe(
    // Returns last emission on subscribe of observer or -1 if no emission happened yet.
    publishBehavior(-1),
    // Connects on first subscription. Disconnects on last unsubscribe.
    refCount(),
  );
  console.log("Source published with reference counting.");

  await wait("subscribe for a");

  published$.pipe(take(5)).subscribe(namedObserver("a"));

  await wait("subscribe for b");

  published$.pipe(take(3)).subscribe(namedObserver("b"));

  await wait("subscribe for c");

  published$.pipe(take(3)).subscribe(namedObserver("c"));
}
