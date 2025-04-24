import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { User } from "@supabase/supabase-js";

interface CartDialogProps {
  user: User | null;
}

export default function CartDialog({ user }: CartDialogProps) {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleCheckout = () => {
    setIsOpen(false);
    navigate('/payment');
  };

  // Don't render the cart button if user is not logged in
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="relative hover:text-white">
          <ShoppingCart className="h-5 w-5" />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
              {items.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-orange-gradient"> {t('cart.title')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <ShoppingCart className="h-12 w-12 mx-auto mb-3 text-orange-200" />
              <p>{t('cart.empty')}</p>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between space-x-4 bg-orange-50/50 p-3 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="h-16 w-16 rounded-lg object-cover shadow-md"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-orange-600 font-medium">
                        {item.price.toLocaleString()}đ x {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-orange-100 hover:text-orange-600 border-orange-200"
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                    >
                      -
                    </Button>
                    <span className="w-6 text-center font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-orange-100 hover:text-orange-600 border-orange-200"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => removeFromCart(item.id)}
                    >
                      ×
                    </Button>
                  </div>
                </div>
              ))}
              <div className="border-t border-orange-100 pt-4 space-y-4">
                <div className="flex justify-between font-medium text-lg">
                  <span>{t('cart.total')}</span>
                  <span className="text-orange-500">{totalPrice.toLocaleString()}đ</span>
                </div>
                <Button 
                  className="w-full bg-orange-500 hover:bg-orange-600 shadow-lg hover:shadow-xl transition-all duration-200" 
                  onClick={handleCheckout}
                >
                  {t('cart.checkout')}
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
