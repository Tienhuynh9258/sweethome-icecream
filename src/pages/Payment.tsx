import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { Loader2, CreditCard, Truck, ShoppingBag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";

interface ShippingFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  shippingMethod: "standard" | "express";
}

const SHIPPING_FEES = {
  standard: { vnd: 15000, usd: 0.60 },
  express: { vnd: 30000, usd: 1.20 },
};

export default function Payment() {
  const { items, totalPrice: subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<ShippingFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    shippingMethod: "standard",
  });
  const [paymentMethod, setPaymentMethod] = useState<"momo" | "qr">("momo");
  const [isProcessing, setIsProcessing] = useState(false);
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language === 'en';

  const formatPrice = (price: number) => {
    if (isEnglish) {
      return `$${price.toFixed(2)}`;
    }
    return `${price.toLocaleString()}đ`;
  };

  const calculateSubtotal = (currency: 'vnd' | 'usd') => {
    return items.reduce((sum, item) => {
      const price = currency === 'usd' ? item.price_usd : item.price;
      return sum + (price * item.quantity);
    }, 0);
  };

  const shippingFee = {
    vnd: SHIPPING_FEES[formData.shippingMethod].vnd,
    usd: SHIPPING_FEES[formData.shippingMethod].usd
  };

  const calculatedSubtotal = {
    vnd: calculateSubtotal('vnd'),
    usd: calculateSubtotal('usd')
  };

  const total = {
    vnd: calculatedSubtotal.vnd + shippingFee.vnd,
    usd: calculatedSubtotal.usd + shippingFee.usd
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Check if user is authenticated
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      console.log('Auth check:', { user, authError }); // Debug log
      
      if (authError) {
        throw new Error("Authentication error: " + authError.message);
      }
      
      if (!user) {
        toast({
          variant: "destructive",
          title: "Authentication Required",
          description: "Please login to complete your order."
        });
        navigate("/auth");
        return;
      }

      console.log('Creating order with data:', {  // Debug log
        user_id: user.id,
        customer_name: formData.name,
        email: formData.email,
        shipping_method: formData.shippingMethod,
        total: total
      });

      // 1. Create the order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id.toString(),
          customer_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          shipping_method: formData.shippingMethod,
          shipping_fee: shippingFee.vnd,
          shipping_fee_usd: shippingFee.usd,
          subtotal: calculatedSubtotal.vnd,
          subtotal_usd: calculatedSubtotal.usd,
          total: total.vnd,
          total_usd: total.usd,
          payment_method: paymentMethod,
          payment_status: "completed",
          order_status_id: 2 // 2 = processing
        })
        .select()
        .single();

      if (orderError) {
        console.error('Order creation error:', orderError);
        throw new Error(orderError.message || "Failed to create order");
      }

      console.log('Order created successfully:', order); // Debug log

      // 2. Create order items
      const orderItems = items.map(item => ({
        order_id: order.id,
        flavor_id: item.id,
        quantity: item.quantity,
        price: item.price,
        price_usd: item.price_usd,
        total: item.price * item.quantity,
        total_usd: item.price_usd * item.quantity
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) {
        console.error('Error creating order items:', itemsError);
        // Rollback the order
        await supabase.from("orders").delete().eq("id", order.id);
        throw new Error(itemsError.message || "Failed to create order items");
      }

      // Clear cart and navigate to success page
      clearCart();
      navigate("/order-success");
      
    } catch (error: any) {
      console.error('Error processing order:', error);
      toast({
        variant: "destructive",
        title: "Order Processing Error",
        description: error.message || "An error occurred while processing your order. Please try again."
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    navigate("/menu");
    return null;
  }

  const displayPrice = isEnglish ? total.usd : total.vnd;
  const displayShippingFee = isEnglish ? shippingFee.usd : shippingFee.vnd;
  const displaySubtotal = isEnglish ? calculatedSubtotal.usd : calculatedSubtotal.vnd;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingBag className="w-8 h-8 text-orange-500" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
            {t('payment.title')}
          </h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Order Summary */}
          <div className="bg-white rounded-2xl shadow-lg shadow-orange-100/50 p-8 h-fit">
            <div className="flex items-center gap-3 mb-6">
              <ShoppingBag className="w-5 h-5 text-orange-500" />
              <h2 className="text-xl font-semibold text-gray-800">{t('payment.orderSummary')}</h2>
            </div>
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b border-orange-100 pb-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image_url}
                      alt={isEnglish ? item.name_en : item.name}
                      className="w-20 h-20 object-cover rounded-xl shadow-md"
                    />
                    <div>
                      <h3 className="font-medium text-gray-800">{isEnglish ? item.name_en : item.name}</h3>
                      <p className="text-sm text-gray-500">{t('payment.quantity')}: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-medium text-orange-600">
                    {formatPrice((isEnglish ? item.price_usd : item.price) * item.quantity)}
                  </span>
                </div>
              ))}
              
              <div className="space-y-4 pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>{t('payment.subtotal')}</span>
                  <span>{formatPrice(displaySubtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>{t('payment.shippingFee')}</span>
                  <span>{formatPrice(displayShippingFee)}</span>
                </div>
                <div className="flex justify-between text-xl font-semibold pt-4 border-t border-orange-100">
                  <span className="text-gray-800">{t('payment.total')}</span>
                  <span className="text-orange-600">{formatPrice(displayPrice)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Shipping & Payment */}
          <div className="space-y-6">
            {/* Shipping Information */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg shadow-orange-100/50 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Truck className="w-5 h-5 text-orange-500" />
                  <h2 className="text-xl font-semibold text-gray-800">{t('payment.shippingInformation')}</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-700">{t('payment.name')}</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="mt-1.5 border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-gray-700">{t('payment.email')}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="mt-1.5 border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-gray-700">{t('payment.phone')}</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="mt-1.5 border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address" className="text-gray-700">{t('payment.address')}</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      required
                      className="mt-1.5 border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  <div className="pt-2">
                    <Label className="text-gray-700 mb-3 block">{t('payment.shippingMethod')}</Label>
                    <RadioGroup
                      value={formData.shippingMethod}
                      onValueChange={(value: "standard" | "express") =>
                        setFormData({ ...formData, shippingMethod: value })
                      }
                      className="space-y-3"
                    >
                      <div className="flex items-center justify-between border border-orange-200 rounded-xl p-4 transition-colors hover:bg-orange-50/50">
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="standard" id="standard" className="text-orange-500" />
                          <Label htmlFor="standard" className="font-normal cursor-pointer">
                            {t('payment.standardShipping')}
                          </Label>
                        </div>
                        <span className="text-orange-600 font-medium">
                          {formatPrice(SHIPPING_FEES.standard[isEnglish ? 'usd' : 'vnd'])}
                        </span>
                      </div>
                      <div className="flex items-center justify-between border border-orange-200 rounded-xl p-4 transition-colors hover:bg-orange-50/50">
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="express" id="express" className="text-orange-500" />
                          <Label htmlFor="express" className="font-normal cursor-pointer">
                            {t('payment.expressShipping')}
                          </Label>
                        </div>
                        <span className="text-orange-600 font-medium">
                          {formatPrice(SHIPPING_FEES.express[isEnglish ? 'usd' : 'vnd'])}
                        </span>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl shadow-lg shadow-orange-100/50 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="w-5 h-5 text-orange-500" />
                  <h2 className="text-xl font-semibold text-gray-800">{t('payment.paymentMethod')}</h2>
                </div>

                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(value: "momo" | "qr") => setPaymentMethod(value)}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between border border-orange-200 rounded-xl p-4 transition-colors hover:bg-orange-50/50">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="momo" id="momo" className="text-orange-500" />
                      <Label htmlFor="momo" className="font-normal cursor-pointer">
                        {t('payment.momo')}
                      </Label>
                    </div>
                    <img src="https://play-lh.googleusercontent.com/uCtnppeJ9ENYdJaSL5av-ZL1ZM1f3b35u9k8EOEjK3ZdyG509_2osbXGH5qzXVmoFv0" alt="MoMo" className="h-8" />
                  </div>
                  <div className="flex items-center justify-between border border-orange-200 rounded-xl p-4 transition-colors hover:bg-orange-50/50">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="qr" id="qr" className="text-orange-500" />
                      <Label htmlFor="qr" className="font-normal cursor-pointer">
                        {t('payment.qr')}
                      </Label>
                    </div>
                    {paymentMethod === "qr" && (
                      <div className="bg-white p-2 rounded-lg">
                        <QRCode value="your-qr-code-value" size={80} />
                      </div>
                    )}
                  </div>
                </RadioGroup>
              </div>

              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-xl py-6 text-lg font-semibold hover:from-orange-700 hover:to-orange-600 transition-all duration-300 shadow-lg shadow-orange-200/50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    {t('payment.processing')}
                  </>
                ) : (
                  t('payment.confirmOrder')
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 