import { useEffect, useState } from 'react';
import { Terminal, Code, ChevronRight, Shield, Zap, Users, Clock, CreditCard, Hash, Database, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Typing effect hook
function useTypingEffect(text: string, speed: number = 50, startDelay: number = 0) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    
    const startTyping = () => {
      let i = 0;
      const type = () => {
        if (i < text.length) {
          setDisplayedText(text.slice(0, i + 1));
          i++;
          timeout = setTimeout(type, speed);
        } else {
          setIsComplete(true);
        }
      };
      type();
    };

    timeout = setTimeout(startTyping, startDelay);
    
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayedText, isComplete };
}

export function Hero() {
  
  const { displayedText: line1 } = useTypingEffect('> initializing CardVault v2.0...', 30, 500);
  const { displayedText: line2, isComplete: line2Done } = useTypingEffect('> loading secure modules...', 30, 1500);
  const { displayedText: line3, isComplete: line3Done } = useTypingEffect('> establishing encrypted connection...', 30, 2800);
  const { displayedText: line4 } = useTypingEffect('> access granted. welcome, user.', 30, 4200);

  const stats = [
    { value: '50K+', label: 'orders_executed' },
    { value: '99.9%', label: 'uptime_status' },
    { value: '24/7', label: 'support_active' },
    { value: '0', label: 'breaches_detected' },
  ];

  const features = [
    { icon: CreditCard, text: 'Premium Cards' },
    { icon: Key, text: 'Linkable CCs' },
    { icon: Database, text: 'Bank Logs' },
    { icon: Users, text: 'Verified Accounts' },
    { icon: Zap, text: 'Pro Tools' },
    { icon: Shield, text: 'Secure Payments' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Scanline overlay */}
      <div className="absolute inset-0 scanline pointer-events-none z-10" />
      
      {/* CRT flicker */}
      <div className="absolute inset-0 bg-green-500/[0.02] animate-flicker pointer-events-none z-10" />

      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Terminal Window */}
          <div className="terminal-window">
            {/* Terminal Header */}
            <div className="terminal-header">
              <div className="terminal-dot terminal-dot-red" />
              <div className="terminal-dot terminal-dot-yellow" />
              <div className="terminal-dot terminal-dot-green" />
              <span className="ml-4 text-xs text-green-600 font-mono">user@cardvault:~</span>
            </div>
            
            {/* Terminal Body */}
            <div className="terminal-body min-h-[280px] font-mono text-sm">
              <div className="text-green-700 mb-2">$ ./boot_sequence.sh</div>
              
              <div className="space-y-1">
                <div className="text-green-500">
                  {line1}<span className="animate-blink">█</span>
                </div>
                {line2Done && (
                  <div className="text-green-500">
                    {line2}<span className="animate-blink">█</span>
                  </div>
                )}
                {line3Done && (
                  <div className="text-green-500">
                    {line3}<span className="animate-blink">█</span>
                  </div>
                )}
                {line2Done && line3Done && (
                  <div className="text-green-400 font-bold">
                    {line4}<span className="animate-blink">█</span>
                  </div>
                )}
              </div>

              {line2Done && line3Done && (
                <div className="mt-6 space-y-2">
                  <div className="text-green-600">$ <span className="text-green-400">cat</span> system_status.log</div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {stats.map((stat, index) => (
                      <div key={index} className="border border-green-500/20 p-3 rounded bg-green-500/5">
                        <div className="text-green-400 text-lg font-bold">{stat.value}</div>
                        <div className="text-green-700 text-xs">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 border-2 border-green-500 flex items-center justify-center glow-green">
                <Terminal className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <div className="text-green-700 text-xs font-mono">root@cardvault:~#</div>
                <div className="text-green-400 text-xl font-bold tracking-wider">CARDVAULT</div>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              <span className="text-green-700 font-mono text-lg block mb-2">{'//'} blackhat_access_granted</span>
              <span className="text-green-400 animate-glow-pulse">Elite Underground</span>
              <br />
              <span className="text-green-500">Card Vault</span>
            </h1>

            <p className="text-green-600 font-mono text-sm leading-relaxed max-w-lg">
              <span className="text-green-400">$</span> Elite blackhat arsenal: cloned cards, dumps, fullz,
              accounts, logs & hacking tools. Anonymous transactions, encrypted delivery, underground support.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-green-500/20 border border-green-500 text-green-400 hover:bg-green-500 hover:text-black font-mono rounded-none glow-green transition-all"
                asChild
              >
                <a href="#products">
                  <ChevronRight className="w-4 h-4 mr-2" />
                  ./browse_products.sh
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-green-500/30 text-green-600 hover:bg-green-500/10 hover:text-green-400 font-mono rounded-none"
                asChild
              >
                <a href="#features">
                  <Code className="w-4 h-4 mr-2" />
                  cat features.txt
                </a>
              </Button>
            </div>

            {/* Code snippet decoration */}
            <div className="mt-8 p-4 border border-green-500/20 bg-black/50 font-mono text-xs text-green-700">
              <div><span className="text-purple-400">const</span> <span className="text-yellow-400">security</span> = {'{'}</div>
              <div className="pl-4"><span className="text-blue-400">encryption</span>: <span className="text-green-400">'AES-256'</span>,</div>
              <div className="pl-4"><span className="text-blue-400">anonymity</span>: <span className="text-orange-400">true</span>,</div>
              <div className="pl-4"><span className="text-blue-400">delivery</span>: <span className="text-green-400">'instant'</span></div>
              <div>{'}'};</div>
            </div>

            {/* Features Grid */}
            <div className="mt-8">
              <div className="text-green-700 text-xs mb-3">$ ls categories/</div>
              <div className="grid grid-cols-3 gap-2">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 p-2 border border-green-500/20 bg-green-500/5 hover:border-green-500/40 transition-colors"
                  >
                    <feature.icon className="w-4 h-4 text-green-500" />
                    <span className="text-green-400 text-xs">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

             {/* Trust Badges */}
             <div className="mt-6 flex flex-wrap gap-4 items-center">
               <div className="flex items-center gap-2 text-green-700 text-xs">
                 <Shield className="w-4 h-4" />
                 <span>SSL Secured</span>
               </div>
               <div className="flex items-center gap-2 text-green-700 text-xs">
                 <Zap className="w-4 h-4" />
                 <span>Instant Delivery</span>
               </div>
               <div className="flex items-center gap-2 text-green-700 text-xs">
                 <Clock className="w-4 h-4" />
                 <span>24/7 Support</span>
               </div>
               <div className="flex items-center gap-2 text-green-700 text-xs">
                 <Hash className="w-4 h-4" />
                 <span>Crypto Payments</span>
               </div>
             </div>
           </div>
         </div>
         
         {/* Scroll Down Indicator */}
         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-green-500 font-mono text-xs animate-bounce">
           <span>SCROLL DOWN FOR PRODUCTS ▼</span>
         </div>
       </div>
     </section>
   );
 }
