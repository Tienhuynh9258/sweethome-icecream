import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const HowItsMade = () => {
  const { t } = useTranslation();
  const stats = [
    {
      number: '721',
      icon: '🥛',
      description: t('howItsMade.stats.milk')
    },
    {
      number: '16kg',
      icon: '🍦',
      description: t('howItsMade.stats.production')
    },
    {
      number: '84',
      icon: '❤️',
      description: t('howItsMade.stats.experience')
    }
  ];

  return (
    <section id="how-its-made" className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-orange-400 mb-4">{t('howItsMade.title1')}</h2>
          <h3 className="text-5xl font-bold text-orange-600">{t('howItsMade.title2')}</h3>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-[400px] h-[400px] mx-auto">
              <motion.div 
                className="absolute inset-0 bg-pink-100 rounded-full"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              ></motion.div>
              
              <motion.div 
                className="absolute inset-0 rounded-full overflow-hidden"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <img
                  src="/images/cow-milk.png"
                  alt="Fresh milk from happy cow"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            className="md:w-1/2 flex flex-col justify-center"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gray-800 mb-4">{t('howItsMade.description1')}</p>
            <p className="text-gray-700 mb-4">{t('howItsMade.description2')}</p>
            <p className="text-gray-700 mb-6">{t('howItsMade.description3')}</p>
            <motion.button 
              className="text-orange-500 font-semibold flex items-center hover:text-orange-600 transition-colors"
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Read more
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <motion.h3 
                className="text-orange-500 text-5xl font-bold mb-4"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.2 }}
              >
                {stat.number}
              </motion.h3>
              <p className="text-gray-700">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItsMade; 