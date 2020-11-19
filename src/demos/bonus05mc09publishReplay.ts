import { interval } from "rxjs";
import { take, refCount, publishBehavior, publishReplay } from "rxjs/operators";

import { wait } from "../misc/util";
import { namedObserver } from "../misc/namedObserver";
import { logComplete } from "../operators/logComplete";

// Multicasting via publishBehavior operator with refcount
export async function mc9publishReplayDemo() {
  // Create cold observable. Counting starts on subscription.
  const source$ = interval(1000).pipe(take(14), logComplete());

  // Multicasted source. Subscribes on source only when subscribers are present.
  const published$ = source$.pipe(
    // Returns last 3 emissions if present.
    publishReplay(3),
    // Connects on first subscription. Disconnects on last unsubscribe.
    refCount(),
  );
  console.log("Source published with reference counting.");

  await wait("subscribe for a");

  published$.pipe(take(15)).subscribe(namedObserver("a"));

  await wait("subscribe for b");

  published$.pipe(take(5)).subscribe(namedObserver("b"));

  await wait("subscribe for c");

  published$.pipe(take(5)).subscribe(namedObserver("c"));
}
