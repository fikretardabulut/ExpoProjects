import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Platform,
  StatusBar,
  ScrollView,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const INITIAL_REGION = {
  latitude: 41.0082,
  longitude: 28.9784,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const MapScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const mapRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock business data
  const [businesses] = useState([
    {
      id: '1',
      name: 'Güzellik Salonu A',
      rating: 4.8,
      reviews: 128,
      category: 'beauty',
      services: ['Saç', 'Makyaj', 'Cilt Bakımı'],
      location: {
        latitude: 41.0122,
        longitude: 28.9762,
      },
      address: 'Şişli, İstanbul',
      isOpen: true,
    },
    {
      id: '2',
      name: 'Berber B',
      rating: 4.5,
      reviews: 89,
      category: 'barber',
      services: ['Saç Kesimi', 'Sakal Tıraşı', 'Cilt Bakımı'],
      location: {
        latitude: 41.0052,
        longitude: 28.9772,
      },
      address: 'Melikgazi, Kayseri',
      isOpen: true,
    },
    {
      id: '3',
      name: 'Spa Merkezi C',
      rating: 4.9,
      reviews: 156,
      category: 'spa',
      services: ['Masaj', 'Hamam', 'Cilt Bakımı'],
      location: {
        latitude: 41.0082,
        longitude: 28.9792,
      },
      address: 'Kadıköy, İstanbul',
      isOpen: false,
    },
  ]);

  const categories = [
    { id: 'all', name: 'Tümü', icon: 'apps', color: '#007AFF' },
    { id: 'beauty', name: 'Güzellik', icon: 'face-woman', color: '#FF2D55' },
    { id: 'barber', name: 'Berber', icon: 'content-cut', color: '#5856D6' },
    { id: 'spa', name: 'Spa', icon: 'spa', color: '#FF9500' },
    { id: 'nail', name: 'Tırnak', icon: 'hand-back-right', color: '#FF3B30' },
  ];

  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || business.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderMarker = (business) => {
    const category = categories.find(c => c.id === business.category);
    return (
      <Marker
        key={business.id}
        coordinate={business.location}
        onPress={() => navigation.navigate('BusinessDetail', { business })}
      >
        <View style={[styles.markerContainer, { backgroundColor: category?.color || '#007AFF' }]}>
          <Icon name={category?.icon || 'store'} size={16} color="#FFF" />
        </View>
        <View style={[styles.markerArrow, { borderTopColor: category?.color || '#007AFF' }]} />
      </Marker>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton
      >
        {filteredBusinesses.map(renderMarker)}
      </MapView>

      {/* Bottom Search Bar */}

      
      {/* Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={[styles.categoriesScroll, { bottom: insets.bottom + 80 }]}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.categoryButton,
              selectedCategory === item.id && styles.categoryButtonActive,
              { borderColor: selectedCategory === item.id ? item.color : '#E9ECEF' }
            ]}
            onPress={() => setSelectedCategory(item.id)}
          >
            <Icon
              name={item.icon}
              size={20}
              color={selectedCategory === item.id ? '#FFF' : item.color}
            />
            <Text style={[
              styles.categoryButtonText,
              selectedCategory === item.id && styles.categoryButtonTextActive
            ]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  map: {
    flex: 1,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderColor: '#E9ECEF',
    zIndex: 1,
  },
  searchContainer: {
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  categoriesScroll: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 2,
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    gap: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  categoryButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  categoryButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666',
  },
  categoryButtonTextActive: {
    color: '#FFF',
    fontWeight: '600',
  },
  markerContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  markerArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#007AFF',
    alignSelf: 'center',
    marginTop: -2,
  },
});

export default MapScreen; 