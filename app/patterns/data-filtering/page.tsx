'use client';

import { useState, useMemo } from 'react';

export default function DataFilteringPattern() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');

  // Sample product data
  const products = [
    { id: 1, name: 'Wireless Headphones', category: 'Electronics', brand: 'TechPro', price: 89.99, rating: 4.5, size: 'One Size', inStock: true },
    { id: 2, name: 'Smartphone Case', category: 'Electronics', brand: 'TechPro', price: 24.99, rating: 4.2, size: 'Universal', inStock: true },
    { id: 3, name: 'Running Shoes', category: 'Sports', brand: 'SportFlex', price: 129.99, rating: 4.7, size: '10', inStock: true },
    { id: 4, name: 'Yoga Mat', category: 'Sports', brand: 'SportFlex', price: 39.99, rating: 4.3, size: 'Standard', inStock: false },
    { id: 5, name: 'Coffee Mug', category: 'Home', brand: 'HomeStyle', price: 12.99, rating: 4.1, size: '12oz', inStock: true },
    { id: 6, name: 'Bluetooth Speaker', category: 'Electronics', brand: 'AudioMax', price: 79.99, rating: 4.6, size: 'Portable', inStock: true },
    { id: 7, name: 'Tennis Racket', category: 'Sports', brand: 'SportFlex', price: 89.99, rating: 4.4, size: 'Adult', inStock: true },
    { id: 8, name: 'Desk Lamp', category: 'Home', brand: 'HomeStyle', price: 45.99, rating: 4.0, size: 'Standard', inStock: true },
    { id: 9, name: 'Fitness Tracker', category: 'Electronics', brand: 'TechPro', price: 149.99, rating: 4.8, size: 'One Size', inStock: false },
    { id: 10, name: 'Water Bottle', category: 'Sports', brand: 'SportFlex', price: 19.99, rating: 4.2, size: '32oz', inStock: true },
    { id: 11, name: 'Throw Pillow', category: 'Home', brand: 'HomeStyle', price: 29.99, rating: 4.1, size: '18x18', inStock: true },
    { id: 12, name: 'Wireless Mouse', category: 'Electronics', brand: 'TechPro', price: 34.99, rating: 4.3, size: 'Standard', inStock: true }
  ];

  // Extract unique values for filters
  const categories = [...new Set(products.map(p => p.category))];
  const brands = [...new Set(products.map(p => p.brand))];
  const sizes = [...new Set(products.map(p => p.size))];
  const ratings = [4.0, 4.2, 4.4, 4.6, 4.8];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Search term filter
      const matchesSearch = searchTerm === '' || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.includes(product.category);

      // Brand filter
      const matchesBrand = selectedBrands.length === 0 || 
        selectedBrands.includes(product.brand);

      // Price range filter
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

      // Rating filter
      const matchesRating = selectedRatings.length === 0 || 
        selectedRatings.some(rating => product.rating >= rating);

      // Size filter
      const matchesSize = selectedSizes.length === 0 || 
        selectedSizes.includes(product.size);

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesRating && matchesSize;
    });

    // Sort products
    filtered.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategories, selectedBrands, priceRange, selectedRatings, selectedSizes, sortBy, sortOrder]);

  // Calculate filter counts
  const getFilterCounts = (filterType: string, values: string[]) => {
    return values.map(value => {
      const count = products.filter(product => {
        const matchesOtherFilters = 
          (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
          (selectedBrands.length === 0 || selectedBrands.includes(product.brand)) &&
          (selectedSizes.length === 0 || selectedSizes.includes(product.size)) &&
          product.price >= priceRange[0] && product.price <= priceRange[1] &&
          (selectedRatings.length === 0 || selectedRatings.some(rating => product.rating >= rating)) &&
          (searchTerm === '' || 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchTerm.toLowerCase()));

        switch (filterType) {
          case 'category':
            return matchesOtherFilters && product.category === value;
          case 'brand':
            return matchesOtherFilters && product.brand === value;
          case 'size':
            return matchesOtherFilters && product.size === value;
          default:
            return false;
        }
      }).length;

      return { value, count };
    });
  };

  const handleFilterToggle = (filterType: string, value: string) => {
    switch (filterType) {
      case 'category':
        setSelectedCategories(prev => 
          prev.includes(value) 
            ? prev.filter(cat => cat !== value)
            : [...prev, value]
        );
        break;
      case 'brand':
        setSelectedBrands(prev => 
          prev.includes(value) 
            ? prev.filter(brand => brand !== value)
            : [...prev, value]
        );
        break;
      case 'size':
        setSelectedSizes(prev => 
          prev.includes(value) 
            ? prev.filter(size => size !== value)
            : [...prev, value]
        );
        break;
    }
  };

  const handleRatingToggle = (rating: number) => {
    setSelectedRatings(prev => 
      prev.includes(rating) 
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedSizes([]);
    setSelectedRatings([]);
    setPriceRange([0, 1000]);
    setSearchTerm('');
  };

  const getActiveFiltersCount = () => {
    return selectedCategories.length + selectedBrands.length + selectedSizes.length + selectedRatings.length + (priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0) + (searchTerm ? 1 : 0);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🔍 Advanced Data Filtering Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Comprehensive faceted search and filtering system with dynamic counts, price ranges, and multi-select capabilities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Example */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
              🎯 Interactive Example
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                      Filters
                    </h2>
                    {getActiveFiltersCount() > 0 && (
                      <button
                        onClick={clearAllFilters}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Clear All
                      </button>
                    )}
                  </div>

                  {/* Search */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Search Products
                    </label>
                    <input
                      type="text"
                      placeholder="Search by name or brand..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
                    />
                  </div>

                  {/* Price Range */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Price Range: ${priceRange[0]} - ${priceRange[1]}
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt((e.target as HTMLInputElement).value)])}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>$0</span>
                        <span>$1000</span>
                      </div>
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Categories</h3>
                    <div className="space-y-2">
                      {getFilterCounts('category', categories).map(({ value, count }) => (
                        <label key={value} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(value)}
                            onChange={() => handleFilterToggle('category', value)}
                            className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{value}</span>
                          <span className="text-xs text-gray-500">({count})</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Brands */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Brands</h3>
                    <div className="space-y-2">
                      {getFilterCounts('brand', brands).map(({ value, count }) => (
                        <label key={value} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedBrands.includes(value)}
                            onChange={() => handleFilterToggle('brand', value)}
                            className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{value}</span>
                          <span className="text-xs text-gray-500">({count})</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Ratings */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Minimum Rating</h3>
                    <div className="space-y-2">
                      {ratings.map(rating => (
                        <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedRatings.includes(rating)}
                            onChange={() => handleRatingToggle(rating)}
                            className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {rating}★ & up
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Sizes */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Sizes</h3>
                    <div className="space-y-2">
                      {getFilterCounts('size', sizes).map(({ value, count }) => (
                        <label key={value} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedSizes.includes(value)}
                            onChange={() => handleFilterToggle('size', value)}
                            className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{value}</span>
                          <span className="text-xs text-gray-500">({count})</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className="lg:col-span-3 space-y-6">
                {/* Results Header */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Products ({filteredProducts.length})
                      </h2>
                      {getActiveFiltersCount() > 0 && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {getActiveFiltersCount()} active filter{getActiveFiltersCount() !== 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'rating')}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
                      >
                        <option value="name">Sort by Name</option>
                        <option value="price">Sort by Price</option>
                        <option value="rating">Sort by Rating</option>
                      </select>
                      
                      <button
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Products */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium text-gray-900 dark:text-gray-100">{product.name}</h3>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{product.brand}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">({product.rating})</span>
                        </div>
                        
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                            ${product.price}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            product.inStock 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                          }`}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                          <span>{product.category}</span>
                          <span>{product.size}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* No Results */}
                {filteredProducts.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-4">🔍</div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                      No products found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Try adjusting your filters or search terms
                    </p>
                    <button
                      onClick={clearAllFilters}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              💻 Code Example
            </h2>
            
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
              <button
                onClick={() => setActiveTab('jsx')}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === 'jsx'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                JSX
              </button>
              <button
                onClick={() => setActiveTab('css')}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === 'css'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                CSS
              </button>
            </div>

            {/* Tab Content */}
            <div className="code-block">
              {activeTab === 'jsx' ? (
              <pre className="text-sm leading-relaxed">
{`import { useState, useMemo } from 'react';

export default function DataFiltering() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  const products = [
    { id: 1, name: 'Product 1', category: 'Electronics', brand: 'Brand A', price: 100, rating: 4.5 },
    { id: 2, name: 'Product 2', category: 'Sports', brand: 'Brand B', price: 200, rating: 4.2 },
    // ... more products
  ];

  const categories = [...new Set(products.map(p => p.category))];
  const brands = [...new Set(products.map(p => p.brand))];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = searchTerm === '' || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.includes(product.category);

      const matchesBrand = selectedBrands.length === 0 || 
        selectedBrands.includes(product.brand);

      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

      const matchesRating = selectedRatings.length === 0 || 
        selectedRatings.some(rating => product.rating >= rating);

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesRating;
    });
  }, [searchTerm, selectedCategories, selectedBrands, priceRange, selectedRatings]);

  const getFilterCounts = (filterType, values) => {
    return values.map(value => {
      const count = products.filter(product => {
        const matchesOtherFilters = 
          (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
          (selectedBrands.length === 0 || selectedBrands.includes(product.brand)) &&
          product.price >= priceRange[0] && product.price <= priceRange[1];

        switch (filterType) {
          case 'category':
            return matchesOtherFilters && product.category === value;
          case 'brand':
            return matchesOtherFilters && product.brand === value;
          default:
            return false;
        }
      }).length;

      return { value, count };
    });
  };

  const handleFilterToggle = (filterType, value) => {
    switch (filterType) {
      case 'category':
        setSelectedCategories(prev => 
          prev.includes(value) 
            ? prev.filter(cat => cat !== value)
            : [...prev, value]
        );
        break;
      case 'brand':
        setSelectedBrands(prev => 
          prev.includes(value) 
            ? prev.filter(brand => brand !== value)
            : [...prev, value]
        );
        break;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Filters Sidebar */}
      <div className="lg:col-span-1">
        <div className="space-y-6">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium mb-2">Search</label>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Price: \${priceRange[0]} - \${priceRange[1]}
            </label>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full"
            />
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-medium mb-3">Categories</h3>
            <div className="space-y-2">
              {getFilterCounts('category', categories).map(({ value, count }) => (
                <label key={value} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(value)}
                    onChange={() => handleFilterToggle('category', value)}
                    className="rounded"
                  />
                  <span className="text-sm">{value}</span>
                  <span className="text-xs text-gray-500">({count})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div>
            <h3 className="text-sm font-medium mb-3">Brands</h3>
            <div className="space-y-2">
              {getFilterCounts('brand', brands).map(({ value, count }) => (
                <label key={value} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(value)}
                    onChange={() => handleFilterToggle('brand', value)}
                    className="rounded"
                  />
                  <span className="text-sm">{value}</span>
                  <span className="text-xs text-gray-500">({count})</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="lg:col-span-3">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">
            Products ({filteredProducts.length})
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white border rounded-lg p-4">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.brand}</p>
              <p className="text-lg font-bold">\${product.price}</p>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                    ★
                  </span>
                ))}
                <span className="text-sm text-gray-500 ml-1">({product.rating})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`}
              </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Data Filtering Container */
.data-filtering {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

/* Grid Layout */
.filtering-grid {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 2rem;
}

@media (max-width: 1024px) {
  .filtering-grid {
    grid-template-columns: 1fr;
  }
}

/* Filters Sidebar */
.filters-sidebar {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem;
  height: fit-content;
  position: sticky;
  top: 1rem;
}

.filter-section {
  margin-bottom: 1.5rem;
}

.filter-section:last-child {
  margin-bottom: 0;
}

.filter-title {
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Search Input */
.search-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  background-color: white;
  transition: border-color 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Filter Options */
.filter-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-option:hover {
  background-color: #f9fafb;
  border-color: #d1d5db;
}

.filter-option.selected {
  background-color: #3b82f6;
  border-color: #3b82f6;
  color: white;
}

.filter-option.selected:hover {
  background-color: #2563eb;
}

.filter-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.filter-count {
  background-color: #f3f4f6;
  color: #6b7280;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.filter-option.selected .filter-count {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
}

/* Price Range Slider */
.price-range {
  padding: 0 0.5rem;
}

.range-slider {
  position: relative;
  height: 6px;
  background-color: #e5e7eb;
  border-radius: 3px;
  margin: 1rem 0;
}

.range-fill {
  position: absolute;
  height: 100%;
  background-color: #3b82f6;
  border-radius: 3px;
  pointer-events: none;
}

.range-handle {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  background-color: white;
  border: 2px solid #3b82f6;
  border-radius: 50%;
  cursor: pointer;
  transition: box-shadow 0.2s ease;
}

.range-handle:hover {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.range-handle:active {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.price-inputs {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.price-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  text-align: center;
}

.price-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Sort Controls */
.sort-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
}

.sort-select {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: white;
  font-size: 0.875rem;
}

.sort-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.sort-button {
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: white;
  color: #374151;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.sort-button:hover {
  background-color: #f3f4f6;
  border-color: #9ca3af;
}

.sort-button.active {
  background-color: #3b82f6;
  border-color: #3b82f6;
  color: white;
}

/* Products Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.product-card {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  transition: border-color 0.2s ease;
}

.product-card:hover {
  border-color: #d1d5db;
}

.product-name {
  font-weight: 500;
  color: #111827;
  margin-bottom: 0.25rem;
}

.product-brand {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.product-price {
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.star {
  color: #fbbf24;
}

.star.empty {
  color: #e5e7eb;
}

.rating-text {
  font-size: 0.875rem;
  color: #6b7280;
  margin-left: 0.25rem;
}

/* Results Summary */
.results-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
}

.results-count {
  font-weight: 500;
  color: #374151;
}

.clear-filters {
  color: #6b7280;
  background: none;
  border: none;
  font-size: 0.875rem;
  cursor: pointer;
  transition: color 0.2s ease;
}

.clear-filters:hover {
  color: #374151;
}

/* Responsive Design */
@media (max-width: 768px) {
  .data-filtering {
    padding: 0.5rem;
  }
  
  .filters-sidebar {
    position: static;
    margin-bottom: 1rem;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }
  
  .sort-controls {
    flex-direction: column;
    align-items: stretch;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .filters-sidebar,
  .product-card {
    background-color: #374151;
    border-color: #4b5563;
  }
  
  .filter-title {
    color: #f9fafb;
  }
  
  .search-input,
  .price-input,
  .sort-select,
  .sort-button {
    background-color: #374151;
    border-color: #4b5563;
    color: #f9fafb;
  }
  
  .filter-option {
    background-color: #374151;
    border-color: #4b5563;
    color: #f9fafb;
  }
  
  .filter-option:hover {
    background-color: #4b5563;
  }
  
  .filter-count {
    background-color: #4b5563;
    color: #9ca3af;
  }
  
  .range-slider {
    background-color: #4b5563;
  }
  
  .range-handle {
    background-color: #374151;
    border-color: #60a5fa;
  }
  
  .sort-controls,
  .results-summary {
    background-color: #4b5563;
  }
  
  .product-name,
  .product-price {
    color: #f9fafb;
  }
  
  .product-brand,
  .rating-text {
    color: #9ca3af;
  }
}

/* Accessibility */
.search-input:focus-visible,
.filter-option:focus-visible,
.range-handle:focus-visible,
.price-input:focus-visible,
.sort-select:focus-visible,
.sort-button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .filter-option,
  .product-card,
  .range-handle {
    transition: none;
  }
}`}
              </pre>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold mb-4 text-green-800 dark:text-green-200">
          ✨ Key Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Faceted Search</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Multiple filter categories with dynamic counts</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Price Range Slider</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Interactive price filtering with visual feedback</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Multi-Select Filters</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Combine multiple filter values for precise results</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Real-time Updates</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Filter counts update dynamically as you select options</p>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
        <h3 className="text-lg font-semibold mb-4 text-purple-800 dark:text-purple-200">
          🎯 Common Use Cases
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🛒</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">E-commerce</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Product catalogs with advanced filtering</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📚</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Content Libraries</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Document and media filtering systems</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">👥</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">User Directories</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Employee and contact filtering</p>
          </div>
        </div>
      </div>
    </div>
  );
}