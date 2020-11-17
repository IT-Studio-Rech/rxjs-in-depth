import { interval } from "rxjs";
import { take, tap } from "rxjs/operators";

import { wait } from "../misc/util";
import { namedObserver } from "../misc/namedObserver";
import { logComplete } from "../operators/logComplete";
import { shareReplayLatestWhileConnected } from "../operators/shareReplayLatestWhileConnected";

// Multicasting via custom shareReplayLatestWhileConnected operator
export async function mc12shareReplayLatestWhileConnectedDemo() {
  // Create cold observable. Counting starts on subscription.
  const source$ = interval(800).pipe(
    // Take less than subscibed by obervers to make sure source completes.
    take(5),
    logComplete(),
    // Simulate completion with an error
    // tap((v) => {
    //   if (v == 4) throw new Error("muh");
    // }),
  );

  // When source disconnects (completion or error), new subscribers won't get replayed values any more.
  const published$ = source$.pipe(shareReplayLatestWhileConnected(1));
  console.log("Source shared.");

  await wait("subscribe for a");

  published$.pipe(take(10)).subscribe(namedObserver("a"));

  await wait("subscribe for b");

  published$.pipe(take(10)).subscribe(namedObserver("b"));

  await wait("subscribe for c");

  published$.pipe(take(10)).subscribe(namedObserver("c"));
}
