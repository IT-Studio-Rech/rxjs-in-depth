import { interval } from "rxjs";
import { take, share } from "rxjs/operators";

import { wait } from "../misc/util";
import { namedObserver } from "../misc/namedObserver";
import { logComplete } from "../operators/logComplete";

// Multicasting via publish operator
export async function mc10shareDemo() {
  // Create cold observable. Counting starts on subscription.
  const source$ = interval(800).pipe(take(5), logComplete());

  // Share like multiplex with subject factory & refcounting.
  const published$ = source$.pipe(share());
  console.log("Source shared.");

  await wait("subscribe for a");

  published$.pipe(take(6)).subscribe(namedObserver("a"));

  await wait("subscribe for b");

  published$.pipe(take(3)).subscribe(namedObserver("b"));

  await wait("subscribe for c");

  published$.pipe(take(3)).subscribe(namedObserver("c"));
}
