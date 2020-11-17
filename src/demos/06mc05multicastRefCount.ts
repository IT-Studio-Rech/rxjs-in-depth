import { Subject, interval } from "rxjs";
import { take, multicast, refCount } from "rxjs/operators";

import { wait } from "../misc/util";
import { namedObserver } from "../misc/namedObserver";
import { logComplete } from "../operators/logComplete";

// Multicastin with refcounting
export async function mc5multicastRefCountDemo() {
  // Create cold observable. Counting starts on subscription.
  const source$ = interval(800).pipe(
    // Just emit 1 to force source to complete quickly
    // take(1),
    // Emit many
    take(50),
    logComplete(),
  );

  // Multicasted source. Subscribes on source only when subscribers are present.
  const multicasted$ = source$.pipe(
    // Pass Subject factory, to create new Subject in case source is completed.
    multicast(() => {
      console.log("factory creates new multicast subject");
      return new Subject<number>();
    }),
    // Pass Subject, and no new subject is created once source is completed.
    // multicast(new Subject<number>()),

    // Only for connectables. It calls .connect() at first subscription & completes when last
    // subscriber unsubscribes. On each connect a new multicast subject is created by the factory.
    refCount(),
  );
  console.log("Source multicasted with reference counting.");

  await wait("subscribe for a");

  multicasted$.pipe(take(10)).subscribe(namedObserver("a"));

  await wait("subscribe for b");

  multicasted$.pipe(take(2)).subscribe(namedObserver("b"));

  await wait("subscribe for c");

  multicasted$.pipe(take(2)).subscribe(namedObserver("c"));
}
