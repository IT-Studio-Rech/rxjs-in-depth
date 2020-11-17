import { Observable, throwError, timer } from "rxjs";
import { mergeMap } from "rxjs/operators";

// Returns a function with a retry strategy
export function retryStrategy(maxRetries: number = 5) {
  return (errors: Observable<any>) =>
    errors.pipe(
      mergeMap((error, i) => {
        const retries = i + 1; // i starts with 0

        // stop to retry after maxRetries fails
        if (retries >= maxRetries) {
          console.warn("Log Error", error);
          return throwError(`${retries}. Versuche. Es langt, Abbruch!`);
        }

        console.log(
          `${retries}. Versuch fehlgeschlagen, neuer Versuch in ${
            retries * retries
          } Sekunden`,
        );

        // retry after more seconds each time
        return timer(1000 * retries * retries);
      }),
    );
}
