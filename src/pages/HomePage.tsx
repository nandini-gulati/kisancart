import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Users, MapPin, Shield, Star } from 'lucide-react';
import Header from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';
import kisanImg from '../assets/kisan.jpg';

const HomePage: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Users className="h-8 w-8 text-primary-600" />,
      title: t('directConnection'),
      description: t('directConnectionDesc')
    },
    {
      icon: <MapPin className="h-8 w-8 text-primary-600" />,
      title: t('localSourcing'),
      description: t('localSourcingDesc')
    },
    {
      icon: <Shield className="h-8 w-8 text-primary-600" />,
      title: t('verifiedFarmers'),
      description: t('verifiedFarmersDesc')
    },
    {
      icon: <Star className="h-8 w-8 text-primary-600" />,
      title: t('qualityAssured'),
      description: t('qualityAssuredDesc')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t('heroSubtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/register"
                className="bg-primary-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                {t('getStarted')}
              </Link>
              <Link
                to="/products"
                className="border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary-50 transform hover:scale-105 transition-all duration-200"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Image/Illustration */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="relative">
            <img
              src={kisanImg} alt="Fresh vegetables and farmers" 
              className="w-full h-full object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('whyChooseKisanCart')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('connectingFarmersConsumers')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-xl text-center hover:bg-primary-50 hover:shadow-lg transform hover:-translate-y-2 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Sections */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* For Farmers */}
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <div className="flex items-center mb-6">
                <Sprout className="h-10 w-10 text-primary-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">{t('forFarmers')}</h3>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Sell directly to consumers</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Get better prices for your produce</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Manage your listings easily</span>
                </li>
              </ul>
              <Link
                to="/register"
                state={{ role: 'farmer' }}
                className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Join as Farmer
              </Link>
            </div>

            {/* For Buyers */}
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <div className="flex items-center mb-6">
                <Users className="h-10 w-10 text-secondary-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">{t('forBuyers')}</h3>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-secondary-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Fresh produce from local farmers</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-secondary-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Support your local farming community</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-secondary-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Know where your food comes from</span>
                </li>
              </ul>
              <Link
                to="/register"
                state={{ role: 'buyer' }}
                className="inline-block bg-secondary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary-700 transition-colors"
              >
                Join as Buyer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center items-center mb-6">
            <Sprout className="h-8 w-8 text-primary-400 mr-2" />
            <span className="text-2xl font-bold">KisanCart</span>
          </div>
          <p className="text-gray-400 mb-6">
            Bridging the gap between farmers and consumers for a sustainable future.
          </p>
          <div className="border-t border-gray-800 pt-6">
            <p className="text-gray-500">
              © 2024 KisanCart. Supporting Indian Agriculture.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;