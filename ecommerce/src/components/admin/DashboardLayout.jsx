import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BsFillGridFill, 
  BsPersonFill, 
  BsBoxFill, 
  BsChatSquareFill, 
  BsBarChartFill, 
  BsFillCartFill, 
  BsFillTagFill, 
  BsFillFileTextFill, 
  BsGearFill,
  BsChevronRight,
  BsChevronLeft,
  BsList,
  BsBoxArrowRight
} from 'react-icons/bs';

const DashboardLayout = ({ children }) => {
  const [activeSection, setActiveSection] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();

// logout functionality
const handleSignOut=()=>{
   const confinmLogout=window.confirm("Are you sure you want to logout?");
    if(confinmLogout){
  localStorage.removeItem('isAuthenticated')
  localStorage.removeItem('token')
  localStorage.removeItem('rememberedUser')
}
}

  const handleSectionClick = (section) => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

  const menuItems = [
    { label: 'Dashboard', icon: <BsFillGridFill />, link: '/admin/dashboard' },
    {
      label: 'Products',
      icon: <BsBoxFill />,
      subItems: [
        { label: 'List of Products', link: '/admin/products/list' },
        { label: 'Create Product', link: '/admin/products/create' },
      ],
    },
    {
      label: 'Categories',
      icon: <BsPersonFill />,
      subItems: [
        { label: 'Categories List', link: '/admin/categories/list' },
        { label: 'Edit Categories', link: '/admin/categories/edit' },
        { label: 'Create Category', link: '/admin/categories/create' },
      ],
    },
    {
      label: 'Orders',
      icon: <BsChatSquareFill />,
      subItems: [
        { label: 'Orders List', link: '/admin/orders/list' },
        { label: 'Order Details', link: '/admin/orders/details' },
        { label: 'Order Cart', link: '/admin/orders/cart' },
        { label: 'Checkout', link: '/admin/orders/checkout' },
      ],
    },
    {
      label: 'Purchases',
      icon: <BsFillCartFill />,
      subItems: [
        { label: 'List', link: '/admin/purchases/list' },
        { label: 'Order', link: '/admin/purchases/order' },
        { label: 'Return', link: '/admin/purchases/return' },
      ],
    },
    {
      label: 'Invoices',
      icon: <BsFillFileTextFill />,
      subItems: [
        { label: 'List', link: '/admin/invoices/list' },
        { label: 'Create', link: '/admin/invoices/create' },
      ],
    },
    { label: 'Settings', icon: <BsGearFill />, link: '/admin/settings' },
    { label: 'Profile', icon: <BsPersonFill />, link: '/admin/profile' },
    {
      label: 'Roles',
      icon: <BsPersonFill />,
      subItems: [
        { label: 'List', link: '/admin/roles/list' },
        { label: 'Edit', link: '/admin/roles/edit' },
        { label: 'Create', link: '/admin/roles/create' },
      ],
    },
    {
      label: 'Reports',
      icon: <BsBarChartFill />,
      subItems: [
        { label: 'Sales Report', link: '/admin/reports/sales' },
        { label: 'User Report', link: '/admin/reports/users' },
      ],
    },
    {
      label: 'Coupons',
      icon: <BsFillTagFill />,
      subItems: [
        { label: 'List Coupons', link: '/admin/coupons/list' },
        { label: 'Create Coupon', link: '/admin/coupons/create' },
      ],
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isActiveSection = (item) => {
    if (item.link && isActive(item.link)) return true;
    if (item.subItems) {
      return item.subItems.some(subItem => isActive(subItem.link));
    }
    return false;
  };

  const renderMenuItem = (item, index) => {
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isItemActive = isActiveSection(item);

    // Sidebar collapsed view
    if (isSidebarCollapsed) {
      return (
        <li 
          key={index} 
          className="relative group my-1"
        >
          {hasSubItems ? (
            <div className="cursor-pointer relative">
              <div className={`p-3 rounded-lg flex justify-center transition-all duration-200 ${isItemActive ? 'bg-gray-600 shadow-md' : 'hover:bg-[#415a77]'}`}>
                {React.cloneElement(item.icon, { size: 20 })}
              </div>
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute left-full top-0 z-50 bg-[#1a3a5f] text-white rounded-lg shadow-xl hidden group-hover:block ml-2 overflow-hidden"
                style={{ minWidth: "180px" }}
              >
                <div className="p-2 bg-[#003049] font-medium border-b border-blue-800">{item.label}</div>
                <div className="p-2">
                  {hasSubItems && (
                    <ul className="text-sm">
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex} className={`py-2 px-3 rounded-md my-1 ${isActive(subItem.link) ? 'bg-white' : 'hover:bg-[#415a77]'}`}>
                          <Link to={subItem.link} className="block w-full">{subItem.label}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            </div>
          ) : (
            <Link 
              to={item.link} 
              className={`p-3 rounded-lg flex justify-center transition-all duration-200 ${isActive(item.link) ? 'bg-gray-600 shadow-md' : 'hover:bg-[#415a77]'}`}
              title={item.label}
            >
              {React.cloneElement(item.icon, { size: 20 })}
            </Link>
          )}
        </li>
      );
    }

    // Full sidebar view
    return (
      <li key={index} className="px-2 py-1">
        {hasSubItems ? (
          <>
            <button
              onClick={() => handleSectionClick(item.label)}
              className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-all duration-200 ${isItemActive ? 'bg-blue-600 shadow-md' : 'hover:bg-[#415a77]'}`}
            >
              <div className="flex items-center">
                <span className="text-lg">{item.icon}</span> 
                <span className="ml-3 font-medium">{item.label}</span>
              </div>
              <motion.div
                animate={{ rotate: activeSection === item.label ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <BsChevronRight size={16} />
              </motion.div>
            </button>
            <AnimatePresence>
              {activeSection === item.label && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden ml-5 mt-1 mb-2"
                >
                  {item.subItems.map((subItem, subIndex) => (
                    <li
                      key={subIndex}
                      className={`rounded-md my-1 ${isActive(subItem.link) ? 'bg-blue-700' : 'hover:bg-[#415a77]'}`}
                    >
                      <Link to={subItem.link} className="block px-4 py-2 transition-colors duration-200">
                        {subItem.label}
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </>
        ) : (
          <Link 
            to={item.link} 
            className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${isActive(item.link) ? 'bg-[#1b263b] shadow-md' : 'hover:bg-[#415a77]'}`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="ml-3 font-medium">{item.label}</span>
          </Link>
        )}
      </li>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Hamburger Menu */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={toggleMobileSidebar} 
          className="text-gray-700 hover:text-gray-900 bg-white p-2 rounded-lg shadow-md"
        >
          <BsList size={24} />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-30"
            onClick={toggleMobileSidebar}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-y-0 left-0 bg-[#003049] text-white z-40 w-72 overflow-y-auto shadow-xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-blue-800">
              <div className="flex items-center space-x-3">
                <div className="bg-[#1b263b] p-2 rounded-lg">
                  <BsFillGridFill size={20} />
                </div>
             
              </div>
              <button 
                onClick={toggleMobileSidebar} 
                className="text-white hover:bg-[#415a77] p-2 rounded-lg"
              >
                ✕
              </button>
            </div>
            
            <div className="p-4 border-b border-blue-800">
              <div className="flex items-center space-x-3">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-xs text-gray-400">Administrator</p>
                </div>
              </div>
            </div>
            
            <nav className="p-2">
              <ul className="space-y-1">
                {menuItems.map((item, index) => renderMenuItem(item, index))}
              </ul>
            </nav>
            
            <div className="p-4 mt-4 border-t border-blue-800">
            <button
            className="flex items-center space-x-3 text-gray-300 hover:text-white w-full px-4 py-2 rounded-lg hover:bg-[#415a77] transition-colors"
            onClick={handleSignOut}
        >
            <BsBoxArrowRight size={20} />
            <span>Sign Out</span>
        </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div 
        className={`hidden md:flex bg-[#003049] text-white shadow-xl overflow-y-auto flex-shrink-0 flex-col transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'w-20' : 'w-72'
        }`}
      >
        <div className={`flex items-center h-16 px-4 border-b border-blue-800 ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!isSidebarCollapsed && (
            <div className="flex items-center space-x-3">
       
     
            </div>
          )}
          <button 
            onClick={toggleSidebar} 
            className={`text-white hover:bg-[#415a77] p-2 rounded-lg transition-colors ${isSidebarCollapsed ? '' : 'ml-auto'}`}
          >
            {isSidebarCollapsed ? <BsChevronRight size={16} /> : <BsChevronLeft size={16} />}
          </button>
        </div>
        
        {!isSidebarCollapsed && (
          <div className="p-4 border-b border-blue-800">
            <div className="flex items-center space-x-3">
              <img
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-xs text-gray-400">Administrator</p>
              </div>
            </div>
          </div>
        )}
        
        <nav className={`mt-4 flex-1 ${isSidebarCollapsed ? 'px-2' : 'px-3'}`}>
          <ul className="space-y-1">
            {menuItems.map((item, index) => renderMenuItem(item, index))}
          </ul>
        </nav>
        
        {!isSidebarCollapsed && (
          <div className="p-4 border-t border-blue-800">
             <button
            className="flex items-center space-x-3 text-gray-300 hover:text-white w-full px-4 py-2 rounded-lg hover:bg-[#415a77] transition-colors"
            onClick={handleSignOut}
        >
            <BsBoxArrowRight size={20} />
            <span>Sign Out</span>
        </button>
          </div>
        )}
        
        {isSidebarCollapsed && (
          <div className="py-4 border-t border-blue-800 flex justify-center">
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-6">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;