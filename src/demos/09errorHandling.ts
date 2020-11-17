import { of, throwError } from "rxjs";
import {
  catchError,
  delay,
  finalize,
  map,
  retryWhen,
  tap,
} from "rxjs/operators";
import { crazyInterval$ } from "../source-factories/crazyInterval";
import { retryStrategy } from "../misc/retryStrategy";
import { hotWebsocket$ } from "../source-factories/hotWebsocket";
import { coldWebsocket$ } from "../source-factories/coldWebsocket";
import { namedObserver } from "../misc/namedObserver";

// helper to get a source generating a number sequence with optional errors
function getSource$(
  source: "wsHot" | "wsCold" | "interval" = "interval",
  errorValue?: number,
) {
  if (source == "wsCold") return coldWebsocket$(errorValue);
  if (source == "wsHot") return hotWebsocket$(errorValue);
  return crazyInterval$(errorValue);
}

export async function errorHandlingDemo(): Promise<void> {
  const source$ = getSource$("wsCold", 4);

  const subscription = source$
    .pipe(
      // Do some value manipulation (not executed on error)
      map((i) => i * 10),

      // Example 2: Catch error, handle it & rethrow it
      // catchError((err) => {
      //   console.warn("Error logged FTW:", err.message);
      //   return throwError(err);
      // }),

      // Example 3: Catch error and return alternative value (e.g. failover default value)
      // catchError((err) => of(-1337)),

      // Example 4: retry after error, wait 2 seconds
      // retryWhen((errors) => errors.pipe(delay(2000))),

      // Example 5: more complex retry strategy (retry 3 times wait longer each time).
      // retryWhen(retryStrategy(3)),

      // Bonus: like finally in try catch block
      // finalize(() => {
      //   subscription.unsubscribe();
      //   console.log("finalized after complete or error");
      // }),

      // Do some more value manipulation (not executed on error, executed on failover)
      map((i) => i * 2),
    )
    .subscribe(namedObserver("a"));
}
