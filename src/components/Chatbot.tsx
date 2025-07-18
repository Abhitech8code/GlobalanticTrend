
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, X, Send, Bot, User, ShoppingBag, Package, CreditCard, Truck, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { allProducts } from '@/data/products';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  type?: 'text' | 'product' | 'action' | 'quick-reply';
  data?: any;
  suggestions?: string[];
}

interface UserContext {
  name?: string;
  preferences: string[];
  searchHistory: string[];
  conversationTone: 'formal' | 'casual' | 'friendly';
  lastInteraction: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [userContext, setUserContext] = useState<UserContext>({
    preferences: [],
    searchHistory: [],
    conversationTone: 'friendly',
    lastInteraction: new Date()
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { state: cartState } = useCart();
  const { state: wishlistState } = useWishlist();

  // Show welcome message after 8 seconds of idle
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const query = inputValue;
    setInputValue('');
    setIsTyping(true);

    // Update user context
    setUserContext(prev => ({
      ...prev,
      searchHistory: [...prev.searchHistory.slice(-4), query],
      lastInteraction: new Date()
    }));

    // Simulate advanced AI processing
    setTimeout(() => {
      try {
        const response = getAdvancedBotResponse(query, userContext);
        setIsTyping(false);
        setMessages(prev => [...prev, response]);
      } catch (error) {
        setIsTyping(false);
        const errorResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: "I apologize, but I'm having trouble processing your request. Please try again or contact our support team.",
          isBot: true,
          timestamp: new Date(),
          type: 'text',
          suggestions: ['Try again', 'Contact support', 'Main menu']
        };
        setMessages(prev => [...prev, errorResponse]);
      }
    }, 1200);
  };

  // Advanced NLP-inspired intent recognition
  const analyzeIntent = (input: string) => {
    const tokens = input.toLowerCase().split(/\s+/);
    const intents = {
      product_search: ['find', 'search', 'looking', 'want', 'need', 'show', 'recommend'],
      order_tracking: ['track', 'order', 'status', 'shipped', 'delivery'],
      size_help: ['size', 'fit', 'measurement', 'large', 'small', 'medium'],
      payment: ['payment', 'pay', 'card', 'paypal', 'checkout'],
      return_refund: ['return', 'refund', 'exchange', 'cancel'],
      shipping: ['shipping', 'delivery', 'ship', 'arrive', 'when'],
      greeting: ['hi', 'hello', 'hey', 'good', 'morning', 'afternoon'],
      complaint: ['problem', 'issue', 'wrong', 'broken', 'damaged', 'complaint'],
      recommendation: ['suggest', 'recommend', 'best', 'popular', 'trending']
    };

    let maxScore = 0;
    let detectedIntent = 'general';
    
    Object.entries(intents).forEach(([intent, keywords]) => {
      const score = keywords.reduce((acc, keyword) => 
        acc + (tokens.includes(keyword) ? 1 : 0), 0
      );
      if (score > maxScore) {
        maxScore = score;
        detectedIntent = intent;
      }
    });

    return { intent: detectedIntent, confidence: maxScore / tokens.length };
  };

