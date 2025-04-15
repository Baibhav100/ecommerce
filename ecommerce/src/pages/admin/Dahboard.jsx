import React, { useState } from 'react';
import { Package, TrendingUp, ChevronDown } from 'lucide-react';
import DashboardLayout from '../../components/admin/DashboardLayout';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 

 } from 'recharts';
 import { motion } from 'framer-motion';
import { 
  BsArrowRightShort,
  BsCalendarEvent,
  BsCheckCircleFill, 
  BsClockFill, 
  BsExclamationTriangleFill, 
  BsSearch
} from 'react-icons/bs';

const StatusBadge = ({ status }) => {
  const statusConfig = {
    'Completed': {
      color: 'bg-green-100 text-green-600',
      icon: <BsCheckCircleFill className="mr-2" />,
    },
    'Pending': {
      color: 'bg-yellow-100 text-yellow-600',
      icon: <BsClockFill className="mr-2" />,
    },
    'Cancelled': {
      color: 'bg-red-100 text-red-600',
      icon: <BsExclamationTriangleFill className="mr-2" />,
    }
  };
  const config = statusConfig[status] || statusConfig['Pending'];
  return (
    <span 
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.color}`}
    >
      {config.icon}
      {status}
    </span>
  );
};

const Dashboard = () => {
  // Add the missing hoveredRow state
  const [hoveredRow, setHoveredRow] = useState(null);

  const orderData = [
    { 
      id: '#123456', 
      customer: 'John Doe', 
      total: 99.99, 
      status: 'Completed',
      date: '2023-04-01' // Added missing date field for each order
    },
    { 
      id: '#123457', 
      customer: 'Jane Smith', 
      total: 149.50, 
      status: 'Pending',
      date: '2023-04-02'
    },
    { 
      id: '#123458', 
      customer: 'Mike Johnson', 
      total: 75.25, 
      status: 'Completed',
      date: '2023-04-03'
    },
    { 
      id: '#123459', 
      customer: 'Emily Brown', 
      total: 199.99, 
      status: 'Cancelled',
      date: '2023-04-04'
    },
    { 
      id: '#123460', 
      customer: 'Alex Wilson', 
      total: 55.75, 
      status: 'Completed',
      date: '2023-04-05'
    }
  ];
  const linedata = [
    { name: 'Week 1', Revenue: 4000, Customers: 2400 },
    { name: 'Week 2', Revenue: 3000, Customers: 1398 },
    { name: 'Week 3', Revenue: 2000, Customers: 9800 },
    { name: 'Week 4', Revenue: 2780, Customers: 3908 },
    { name: 'Week 5', Revenue: 1890, Customers: 4800 },
    { name: 'Week 6', Revenue: 2390, Customers: 3800 },
    { name: 'Week 7', Revenue: 3490, Customers: 4300 },
    { name: 'Week 8', Revenue: 4000, Customers: 2400 },
    { name: 'Week 9', Revenue: 4500, Customers: 2600 },
  ];

  const data = [
    { name: 'Direct Sales', value: 12, color: '#6A5ACD' },
    { name: 'Organic Growth', value: 20, color: '#20B2AA' },
    { name: 'Referral Traffic', value: 67, color: '#4169E1' },
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="12px"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const statsCards = [
    { label: 'Sales', value: 59467, color: 'bg-purple-600', chart: 'purple' },
    { label: 'Revenue', value: 28085, color: 'bg-teal-500', chart: 'teal' },
    { label: 'Purchases', value: 39645, color: 'bg-blue-500', chart: 'blue' },
    { label: 'Downloads', value: 44148, color: 'bg-gray-800', chart: 'gray' },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">30 Day Report</span>
            <button className="bg-white border rounded-lg px-3 py-1 flex items-center shadow-md hover:bg-gray-50">
              Jul 20 2019 <ChevronDown className="ml-2" size={16} />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {statsCards.map((card, index) => (
            <div
              key={index}
              className={`${card.color} text-white rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm opacity-75">{card.label}</span>
                <TrendingUp size={20} />
              </div>
              <h2 className="text-3xl font-bold">{card.value.toLocaleString()}</h2>
            </div>
          ))}
        </div>

        {/* Main Analytics Section */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 flex-2/3">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Revenue for Last 90 Days</h3>
              <div className="flex space-x-2 bg-gray-100 rounded-full p-1">
                <button className="px-3 py-1 text-xs bg-white rounded-full shadow-sm text-gray-700">
                  Yearly
                </button>
                <button className="px-3 py-1 text-xs text-gray-500">Monthly</button>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={linedata} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E0E0E0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    }}
                    labelStyle={{ fontWeight: 'bold' }}
                    formatter={(value, name) => [`$${value}`, name]}
                  />
                  <Legend verticalAlign="top" align="right" iconType="circle" />
                  <Line
                    type="monotone"
                    dataKey="Revenue"
                    stroke="#8884d8"
                    strokeWidth={3}
                    dot={{ strokeWidth: 3, r: 6 }}
                    activeDot={{
                      r: 8,
                      stroke: '#8884d8',
                      strokeWidth: 3,
                      fill: 'white',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Customers"
                    stroke="#20B2AA"
                    strokeWidth={3}
                    dot={{ strokeWidth: 3, r: 6 }}
                    activeDot={{
                      r: 8,
                      stroke: '#20B2AA',
                      strokeWidth: 3,
                      fill: 'white',
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart and Stats */}
          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 flex-1/3">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Online Sales Breakdown</h3>
              <span className="text-sm text-gray-500">Last 30 Days</span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        className="transition-all duration-300 hover:opacity-80"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E0E0E0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    }}
                    itemStyle={{ color: '#333' }}
                    formatter={(value, name) => [`${value}%`, name]}
                  />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    iconType="circle"
                    wrapperStyle={{
                      paddingTop: '10px',
                      color: '#6B7280',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg border border-gray-100 mt-6"
    >
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="bg-blue-500 bg-opacity-10 p-2 rounded-lg mr-3">
            <BsCalendarEvent className="text-blue-600" size={20} />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Recent Orders</h3>
        </div>
        
        <div className="flex items-center space-x-3 mt-2 sm:mt-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders..."
              className="pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <BsSearch className="absolute left-2.5 top-2 text-gray-400" size={14} />
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium flex items-center"
          >
            View All
            <BsArrowRightShort size={20} />
          </motion.button>
        </div>
      </div>
      
      <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left py-3 px-4 text-xs font-medium uppercase tracking-wider text-gray-500">Order ID</th>
              <th className="text-left py-3 px-4 text-xs font-medium uppercase tracking-wider text-gray-500">Customer</th>
              <th className="text-left py-3 px-4 text-xs font-medium uppercase tracking-wider text-gray-500">Date</th>
              <th className="text-left py-3 px-4 text-xs font-medium uppercase tracking-wider text-gray-500">Total</th>
              <th className="text-left py-3 px-4 text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {orderData.map((order, index) => (
              <motion.tr 
                key={order.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                onMouseEnter={() => setHoveredRow(order.id)}
                onMouseLeave={() => setHoveredRow(null)}
                className={`border-b border-gray-100 transition-colors ${hoveredRow === order.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
              >
                <td className="py-3 px-4 font-medium text-blue-600">{order.id}</td>
                <td className="py-3 px-4">{order.customer}</td>
                <td className="py-3 px-4 text-gray-500 text-sm">{order.date}</td>
                <td className="py-3 px-4 font-medium">${order.total.toFixed(2)}</td>
                <td className="py-3 px-4">
                  <StatusBadge status={order.status} />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
        <div>Showing 5 of 25 orders</div>
        <div className="flex space-x-1">
          <button className="px-3 py-1 border rounded bg-gray-50 hover:bg-gray-100">1</button>
          <button className="px-3 py-1 border rounded hover:bg-gray-100">2</button>
          <button className="px-3 py-1 border rounded hover:bg-gray-100">3</button>
          <button className="px-3 py-1 border rounded hover:bg-gray-100">...</button>
          <button className="px-3 py-1 border rounded hover:bg-gray-100">5</button>
        </div>
      </div>
    </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;