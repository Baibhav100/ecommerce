import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, MoreVertical, ChevronDown, ChevronUp, FolderPlus } from 'lucide-react';
import DashboardLayout from '../../components/admin/DashboardLayout';

const CategoriesList = () => {
  // Sample categories data with hierarchy
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Electronics",
      slug: "electronics",
      description: "Electronic devices and accessories",
      productCount: 128,
      isActive: true,
      featured: true,
      image: "/api/placeholder/60/60",
      subcategories: [
        { id: 101, name: "Smartphones", slug: "smartphones", productCount: 45, isActive: true },
        { id: 102, name: "Laptops", slug: "laptops", productCount: 36, isActive: true },
        { id: 103, name: "Audio", slug: "audio", productCount: 24, isActive: true },
        { id: 104, name: "Accessories", slug: "electronics-accessories", productCount: 23, isActive: true }
      ]
    },
    {
      id: 2,
      name: "Clothing",
      slug: "clothing",
      description: "Men's and women's apparel",
      productCount: 256,
      isActive: true,
      featured: true,
      image: "/api/placeholder/60/60",
      subcategories: [
        { id: 201, name: "Men's", slug: "mens", productCount: 120, isActive: true },
        { id: 202, name: "Women's", slug: "womens", productCount: 136, isActive: true }
      ]
    },
    {
      id: 3,
      name: "Home & Kitchen",
      slug: "home-kitchen",
      description: "Furniture, decor, and kitchen supplies",
      productCount: 98,
      isActive: true,
      featured: false,
      image: "/api/placeholder/60/60",
      subcategories: [
        { id: 301, name: "Furniture", slug: "furniture", productCount: 42, isActive: true },
        { id: 302, name: "Kitchen", slug: "kitchen", productCount: 56, isActive: true }
      ]
    },
    {
      id: 4,
      name: "Sports & Outdoors",
      slug: "sports-outdoors",
      description: "Athletic equipment and outdoor gear",
      productCount: 75,
      isActive: true,
      featured: false,
      image: "/api/placeholder/60/60",
      subcategories: []
    },
    {
      id: 5,
      name: "Books & Media",
      slug: "books-media",
      description: "Books, movies, music and games",
      productCount: 182,
      isActive: false,
      featured: false,
      image: "/api/placeholder/60/60",
      subcategories: []
    }
  ]);

  // State for search, expanded categories, and selections
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState([1, 2]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

  // Handle expand/collapse
  const toggleExpand = (categoryId) => {
    if (expandedCategories.includes(categoryId)) {
      setExpandedCategories(expandedCategories.filter(id => id !== categoryId));
    } else {
      setExpandedCategories([...expandedCategories, categoryId]);
    }
  };

  // Handle selection
  const toggleSelection = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  // Select all
  const selectAll = () => {
    const allIds = categories.map(cat => cat.id);
    setSelectedCategories(allIds);
  };

  // Clear selection
  const clearSelection = () => {
    setSelectedCategories([]);
  };

  // Handle sort
  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filter categories
  const filteredCategories = categories
    .filter(category => 
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.subcategories.some(sub => sub.name.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortDirection === 'asc') {
        if (sortField === 'productCount') {
          return a[sortField] - b[sortField];
        }
        return a[sortField] > b[sortField] ? 1 : -1;
      } else {
        if (sortField === 'productCount') {
          return b[sortField] - a[sortField];
        }
        return a[sortField] < b[sortField] ? 1 : -1;
      }
    });

  // Delete category
  const handleDelete = (id) => {
    setCategories(categories.filter(category => category.id !== id));
    setSelectedCategories(selectedCategories.filter(catId => catId !== id));
  };

  // Bulk delete
  const handleBulkDelete = () => {
    setCategories(categories.filter(category => !selectedCategories.includes(category.id)));
    setSelectedCategories([]);
  };

  // Navigation functions (placeholders)
  const handleCreate = () => {
    console.log('Navigate to create category');
    // navigate('/admin/categories/create');
  };

  const handleEdit = (id) => {
    console.log(`Edit category with id: ${id}`);
    // navigate(`/admin/categories/edit/${id}`);
  };

  const handleAddSubcategory = (parentId) => {
    console.log(`Add subcategory to parent id: ${parentId}`);
    // navigate(`/admin/categories/create?parentId=${parentId}`);
  };

  // Toggle category active status
  const toggleActive = (id) => {
    setCategories(categories.map(category => 
      category.id === id 
        ? {...category, isActive: !category.isActive} 
        : category
    ));
  };

  // Toggle category featured status
  const toggleFeatured = (id) => {
    setCategories(categories.map(category => 
      category.id === id 
        ? {...category, featured: !category.featured} 
        : category
    ));
  };

  return (
  <DashboardLayout>
      <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your product categories and subcategories
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button
              onClick={handleCreate}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Plus size={16} className="mr-2" />
              Add Category
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* View Toggle & Actions */}
            <div className="flex items-center space-x-4">
              {/* Toggle view mode */}
              <div className="inline-flex rounded-md shadow-sm">
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1 text-sm rounded-l-md border ${
                    viewMode === 'list'
                      ? 'bg-blue-50 text-blue-700 border-blue-300'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  List
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1 text-sm rounded-r-md border-t border-r border-b ${
                    viewMode === 'grid'
                      ? 'bg-blue-50 text-blue-700 border-blue-300'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Grid
                </button>
              </div>

              {/* Bulk Actions */}
              {selectedCategories.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {selectedCategories.length} selected
                  </span>
                  <button
                    onClick={handleBulkDelete}
                    className="flex items-center px-3 py-1 bg-red-50 text-red-700 rounded-md hover:bg-red-100 transition text-sm"
                  >
                    <Trash2 size={14} className="mr-1" />
                    Delete
                  </button>
                  <button
                    onClick={clearSelection}
                    className="flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition text-sm"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Category List */}
        {viewMode === 'list' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left w-8">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={selectedCategories.length === categories.length}
                        onChange={() => selectedCategories.length === categories.length ? clearSelection() : selectAll()}
                      />
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th 
                      scope="col" 
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('productCount')}
                    >
                      <div className="flex items-center">
                        Products
                        {sortField === 'productCount' ? (
                          sortDirection === 'asc' ? (
                            <ChevronUp size={14} className="ml-1" />
                          ) : (
                            <ChevronDown size={14} className="ml-1" />
                          )
                        ) : null}
                      </div>
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Featured
                    </th>
                    <th scope="col" className="relative px-4 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCategories.map((category) => (
                    <React.Fragment key={category.id}>
                      <tr className={`${selectedCategories.includes(category.id) ? 'bg-blue-50' : 'hover:bg-gray-50'} transition`}>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            checked={selectedCategories.includes(category.id)}
                            onChange={() => toggleSelection(category.id)}
                          />
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center">
                            <button
                              onClick={() => toggleExpand(category.id)}
                              className={`mr-2 ${category.subcategories.length === 0 ? 'invisible' : ''}`}
                            >
                              {expandedCategories.includes(category.id) ? (
                                <ChevronDown size={16} className="text-gray-400" />
                              ) : (
                                <ChevronUp size={16} className="text-gray-400 rotate-180" />
                              )}
                            </button>
                            <div className="h-10 w-10 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                              <img src={category.image} alt={category.name} className="h-full w-full object-cover" />
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">{category.name}</div>
                              <div className="text-xs text-gray-500">{category.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {category.productCount}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <button
                            onClick={() => toggleActive(category.id)}
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                              category.isActive
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {category.isActive ? 'Active' : 'Inactive'}
                          </button>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <button
                            onClick={() => toggleFeatured(category.id)}
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                              category.featured
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {category.featured ? 'Featured' : 'Standard'}
                          </button>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleAddSubcategory(category.id)}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50 transition"
                              title="Add subcategory"
                            >
                              <FolderPlus size={16} />
                            </button>
                            <button
                              onClick={() => handleEdit(category.id)}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50 transition"
                              title="Edit category"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(category.id)}
                              className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition"
                              title="Delete category"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                      {/* Subcategories */}
                      {expandedCategories.includes(category.id) && category.subcategories.map((subcategory) => (
                        <tr key={subcategory.id} className="bg-gray-50 border-t border-gray-100">
                          <td className="px-4 py-3"></td>
                          <td className="px-4 py-3">
                            <div className="flex items-center pl-8">
                              <div className="text-sm text-gray-700">
                                {subcategory.name}
                                <span className="ml-2 text-xs text-gray-500">({subcategory.slug})</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {subcategory.productCount}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                              subcategory.isActive
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {subcategory.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {/* Subcategories aren't featured */}
                            <span className="text-xs text-gray-400">—</span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => handleEdit(subcategory.id)}
                                className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50 transition"
                                title="Edit subcategory"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete(subcategory.id)}
                                className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition"
                                title="Delete subcategory"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredCategories.length === 0 && (
              <div className="text-center py-12">
                <div className="mx-auto h-12 w-12 text-gray-400 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search size={24} />
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No categories found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or create a new category.
                </p>
                <div className="mt-6">
                  <button
                    onClick={handleCreate}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Plus size={16} className="mr-2" />
                    Add Category
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {filteredCategories.map((category) => (
              <div 
                key={category.id} 
                className={`bg-white rounded-xl shadow-sm overflow-hidden border ${
                  selectedCategories.includes(category.id) ? 'border-blue-300 ring-2 ring-blue-200' : 'border-gray-200'
                }`}
              >
                <div className="p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <img 
                        src={category.image} 
                        alt={category.name} 
                        className="h-12 w-12 rounded object-cover"
                      />
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => toggleSelection(category.id)}
                        />
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{category.description}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                        category.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {category.isActive ? 'Active' : 'Inactive'}
                      </span>
                      {category.featured && (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-purple-100 text-purple-800">
                          Featured
                        </span>
                      )}
                    </div>
                    <span className="text-gray-500">{category.productCount} products</span>
                  </div>
                  
                  {category.subcategories.length > 0 && (
                    <div className="mt-3">
                      <button
                        onClick={() => toggleExpand(category.id)}
                        className="text-sm text-blue-600 flex items-center"
                      >
                        {expandedCategories.includes(category.id) ? (
                          <>
                            <ChevronUp size={16} className="mr-1" />
                            Hide subcategories
                          </>
                        ) : (
                          <>
                            <ChevronDown size={16} className="mr-1" />
                            Show {category.subcategories.length} subcategories
                          </>
                        )}
                      </button>
                      
                      {expandedCategories.includes(category.id) && (
                        <div className="mt-2 pl-2 border-l-2 border-gray-100">
                          {category.subcategories.map((subcategory) => (
                            <div key={subcategory.id} className="py-2 flex items-center justify-between">
                              <div className="text-sm text-gray-700">
                                {subcategory.name}
                                <span className="ml-2 text-xs text-gray-500">({subcategory.productCount})</span>
                              </div>
                              <div className="flex space-x-1">
                                <button
                                  onClick={() => handleEdit(subcategory.id)}
                                  className="text-gray-400 hover:text-blue-600 p-1"
                                >
                                  <Edit size={14} />
                                </button>
                                <button
                                  onClick={() => handleDelete(subcategory.id)}
                                  className="text-gray-400 hover:text-red-600 p-1"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between">
                    <button
                      onClick={() => handleAddSubcategory(category.id)}
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      <FolderPlus size={14} className="mr-1" />
                      Add Subcategory
                    </button>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleEdit(category.id)}
                        className="p-1 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="p-1 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Add Category Card */}
            <div className="bg-gray-50 rounded-xl border border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition" onClick={handleCreate}>
              <div className="text-center p-6">
                <div className="mx-auto h-12 w-12 text-gray-400 bg-white rounded-full border border-gray-300 flex items-center justify-center">
                  <Plus size={24} />
                </div>
                <span className="mt-2 block text-sm font-medium text-gray-900">Add Category</span>
              </div>
            </div>
          </div>
        )}

        {/* Stats Summary Card */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Categories Summary</h3>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="bg-gray-50 overflow-hidden rounded-lg px-4 py-5">
                <dt className="text-sm font-medium text-gray-500 truncate">Total Categories</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">{categories.length}</dd>
              </div>
              <div className="bg-gray-50 overflow-hidden rounded-lg px-4 py-5">
                <dt className="text-sm font-medium text-gray-500 truncate">Active Categories</dt>
                <dd className="mt-1 text-3xl font-semibold text-green-600">
                  {categories.filter(cat => cat.isActive).length}
                </dd>
              </div>
              <div className="bg-gray-50 overflow-hidden rounded-lg px-4 py-5">
                <dt className="text-sm font-medium text-gray-500 truncate">Featured Categories</dt>
                <dd className="mt-1 text-3xl font-semibold text-purple-600">
                  {categories.filter(cat => cat.featured).length}
                </dd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
  );
};

export default CategoriesList;