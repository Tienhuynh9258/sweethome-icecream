
import { IceCreamCone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-cream py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <IceCreamCone className="h-6 w-6 text-strawberry" />
            <span className="text-xl font-bold text-chocolate">Sweethome</span>
          </div>
          <div className="text-center md:text-left">
            <p className="text-chocolate/80">Địa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM</p>
            <p className="text-chocolate/80">Điện thoại: (84) 123-456-789</p>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-chocolate/80">© 2024 Sweethome. Đã đăng ký bản quyền.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