  const getAdvancedBotResponse = (input: string, context: UserContext): Message => {
    const { intent, confidence } = analyzeIntent(input);
    const lowerInput = input.toLowerCase();
    
    // Personalized greeting based on time
    const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) return 'Good morning';
      if (hour < 17) return 'Good afternoon';
      return 'Good evening';
    };

    const baseResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: '',
      isBot: true,
      timestamp: new Date(),
      type: 'text',
      suggestions: []
    };

    switch (intent) {
      case 'greeting':
        return {
          ...baseResponse,
          text: `${getGreeting()}! 👋 I'm GloBot, your AI shopping assistant. I can help you find products, track orders, answer questions, and provide personalized recommendations. What can I help you with today?`,
          suggestions: ['Show trending products', 'Track my order', 'Size guide help', 'Payment options']
        };

      case 'product_search':
        const searchTerms = input.match(/(?:find|search|looking for|want|need)\s+(.+)/i)?.[1] || '';
        const matchingProducts = allProducts.filter(p => 
          p.name.toLowerCase().includes(searchTerms.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerms.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerms.toLowerCase())
        ).slice(0, 3);
        
        if (matchingProducts.length > 0) {
          return {
            ...baseResponse,
            text: `I found ${matchingProducts.length} products matching "${searchTerms}". Here are the top results:`,
            type: 'product',
            data: matchingProducts,
            suggestions: ['Show more results', 'Filter by price', 'Check availability']
          };
        }
        return {
          ...baseResponse,
          text: `I couldn't find exact matches for "${searchTerms}", but I can show you our popular items in similar categories. Would you like me to suggest alternatives?`,
          suggestions: ['Show popular items', 'Browse categories', 'Refine search']
        };

      case 'order_tracking':
        const orderNumber = input.match(/#([A-Z0-9]+)/i)?.[1];
        if (orderNumber) {
          return {
            ...baseResponse,
            text: `📦 Order #${orderNumber} Status:\n\n✅ Order Confirmed - Jan 15, 2024\n🏭 Processing - Jan 16, 2024\n📦 Shipped - Jan 17, 2024\n🚚 Out for Delivery - Expected Jan 19, 2024\n\nTracking: TRK${orderNumber}123`,
            type: 'action',
            suggestions: ['Track another order', 'Contact support', 'View order details']
          };
        }
        return {
          ...baseResponse,
          text: 'I can help you track your order! Please provide your order number (format: #ABC123) or email address used for the purchase.',
          suggestions: ['I have order number', 'Use email instead', 'Recent orders']
        };

      case 'recommendation':
        const trendingProducts = allProducts.filter(p => p.isSale || p.isNew).slice(0, 4);
        return {
          ...baseResponse,
          text: `Based on current trends and customer favorites, here are my top recommendations for you:`,
          type: 'product',
          data: trendingProducts,
          suggestions: ['More recommendations', 'Filter by category', 'Price range']
        };

      case 'size_help':
        return {
          ...baseResponse,
          text: `👕 Size Guide Assistant:\n\n• **Clothing**: Check our detailed size charts\n• **Shoes**: We recommend going up 0.5 size\n• **Accessories**: One size fits most\n\nNeed help with a specific item? Share the product name!`,
          suggestions: ['View size chart', 'Fit recommendations', 'Exchange policy']
        };

      case 'payment':
        return {
          ...baseResponse,
          text: `💳 **Secure Payment Options:**\n\n✅ Credit/Debit Cards (Visa, Mastercard, Amex)\n✅ PayPal & Apple Pay\n✅ Buy Now, Pay Later (Klarna)\n✅ Cryptocurrency (Bitcoin, Ethereum)\n\n🔒 256-bit SSL encryption ensures your data is safe!`,
          suggestions: ['Payment security', 'Installment options', 'Currency support']
        };

      case 'shipping':
        return {
          ...baseResponse,
          text: `🚚 **Shipping Information:**\n\n🆓 **Free Standard** (3-5 days) - Orders $75+\n⚡ **Express** (1-2 days) - $9.99\n🌍 **International** (7-14 days) - Varies\n📦 **Same Day** (Select cities) - $19.99\n\nYour location: Estimated delivery in 2-3 days!`,
          suggestions: ['Track shipment', 'Delivery options', 'International rates']
        };

      case 'return_refund':
        return {
          ...baseResponse,
          text: `🔄 **Easy Returns & Refunds:**\n\n✅ 30-day return window\n✅ Free return shipping\n✅ Full refund or exchange\n✅ No questions asked policy\n\nWant to start a return? I can help you with that!`,
          suggestions: ['Start return', 'Return status', 'Exchange item']
        };

      case 'complaint':
        return {
          ...baseResponse,
          text: `I'm sorry to hear you're experiencing an issue! 😔 I'm here to help resolve this quickly. Can you please describe the problem in detail? I'll escalate this to our priority support team.`,
          suggestions: ['Describe issue', 'Request refund', 'Speak to manager']
        };

      default:
        // Context-aware general response
        const cartInfo = cartState.itemCount > 0 ? `\n\n🛒 I see you have ${cartState.itemCount} items in your cart. Need help with checkout?` : '';
        const wishlistInfo = wishlistState.itemCount > 0 ? `\n❤️ You have ${wishlistState.itemCount} items in your wishlist.` : '';
        
        return {
          ...baseResponse,
          text: `I'm here to help! I can assist with:\n\n🔍 Product search & recommendations\n📦 Order tracking & status\n💳 Payment & checkout help\n🚚 Shipping information\n🔄 Returns & exchanges\n📏 Size guides & fit help${cartInfo}${wishlistInfo}`,
          suggestions: ['Find products', 'Track order', 'Size help', 'Payment info']
        };
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setTimeout(() => handleSend(), 100);
  };

  const openChat = () => {
    setIsOpen(true);
    setShowWelcome(false);
    
    if (messages.length === 0) {
      const hour = new Date().getHours();
      const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
      
      const welcomeMessage: Message = {
        id: 'welcome',
        text: `${greeting}! 👋 I'm GloBot, your AI-powered shopping assistant. I use advanced algorithms to provide personalized recommendations and instant support.`,
        isBot: true,
        timestamp: new Date(),
        type: 'text',
        suggestions: ['Show trending products', 'Help me find something', 'Track my order', 'Size guide']
      };
      setMessages([welcomeMessage]);
    }
  };

  return (
    <>
      {/* Welcome popup */}
      {showWelcome && !isOpen && (
        <div className="fixed bottom-24 right-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-xs z-40 animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-sm">GloBot</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowWelcome(false)}
              className="h-6 w-6 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            Hi 👋 Need help finding the perfect item?
          </p>
          <Button size="sm" onClick={openChat} className="w-full">
            Chat with me
          </Button>
        </div>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-[500px] bg-white dark:bg-gray-900 rounded-lg shadow-2xl z-50 flex flex-col animate-scale-in">
          <CardHeader className="pb-3 bg-gradient-to-r from-primary to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-2">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span>GloBot</span>
                    <Badge variant="secondary" className="text-xs bg-white/20 text-white border-white/30">
                      AI Powered
                    </Badge>
                  </div>
                  <div className="text-xs opacity-80 font-normal">Online • Instant responses</div>
                </div>
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0 text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[320px]">
              {messages.map((message) => (
                <div key={message.id}>
                  <div className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} mb-2`}>
                    <div className={`flex items-start space-x-2 max-w-[85%] ${
                      message.isBot ? 'flex-row' : 'flex-row-reverse space-x-reverse'
                    }`}>
                      {message.isBot && (
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="w-3 h-3 text-white" />
                        </div>
                      )}
                      {!message.isBot && (
                        <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-3 h-3 text-white" />
                        </div>
                      )}
                      <div className={`p-3 rounded-lg ${
                        message.isBot
                          ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                          : 'bg-primary text-white'
                      }`}>
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                        
                        {/* Product Cards */}
                        {message.type === 'product' && message.data && Array.isArray(message.data) && (
                          <div className="mt-3 space-y-2 max-w-full">
                            {message.data.slice(0, 3).map((product: any) => (
                              <div key={product.id} className="bg-white dark:bg-gray-700 p-2 rounded-lg border text-left">
                                <div className="flex items-start space-x-2">
                                  <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="w-10 h-10 object-cover rounded flex-shrink-0" 
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = '/placeholder.svg';
                                    }}
                                  />
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-xs text-gray-900 dark:text-gray-100 truncate">{product.name}</h4>
                                    <div className="flex items-center space-x-1 mt-1">
                                      <span className="text-primary font-bold text-sm">${product.price}</span>
                                      {product.originalPrice && (
                                        <span className="text-xs text-gray-500 line-through">${product.originalPrice}</span>
                                      )}
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                      <span className="text-xs text-gray-600">{product.rating}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Quick Reply Suggestions */}
                  {message.suggestions && message.suggestions.length > 0 && message.isBot && (
                    <div className="flex flex-wrap gap-1 ml-8 mb-2">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs h-6 px-2 py-1"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input */}
            <div className="p-4 border-t bg-white dark:bg-gray-900">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button onClick={handleSend} size="sm" disabled={isTyping || !inputValue.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
      )}

      {/* Floating chat button */}
      {!isOpen && (
        <Button
          onClick={openChat}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg z-40"
          size="sm"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </>
  );
};

export default Chatbot;
