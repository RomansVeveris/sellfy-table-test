import { useState } from "react";
import { useProducts } from "./hooks/useProducts";
import type { Product } from "./types/product";
import ProductsList from "./components/ProductsList";
import ProductsTable from "./components/ProductsTable";
import ShareModal from "./components/ShareModal";

function App() {
  const { data, loading, error, removeProduct } = useProducts();
  const [openShareProduct, setOpenShareProduct] = useState<Product | null>(null);

  if (loading) return <p className="py-8 mx-auto w-30">Loading data...</p>;
  if (error) return <p className="text-red-600">Failed to fetch products: {error}</p>;

  return (
    <>
      <div className="rounded-[8px] w-full max-w-[1280px] mx-auto bg-transparent md:bg-white">

        <ProductsTable 
          products={data} 
          onDelete={removeProduct} 
          onShare={setOpenShareProduct} 
        />

        <ProductsList 
          products={data} 
          onDelete={removeProduct} 
          onShare={setOpenShareProduct} 
        />

      </div>

      {openShareProduct && (
        <ShareModal
          isOpen={true}
          onClose={() => setOpenShareProduct(null)}
          productName={openShareProduct.name}
          description={openShareProduct.description}
          image_url={openShareProduct.image_url}
          url={openShareProduct.url}
        />
      )}
    </>
  )
}

export default App