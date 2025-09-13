import { useEffect, useState } from "react";
import { fetchProducts } from "../api/getProducts/products";
import type { Product } from "../types/product";

export function useProducts() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const removeProduct = (id: string) =>
    setData(prev => prev.filter(p => p._id !== id));

  return { data, loading, error, removeProduct };
}
