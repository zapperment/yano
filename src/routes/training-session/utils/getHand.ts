export default function getHand(code: string) {
  const [, , handCode] = code.split("_");
  return handCode === "lh" ? "left" : "right";
}
