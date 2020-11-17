import { combineLatest, timer, interval } from "rxjs";
import { distinctUntilChanged, map, mapTo, take, tap } from "rxjs/operators";
import { webSocket } from "rxjs/webSocket";

export function coldWebsocket$(errorValue?: number) {
  // Create dummy echo websocket
  const socket$ = webSocket<number>("wss://echo.websocket.org");

  // Publish 1,2,...,49 to websocket
  // Timer is restarted on each new subscription.
  const timer$ = interval(800).pipe(
    map((i) => i + 1),
    // Publish to echo socket
    tap((i) => socket$.next(i)),
    // Notify on successful publish
    mapTo("published"),
    // Stop publishing after 49
    take(50),
  );

  // return source
  // on subscription, it subscribes to socket & timer, to make timer hot and start its stream
  return combineLatest(socket$.asObservable(), timer$).pipe(
    // map to data emitted by websocket
    map(([i]) => i),
    // ignore timer emissions (each websocket emission is emitted twice due to timer emmission to combineLatest)
    distinctUntilChanged(),
    // throw error on socket on every 4th submission
    tap((i) => {
      if (errorValue && i % errorValue == 0)
        throw new Error(`WTF, we've got a ${i} 😱`);
    }),
  );
}
