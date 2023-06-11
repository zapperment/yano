export default function getRandomItem<T>(arr: T[], prevItem?: T): T {
  let nextItem;
  do {
    nextItem = arr[Math.floor(Math.random() * arr.length)];
  } while (prevItem && nextItem === prevItem);
  return nextItem;
}
