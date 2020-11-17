import { Observable, interval, Subscription } from "rxjs";

let producer: Subscription;
let onChange: ((current: number) => void) | null;

function registerListener(listener: (current: number) => void) {
  onChange = listener;
}

export function hotInterval$(ms = 1000): Observable<number> {
  console.log("hot source created");

  // Create a number producer. This producer starts emitting values independently of someone listening to it.
  // Similar to events in the browser being fired independently of a listener.
  producer = interval(ms).subscribe((v) => !!onChange && onChange(v));

  return new Observable((observer) => {
    console.log("hot source subscribed");

    // Register a listener to the number producer
    registerListener((current) => observer.next(current));

    return () => console.log("hot source unsubscribed");
  });
}

export function destroyHotProducer() {
  if (producer) producer.unsubscribe();
}
