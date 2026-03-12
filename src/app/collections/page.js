// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COLLECTIONS PAGE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

'use client';

import { useState, useEffect } from 'react';
import { Search, Grid3x3, List, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CollectionsPage() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      // Replace with actual API call
      const response = await fetch('/api/collections');
      const data = await response.json();
      setCollections(data.data || mockCollections);
    } catch (error) {
      console.error('Error fetching collections:', error);
      setCollections(mockCollections);
    } finally {
      setLoading(false);
    }
  };

  const filteredCollections = collections.filter(collection =>
    collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    collection.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-80 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Collections</h1>
          <p className="text-lg text-gray-600">
            Explore our curated collections of premium sports equipment and apparel
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* View Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Collections Grid/List */}
        {filteredCollections.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No collections found</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
          }>
            {filteredCollections.map((collection) => (
              <CollectionCard 
                key={collection.id} 
                collection={collection} 
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CollectionCard({ collection, viewMode }) {
  if (viewMode === 'list') {
    return (
      <Link href={`/collections/${collection.slug}`}>
        <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-6 flex gap-6 items-center">
          <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
            <Image
              src={collection.image || '/placeholder-collection.jpg'}
              alt={collection.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{collection.name}</h3>
            <p className="text-gray-600 mb-4">{collection.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{collection.productCount} products</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/collections/${collection.slug}`}>
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden group">
        <div className="relative h-64 overflow-hidden">
          <Image
            src={collection.image || '/placeholder-collection.jpg'}
            alt={collection.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{collection.name}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{collection.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{collection.productCount} products</span>
            <span className="text-blue-600 font-medium text-sm group-hover:underline">
              View Collection →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Mock data
const mockCollections = [
  {
    id: '1',
    name: 'Running Essentials',
    slug: 'running-essentials',
    description: 'Everything you need for your perfect run - from shoes to apparel',
    image: '/collections/running.jpg',
    productCount: 124
  },
  {
    id: '2',
    name: 'Gym & Training',
    slug: 'gym-training',
    description: 'Premium equipment and gear for strength training and fitness',
    image: '/collections/gym.jpg',
    productCount: 89
  },
  {
    id: '3',
    name: 'Outdoor Adventure',
    slug: 'outdoor-adventure',
    description: 'Gear up for hiking, camping, and outdoor exploration',
    image: '/collections/outdoor.jpg',
    productCount: 156
  },
  {
    id: '4',
    name: 'Yoga & Wellness',
    slug: 'yoga-wellness',
    description: 'Find your balance with our yoga and wellness collection',
    image: '/collections/yoga.jpg',
    productCount: 67
  },
  {
    id: '5',
    name: 'Team Sports',
    slug: 'team-sports',
    description: 'Equipment for basketball, soccer, volleyball and more',
    image: '/collections/team-sports.jpg',
    productCount: 203
  },
  {
    id: '6',
    name: 'Swimming & Water Sports',
    slug: 'swimming-water-sports',
    description: 'Dive into our collection of swimming and water sports gear',
    image: '/collections/swimming.jpg',
    productCount: 78
  }
];
