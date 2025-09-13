import type { Product } from "../../types/product";

const DEFAULT_URL = "https://raw.githubusercontent.com/Sellfy/test-assignment-frontend/refs/heads/master/products.json";

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(DEFAULT_URL);

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
  }

  const json = await res.json().catch(() => {
    throw new Error("Invalid JSON from products endpoint");
  });

  if (!json || !Array.isArray(json.data)) {
    throw new Error("Unexpected response shape from products endpoint");
  }

  return json.data as Product[];
}
