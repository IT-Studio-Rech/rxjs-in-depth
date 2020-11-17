import { getRandomColor } from "./util";

// Creates an observer that displays all recieved values with a given name in a random color.
export function namedObserver(name: string) {
  const color = getRandomColor({ min: 90 });

  console.log(
    `%cobserver ${name}: subscribed, waiting for emissions`,
    `color: ${color}`,
  );

  return {
    next: (value: number) =>
      console.log(`%cobserver ${name}: ${value}`, `color: ${color}`),
    error: (err: any) => console.error(`error on observer ${name}:`, err),
    complete: () =>
      console.log(`%cobserver ${name}: complete`, `color: ${color}`),
  };
}
