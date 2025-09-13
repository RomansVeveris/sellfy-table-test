import { useState, useEffect,  } from "react";
import ProductMenu from "./ProductMenu";
import type { Product } from "../types/product";
import Dots from "../assets/dots.svg";

interface ProductsTableProps {
  products: Product[];
  onDelete: (id: string) => void;
  onShare: (product: Product) => void;
}

export default function ProductsTable({ products, onDelete, onShare }: ProductsTableProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".menu-button") && !target.closest(".menu-dropdown")) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <table className="hidden md:table w-full">
      <thead>
        <tr className="bg-gray-200 text-left sm:bg-white">
          <th className="w-1/2">Product</th>
          <th className="w-1/4">Category</th>
          <th className="w-1/4">Price</th>
        </tr>
      </thead>
      <tbody>
        {products.length === 0 && 
        <tr>
          <td>No products found.</td>
        </tr>
        }
        
        {products.map(product => (
          <tr key={product._id} className="hover:bg-gray-50 border-b border-stroke last:border-none">
            <td className="text-left">
              <div className="flex items-center gap-4">
                <div className="w-36 max-h-36 flex-shrink-0 overflow-hidden rounded">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="flex flex-col w-60">
                  <span className="font-medium">{product.name}</span>
                  <span className="text-text-secondary truncate">{product.description}</span>
                </div>
              </div>
            </td>
            <td className="text-left">{product.category.replace(/&amp;/g, "&")}</td>
            <td title={product.currency} className="price text-left">
              <div className="relative flex w-full justify-between">
                {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: product.currency,
                  }).format(product.price)}
                <button onClick={() => setOpenMenuId(openMenuId === product._id ? null : product._id)} className="menu-button flex justify-center items-center p-1 rounded-full hover:bg-white drop-shadow-[0_0px_5px_rgba(0,0,0,0.15)] select-none">
                  <img src={Dots} alt="options" className="w-4 h-4" />
                </button>

                {openMenuId === product._id && (
                  <ProductMenu 
                    product={product} 
                    onShare={onShare} 
                    onDelete={onDelete} 
                  />
                )}

              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}