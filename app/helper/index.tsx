export function getDirectoryName(filePath: string) {
  // Step 1: Replace backslashes with forward slashes for consistency
  const normalizedPath = filePath.replace(/\\/g, "/");

  // Step 2: Split the normalized path into segments
  const parts = normalizedPath.split("/");

  // Step 3: The directory name is the second last element in the parts array
  const directoryName = parts[parts.length - 2];

  return directoryName;
}
