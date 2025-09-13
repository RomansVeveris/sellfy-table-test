import Facebook from "../assets/facebook.svg";
import Twitter from "../assets/twitter.svg";
import Copy from "../assets/copy.svg";

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    image_url: string;
    productName: string;
    description: string;
    url: string;
}

export default function ShareModal({ isOpen, onClose, productName, image_url, description, url}: ShareModalProps) {
  if(!isOpen) return null;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard");
    } catch {
      console.error("Failed to copy link");
    }
  } 

  return (
    <div className="fixed inset-0 bg-[#00000050] flex items-center justify-center z-20 overflow-y-scroll" onClick={onClose}>
      <div 
        className="flex flex-col items-center gap-4 bg-white rounded-[8px] p-4 w-full max-w-[90vw] md:max-w-150  max-h-[90vh] overflow-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h4 className="font-bold">Share your product!</h4>

        <div className="flex flex-col border border-stroke rounded-[8px] p-4">
          <div className="w-full h-auto mx-auto mb-4">
            <img src={image_url} alt="" className="object-cover w-full h-full max-h-100" />
          </div>
          <h5 className="font-bold">{productName}</h5>
          <p className="text-text-secondary">{description}</p>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-between">
          <button className="btn w-full md:w-1/3 flex justify-center items-center gap-2">
            <img src={Facebook} className="w-6 h-6" />
            Share
          </button>
          <button className="btn w-full md:w-1/3 flex justify-center items-center gap-2">
            <img src={Twitter} className="w-6 h-6" />
            Tweet
          </button>
          <button onClick={handleCopyLink} className="btn w-full md:w-1/3 flex justify-center items-center gap-2">
            <img src={Copy} className="w-6 h-6" />
            Copy link
          </button>
        </div>
      </div>
    </div>  
  );
}