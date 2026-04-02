import { useEffect, useState } from 'react';
import { Terminal, X } from 'lucide-react';

interface SoldNotificationProps {
  productName: string;
  price: number;
  balance: number;
  onClose: () => void;
}

export function SoldNotification({ productName, price, balance, onClose }: SoldNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for animation to complete
  };

  useEffect(() => {
    // Trigger animation after mount using requestAnimationFrame for smoother animation
    const animationFrame = requestAnimationFrame(() => {
      setIsVisible(true);
    });
    
    // Auto-close after 5 seconds
    const autoCloseTimer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(autoCloseTimer);
    };
  }, []);

  return (
    <div
      className={`fixed top-4 right-4 z-50 transition-all duration-300 ease-out ${
        isVisible 
          ? 'translate-x-0 opacity-100' 
          : 'translate-x-full opacity-0'
      }`}
    >
      {/* Linux-style terminal window */}
      <div className="bg-black border border-green-500/50 rounded-lg shadow-lg shadow-green-500/20 min-w-[320px] overflow-hidden">
        {/* Terminal title bar */}
        <div className="bg-green-500/10 px-4 py-2 flex items-center justify-between border-b border-green-500/30">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-xs font-mono font-bold tracking-wider">SOLD</span>
          </div>
          <button 
            onClick={handleClose}
            className="text-green-600 hover:text-green-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal content */}
        <div className="p-4 font-mono">
          {/* System prompt */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-green-500 text-sm">root@cardvault:~$</span>
            <span className="text-green-300 text-sm animate-pulse">_</span>
          </div>

          {/* Success message */}
          <div className="flex items-center gap-2 mb-3 text-green-400">
            <span className="text-green-500">✓</span>
            <span className="text-sm">Transaction completed successfully</span>
          </div>

          {/* Product info */}
          <div className="bg-green-500/5 border border-green-500/20 rounded p-3 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-green-600 text-xs">Product:</span>
              <span className="text-green-300 text-sm">{productName}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-green-600 text-xs">Price:</span>
              <span className="text-green-300 text-sm font-mono">${price.toFixed(2)}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-green-600 text-xs">Balance:</span>
              <span className="text-green-300 text-sm font-mono">${balance.toFixed(2)}</span>
            </div>
          </div>

          {/* Status footer */}
          <div className="mt-3 pt-3 border-t border-green-500/20">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-500 text-xs">Status: Completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
