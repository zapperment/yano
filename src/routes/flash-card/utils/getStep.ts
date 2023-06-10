export default function getStep(code:string) {
  const [, barCode] = code.split("_");
  return Number.parseInt(barCode.replace(/^.+\.([0-9]+$)/, "$1"), 10);
}
