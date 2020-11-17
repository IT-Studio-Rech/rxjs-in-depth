import { tap } from "rxjs/operators";

export function logComplete<T>(name: string = "source") {
  return tap<T>(null, null, () => console.log(`${name} complete`));
}
