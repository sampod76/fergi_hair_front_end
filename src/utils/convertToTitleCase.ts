export function convertToTitleCase(text: string): string {
  if (!text) {
    return '';
  }
  // Insert a space before each uppercase letter and trim any extra spaces
  const spacedText = text.replace(/([A-Z])/g, ' $1').trim();

  // Capitalize the first letter of each word
  return spacedText.replace(/\b\w/g, (char: string) => char.toUpperCase());
}
