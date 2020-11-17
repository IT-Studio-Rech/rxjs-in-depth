import { take } from "rxjs/operators";
import { interval } from "rxjs";

import { wait } from "../misc/util";
import { namedObserver } from "../misc/namedObserver";
import { logComplete } from "../operators/logComplete";

// example 1: 2 observers subscribe to subject at differnt times
export async function mc1multiObserversDemo() {
  // Create cold observable. Counting starts on subscription.
  const source$ = interval(300).pipe(take(10), logComplete());

  await wait("subscribe for a");

  source$.subscribe(namedObserver("a"));

  await wait("subscribe for b");

  source$.subscribe(namedObserver("b"));
}
