import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CountdownTimer = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <div className="flex justify-center items-center text-white">
      <div className="flex flex-col items-center mr-4">
        <div className="text-2xl font-bold">{timeLeft.days}</div>
        <div className="text-sm">Days</div>
      </div>
      <div className="flex flex-col items-center mr-4">
        <div className="text-2xl font-bold">{timeLeft.hours}</div>
        <div className="text-sm">Hours</div>
      </div>
      <div className="flex flex-col items-center mr-4">
        <div className="text-2xl font-bold">{timeLeft.minutes}</div>
        <div className="text-sm">Minutes</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-2xl font-bold">{timeLeft.seconds}</div>
        <div className="text-sm">Seconds</div>
      </div>
    </div>
  );
};

const PromoSection = () => {
  const endTime = new Date();
  endTime.setDate(endTime.getDate() + 7); // Set the end time to 7 days from now

  return (
    <section className="relative bg-cover bg-center bg-no-repeat py-24" style={{ backgroundImage: 'url(https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg)' }}>
    <div className="absolute inset-0 bg-black opacity-50 blur-sm"></div>
    <div className="container mx-auto px-4 relative z-10">
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 text-center lg:text-left">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Exclusive Sale on Trendy Clothing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white mb-8"
          >
            Don't miss out on our limited-time offer. Get your favorite clothing items at unbeatable prices!
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white text-[#262e37] px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors"
          >
            Grab Now
          </motion.button>
        </div>
        <div className="lg:w-1/2 mt-8 lg:mt-0">
          <CountdownTimer endTime={endTime} />
        </div>
      </div>
    </div>
  </section>
  );
};

export default PromoSection;