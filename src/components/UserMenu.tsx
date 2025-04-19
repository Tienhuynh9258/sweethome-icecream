
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";

interface UserMenuProps {
  user: User | null;
}

const UserMenu = ({ user }: UserMenuProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (!user) {
    return (
      <Button 
        variant="ghost" 
        className="text-chocolate hover:text-strawberry"
        onClick={() => navigate("/auth")}
      >
        Login
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-8 w-8">
        <AvatarImage src={user.user_metadata.avatar_url} />
        <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      <Button 
        variant="ghost" 
        className="text-chocolate hover:text-strawberry"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
};

export default UserMenu;
