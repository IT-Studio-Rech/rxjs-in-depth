import { fromEvent, timer } from "rxjs";
import { mapTo, take } from "rxjs/operators";
import { isNumber } from "util";

const keypress$ = fromEvent(document.body, "keydown").pipe(
  mapTo(true),
  take(1),
);

// waits for a number of milliseconds (default indefinite) or for keypress on body
export async function wait(msOrNext?: number | string): Promise<void> {
  if (!msOrNext || !isNumber(msOrNext)) {
    if (msOrNext)
      console.log(
        `%cwaiting... (press any key)\nnext: "%c${msOrNext}%c"`,
        "color: #555",
        "color: #bbb",
        "color: #555",
      );
    else console.log(`wait for keypress`);
    await keypress$.toPromise();
  } else {
    console.log(`wait for keypress or ${Math.round(msOrNext / 1000)} seconds`);
    await Promise.race([timer(msOrNext).toPromise(), keypress$.toPromise()]);
  }
}

export function getRandomColor(
  params: { min?: number; max?: number } = { min: 0, max: 256 },
) {
  let { min, max } = { min: 0, max: 256, ...params };
  min = Math.max(0, min);
  max = Math.min(256, max);
  if (min > max) min = max - 1;

  const { r, g, b } = {
    r: ("0" + ((Math.random() * max) | min).toString(16)).slice(-2),
    g: ("0" + ((Math.random() * max) | min).toString(16)).slice(-2),
    b: ("0" + ((Math.random() * max) | min).toString(16)).slice(-2),
  };

  return "#" + r + g + b;
}
