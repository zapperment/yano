export default function getBar(code: string): number {
  const [, barCode] = code.split("_");
  return Number.parseInt(barCode.substring(3), 10);
}
