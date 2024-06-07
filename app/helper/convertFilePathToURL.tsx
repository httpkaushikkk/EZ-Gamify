export function convertFilePathToURL(filePath: string) {
  // Replace backslashes with forward slashes
  let url = filePath.replace(/\\/g, "/");

  // Encode the URL components to handle special characters
  url = encodeURI(url);

  // Return the properly formatted URL
  return url;
}
