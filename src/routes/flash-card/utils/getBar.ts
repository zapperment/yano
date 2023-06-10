export default function getBar(code: string): number {
  const [, barCode] = code.split("_");
  return Number.parseInt(barCode.replace(/^bar([0-9]+).+$/, "$1"), 10);
}
