import { Observable } from "rxjs";

// Operator factory
export function filterModulo(modulo: number) {
  // Operator function that creates & returns a new observable, which connects to the source
  return (source: Observable<number>): Observable<number> =>
    new Observable((observer) => {
      // Subscribe to source and pass valid values along. Forward complete & error.
      // Return subscription so unsubscribe is triggered correctly
      return source.subscribe({
        next(value) {
          if (value % modulo == 0) observer.next(value);
        },
        error: (error) => observer.error(error),
        complete: () => observer.complete(),
      });
    });
}
