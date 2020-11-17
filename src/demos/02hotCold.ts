import { wait } from "../misc/util";
import {
  hotInterval$,
  destroyHotProducer,
} from "../source-factories/hotInterval";
import { interval } from "rxjs";
import { logComplete } from "../operators/logComplete";
import { namedObserver } from "../misc/namedObserver";

export async function hotColdDemo() {
  // Create cold observable. Counting starts on subscription.
  const cold$ = interval(800).pipe(logComplete());
  // Create hot observable. Create producer. Counting starts immediately from 1.
  const hot$ = hotInterval$(800);

  await wait("subscribe for cold1 and hot1");

  // Create producer. Counting starts from 1. Subscribe to it.
  let sub1 = cold$.subscribe(namedObserver("cold1"));
  // Subscribe to current count.
  let sub2 = hot$.subscribe(namedObserver("hot1"));

  await wait("unsubscribe for cold1 and hot1");

  // Destroy producer. Stop counting. Unsubscribe.
  sub1.unsubscribe();
  // Unsubscribe. Producer keeps on counting.
  sub2.unsubscribe();

  await wait("subscribe of cold2 and hot2");

  // Create producer. Counting starts from 1. Subscribe to it.
  sub1 = cold$.subscribe(namedObserver("cold2"));
  // Subscribe to current count.
  sub2 = hot$.subscribe(namedObserver("hot2"));

  await wait("unsubscribe of cold2 and hot2");

  // Destroy producer. Stop counting. Unsubscribe.
  sub1.unsubscribe();
  // Unsubscribe. Producer keeps on counting.
  sub2.unsubscribe();

  // Avoid memory leaks
  destroyHotProducer();
}
