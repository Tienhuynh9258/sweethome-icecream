
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-chocolate text-center mb-12">
            Liên hệ với chúng tôi
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-chocolate mb-6">
                  Thông tin liên hệ
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-strawberry" />
                    <span className="text-chocolate/80">
                      123 Đường ABC, Quận XYZ, TP.HCM
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-strawberry" />
                    <span className="text-chocolate/80">(84) 123-456-789</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-strawberry" />
                    <span className="text-chocolate/80">info@sweethome.com</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-chocolate mb-6">
                  Gửi tin nhắn
                </h2>
                <form className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Họ và tên"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Tin nhắn"
                      rows={4}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <Button className="w-full bg-strawberry hover:bg-strawberry/90">
                    Gửi tin nhắn
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
