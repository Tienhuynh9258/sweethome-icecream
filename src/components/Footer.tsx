import { IceCreamCone, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-orange-50 border-t border-orange-100">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col items-center md:items-start space-y-4 mb-8 md:mb-0">
            <div className="flex items-center space-x-2">
              <IceCreamCone className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-bold text-orange-gradient">Sweethome</span>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="text-center md:text-left mb-8 md:mb-0">
            <h3 className="font-semibold text-gray-900 mb-3">Liên hệ</h3>
            <p className="text-gray-600">Địa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM</p>
            <p className="text-gray-600">Điện thoại: (84) 123-456-789</p>
          </div>
          <div className="text-center md:text-right">
            <h3 className="font-semibold text-gray-900 mb-3">Giờ mở cửa</h3>
            <p className="text-gray-600">Thứ 2 - Chủ nhật</p>
            <p className="text-gray-600">9:00 - 22:00</p>
          </div>
        </div>
        <div className="border-t border-orange-100 mt-8 pt-8 text-center">
          <p className="text-gray-500">© 2024 Sweethome. Đã đăng ký bản quyền.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
