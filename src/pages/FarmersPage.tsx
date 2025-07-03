import React, { useState } from 'react';
import { Search, MapPin, Star, MessageCircle, Phone, Shield } from 'lucide-react';
import Header from '../components/Header';
import ramsingh from '../assets/ramsingh.jpeg';
import sunitadevi from '../assets/sunitadevi.jpeg';
import vijaykumar from '../assets/vijaykumar.jpeg';
import ajaysharma from '../assets/ajaysharma.jpeg';
import gopalyadav from '../assets/gopalyadav.jpeg';
import kamladevi from '../assets/kamladevi.jpeg';




interface Farmer {
  id: string;
  name: string;
  location: string;
  rating: number;
  verified: boolean;
  phone: string;
  totalProducts: number;
  speciality: string;
  distance: string;
  image: string;
  joinedYear: number;
  description: string;
}

const FarmersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpeciality, setSelectedSpeciality] = useState('all');
  const [sortBy, setSortBy] = useState('distance');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const specialities = [
    { id: 'all', name: 'All Specialities', nameHi: 'सभी विशेषताएं' },
    { id: 'vegetables', name: 'Vegetables', nameHi: 'सब्जियां' },
    { id: 'fruits', name: 'Fruits', nameHi: 'फल' },
    { id: 'grains', name: 'Grains', nameHi: 'अनाज' },
    { id: 'dairy', name: 'Dairy', nameHi: 'डेयरी' },
    { id: 'organic', name: 'Organic', nameHi: 'जैविक' }
  ];

  const [farmers] = useState<Farmer[]>([
    {
      id: '1',
      name: 'राम सिंह',
      location: 'मेरठ, उत्तर प्रदेश',
      rating: 4.8,
      verified: true,
      phone: '+91 98765 43210',
      totalProducts: 12,
      speciality: 'vegetables',
      distance: '12 km',
      image: ramsingh,
      joinedYear: 2020,
      description: 'Organic vegetable farmer with 15 years of experience. Specializes in tomatoes, carrots, and leafy greens.'
    },
    {
      id: '2',
      name: 'सुनीता देवी',
      location: 'गाज़ियाबाद, उत्तर प्रदेश',
      rating: 4.9,
      verified: true,
      phone: '+91 98765 43211',
      totalProducts: 8,
      speciality: 'organic',
      distance: '8 km',
      image: sunitadevi,
      joinedYear: 2019,
      description: 'Certified organic farmer focusing on chemical-free vegetables and traditional farming methods.'
    },
    {
      id: '3',
      name: 'विजय कुमार',
      location: 'लखनऊ, उत्तर प्रदेश',
      rating: 4.7,
      verified: true,
      phone: '+91 98765 43212',
      totalProducts: 15,
      speciality: 'fruits',
      distance: '25 km',
      image: vijaykumar,
      joinedYear: 2018,
      description: 'Fruit orchard owner growing mangoes, guavas, and seasonal fruits. Third-generation farmer.'
    },
    {
      id: '4',
      name: 'अजय शर्मा',
      location: 'मुजफ्फरनगर, उत्तर प्रदेश',
      rating: 4.6,
      verified: false,
      phone: '+91 98765 43213',
      totalProducts: 6,
      speciality: 'grains',
      distance: '18 km',
      image: ajaysharma,
      joinedYear: 2021,
      description: 'Grain producer specializing in basmati rice and wheat. Uses modern farming techniques.'
    },
    {
      id: '5',
      name: 'गोपाल यादव',
      location: 'बुलंदशहर, उत्तर प्रदेश',
      rating: 4.9,
      verified: true,
      phone: '+91 98765 43215',
      totalProducts: 4,
      speciality: 'dairy',
      distance: '15 km',
      image: gopalyadav,
      joinedYear: 2017,
      description: 'Dairy farmer with premium quality milk and dairy products. Maintains high hygiene standards.'
    },
    {
      id: '6',
      name: 'कमला देवी',
      location: 'नोएडा, उत्तर प्रदेश',
      rating: 4.8,
      verified: true,
      phone: '+91 98765 43214',
      totalProducts: 10,
      speciality: 'vegetables',
      distance: '5 km',
      image: kamladevi,
      joinedYear: 2020,
      description: 'Small-scale farmer focusing on fresh leafy vegetables and herbs for urban consumers.'
    }
  ]);

  const filteredFarmers = farmers.filter(farmer => {
    const matchesSearch = farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farmer.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpeciality = selectedSpeciality === 'all' || farmer.speciality === selectedSpeciality;
    const matchesVerified = !verifiedOnly || farmer.verified;
    return matchesSearch && matchesSpeciality && matchesVerified;
  });

  const sortedFarmers = [...filteredFarmers].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'products':
        return b.totalProducts - a.totalProducts;
      case 'joined':
        return a.joinedYear - b.joinedYear;
      case 'distance':
      default:
        return parseInt(a.distance) - parseInt(b.distance);
    }
  });

  const handleWhatsApp = (phone: string, farmerName: string) => {
    const message = `Hi ${farmerName}! I found your profile on KisanCart and would like to know more about your products.`;
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
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Local Farmers</h1>
          <p className="text-gray-600">Connect directly with verified farmers in your area</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search farmers by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            {/* Speciality Filter */}
            <div className="lg:w-48">
              <select
                value={selectedSpeciality}
                onChange={(e) => setSelectedSpeciality(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {specialities.map(speciality => (
                  <option key={speciality.id} value={speciality.id}>
                    {speciality.nameHi}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div className="lg:w-40">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="distance">Distance</option>
                <option value="rating">Rating</option>
                <option value="products">Products</option>
                <option value="joined">Experience</option>
              </select>
            </div>
          </div>

          {/* Verified Filter */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="verified"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <label htmlFor="verified" className="ml-2 text-sm text-gray-600">
                Show only verified farmers
              </label>
            </div>
            <p className="text-gray-600">
              Showing {sortedFarmers.length} farmers
            </p>
          </div>
        </div>

        {/* Farmers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedFarmers.map((farmer) => (
            <div key={farmer.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative">
                <img
                  src={farmer.image}
                  alt={farmer.name}
                  className="w-full h-48 object-cover"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col space-y-2">
                  {farmer.verified && (
                    <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                      <Shield className="h-3 w-3" />
                      <span>Verified</span>
                    </div>
                  )}
                  <div className="bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                    {farmer.distance}
                  </div>
                </div>

                {/* Rating */}
                <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span className="font-medium">{farmer.rating}</span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{farmer.name}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{farmer.location}</span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{farmer.description}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-center">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-lg font-bold text-primary-600">{farmer.totalProducts}</div>
                    <div className="text-xs text-gray-600">Products</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-lg font-bold text-secondary-600">{new Date().getFullYear() - farmer.joinedYear}</div>
                    <div className="text-xs text-gray-600">Years</div>
                  </div>
                </div>

                {/* Speciality */}
                <div className="mb-4">
                  <span className="inline-block bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-xs font-medium capitalize">
                    {farmer.speciality}
                  </span>
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleWhatsApp(farmer.phone, farmer.name)}
                    className="flex-1 bg-green-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors flex items-center justify-center space-x-1"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>WhatsApp</span>
                  </button>
                  <button
                    onClick={() => handleCall(farmer.phone)}
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

        {sortedFarmers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No farmers found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters</p>
          </div>
        )}

        {/* Map Integration Placeholder */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Farmers Near You</h2>
          <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPin className="h-12 w-12 mx-auto mb-2" />
              <p>Interactive map will be integrated here</p>
              <p className="text-sm">Showing farmers within 50km radius</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmersPage;