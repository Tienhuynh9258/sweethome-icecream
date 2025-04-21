import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Liên hệ với chúng tôi
            </h1>
            <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-orange-50 p-8 rounded-2xl shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-8">
                Thông tin liên hệ
              </h2>
              <div className="space-y-6">
                <motion.div 
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm"
                >
                  <div className="p-3 bg-orange-500 rounded-lg">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-gray-700">
                    123 Đường ABC, Quận XYZ, TP.HCM
                  </span>
                </motion.div>
                
                <motion.div 
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm"
                >
                  <div className="p-3 bg-orange-500 rounded-lg">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-gray-700">(84) 123-456-789</span>
                </motion.div>
                
                <motion.div 
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm"
                >
                  <div className="p-3 bg-orange-500 rounded-lg">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-gray-700">info@sweethome.com</span>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-8">
                Gửi tin nhắn
              </h2>
              <form className="space-y-6">
                <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                  <input
                    type="text"
                    placeholder="Họ và tên"
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  />
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  />
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                  <textarea
                    placeholder="Tin nhắn"
                    rows={4}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  ></textarea>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="w-full py-6 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-lg font-semibold transition-all">
                    Gửi tin nhắn
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Contact;
