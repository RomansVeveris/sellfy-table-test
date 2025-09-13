import Share from "../assets/share.svg";
import Delete from "../assets/delete.svg";
import type { Product } from "../types/product";

interface ProductMenuProps {
  product: Product;
  onShare: (product: Product) => void;
  onDelete: (id: string) => void;
}

export default function ProductMenu({ product, onShare, onDelete }: ProductMenuProps) {
  return (
    <div className="menu-dropdown absolute overflow-hidden right-0 top-1/2 w-36 bg-white border border-stroke rounded z-10">
      <button
        onClick={() => onShare(product)}
        className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-gray-100"
      >
        <img src={Share} alt="share" className="w-4 h-4" />
        Share
      </button>
      <button
        onClick={() => onDelete(product._id)}
        className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-gray-100"
      >
        <img src={Delete} alt="delete" className="w-4 h-4" />
        Delete
      </button>
    </div>
  );
}
