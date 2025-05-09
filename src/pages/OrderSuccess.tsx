import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function OrderSuccess() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {t('orderSuccess.title')}
        </h1>
        <p className="text-gray-600 mb-6">
          {t('orderSuccess.message')}
        </p>
        <div className="space-y-3">
          <Button asChild className="w-full bg-orange-500 hover:bg-orange-600">
            <Link to="/menu">{t('orderSuccess.continueShopping')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 