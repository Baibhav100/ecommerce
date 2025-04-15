import React, { useState } from 'react';
import { Upload, X, Plus, ArrowLeft } from 'lucide-react';
import DashboardLayout from '../../components/admin/DashboardLayout';

const PremiumProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stockQuantity: '',
    tags: ''
  });
  
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages([...images, ...filesArray]);
      
      // Create preview URLs
      const newPreviewImages = filesArray.map(file => URL.createObjectURL(file));
      setPreviewImages([...previewImages, ...newPreviewImages]);
    }
  };
  
  const removeImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    
    const updatedPreviews = [...previewImages];
    URL.revokeObjectURL(updatedPreviews[index]); // Clean up
    updatedPreviews.splice(index, 1);
    setPreviewImages(updatedPreviews);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implementation for form submission
    console.log(formData, images);
    // navigate('/admin/products/list') would go here
  };
  
  const navigate = (path) => {
    console.log(`Navigating to: ${path}`);
    // Actual navigation implementation would go here
  };
  
  return (
    <DashboardLayout>
      <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gray-900 px-6 py-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-white">Create New Product</h1>
            <button 
              type="button" 
              onClick={() => navigate('/admin/products/list')}
              className="flex items-center text-gray-300 hover:text-white transition"
            >
              <ArrowLeft size={16} className="mr-1" />
              <span>Back to Products</span>
            </button>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Product Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Enter product name"
                  />
                </div>
                
                {/* Price */}
                <div className="space-y-2">
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                </div>
                
                {/* Category */}
                <div className="space-y-2">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                  >
                    <option value="">Select a category</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="home">Home</option>
                    <option value="beauty">Beauty & Personal Care</option>
                    <option value="sports">Sports & Outdoors</option>
                    <option value="books">Books & Media</option>
                  </select>
                </div>
                
                {/* Stock Quantity */}
                <div className="space-y-2">
                  <label htmlFor="stockQuantity" className="block text-sm font-medium text-gray-700">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    id="stockQuantity"
                    name="stockQuantity"
                    value={formData.stockQuantity}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Enter quantity"
                    min="0"
                  />
                </div>
                
                {/* Tags */}
                <div className="space-y-2">
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                    Tags
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Enter tags separated by commas"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Separate tags with commas (e.g., new, featured, sale)
                  </p>
                </div>
              </div>
              
              {/* Right Column */}
              <div className="space-y-6">
                {/* Description */}
                <div className="space-y-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
                    placeholder="Describe your product..."
                  ></textarea>
                </div>
                
                {/* Images */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Product Images
                  </label>
                  
                  {/* Image Preview */}
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    {previewImages.map((image, index) => (
                      <div key={index} className="relative h-24 bg-gray-100 rounded-lg overflow-hidden">
                        <img 
                          src={image} 
                          alt={`Preview ${index}`} 
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-red-50 transition"
                        >
                          <X size={14} className="text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  {/* Upload Button */}
                  <label htmlFor="images" className="cursor-pointer block w-full">
                    <div className="flex items-center justify-center px-6 py-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition bg-gray-50">
                      <div className="text-center">
                        <Upload className="mx-auto h-8 w-8 text-gray-400" />
                        <div className="mt-1 flex items-center justify-center text-sm text-gray-600">
                          <span>Drop images here or</span>
                          <span className="ml-1 text-blue-500 font-medium">browse</span>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 5MB each
                        </p>
                      </div>
                    </div>
                    <input
                      type="file"
                      id="images"
                      name="images"
                      onChange={handleImageChange}
                      multiple
                      className="sr-only"
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>
            </div>
            
            {/* Form Actions */}
            <div className="mt-8 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/admin/products/list')}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Create Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
};

export default PremiumProductForm;