import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, ShoppingBag, Tag, CreditCard, Heart } from "lucide-react";

const SignUpModal = ({ onClose, onSwitchForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [step, setStep] = useState(1);
  const [selectedPreference, setSelectedPreference] = useState(null);
  const [currentBackground, setCurrentBackground] = useState(0);

  // Background images - in a real app these would be actual URLs
  // Using placeholder API for this example
  const backgrounds = [
    "https://images.pexels.com/photos/19458561/pexels-photo-19458561/free-photo-of-beautiful-woman-with-shopping-bags.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://www.shutterstock.com/image-photo/fashion-business-cheerful-lady-clothing-260nw-2314251109.jpg",
    "https://images.pexels.com/photos/5264895/pexels-photo-5264895.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/8939788/pexels-photo-8939788.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  ];

  // Categories with product focus
  const preferences = [
    { id: 1, name: "Fashion", icon: <Tag size={20} /> },
    { id: 2, name: "Electronics", icon: <CreditCard size={20} /> },
    { id: 3, name: "Home", icon: <ShoppingBag size={20} /> },
    { id: 4, name: "Beauty", icon: <Heart size={20} /> }
  ];

  // Cycle through background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleComplete = (e) => {
    e.preventDefault();
    // Submit logic would go here
    onClose();
  };

  return (
    <AnimatePresence>
      <Dialog
        open={true}
        onClose={onClose}
        className="relative z-50"
        static
      >
        {/* Backdrop with enhanced blur and dynamic background */}
        <div className="fixed inset-0 overflow-hidden">
          {/* Dynamic background images with crossfade transition */}
          {backgrounds.map((bg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: currentBackground === index ? 1 : 0,
                scale: currentBackground === index ? 1.05 : 1
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <img 
                src={bg} 
                alt="Background" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
          
          {/* Overlay with backdrop blur */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
          />
        </div>

        {/* Modal container with enhanced glassmorphism */}
        <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="w-full max-w-md"
          >
            <Dialog.Panel className="relative overflow-hidden rounded-3xl shadow-2xl">
              {/* Glassmorphism effect container */}
              <div className="absolute inset-0 backdrop-blur-xl bg-white/20"></div>
              
              {/* Extra glass effect elements */}
              <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
              
              {/* Form content */}
              <div className="relative">
                {/* Frosted border effect */}
                <div className="absolute inset-0 border border-white/30 rounded-3xl pointer-events-none"></div>
                
                {/* Progress indicator */}
                <div className="w-full h-1 bg-white/20">
                  <motion.div 
                    initial={{ width: "50%" }}
                    animate={{ width: step === 1 ? "50%" : "100%" }}
                    className="h-full bg"
                  />
                </div>
                
                {/* Header */}
                <div className="p-6 relative">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <motion.div
                        initial={{ rotate: -20, scale: 0.8 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                        className="bg-[#071428] backdrop-blur-sm p-2 rounded-xl"
                      >
                        <ShoppingBag size={24} className="text-white " />
                      </motion.div>
                      <Dialog.Title className="text-xl font-bold text-white">
                        {step === 1 ? "Create Your Account" : "Your Style Profile"}
                      </Dialog.Title>
                    </div>
                    <motion.button
                      whileHover={{ rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={onClose}
                      className="text-white rounded-full p-1 hover:bg-white/20"
                    >
                      <X size={20} />
                    </motion.button>
                  </div>
                  <p className="text-white/90 text-sm mt-3 max-w-xs">
                    {step === 1 
                      ? "Create your account to unlock personalized shopping experiences." 
                      : "Tell us what you love, and we'll customize your shopping journey."}
                  </p>
                </div>
                
                {/* Multi-step form */}
                <div className="p-6 pt-4">
                  {step === 1 ? (
                    <motion.form 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                      onSubmit={handleNext}
                    >
                      {/* Input fields with glass effect */}
                      <motion.div 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="relative"
                      >
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <User size={16} className="text-white/80" />
                        </div>
                        <input 
                          type="text" 
                          placeholder="Full Name" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full pl-11 pr-4 py-3.5 border border-white/30 bg-[#1e2939] backdrop-blur-md rounded-xl focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all outline-none text-white placeholder-white/60"
                        />
                      </motion.div>

                      <motion.div 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative"
                      >
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail size={16} className="text-white/80" />
                        </div>
                        <input 
                          type="email" 
                          placeholder="Email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full pl-11 pr-4 py-3.5 border border-white/30 bg-white/10 backdrop-blur-md rounded-xl focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all outline-none text-white placeholder-white/60"
                        />
                      </motion.div>

                      <motion.div 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="relative"
                      >
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Lock size={16} className="text-white/80" />
                        </div>
                        <input 
                          type="password" 
                          placeholder="Password" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="w-full pl-11 pr-4 py-3.5 border border-white/30 bg-white/10 backdrop-blur-md rounded-xl focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all outline-none text-white placeholder-white/60"
                        />
                      </motion.div>

                      {/* Continue button with animation */}
                      <motion.button
                        whileHover={{ scale: 1.03, boxShadow: "0 10px 30px rgba(249, 168, 212, 0.4)" }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full py-3.5 mt-6 rounded-xl bg-[#071428] text-white font-medium shadow-lg"
                        type="submit"
                      >
                        Continue
                      </motion.button>
                      
                      {/* Social signup options */}
                      <div className="mt-6">
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/20"></div>
                          </div>
                          <div className="relative flex justify-center text-sm">
                            <span className="px-2 backdrop-blur-sm bg-white/10 text-white/80 rounded-full px-4">
                              Quick signup
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-4 grid grid-cols-3 gap-3">
                          <motion.button
                            whileHover={{ y: -3, backgroundColor: "rgba(255,255,255,0.2)" }}
                            whileTap={{ scale: 0.95 }}
                            type="button"
                            className="py-2.5 px-4 border border-white/30 rounded-xl text-white bg-white/10 backdrop-blur-sm hover:shadow-md text-sm font-medium flex items-center justify-center gap-2"
                          >
                            Google
                          </motion.button>
                          <motion.button
                            whileHover={{ y: -3, backgroundColor: "rgba(255,255,255,0.2)" }}
                            whileTap={{ scale: 0.95 }}
                            type="button"
                            className="py-2.5 px-4 border border-white/30 rounded-xl text-white bg-white/10 backdrop-blur-sm hover:shadow-md text-sm font-medium flex items-center justify-center gap-2"
                          >
                            Apple
                          </motion.button>
                          <motion.button
                            whileHover={{ y: -3, backgroundColor: "rgba(255,255,255,0.2)" }}
                            whileTap={{ scale: 0.95 }}
                            type="button"
                            className="py-2.5 px-4 border border-white/30 rounded-xl text-white bg-white/10 backdrop-blur-sm hover:shadow-md text-sm font-medium flex items-center justify-center gap-2"
                          >
                            Facebook
                          </motion.button>
                        </div>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.form
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-4"
                      onSubmit={handleComplete}
                    >
                      {/* Shopping preferences selection */}
                      <div className="space-y-3">
                        <p className="text-white/90 font-medium">Select your shopping interests:</p>
                        <div className="grid grid-cols-2 gap-3">
                          {preferences.map((pref) => (
                            <motion.div
                              key={pref.id}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setSelectedPreference(pref.id)}
                              className={`cursor-pointer p-4 rounded-xl border ${
                                selectedPreference === pref.id 
                                  ? "border-white bg-white/30 ring-2 ring-white/70" 
                                  : "border-white/30 bg-white/10"
                              } backdrop-blur-md flex flex-col items-center justify-center gap-2 transition-all`}
                            >
                              <div className={`p-2 rounded-lg ${
                                selectedPreference === pref.id ? "text-white" : "text-white/70"
                              }`}>
                                {pref.icon}
                              </div>
                              <span className={`text-sm font-medium ${
                                selectedPreference === pref.id ? "text-white" : "text-white/80"
                              }`}>
                                {pref.name}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                        
                        {/* Newsletter opt-in with modern toggle */}
                        <div className="mt-6 flex items-center justify-between p-4 border border-white/30 rounded-xl bg-white/10 backdrop-blur-md">
                          <div>
                            <p className="text-sm font-medium text-white">Get exclusive deals</p>
                            <p className="text-xs text-white/70">We'll send you personalized offers</p>
                          </div>
                          <div className="relative">
                            <input type="checkbox" id="newsletter" className="sr-only" />
                            <label 
                              htmlFor="newsletter"
                              className="block w-12 h-6 rounded-full bg-white/20 cursor-pointer overflow-hidden"
                            >
                              <motion.span 
                                initial={false}
                                animate={{ x: 0 }}
                                whileTap={{ x: "24px" }}
                                className="block w-6 h-6 rounded-full bg-white shadow transform transition-transform"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                        
                      {/* Action buttons */}
                      <div className="flex gap-3 mt-6">
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          type="button"
                          onClick={handleBack}
                          className="flex-1 py-3.5 rounded-xl border border-white/30 bg-white/10 backdrop-blur-md text-white font-medium"
                        >
                          Back
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.03, boxShadow: "0 10px 30px rgba(249, 168, 212, 0.4)" }}
                          whileTap={{ scale: 0.97 }}
                          className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-rose-400 to-fuchsia-500 text-white font-medium shadow-lg"
                          type="submit"
                        >
                          Complete
                        </motion.button>
                      </div>
                    </motion.form>
                  )}
                  
                  <p className="mt-6 text-center text-sm text-white/80">
                    Already have an account?{' '}
                    <a href="#" className="font-medium text-white hover:text-white/90 underline" onClick={onSwitchForm}>
                      Sign In
                    </a>
                  </p>
                </div>
              </div>
            </Dialog.Panel>
          </motion.div>
        </div>
      </Dialog>
    </AnimatePresence>
  );
};

export default SignUpModal;