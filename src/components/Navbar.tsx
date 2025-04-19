
import { IceCreamCone } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="bg-cream shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <IceCreamCone className="h-8 w-8 text-strawberry" />
            <span className="text-2xl font-bold text-chocolate">Sweethome</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <Button variant="ghost" className="text-chocolate hover:text-strawberry">
              Trang chủ
            </Button>
            <Button variant="ghost" className="text-chocolate hover:text-strawberry">
              Thực đơn
            </Button>
            <Button variant="ghost" className="text-chocolate hover:text-strawberry">
              Về chúng tôi
            </Button>
            <Button variant="ghost" className="text-chocolate hover:text-strawberry">
              Liên hệ
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
