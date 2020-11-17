import { Observable, pipe } from "rxjs";
import { tap } from "rxjs/operators";

export function simpleLog<T>(source: Observable<T>): Observable<T> {
  return source.pipe(tap((v) => console.log(v)));
}

// Factory function that returns an operator. May have an argument
export function betterLog(name?: string) {
  return function <T>(source: Observable<T>): Observable<T> {
    return source.pipe(tap((v) => console.log(name ? `${name}: ${v}` : v)));
  };
}

// Shorter version. Omitted types are inferred automatically.
export function namedLog<T>(name?: string) {
  return (source: Observable<T>) =>
    source.pipe(tap((v) => console.log(name ? `${name}: ${v}` : v)));
}

// Factory function that returns an operator. May have an argument. Good for very simple cases.
export function evenShorterLog(name?: string) {
  return tap((v) => console.log(name ? `${name}: ${v}` : v));
}

// Pipe from rxjs could be used as a unary function that connects observables as well, to make operator building simple.
export function doubleLog(name?: string) {
  return pipe(
    tap((v) => console.log(name ? `${name}-1: ${v}` : v)),
    tap((v) => console.log(name ? `${name}-2: ${v}` : v)),
  );
}
