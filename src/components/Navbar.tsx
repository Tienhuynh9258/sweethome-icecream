import { IceCreamCone, Search, X } from "lucide-react";
import { Button } from "./ui/button";
import UserMenu from "./UserMenu";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Link, useLocation } from "react-router-dom";
import CartDialog from "./CartDialog";
import { Input } from "./ui/input";
import { useSearch } from "./FeaturedFlavors";

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  const { searchQuery, setSearchQuery } = useSearch();

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled automatically through context
  };

  // Reset search when leaving menu page
  useEffect(() => {
    if (location.pathname !== '/menu') {
      setSearchQuery("");
    }
  }, [location.pathname, setSearchQuery]);

  return (
    <nav className="bg-white border-b border-orange-100 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <IceCreamCone className="h-8 w-8 text-orange-500" />
            <span className="text-2xl font-bold text-orange-gradient">Sweethome</span>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link to="/">
              <Button 
                variant="ghost" 
                className={`text-gray-700 hover:text-orange-500 hover:bg-orange-50 ${
                  location.pathname === "/" ? "bg-orange-50 text-orange-500" : ""
                }`}
              >
                Trang chủ
              </Button>
            </Link>
            <Link to="/menu">
              <Button 
                variant="ghost" 
                className={`text-gray-700 hover:text-orange-500 hover:bg-orange-50 ${
                  location.pathname === "/menu" ? "bg-orange-50 text-orange-500" : ""
                }`}
              >
                Thực đơn
              </Button>
            </Link>
            <Link to="/about">
              <Button 
                variant="ghost" 
                className={`text-gray-700 hover:text-orange-500 hover:bg-orange-50 ${
                  location.pathname === "/about" ? "bg-orange-50 text-orange-500" : ""
                }`}
              >
                Về chúng tôi
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                variant="ghost" 
                className={`text-gray-700 hover:text-orange-500 hover:bg-orange-50 ${
                  location.pathname === "/contact" ? "bg-orange-50 text-orange-500" : ""
                }`}
              >
                Liên hệ
              </Button>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            {location.pathname === "/menu" && (
              <div className="relative">
                {showSearch ? (
                  <form onSubmit={handleSearch} className="flex items-center">
                    <Input
                      type="text"
                      placeholder="Tìm kiếm kem..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-[200px] h-9 mr-2"
                      autoFocus
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setShowSearch(false);
                        setSearchQuery("");
                      }}
                      className="h-9 w-9 hover:bg-orange-500 hover:text-white transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </form>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowSearch(true)}
                    className="h-9 w-9 hover:bg-orange-500 hover:text-white transition-colors"
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                )}
              </div>
            )}
            <CartDialog />
            <UserMenu user={user} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
