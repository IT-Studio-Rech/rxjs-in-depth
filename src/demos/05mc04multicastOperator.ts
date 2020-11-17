import { Subject, ConnectableObservable, interval } from "rxjs";
import { take, multicast } from "rxjs/operators";

import { wait } from "../misc/util";
import { namedObserver } from "../misc/namedObserver";
import { logComplete } from "../operators/logComplete";

// Connectable observable with multicast operator (similar as multicasting with just a Subject)
export async function mc4multicastOperatorDemo() {
  // Create cold observable. Counting starts on subscription.
  const source$ = interval(800).pipe(
    // Just emit 1 to force source to complete quickly
    // take(1),
    // Emit many
    take(100),
    logComplete(),
  );

  // Memory leak alert. If source does not complete, the multicast subject keeps listening forever.
  // Creates a connectrable observable. It starts subscribing on source on .connect().
  const multicasted$ = source$.pipe(
    // Multicast with Subject for multicasting.
    multicast(new Subject()),

    // Multicast with Subject factory for multicasting, in case source completes.
    // multicast(() => new Subject()),
  ) as ConnectableObservable<number>; // <======= ConnectableObservable is returned by multicast
  console.log("Source multicasted. Connectable created.");

  await wait("subscribe for a");

  multicasted$.pipe(take(2)).subscribe(namedObserver("a"));

  await wait("subscribe for b");

  multicasted$.pipe(take(2)).subscribe(namedObserver("b"));

  await wait("connect");

  // Connect observers to source. Source starts emitting.
  multicasted$.connect();

  await wait("subscribe for c");

  multicasted$.pipe(take(2)).subscribe(namedObserver("c"));

  // Reconnect in case if source was already completed.
  if (multicasted$._isComplete) multicasted$.connect();

  await wait("subscribe for d");

  // As long as source does not complete it's still emitting stuff. Even if nobody subscribed any more.
  multicasted$.subscribe(namedObserver("d"));

  // Reconnect in case if source was already completed.
  if (multicasted$._isComplete) multicasted$.connect();
}
