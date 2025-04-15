import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination, Autoplay, EffectCards } from "swiper/modules";
import { Parallax } from "react-parallax";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight, Truck, RefreshCw, Shield, Star } from 'lucide-react';
import Modal from 'react-modal';
import { FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi';
import PromoSection from '../../components/client/PromoSection';

const Home = () => {

    const products = {
      newArrivals: [
        {
          id: 1,
          name: "Summer Breeze Dress",
          price: 89.99,
          image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000",
          badge: "New"
        },
        {
          id: 2,
          name: "Urban Comfort Tee",
          price: 34.99,
          image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000",
          badge: "New"
        },
        {
          id: 3,
          name: "Classic Denim Jacket",
          price: 129.99,
          image: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000",
          badge: "New"
        },
        {
          id: 4,
          name: "Elegant Evening Gown",
          price: 299.99,
          image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1000",
          badge: "New"
        }
      ],
      bestSellers: [
        {
          id: 5,
          name: "Signature Leather Bag",
          price: 199.99,
          image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000",
          badge: "Best Seller"
        },
        {
          id: 6,
          name: "Classic White Sneakers",
          price: 79.99,
          image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000",
          badge: "Best Seller"
        },
        {
          id: 7,
          name: "Premium Watch Collection",
          price: 499.99,
          image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1000",
          badge: "Best Seller"
        },
        {
          id: 8,
          name: "Designer Sunglasses",
          price: 159.99,
          image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000",
          badge: "Best Seller"
        }
      ],
      onSale: [
        {
          id: 9,
          name: "Casual Linen Shirt",
          originalPrice: 89.99,
          price: 59.99,
          image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000",
          badge: "30% Off"
        },
        {
          id: 10,
          name: "Bohemian Maxi Dress",
          originalPrice: 149.99,
          price: 99.99,
          image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000",
          badge: "33% Off"
        },
        {
          id: 11,
          name: "Vintage Denim Collection",
          originalPrice: 199.99,
          price: 129.99,
          image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1000",
          badge: "35% Off"
        },
        {
          id: 12,
          name: "Summer Sandals",
          originalPrice: 79.99,
          price: 49.99,
          image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000",
          badge: "40% Off"
        }
      ]
    };
  
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000, // Ensure it appears above all other content
            padding: '20px',
            borderRadius: '8px',
            backgroundColor: 'white',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
            width: '80%',
            maxWidth: '600px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            '@media (max-width: 768px)': {
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '90%',
                padding: '10px',
            },
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999, // Ensure the overlay is below the modal
        },
    };
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsModalOpen(true);
        }, 5000); // 5 seconds

        return () => clearTimeout(timer);
    }, []);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const [activeTab, setActiveTab] = useState('newArrivals');

    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };


    const testimonials = [
        {
          name: "Emily Parker",
          role: "Fashion Enthusiast",
          image: "https://i.pravatar.cc/150?img=21",
          text: "The attention to detail in their clothing is remarkable. Every piece I've purchased has exceeded my expectations in terms of quality and style.",
          rating: 5
        },
        {
          name: "Michael Chen",
          role: "Style Blogger",
          image: "https://i.pravatar.cc/150?img=22",
          text: "As someone who's particular about fashion, I'm impressed by their curated collection. The customer service team went above and beyond to help me find the perfect fit.",
          rating: 5
        },
        {
          name: "Sophie Williams",
          role: "Professional Model",
          image: "https://i.pravatar.cc/150?img=23",
          text: "The quality of fabrics and craftsmanship is outstanding. Their commitment to sustainable fashion while maintaining style is truly commendable.",
          rating: 5
        },
        {
          name: "David Thompson",
          role: "Fashion Designer",
          image: "https://i.pravatar.cc/150?img=24",
          text: "The attention to trends while maintaining timeless appeal is impressive. Each piece tells a story of quality and sophistication.",
          rating: 5
        },
        {
          name: "Lisa Anderson",
          role: "Style Influencer",
          image: "https://i.pravatar.cc/150?img=25",
          text: "I'm absolutely in love with the seasonal collections. The mix of classic and contemporary designs is perfectly balanced.",
          rating: 5
        }
      ];
      const extendedTestimonials = [...testimonials, ...testimonials];
    const brands = [
        {
            name: "Nike Air Max",
            logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            price: "$199.99",
            offer: "Free Shipping",
            description: "Classic comfort meets modern design"
        },
        {
            name: "Adidas Ultraboost",
            logo: "https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
            price: "$179.99",
            offer: "20% Off",
            description: "Revolutionary cushioning technology"
        },
        {
            name: "Puma RS-X",
            logo: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
            price: "$129.99",
            offer: "Buy 1 Get 1 50% Off",
            description: "Bold style for the modern athlete"
        },
        {
            name: "Under Armour HOVR",
            logo: "https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2067&q=80",
            price: "$159.99",
            offer: "Limited Time Offer",
            description: "Energy return with every step"
        },
        {
            name: "New Balance 990",
            logo: "https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
            price: "$184.99",
            offer: "Free Socks",
            description: "Premium comfort and durability"
        }
    ];



    
    return (
        <div className="relative">
        <div className="relative z-10">
       
                        <Modal
                            isOpen={isModalOpen}
                            onRequestClose={closeModal}
                            style={customStyles}
                            contentLabel="Get a Quote"
                        >
                            <div className="flex flex-col md:flex-row w-full h-full md:items-center">
                                {/* Image on the left */}
                                <div className="w-full md:w-1/2 h-full">

                                    <img
                                        src="https://images.pexels.com/photos/1457983/pexels-photo-1457983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                        alt="Quote"
                                        className="w-1/2 hidden md:block md:w-full h-full object-cover rounded-l-lg md:rounded-none md:rounded-l-lg"
                                    />
                                </div>
                                {/* Form on the right */}
                                <div className="w-full md:w-1/2 p-6 bg-white rounded-r-lg shadow-lg flex flex-col justify-center">
                                    <h2 className="text-2xl font-bold mb-4 text-center md:text-left">Get a Quote</h2>
                                    <p className="text-gray-600 mb-6 text-center md:text-left">Fill out the form below to get a quote for our services.</p>
                                    <form className="space-y-4">
                                        <div>
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                                Name
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="name"
                                                type="text"
                                                placeholder="Your Name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                                Email
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="email"
                                                type="email"
                                                placeholder="Your Email"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                                                Message
                                            </label>
                                            <textarea
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="message"
                                                placeholder="Your Message"
                                            />
                                        </div>
                                        <button
                                            className="bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:shadow-outline w-full"
                                            type="submit"
                                        >
                                            Submit
                                        </button>
                                    </form>
                                    <button
                                        className="text-indigo-600 hover:text-indigo-800 focus:outline-none focus:underline mt-4 text-center md:text-left"
                                        onClick={closeModal}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </Modal>
                        <Parallax
                            blur={0}
                            bgImage="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                            strength={400}
                            className="min-h-screen"
                        >
                            <div
                                className="min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 md:px-12 gap-8 lg:gap-0"
                                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                            >
                                {/* Brand Slider Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-auto"
                    >
                        <Swiper
                            effect={"cards"}
                            grabCursor={true}
                            modules={[EffectCards, Autoplay]}
                            className="mx-auto"
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            style={{
                                width: '280px',
                                height: '400px'
                            }}
                        >
                            {brands.map((brand, index) => (
                                <SwiperSlide key={index} className="bg-white rounded-xl overflow-hidden shadow-2xl">
                                    <div className="relative h-full flex flex-col">
                                        <div className="h-2/3 overflow-hidden">
                                            <img
                                                src={brand.logo}
                                                alt={brand.name}
                                                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-4 bg-white flex-1">
                                            <h3 className="text-xl font-bold text-gray-800 mb-2">{brand.name}</h3>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-2xl font-bold text-blue-600">{brand.price}</span>
                                                <span className="text-sm font-semibold text-green-500 bg-green-100 px-2 py-1 rounded">
                                                    {brand.offer}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 text-sm">{brand.description}</p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </motion.div>

                    {/* Hero Text Section */}
                    <div className="text-center lg:text-left text-white p-8 lg:max-w-2xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                        >
                            Welcome to Our Store
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-lg md:text-xl mb-8"
                        >
                            Discover our exclusive collection
                        </motion.p>
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="bg-[white] text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all"
                        >
                            Shop Now
                        </motion.button>
                    </div>
                </div>
            </Parallax>
            <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Content Section */}
          <div className="flex-1 space-y-8 animate-slide-left">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-[#886451]" />
              <span className="text-[#886451] font-medium">Premium Collection</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Discover Your Perfect Style This Season
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Explore our curated collection of premium clothing that combines comfort with elegance. 
              From casual essentials to statement pieces, find your perfect match in our latest arrivals.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 hover:transform hover:translate-x-2 transition-transform duration-300">
                <div className="w-12 h-12 rounded-full bg-[#fdbb27] flex items-center justify-center">
                  <span className="text-white font-semibold">✓</span>
                </div>
                <p className="text-gray-700">Sustainable and eco-friendly materials</p>
              </div>
              <div className="flex items-center gap-3 hover:transform hover:translate-x-2 transition-transform duration-300">
                <div className="w-12 h-12 rounded-full bg-[#fdbb27] flex items-center justify-center">
                  <span className="text-white font-semibold">✓</span>
                </div>
                <p className="text-gray-700">Free worldwide shipping on orders over $100</p>
              </div>
            </div>
            
            <button className="inline-flex items-center gap-2 bg-[#886451] text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:transform hover:translate-y-[-2px] hover:shadow-lg">
             Explore More
              <ArrowRight className="w-5 h-5 animate-bounce" />
            </button>
          </div>
          
          {/* Image Section */}
          <div className="flex-1 animate-slide-right">
          <img 
              src="https://images.pexels.com/photos/794062/pexels-photo-794062.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Fashion Collection" 
              className="rounded-2xl shadow-2xl w-full h-[600px] object-cover hover:transform hover:scale-[1.02] transition-transform duration-500 animate-float"
            />
          </div>
        </div>
      </div>
    </div>
    <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
              <Truck className="w-12 h-12 text-[#886451]" />
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your order within 2-4 business days</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
              <RefreshCw className="w-12 h-12 text-[#886451] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day hassle-free returns</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
              <Shield
               className="w-12 h-12 text-[#886451] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Shopping</h3>
              <p className="text-gray-600">100% secure payment processing</p>
            </div>
          </div>
        </div>
      </div>
            {/* Featured Products Section */}
            <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-[#262e37] text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="relative group overflow-hidden rounded-2xl">
              <img 
                src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80"
                alt="Women's Fashion"
                className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Women's Fashion</h3>
                  <button className="text-white underline">Shop Now</button>
                </div>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-2xl">
              <img 
                src="https://images.unsplash.com/photo-1516257984-b1b4d707412e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
                alt="Men's Collection"
                className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Men's Collection</h3>
                  <button className="text-white underline">Shop Now</button>
                </div>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-2xl">
              <img 
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Accessories"
                className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Accessories</h3>
                  <button className="text-white underline">Shop Now</button>
                </div>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-2xl">
              <img 
                src="https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Accessories"
                className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Shoes</h3>
                  <button className="text-white underline">Shop Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Collections</h2>
          <p className="text-lg text-gray-600">Discover our latest arrivals and trending items</p>
        </motion.div>

        <div className="w-full">
          <div className="grid w-full grid-cols-3 rounded-full bg-white shadow-lg mb-12">
            <button
              onClick={() => handleTabClick('newArrivals')}
              className={`py-3 text-center rounded-full ${activeTab === 'newArrivals' ? 'bg-[#262e37] text-white' : ''}`}
            >
              New Arrivals
            </button>
            <button
              onClick={() => handleTabClick('bestSellers')}
              className={`py-3 text-center rounded-full ${activeTab === 'bestSellers' ? 'bg-[#262e37] text-white' : ''}`}
            >
              Best Sellers
            </button>
            <button
              onClick={() => handleTabClick('onSale')}
              className={`py-3 text-center rounded-full ${activeTab === 'onSale' ? 'bg-[#262e37] text-white' : ''}`}
            >
              On Sale
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products[activeTab].map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="group overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-[#262e37] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {product.badge}
                    </div>
                    <div className="absolute top-4 left-4 flex flex-col space-y-2 items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-white text-black p-2 rounded-full hover:bg-gray-200">
                        <FiEye size={24} />
                      </button>
                      <button className="bg-white text-black p-2 rounded-full hover:bg-gray-200">
                        <FiHeart size={24} />
                      </button>
                      <button className="bg-white text-black p-2 rounded-full hover:bg-gray-200">
                        <FiShoppingCart size={24} />
                      </button>
                    </div>
                    <button className="absolute bottom-4 right  -4 bg-[#262e37] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#3a4554] transition-colors opacity-0 group-hover:opacity-100">
                      Add to Cart
                    </button>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {product.originalPrice ? (
                          <>
                            <span className="text-2xl font-bold text-[#262e37]">${product.price}</span>
                            <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                          </>
                        ) : (
                          <span className="text-2xl font-bold text-[#262e37]">${product.price}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
          {/* promoSection */}

          <PromoSection/>
      


            {/* Testimonials Section */}
         {/* Testimonials */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="testimonials-container">
            <div className="testimonials-track">
              {extendedTestimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="w-[400px] flex-shrink-0 p-6 mx-4"
                >
                  <div className="bg-white rounded-xl shadow-lg p-6 h-full transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <div className="relative">
                      <span className="text-5xl text-indigo-200 absolute -top-4 -left-2">"</span>
                      <p className="text-gray-700 mb-6 relative z-10 italic">
                        {testimonial.text}
                      </p>
                      <span className="text-5xl text-indigo-200 absolute bottom-0 right-0">"</span>
                    </div>
                    <div className="flex items-center gap-4 mt-6">
                      <div className="relative w-14 h-14">
                        <div className="absolute inset-0 bg-indigo-600 rounded-full animate-pulse"></div>
                        <img 
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-white relative z-10"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-indigo-600">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    

        </div>
    </div>
    );
};

export default Home;