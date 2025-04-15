import React, { useState } from 'react';
import DashboardLayout from '../../components/admin/DashboardLayout';

// Loading Spinner Component
const Loader = () => (
  <div className="flex items-center justify-center py-4">
    <div className="relative">
      <div className="w-8 h-8 border-4 border-blue-200 rounded-full"></div>
      <div className="absolute top-0 left-0 w-8 h-8 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
    </div>
    <p className="ml-3 text-gray-600 font-medium">Processing...</p>
  </div>
);

const CreateCategory = () => {
  const [category, setCategory] = useState({
    name: '',
    description: '',
    image: null,
    status: 'active'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  // Reference to the file input element
  const fileInputRef = React.useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategory({ ...category, image: file });
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Function to trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      // Validate inputs
      if (!category.name.trim()) {
        throw new Error('Category name is required');
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Simulate success
      setSuccess('Category created successfully!');
      setCategory({
        name: '',
        description: '',
        image: null,
        status: 'active'
      });
      setImagePreview(null);
      
      // Reset form
      if (e.target) {
        e.target.reset();
      }
    } catch (err) {
      setError(err.message || 'Failed to create category');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Create New Category</h1>
          <p className="text-gray-600">Add a new category to your product catalog</p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
              <p className="font-medium">{success}</p>
            </div>
          )}

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              <p className="font-medium">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column - Basic Info */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={category.name}
                    onChange={handleInputChange}
                    placeholder="Enter category name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows="4"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={category.description}
                    onChange={handleInputChange}
                    placeholder="Enter category description"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={category.status}
                    onChange={handleInputChange}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
              
              {/* Right Column - Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Image
                </label>
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50"
                  onClick={triggerFileInput}
                >
                  {imagePreview ? (
                    <div className="mb-3">
                      <img 
                        src={imagePreview} 
                        alt="Category preview" 
                        className="mx-auto h-40 object-cover rounded"
                      />
                      <button
                        type="button"
                        className="mt-2 text-sm text-red-600 hover:text-red-800"
                        onClick={(e) => {
                          e.stopPropagation();
                          setImagePreview(null);
                          setCategory({ ...category, image: null });
                        }}
                      >
                        Remove image
                      </button>
                    </div>
                  ) : (
                    <div className="py-8">
                      <svg 
                        className="mx-auto h-12 w-12 text-gray-400" 
                        stroke="currentColor" 
                        fill="none" 
                        viewBox="0 0 48 48" 
                        aria-hidden="true"
                      >
                        <path 
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                        />
                      </svg>
                      <p className="mt-2 text-sm text-gray-500">
                        Click to upload a file
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 2MB
                      </p>
                    </div>
                  )}
                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    name="image"
                    className="hidden"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="mt-8 flex items-center justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                onClick={() => {
                  setCategory({
                    name: '',
                    description: '',
                    image: null,
                    status: 'active'
                  });
                  setImagePreview(null);
                }}
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-75"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Create Category'}
              </button>
            </div>
            
            {/* Loading indicator */}
            {isSubmitting && <Loader />}
          </form>
        </div>

        {/* Tips Card */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-blue-800 font-medium mb-2">Tips for creating effective categories:</h3>
          <ul className="text-blue-700 text-sm space-y-1 ml-5 list-disc">
            <li>Use clear, descriptive names that customers will recognize</li>
            <li>Keep category structure simple and intuitive</li>
            <li>Use high-quality images with consistent dimensions (recommended: 800x600px)</li>
            <li>Ensure descriptions are concise yet informative</li>
            <li>Regularly review category performance and adjust as needed</li>
          </ul>
        </div>``
      </div>
    </DashboardLayout>
  );
};

export default CreateCategory;