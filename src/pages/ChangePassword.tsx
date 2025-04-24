import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useTranslation } from "react-i18next";
const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long!");
      return;
    }

    setLoading(true);

    try {
      // First verify the current password by trying to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: (await supabase.auth.getUser()).data.user?.email || "",
        password: currentPassword,
      });

      if (signInError) {
        throw new Error("Current password is incorrect");
      }

      // If current password is correct, update to new password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (updateError) throw updateError;

      toast.success("Password updated successfully!");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-md">
        <div className="bg-white rounded-2xl shadow-lg shadow-orange-100/50 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="h-8 w-8 text-orange-500" />
            <h1 className="text-2xl font-bold text-gray-900">
              {t('changePassword.title')}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="currentPassword">{t('changePassword.currentPassword')}</Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="mt-1.5 border-orange-200 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>

            <div>
              <Label htmlFor="newPassword">{t('changePassword.newPassword')}</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="mt-1.5 border-orange-200 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">{t('changePassword.confirmPassword')}</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1.5 border-orange-200 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            >
              {loading ? t('changePassword.updating') : t('changePassword.updatePassword')}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword; 