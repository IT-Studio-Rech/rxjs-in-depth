import { Observable, ReplaySubject } from "rxjs";
import { multicast, tap, takeWhile, share } from "rxjs/operators";

// This is just a mindfuck. Multicast does not work as expected or documentation is not helpful.
export function shareReplayLatestWhileConnected<T>(count?: number) {
  return function (source: Observable<T>): Observable<T> {
    let done = false;
    return source.pipe(
      tap(
        null, // next
        () => (done = true), // error
        () => (done = true), // complete
      ),
      multicast(
        // subject for multicasting
        new ReplaySubject<T>(count),
        // selector. stop subscription on replay subject, when source is done
        (shared) => shared.pipe(takeWhile(() => !done)),
      ),
      share(),
    );
  };
}
