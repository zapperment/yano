export default function getFilePath(image: string) {
  return `/images/flash-cards/${image.replaceAll("#", "s")}.png`;
}
