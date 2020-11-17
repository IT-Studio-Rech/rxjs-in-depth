import { interval } from "rxjs";
import { take, shareReplay } from "rxjs/operators";

import { wait } from "../misc/util";
import { namedObserver } from "../misc/namedObserver";
import { logComplete } from "../operators/logComplete";

// Multicasting via publish operator
export async function mc11shareReplayDemo() {
  // Create cold observable. Counting starts on subscription.
  const source$ = interval(800).pipe(take(5), logComplete());

  // Share replay is similar to multiplex with replay subject & refcounting.
  // If an observer subscribes after source completes, last N values are returned and observer is completed.
  const published$ = source$.pipe(shareReplay(2));
  console.log("Source shared.");

  await wait("subscribe for a");

  published$.pipe(take(5)).subscribe(namedObserver("a"));

  await wait("subscribe for b");

  published$.pipe(take(4)).subscribe(namedObserver("b"));

  await wait("subscribe for c");

  // Late subscribers don't get any new values any more but the last N values.
  published$.pipe(take(4)).subscribe(namedObserver("c"));
}
