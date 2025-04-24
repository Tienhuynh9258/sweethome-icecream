import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { ClipboardList, LogOut, User as UserIcon, Lock, Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

interface UserMenuProps {
  user: User | null;
}

const UserMenu = ({ user }: UserMenuProps) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
    localStorage.setItem('language', value);
  };

  if (!user) {
    return (
      <Button 
        variant="ghost" 
        className="text-gray-700 hover:text-orange-500 hover:bg-orange-50 flex items-center gap-2"
        onClick={() => navigate("/auth")}
      >
        <UserIcon className="h-5 w-5" />
        <span>{t('common.login')}</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-orange-100 hover:ring-orange-200 transition-all duration-200">
          <AvatarImage src={user.user_metadata.avatar_url} />
          <AvatarFallback className="bg-orange-100 text-orange-600">{user.email?.[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <div className="px-2 py-1.5 mb-2">
          <p className="text-sm font-medium text-gray-900">{user.email}</p>
          <p className="text-xs text-gray-500">{t('common.loginWith')}</p>
        </div>
        <DropdownMenuItem 
          onClick={() => navigate("/order-history")} 
          className="cursor-pointer hover:bg-orange-50 hover:text-orange-600 rounded-md"
        >
          <ClipboardList className="mr-2 h-4 w-4" />
          {t('common.orderHistory')}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => navigate("/change-password")} 
          className="cursor-pointer hover:bg-orange-50 hover:text-orange-600 rounded-md"
        >
          <Lock className="mr-2 h-4 w-4" />
          {t('common.changePassword')}
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="cursor-pointer hover:bg-orange-50 hover:text-orange-600 rounded-md">
            <Languages className="mr-2 h-4 w-4" />
            {t('common.language')}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={i18n.language} onValueChange={handleLanguageChange}>
              <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="vi">Vietnamese</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator className="my-2 bg-orange-100" />
        <DropdownMenuItem 
          onClick={handleLogout} 
          className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
        >
          <LogOut className="mr-2 h-4 w-4" />
          {t('common.logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
