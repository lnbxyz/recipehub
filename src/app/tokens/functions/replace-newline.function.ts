export function replaceNewLine (text?: string) :Array<string> {
  if (!text)
    return [];

  return text.split(/\n/g);
}
