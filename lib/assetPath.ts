export const assetPath = (path: string) => {
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  return `/${normalizedPath.split("/").map(encodeURIComponent).join("/")}`;
};
