'use client';

import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart } from '@/contexts/cart-context';
import { useRouter } from 'next/navigation';

export function CartSummary() {
  const { cart, getTotalPrice, getTotalItems } = useCart();
  const router = useRouter();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  if (totalItems === 0) return null;

  return (
    <Card className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-2xl border-t-4 border-orange-500 rounded-t-2xl z-50">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-orange-600" />
            <span className="font-semibold text-gray-900">
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </span>
          </div>
          <div className="text-xl font-bold text-gray-900">
            ₹{totalPrice.toLocaleString()}
          </div>
        </div>

        <Button
          onClick={() => router.push('/checkout')}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-6 text-lg"
          size="lg"
        >
          Proceed to Checkout
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </Card>
  );
}
