import { useState, useEffect } from "react";
import ProductMenu from "./ProductMenu";
import type { Product } from "../types/product";
import Dots from "../assets/dots.svg";

interface ProductListProps {
  products: Product[];
  onDelete: (id: string) => void;
  onShare: (product: Product) => void;
}

export default function ProductList({ products, onDelete, onShare }: ProductListProps) {
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
    <>
      <div className="flex md:hidden w-full bg-white p-4 rounded-[4px] text-text-secondary mb-4">
        <p className="font-bold">Products</p>
      </div>
      <div className="flex flex-col gap-4 md:hidden">
        {products.length === 0 && (
          <div className="bg-white rounded p-4">
            <p>No products found.</p>
          </div>
        )}

        {products.map(product => (
          <div key={product._id} className="relative flex flex-col bg-white rounded p-4">
            <div className="w-40 max-h-40 mb-8 mx-auto flex-shrink-0 overflow-hidden rounded">
              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
            </div>

            <div className="absolute right-4 top-4">
              <button 
                onClick={() => setOpenMenuId(openMenuId === product._id ? null : product._id)} 
                className="menu-button flex justify-center items-center p-1 rounded-full hover:bg-white drop-shadow-[0_0px_5px_rgba(0,0,0,0.15)] select-none"
              >
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

            <h5 className="font-bold">{product.name}</h5>

            <div className="flex flex-col border-b border-stroke justify-between py-4 gap-2">
              <span className="text-[14px] text-text-secondary">Description:</span>
              <p className="truncate">{product.description}</p>
            </div>

            <div className="flex flex-col border-b border-stroke justify-between py-4 gap-2">
              <span className="text-[14px] text-text-secondary">Category:</span>
              <p>{product.category.replace(/&amp;/g, "&")}</p>
            </div>

            <div className="flex flex-col justify-between py-4 gap-2">
              <span className="text-[14px] text-text-secondary">Price:</span>
              <p className="price">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: product.currency,
                }).format(product.price)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
