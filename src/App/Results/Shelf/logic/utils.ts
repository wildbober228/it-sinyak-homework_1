export function padCatalogNumber(id: number) {
  return String(id).padStart(5, "0");
}
