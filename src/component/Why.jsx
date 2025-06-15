import React from 'react';
import { motion } from 'framer-motion';

const Why = () => {
  // continuous floating variant
  const float = {
    animate: {
      y: [0, -12, 0], // up‑down
      transition: {
        duration: 2.5,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      },
    },
  };

  const cards = [
    {
      title: 'Top Quality',
      text: 'We only sell high‑quality, tested, and durable products.',
    },
    {
      title: 'Secure Checkout',
      text: 'Your information is 100% safe with our secure system.',
    },
    {
      title: 'Fast Delivery',
      text: 'We deliver your order quickly and with care.',
    },
  ];

  return (
    <section className="bg-amber-100 py-12 px-4">
      <div className="max-w-5xl mx-auto text-center">
        {/* title also gently pulses */}
        <motion.h2
          className="text-3xl font-bold text-amber-700 mb-8"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
        >
           Why Choose Us?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((item, i) => (
            <motion.div
              key={item.title}
              className="p-6 bg-amber-200 rounded-lg shadow-md"
              variants={float}
              animate="animate"
            >
              <h3 className="text-xl font-semibold text-amber-600 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Why;