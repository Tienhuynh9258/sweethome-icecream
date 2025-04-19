
import { IceCreamCone } from "lucide-react";
import { Button } from "./ui/button";
import UserMenu from "./UserMenu";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Link, useLocation } from "react-router-dom";
import CartDialog from "./CartDialog";

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav className="bg-cream shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <IceCreamCone className="h-8 w-8 text-strawberry" />
            <span className="text-2xl font-bold text-chocolate">Sweethome</span>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link to="/">
              <Button 
                variant="ghost" 
                className={`text-chocolate hover:text-strawberry ${
                  location.pathname === "/" ? "bg-vanilla/50" : ""
                }`}
              >
                Trang chủ
              </Button>
            </Link>
            <Link to="/menu">
              <Button 
                variant="ghost" 
                className={`text-chocolate hover:text-strawberry ${
                  location.pathname === "/menu" ? "bg-vanilla/50" : ""
                }`}
              >
                Thực đơn
              </Button>
            </Link>
            <Link to="/about">
              <Button 
                variant="ghost" 
                className={`text-chocolate hover:text-strawberry ${
                  location.pathname === "/about" ? "bg-vanilla/50" : ""
                }`}
              >
                Về chúng tôi
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                variant="ghost" 
                className={`text-chocolate hover:text-strawberry ${
                  location.pathname === "/contact" ? "bg-vanilla/50" : ""
                }`}
              >
                Liên hệ
              </Button>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <CartDialog />
            <UserMenu user={user} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
