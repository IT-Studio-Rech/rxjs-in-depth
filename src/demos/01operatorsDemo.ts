import { wait } from "../misc/util";
import { interval } from "rxjs";
import { take } from "rxjs/operators";

import { logComplete } from "../operators/logComplete";
import {
  simpleLog,
  betterLog,
  namedLog,
  evenShorterLog,
  doubleLog,
} from "../operators/simple";
import { filterModulo } from "../operators/filterModulo";
import { namedObserver } from "../misc/namedObserver";

export async function operatorsDemo() {
  // Create cold observable. Counting starts on subscription.
  const source$ = interval(300).pipe(take(10), logComplete());

  // Simple value logging examples
  source$.pipe(simpleLog).subscribe();
  // source$.pipe(betterLog('a')).subscribe();
  // source$.pipe(evenShorterLog("a")).subscribe();
  // source$.pipe(doubleLog("a")).subscribe();
  // source$.pipe(namedLog("a")).subscribe();

  // Modulo filter example
  source$.pipe(filterModulo(3)).subscribe(namedObserver("a"));

  // await wait(3000);
}
