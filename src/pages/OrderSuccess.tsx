
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, Package, Truck } from 'lucide-react';

const OrderSuccess = () => {
  const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
            <p className="text-gray-600 text-lg">
              Thank you for your purchase. Your order has been confirmed and will be shipped soon.
            </p>
          </div>

          <Card className="p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <Package className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Order Confirmed</h3>
                <p className="text-sm text-gray-600">Your order is being processed</p>
              </div>
              <div>
                <Truck className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Shipping Soon</h3>
                <p className="text-sm text-gray-600">We'll notify you when shipped</p>
              </div>
              <div>
                <CheckCircle className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Delivered</h3>
                <p className="text-sm text-gray-600">Estimated 3-5 business days</p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Order Details</h3>
              <div className="flex justify-between items-center">
                <span>Order ID:</span>
                <span className="font-mono font-bold">#{orderId}</span>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop">
                <Button size="lg" className="w-full sm:w-auto">
                  Continue Shopping
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Track Your Order
              </Button>
            </div>
            
            <p className="text-sm text-gray-600">
              A confirmation email has been sent to your email address.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderSuccess;
