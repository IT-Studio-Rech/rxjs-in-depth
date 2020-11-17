import { interval } from "rxjs";
import { mapTo, take, tap } from "rxjs/operators";
import { webSocket } from "rxjs/webSocket";

export function hotWebsocket$(errorValue?: number) {
  // create dummy echo websocket
  const socket$ = webSocket<number>("wss://echo.websocket.org");

  // publish 0,1,2,...,49 to websocket
  // values are published due to ongoing subscription to timer
  interval(800)
    .pipe(
      // Publish to echo websocket
      // Is buffered for later submission while nobody is subscribing to the websocket.
      tap((i) => socket$.next(i)),
      // Notify on successful publish
      mapTo("published"),
      // Stop publishing after 49
      take(50),
    )
    .subscribe();

  // return websocket data source
  return socket$.asObservable().pipe(
    // throw error on socket on every submission that can be devided by errorValue
    tap((i) => {
      if (errorValue && i % errorValue == 0)
        throw new Error(`WTF, we've got a ${i} 😱`);
    }),
  );
}
