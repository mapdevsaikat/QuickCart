'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ShoppingBag, MapPin, CheckCircle2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AddressForm } from '@/components/address-form';
import { useCart } from '@/contexts/cart-context';
import { DeliveryAddress } from '@/lib/types';
import Image from 'next/image';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    getTotalPrice,
    getTotalItems,
    deliveryAddress,
    setDeliveryAddress,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [step, setStep] = useState<'cart' | 'address' | 'confirmation'>('cart');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (getTotalItems() === 0) {
      router.push('/');
    }
  }, [getTotalItems, router]);

  const handleAddressSubmit = (address: DeliveryAddress) => {
    setDeliveryAddress(address);
    setStep('confirmation');
  };

  const handlePlaceOrder = () => {
    // Clear the cart after placing order
    clearCart();
    setDeliveryAddress(null);
    
    // Show success message and navigate to home
    alert('Order placed successfully! 🎉\n\nThank you for shopping with QuickCart.\n\nYour order will be delivered to the address you provided.');
    
    // Navigate to home page
    router.push('/');
  };

  const totalPrice = getTotalPrice();
  const deliveryCharge = totalPrice > 500 ? 0 : 40;
  const grandTotal = totalPrice + deliveryCharge;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <header className="bg-white shadow-sm sticky top-0 z-40 border-b-2 border-orange-200">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                if (step === 'cart') {
                  router.push('/');
                } else if (step === 'address') {
                  setStep('cart');
                } else {
                  setStep('address');
                }
              }}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Checkout</h1>
              <p className="text-xs text-gray-600">
                {step === 'cart' && 'Review your items'}
                {step === 'address' && 'Delivery address'}
                {step === 'confirmation' && 'Confirm order'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 pb-32">
        {step === 'cart' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Your Cart</h2>
              <span className="text-sm text-gray-600">
                {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
              </span>
            </div>

            {cart.map((item) => (
              <Card key={item.product.id} className="p-4">
                <div className="flex gap-3">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      ₹{item.product.price.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 w-7 p-0"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                      >
                        -
                      </Button>
                      <span className="text-sm font-semibold w-6 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 w-7 p-0"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                      >
                        +
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="ml-auto text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      ₹{(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              </Card>
            ))}

            <Card className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-3">Price Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Charges</span>
                  <span className={deliveryCharge === 0 ? 'text-green-600 font-semibold' : 'font-semibold'}>
                    {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                  </span>
                </div>
                {totalPrice < 500 && (
                  <p className="text-xs text-orange-600 bg-orange-50 p-2 rounded">
                    Add ₹{500 - totalPrice} more to get free delivery
                  </p>
                )}
                <div className="border-t pt-2 flex justify-between font-bold text-base">
                  <span>Total Amount</span>
                  <span className="text-green-600">₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </Card>

            <Button
              onClick={() => setStep('address')}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-6 text-lg"
              size="lg"
            >
              Continue to Address
            </Button>
          </div>
        )}

        {step === 'address' && (
          <div className="space-y-4">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                Delivery Address
              </h2>
              <p className="text-sm text-gray-600">
                Enter your delivery address with auto-populated details powered by QuantaRoute MCP Server REST API
              </p>
            </div>

            <AddressForm
              initialLocation={userLocation || undefined}
              onSubmit={handleAddressSubmit}
            />
          </div>
        )}

        {step === 'confirmation' && deliveryAddress && (
          <div className="space-y-4">
            <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200">
              <div className="flex items-start gap-3 mb-4">
                <div className="rounded-full bg-green-100 p-2">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Delivery Address
                  </h3>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p className="font-semibold">{deliveryAddress.fullName}</p>
                    <p>{deliveryAddress.addressLine1}</p>
                    {deliveryAddress.addressLine2 && <p>{deliveryAddress.addressLine2}</p>}
                    {deliveryAddress.landmark && (
                      <p className="text-gray-600">Near: {deliveryAddress.landmark}</p>
                    )}
                    <p>
                      {deliveryAddress.city}, {deliveryAddress.state} - {deliveryAddress.pincode}
                    </p>
                    <p className="text-gray-600">Phone: {deliveryAddress.phone}</p>
                    {deliveryAddress.digipin && (
                      <p className="font-mono text-green-700 bg-green-100 inline-block px-2 py-1 rounded mt-1">
                        DigiPin: {deliveryAddress.digipin}
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setStep('address')}
                >
                  Edit
                </Button>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
              <div className="space-y-3 mb-4">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.product.name} x {item.quantity}
                    </span>
                    <span className="font-semibold">
                      ₹{(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery</span>
                  <span className={deliveryCharge === 0 ? 'text-green-600 font-semibold' : 'font-semibold'}>
                    {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-base pt-2 border-t">
                  <span>Total Amount</span>
                  <span className="text-green-600">₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-blue-50 border-2 border-blue-200">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-gray-900 mb-1">
                    Cash on Delivery Available
                  </p>
                  <p className="text-gray-600">
                    Pay when your order arrives at your doorstep
                  </p>
                </div>
              </div>
            </Card>

            <Button
              onClick={handlePlaceOrder}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-6 text-lg"
              size="lg"
            >
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Place Order - ₹{grandTotal.toLocaleString()}
            </Button>

            <div className="text-center text-sm text-gray-500 pt-4">
              <p>
                By placing this order, you agree to our terms and conditions
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
