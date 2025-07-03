import React, { useState } from 'react';
import { Search, Filter, MapPin, Star, MessageCircle, Phone, Heart } from 'lucide-react';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';

interface Product {
  id: string;
  name: string;
  nameHi: string;
  farmer: {
    name: string;
    location: string;
    rating: number;
    verified: boolean;
    phone: string;
  };
  category: string;
  price: number;
  unit: string;
  image: string;
  distance: string;
}

const BuyerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState<string[]>([]);

  const categories = [
    { id: 'all', name: 'All', nameHi: 'सभी' },
    { id: 'vegetables', name: 'Vegetables', nameHi: 'सब्जियां' },
    { id: 'fruits', name: 'Fruits', nameHi: 'फल' },
    { id: 'grains', name: 'Grains', nameHi: 'अनाज' },
    { id: 'dairy', name: 'Dairy', nameHi: 'डेयरी' },
    { id: 'pulses', name: 'Pulses', nameHi: 'दालें' }
  ];

  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Fresh Tomatoes',
      nameHi: 'ताज़े टमाटर',
      farmer: {
        name: 'राम सिंह',
        location: 'मेरठ, उत्तर प्रदेश',
        rating: 4.8,
        verified: true,
        phone: '+91 98765 43210'
      },
      category: 'vegetables',
      price: 40,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=400',
      distance: '12 km'
    },
    {
      id: '2',
      name: 'Organic Carrots',
      nameHi: 'जैविक गाजर',
      farmer: {
        name: 'सुनीता देवी',
        location: 'गाज़ियाबाद, उत्तर प्रदेश',
        rating: 4.9,
        verified: true,
        phone: '+91 98765 43211'
      },
      category: 'vegetables',
      price: 60,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400',
      distance: '8 km'
    },
    {
      id: '3',
      name: 'Fresh Mangoes',
      nameHi: 'ताज़े आम',
      farmer: {
        name: 'विजय कुमार',
        location: 'लखनऊ, उत्तर प्रदेश',
        rating: 4.7,
        verified: true,
        phone: '+91 98765 43212'
      },
      category: 'fruits',
      price: 120,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/918334/pexels-photo-918334.jpeg?auto=compress&cs=tinysrgb&w=400',
      distance: '25 km'
    },
    {
      id: '4',
      name: 'Basmati Rice',
      nameHi: 'बासमती चावल',
      farmer: {
        name: 'अजय शर्मा',
        location: 'मुजफ्फरनगर, उत्तर प्रदेश',
        rating: 4.6,
        verified: false,
        phone: '+91 98765 43213'
      },
      category: 'grains',
      price: 120,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=400',
      distance: '18 km'
    }
  ]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.nameHi.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleWhatsApp = (phone: string, productName: string) => {
    const message = `Hi! I'm interested in your ${productName}. Can you please share more details?`;
    const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-secondary-600 to-primary-600 rounded-2xl p-8 text-white mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}!</h1>
          <p className="text-secondary-100">Discover fresh produce from local farmers near you</p>
          <div className="flex items-center mt-4 text-secondary-100">
            <MapPin className="h-4 w-4 mr-1" />
            <span>Showing results near {user?.location}</span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for products... (e.g., टमाटर, आम)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            {/* Category Filter */}
            <div className="md:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.nameHi}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
                >
                  <Heart 
                    className={`h-4 w-4 ${
                      favorites.includes(product.id) 
                        ? 'text-red-500 fill-current' 
                        : 'text-gray-600'
                    }`} 
                  />
                </button>
                
                {/* Distance badge */}
                <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                  {product.distance}
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{product.nameHi}</h3>
                  <span className="text-xl font-bold text-primary-600">
                    ₹{product.price}/{product.unit}
                  </span>
                </div>
                
                {/* Farmer Info */}
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
                  <div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-700">{product.farmer.name}</span>
                      {product.farmer.verified && (
                        <div className="ml-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{product.farmer.location}</p>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                    <span className="text-xs font-medium">{product.farmer.rating}</span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleWhatsApp(product.farmer.phone, product.nameHi)}
                    className="flex-1 bg-green-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors flex items-center justify-center space-x-1"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>WhatsApp</span>
                  </button>
                  <button
                    onClick={() => handleCall(product.farmer.phone)}
                    className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex items-center justify-center space-x-1"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Call</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters</p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="fixed bottom-6 right-6 flex flex-col space-y-3">
          <button className="bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-colors">
            <MapPin className="h-6 w-6" />
          </button>
          <button className="bg-secondary-600 text-white p-4 rounded-full shadow-lg hover:bg-secondary-700 transition-colors">
            <Filter className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;