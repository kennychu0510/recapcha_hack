export function selectElement(selector: string) {
  const element = document.querySelector(selector);
  if (!element) throw 'could not select ' + selector;
  return element;
}