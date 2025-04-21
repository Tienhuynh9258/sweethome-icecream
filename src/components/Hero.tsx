import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { IceCreamIcon } from "./icons/IceCreamIcon";
import { ToppingsIcon } from "./icons/ToppingsIcon";
import { OrganicBadge } from "./icons/OrganicBadge";
import { NaturalBadge } from "./icons/NaturalBadge";
import { SingleIceCream } from "./icons/SingleIceCream";

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-orange-50 via-white to-orange-100 min-h-screen relative overflow-hidden">
      {/* Background Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
      />

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        {/* Floating Ice Cream Cone 1 */}
        <motion.div
          className="absolute top-20 left-20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <SingleIceCream size={64} className="opacity-60" />
        </motion.div>

        {/* Floating Ice Cream Cone 2 */}
        <motion.div
          className="absolute bottom-32 right-20"
          animate={{
            y: [0, -15, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1,
          }}
        >
          <SingleIceCream size={80} className="opacity-50" />
        </motion.div>

        {/* Sprinkles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${
                ['bg-pink-400', 'bg-yellow-400', 'bg-blue-400', 'bg-green-400'][i % 4]
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </motion.div>
      
      <div className="container mx-auto px-4 relative py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gray-800">ICE CREAM</span><br />
              <span className="text-orange-500">MADE WITH</span><br />
              <span className="text-orange-600">PASSION</span>
            </h1>
            <p className="text-gray-600 text-lg mb-8 max-w-md">
              Discover our artisanal ice cream made with love and the finest natural ingredients.
            </p>
            <div className="flex gap-4">
              <Button 
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg"
                onClick={() => {
                  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Products
              </Button>
              <Button 
                variant="outline" 
                className="border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-6 text-lg"
                onClick={() => {
                  document.getElementById('how-its-made')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                How it's made?
              </Button>
            </div>
            
            {/* Stats with Icons */}
            <div className="mt-12 flex gap-8">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <IceCreamIcon size={24} />
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-orange-500">16</h3>
                  <p className="text-gray-600">Flavors</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <ToppingsIcon size={24} />
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-orange-500">23</h3>
                  <p className="text-gray-600">Toppings</p>
                </div>
              </div>
            </div>

            {/* Quality Badges */}
            <div className="mt-8 flex gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-3 rounded-full shadow-md"
              >
                <OrganicBadge size={48} />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-3 rounded-full shadow-md"
              >
                <NaturalBadge size={48} />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Content - Ice Cream Image */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative"
          >
            {/* Orange Circle Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[300px] h-[300px] bg-orange-100 rounded-full opacity-90" />
            
            <div className="relative w-full max-w-[700px] mx-auto z-10">
              <img
                src="/images/ice-cream-stack.png"
                alt="Delicious Ice Cream Sundae"
                className="w-full h-auto object-contain"
              />
            </div>
            
            {/* Floating Elements around main ice cream */}
            <motion.div
              className="absolute left-0 top-1/4 bg-white rounded-lg p-2 shadow-lg z-20"
              animate={{
                x: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <IceCreamIcon size={32} />
            </motion.div>

            <motion.div
              className="absolute right-0 bottom-1/4 bg-white rounded-full p-4 shadow-lg z-20"
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <p className="text-orange-500 font-bold">SOOOOO<br />TASTY!</p>
            </motion.div>

            <motion.div
              className="absolute right-1/4 top-0 bg-white rounded-lg p-2 shadow-lg z-20"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <span className="text-orange-500 font-bold text-2xl">♥</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
