import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, Terminal, Search, Power, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCart } from '@/context/CartContext';
import { useStore } from '@/context/StoreContext';
import { MessageInbox } from '@/components/MessageInbox';
import logo from '@/lib/card vault favicon.jpeg';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export function Navigation() {
  const { totalItems, setIsOpen } = useCart();
  const { products } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof products>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Update time - uses device's local timezone
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { name: 'home', href: '#home' },
    { name: 'products', href: '#products' },
    { name: 'fullz', href: '#fullz' },
    { name: 'features', href: '#features' },
    { name: 'reviews', href: '#testimonials' },
    { name: 'faq', href: '#faq' },
    { name: 'contact', href: '#contact' },
  ];

  // Search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }
    
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.features.some(f => f.toLowerCase().includes(query.toLowerCase()))
    );
    setSearchResults(filtered);
  };

  const getSuggestions = () => {
    // Return prefilled suggestions based on categories
    return [
      'Visa Classic',
      'Mastercard Platinum',
      'Amex Gold',
      'Linkable CC',
      'Bank Log',
      'PayPal Account',
      'Card Checker',
      'VPN',
      'Proxy',
      'SMS Verification'
    ];
  };

  return (
    <>
        {/* News Ticker */}
  <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-green-900 via-green-800 to-green-900 border-b border-green-500/30 overflow-hidden h-8 flex items-center">
    <div className="whitespace-nowrap animate-marquee">
      <span className="mx-8 text-green-200 text-xs font-mono">
        [SYSTEM] payments.service: active (running) | delivery.service: active (exited) | guides.service: loaded
      </span>
      <span className="mx-8 text-green-200 text-xs font-mono">
        [SYSTEM] payments.service: active (running) | delivery.service: active (exited) | guides.service: loaded
      </span>
      <span className="mx-8 text-green-200 text-xs font-mono">
        [SYSTEM] payments.service: active (running) | delivery.service: active (exited) | guides.service: loaded
      </span>
    </div>
    <style>{`
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-33.33%); }
      }
      .animate-marquee {
        animation: marquee 20s linear infinite;
        display: flex;
      }
    `}</style>
  </div>
      
      <nav
        className={`fixed top-8 left-0 right-0 z-50 transition-all duration-300 font-mono ${
        isScrolled
          ? 'bg-black/95 border-b border-green-500/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <img 
              src={logo} 
              alt="CardVault" 
              className="w-10 h-10 object-contain border border-green-500 group-hover:border-green-400 transition-colors"
            />
            <div className="hidden sm:block">
              <span className="text-green-500 font-bold tracking-wider">CARDVAULT</span>
              <span className="text-green-700 text-xs ml-2">v2.0</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 text-xs text-green-600 hover:text-green-400 transition-colors rounded border border-transparent hover:border-green-500/30"
              >
                ./{link.name}
              </a>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Time Display */}
            <div className="hidden md:block text-xs text-green-700 font-mono">
              {currentTime}
            </div>

            <div className="w-px h-4 bg-green-500/30 hidden md:block" />

            {/* Message Inbox */}
            <MessageInbox />

            {/* Search Button */}
            <Button
              variant="ghost"
              size="icon"
              className="text-green-600 hover:text-green-400 hover:bg-green-500/10"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="w-4 h-4" />
            </Button>

            <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
              <DialogContent className="bg-black border border-green-500/30 max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-green-400 font-mono flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    Search Products
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="bg-black border-green-500/30 text-green-400 font-mono placeholder:text-green-800 focus:border-green-500"
                    autoFocus
                  />
                  
                  {/* Prefilled Suggestions */}
                  {searchQuery === '' && (
                    <div className="space-y-2">
                      <div className="text-xs text-green-700 font-mono">Quick suggestions:</div>
                      <div className="flex flex-wrap gap-2">
                        {getSuggestions().map((suggestion, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSearch(suggestion)}
                            className="px-3 py-1 text-xs text-green-500 border border-green-500/30 hover:bg-green-500/10 rounded font-mono transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Search Results */}
                  {searchQuery !== '' && (
                    <div className="max-h-80 overflow-y-auto space-y-2">
                      {searchResults.length > 0 ? (
                        searchResults.map((product) => (
                          <a
                            key={product.id}
                            href="#products"
                            onClick={() => {
                              setSearchOpen(false);
                              setSearchQuery('');
                              setSearchResults([]);
                            }}
                            className="block p-3 border border-green-500/20 hover:border-green-500/50 bg-green-500/5 hover:bg-green-500/10 transition-colors"
                          >
                            <div className="flex justify-between items-center">
                              <span className="text-green-400 font-mono text-sm">{product.name}</span>
                              <span className="text-green-600 font-mono text-sm">${product.price}</span>
                            </div>
                            <div className="text-green-700 text-xs mt-1">{product.category}</div>
                          </a>
                        ))
                      ) : (
                        <div className="p-4 border border-red-500/30 bg-red-500/5 text-center">
                          <span className="text-red-500 font-mono">❌ NOT AVAILABLE NOW</span>
                          <p className="text-red-600 text-sm mt-2 font-mono">
                            We don't have "{searchQuery}" in stock currently.
                          </p>
                          <p className="text-red-700 text-xs mt-1 font-mono">
                            Contact support for custom requests.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>

            <Button
              variant="ghost"
              size="icon"
              className="relative text-green-600 hover:text-green-400 hover:bg-green-500/10"
              onClick={() => setIsOpen(true)}
            >
              <ShoppingCart className="w-4 h-4" />
              {totalItems > 0 && (
                <Badge
                  variant="default"
                  className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-green-500 text-black text-xs font-bold"
                >
                  {totalItems}
                </Badge>
              )}
            </Button>

            <div className="w-px h-4 bg-green-500/30" />

            {/* Support Button */}
            <a
              href="https://t.me/Ryancardsplug"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs text-green-600 hover:text-green-400 transition-colors rounded border border-green-500/30 hover:border-green-500/50 bg-green-500/5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Support</span>
            </a>

            {/* Power Button */}
            <Button
              variant="ghost"
              size="icon"
              className="text-green-600 hover:text-green-400 hover:bg-green-500/10"
            >
              <Power className="w-4 h-4" />
            </Button>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="text-green-600">
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-black border-l border-green-500/30">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2 text-green-500">
                    <Terminal className="w-5 h-5" />
                    <span className="font-mono">menu.sh</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-1 mt-6 font-mono">
                  {navLinks.map((link, index) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-3 text-sm text-green-600 hover:text-green-400 hover:bg-green-500/10 border border-transparent hover:border-green-500/30 transition-colors"
                    >
                      <span className="text-green-800">[{index + 1}]</span> {link.name}
                    </a>
                  ))}
                </div>
                <div className="mt-8 p-4 border border-green-500/20 bg-green-500/5">
                  <div className="text-xs text-green-700">
                    $ status: <span className="text-green-400">online</span>
                  </div>
                  <div className="text-xs text-green-700">
                    $ uptime: <span className="text-green-400">99.9%</span>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
    </>
  );
}
