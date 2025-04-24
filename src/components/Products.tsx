import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Products = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const products = [
    {
      title: t('products.products1'),
      description: t('products.description1'),
      image: "/images/ice-cream-cone.png",
      bgColor: "bg-orange-100",
    },
    {
      title: t('products.products2'),
      description: t('products.description2'),
      image: "/images/ice-cream-bar.png",
      bgColor: "bg-orange-50",
    },
    {
      title: t('products.products3'),
      description: t('products.description3'),
      image: "/images/scoopable-ice-cream.png",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <section id="products" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-orange-400 mb-4">{t('products.title1')}</h2>
          <h3 className="text-5xl font-bold text-orange-600">{t('products.title2')}</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`rounded-3xl ${product.bgColor} p-8 text-center relative overflow-hidden group`}
            >
              <div className="mb-6 relative">
                <motion.img
                  src={product.image}
                  alt={product.title}
                  className="w-48 h-48 object-contain mx-auto transform group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <h3 className="text-2xl font-bold text-orange-600 mb-4">{product.title}</h3>
              <p className="text-gray-600 mb-6">{product.description}</p>
              <Button
                variant="ghost"
                className="rounded-full w-12 h-12 bg-white hover:bg-orange-500 hover:text-white transition-colors duration-300"
                onClick={() => navigate('/menu')} // Redirect to the menu page
              >
                →
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products; 