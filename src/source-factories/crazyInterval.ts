import { interval } from "rxjs";
import { map, tap } from "rxjs/operators";

// Interval that throws an error each modulo N
export function crazyInterval$(errorValue?: number) {
  return interval(800).pipe(
    // map to value
    map((i) => i + 1),
    // throw some error
    tap((i) => {
      if (errorValue && i % errorValue == 0)
        throw new Error(`WTF, we've got a ${i} 😱`);
    }),
  );
}
