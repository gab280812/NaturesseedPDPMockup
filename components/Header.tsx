"use client"

import { useState } from 'react';
import { Search, User, ShoppingCart, Phone, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SeedFinder from '@/components/SeedFinder';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSeedFinder, setShowSeedFinder] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const mainNavItems = [
    'Pasture Seed',
    'Lawn Seed', 
    'Wildflower Seed',
    'Specialty Seed',
    'Planting Aids'
  ];

  const subNavItems = [
    'About Us',
    'Resources'
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 w-full">
      {/* Announcement Bar */}
      <div className="bg-green-600 text-white text-center py-2">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-sm font-medium">
            Free shipping on orders over $50
          </p>
        </div>
      </div>

      {/* Top Row - Logo, Search, User Actions */}
      <div className="w-full border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between py-5">
            {/* Logo */}
            <div className="flex-shrink-0 min-w-0">
              <img 
                src="/logo.png" 
                alt="Nature's Seed" 
                className="h-12 w-auto"
                onError={(e) => {
                  // Fallback to text logo if image fails
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden text-2xl font-bold text-green-600">
                Nature's Seed
              </div>
            </div>

            {/* Center Section - Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xl mx-12">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search for seeds, plants, or advice..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-6 py-3 w-full text-base border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-lg"
                  />
                </div>
              </form>
            </div>

            {/* Right Section - User Actions */}
            <div className="flex items-center space-x-6">
              {/* Login & Cart */}
              <div className="hidden md:flex items-center space-x-4">
                <Button variant="ghost" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50">
                  <User className="h-5 w-5" />
                  <span className="font-medium">Login</span>
                </Button>
                <Button variant="ghost" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 relative">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="font-medium">Cart</span>
                  <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-semibold">
                    2
                  </span>
                </Button>
              </div>

              {/* Call Button - Highlighted */}
              <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-3 px-6 py-3 font-semibold shadow-sm">
                <Phone className="h-5 w-5" />
                <span className="hidden sm:inline">Call Us</span>
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row - Main Navigation & Sub Navigation */}
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="hidden lg:flex items-center justify-between py-3">
            {/* Main Navigation */}
            <div className="flex items-center space-x-6">
              <nav className="flex items-center space-x-5">
                {mainNavItems.map((item) => (
                  <a
                    key={item}
                    href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-700 hover:text-green-600 font-medium transition-colors py-2 px-1 border-b-2 border-transparent hover:border-green-600 text-sm whitespace-nowrap"
                  >
                    {item}
                  </a>
                ))}
              </nav>

              {/* Seed Finder Button */}
              <Dialog open={showSeedFinder} onOpenChange={setShowSeedFinder}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100 px-4 py-1.5 font-medium text-sm whitespace-nowrap"
                  >
                    Find the perfect Seed for you
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Find Your Perfect Seed</DialogTitle>
                  </DialogHeader>
                  <SeedFinder onClose={() => setShowSeedFinder(false)} />
                </DialogContent>
              </Dialog>
            </div>

            {/* Sub Navigation */}
            <div className="flex items-center space-x-6">
              {subNavItems.map((item) => (
                <a
                  key={item}
                  href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-xs text-gray-600 hover:text-green-600 transition-colors py-2 font-medium whitespace-nowrap"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-4 max-h-screen overflow-y-auto">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="md:hidden">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search seeds..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 w-full h-12 text-base"
                />
              </div>
            </form>

            {/* Mobile Navigation */}
            <nav className="space-y-1">
              {mainNavItems.map((item) => (
                <a
                  key={item}
                  href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block text-gray-700 hover:text-green-600 hover:bg-green-50 font-medium py-3 px-2 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Mobile Seed Finder */}
            <Dialog open={showSeedFinder} onOpenChange={setShowSeedFinder}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full bg-green-50 border-green-200 text-green-700 hover:bg-green-100 h-12 text-base"
                >
                  Find the perfect Seed for you
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md mx-4">
                <DialogHeader>
                  <DialogTitle>Find Your Perfect Seed</DialogTitle>
                </DialogHeader>
                <SeedFinder onClose={() => setShowSeedFinder(false)} />
              </DialogContent>
            </Dialog>

            {/* Mobile User Actions */}
            <div className="space-y-2 pt-3 border-t border-gray-200">
              <Button variant="ghost" className="w-full justify-start h-12 text-base">
                <User className="h-5 w-5 mr-3" />
                Login
              </Button>
              <Button variant="ghost" className="w-full justify-start relative h-12 text-base">
                <ShoppingCart className="h-5 w-5 mr-3" />
                Cart
                <span className="absolute right-4 bg-green-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-semibold">
                  2
                </span>
              </Button>
            </div>

            {/* Mobile Sub Navigation */}
            <div className="space-y-1 pt-3 border-t border-gray-200">
              {subNavItems.map((item) => (
                <a
                  key={item}
                  href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block text-sm text-gray-600 hover:text-green-600 hover:bg-gray-50 py-2 px-2 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
