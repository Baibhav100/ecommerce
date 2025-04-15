import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/admin/DashboardLayout';

// Loading Spinner Component
const Loader = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
      <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
    </div>
    <p className="mt-4 text-gray-600 font-medium">Loading categories...</p>
  </div>
);

// Skeleton Loader for Categories
const CategorySkeletonLoader = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="bg-gray-50 px-6 py-3">
      <div className="grid grid-cols-4 gap-4">
        <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
      </div>
    </div>
    <div className="divide-y divide-gray-200">
      {[1, 2, 3].map((item) => (
        <div key={item} className="px-6 py-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="h-4 bg-gray-100 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-100 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-100 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-100 rounded w-1/2 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const EditCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [editingCategory, setEditingCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulated data - replace with actual API calls
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setCategories([
        { id: 1, name: 'Electronics', description: 'Electronic devices and accessories' },
        { id: 2, name: 'Clothing', description: 'Fashion items and apparel' },
        { id: 3, name: 'Books', description: 'Books, magazines, and literature' },
      ]);
      setIsLoading(false);
    }, 2000); // Longer timeout to show the loader
  }, []);

  const handleAddCategory = () => {
    if (!newCategory.name) return;
    
    // Add new category with a simulated ID
    const newId = Math.max(0, ...categories.map(c => c.id)) + 1;
    setCategories([...categories, { ...newCategory, id: newId }]);
    setNewCategory({ name: '', description: '' });
  };

  const handleUpdateCategory = () => {
    if (!editingCategory || !editingCategory.name) return;
    
    setCategories(categories.map(category => 
      category.id === editingCategory.id ? editingCategory : category
    ));
    setEditingCategory(null);
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  const startEditing = (category) => {
    setEditingCategory({ ...category });
  };

  const cancelEditing = () => {
    setEditingCategory(null);
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Categories</h1>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            onClick={() => setNewCategory({ name: '', description: '' })}
            disabled={isLoading}
          >
            Add New Category
          </button>
        </div>

        {/* Add New Category Form */}
        {!isLoading && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-lg font-semibold mb-4">Add New Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  placeholder="Enter category name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  placeholder="Enter category description"
                />
              </div>
            </div>
            <div className="mt-4">
              <button 
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                onClick={handleAddCategory}
              >
                Add Category
              </button>
            </div>
          </div>
        )}

        {/* Edit Category Form */}
        {!isLoading && editingCategory && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-lg font-semibold mb-4">Edit Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={editingCategory.description}
                  onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                />
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                onClick={handleUpdateCategory}
              >
                Update Category
              </button>
              <button 
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                onClick={cancelEditing}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <>
            <Loader />
            <CategorySkeletonLoader />
          </>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
            <p className="font-medium">Error loading categories</p>
            <p className="text-sm">{error}</p>
          </div>
        ) : (
          /* Categories List */
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <tr key={category.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{category.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{category.name}</td>
                      <td className="px-6 py-4">{category.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button 
                          className="text-blue-600 hover:text-blue-800 mr-3"
                          onClick={() => startEditing(category)}
                        >
                          Edit
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleDeleteCategory(category.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                      No categories found. Add a new category to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default EditCategories;