// src/services/categoryService.js
export async function fetchSubcategories() {
  // Example API call
  const response = await fetch("https://yourapi.com/api/categories");
  if (!response.ok) throw new Error("Failed to load categories");
  return await response.json();
}
