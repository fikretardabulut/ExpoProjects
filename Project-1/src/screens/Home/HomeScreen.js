import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import LocationPicker from './LocationPicker';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.7;

const CategoryCard = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.categoryCard} onPress={onPress}>
    <View style={styles.categoryIcon}>
      <Icon name={icon} size={32} color="#007AFF" />
    </View>
    <Text style={styles.categoryTitle}>{title}</Text>
  </TouchableOpacity>
);

const BusinessCard = ({ image, name, rating, category, location, onPress }) => (
  <TouchableOpacity style={styles.businessCard} onPress={onPress}>
    <Image source={{ uri: image }} style={styles.businessImage} />
    <View style={styles.businessInfo}>
      <Text style={styles.businessName}>{name}</Text>
      <View style={styles.ratingContainer}>
        <Icon name="star" size={16} color="#FFB800" />
        <Text style={styles.ratingText}>{rating}</Text>
      </View>
      <Text style={styles.businessCategory}>{category}</Text>
      <View style={styles.locationContainer}>
        <Icon name="map-marker" size={14} color="#666" />
        <Text style={styles.locationText}>{location}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({ name: 'Kayseri', district: 'Melikgazi' });

  const categories = [
    { id: '1', icon: 'tooth', title: 'Diş' },
    { id: '2', icon: 'basketball', title: 'Spor' },
    { id: '3', icon: 'spa', title: 'Spa' },
    { id: '4', icon: 'hair-dryer', title: 'Kuaför' },
    { id: '5', icon: 'dumbbell', title: 'Fitness' },
    { id: '6', icon: 'more', title: 'Diğer' },
  ];

  const featuredBusinesses = [
    {
      id: '1',
      image: 'https://example.com/business1.jpg',
      name: 'Özel Dentist Ağız ve Diş Sağlığı',
      rating: 4.8,
      category: 'Diş Hekimi',
      location: 'Melikgazi, Kayseri',
    },
    {
      id: '2',
      image: 'https://example.com/business2.jpg',
      name: 'Champions Spor Kompleksi',
      rating: 4.7,
      category: 'Spor Salonu',
      location: 'Kocasinan, Kayseri',
    },
  ];

  const popularBusinesses = [
    {
      id: '3',
      image: 'https://example.com/business3.jpg',
      name: 'Fitness Zone',
      rating: 4.9,
      category: 'Fitness Center',
      location: 'Talas, Kayseri',
    },
    {
      id: '4',
      image: 'https://example.com/business4.jpg',
      name: 'Beauty Spa & Wellness',
      rating: 4.6,
      category: 'Spa Merkezi',
      location: 'Melikgazi, Kayseri',
    },
  ];

  const handleBusinessPress = (businessId) => {
    navigation.navigate('BusinessDetail', { businessId });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.locationHeader}
          onPress={() => setShowLocationPicker(true)}
        >
          <Icon name="map-marker" size={24} color="#007AFF" />
          <Text style={styles.locationTitle}>
            {selectedLocation ? `${selectedLocation.name}, ${selectedLocation.district}` : 'Konum Seç'}
          </Text>
          <Icon name="chevron-down" size={24} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileNotificationScreen')}>
          <Icon name="bell" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Location Picker Modal */}
      <LocationPicker
        visible={showLocationPicker}
        onClose={() => setShowLocationPicker(false)}
        onSelectLocation={setSelectedLocation}
        currentLocation={selectedLocation}
      />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollViewContent, { paddingBottom: 60 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon name="magnify" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="İşletme veya hizmet ara..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Kategoriler</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                icon={category.icon}
                title={category.title}
                onPress={() => navigation.navigate('CategoryDetail', { categoryId: category.id })}
              />
            ))}
          </ScrollView>
        </View>

        {/* Featured Businesses */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Öne Çıkanlar</Text>
            <TouchableOpacity onPress={() => navigation.navigate('FeaturedBusinesses')}>
              <Text style={styles.seeAllButton}>Tümünü Gör</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.businessList}
          >
            {featuredBusinesses.map((business) => (
              <BusinessCard
                key={business.id}
                {...business}
                onPress={() => handleBusinessPress(business.id)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Popular Businesses */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popüler Mekanlar</Text>
            <TouchableOpacity onPress={() => navigation.navigate('PopularBusinesses')}>
              <Text style={styles.seeAllButton}>Tümünü Gör</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.businessList}
          >
            {popularBusinesses.map((business) => (
              <BusinessCard
                key={business.id}
                {...business}
                onPress={() => handleBusinessPress(business.id)}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 60,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: '#333',
  },
  categoriesSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 16,
    marginBottom: 12,
  },
  categoriesContainer: {
    paddingHorizontal: 12,
  },
  categoryCard: {
    alignItems: 'center',
    marginHorizontal: 4,
    width: 80,
  },
  categoryIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 16,
    marginBottom: 12,
  },
  seeAllButton: {
    fontSize: 14,
    color: '#007AFF',
  },
  businessList: {
    paddingHorizontal: 12,
  },
  businessCard: {
    width: CARD_WIDTH,
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginHorizontal: 4,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  businessImage: {
    width: '100%',
    height: 160,
  },
  businessInfo: {
    padding: 12,
  },
  businessName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  businessCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#666',
  },
});

export default HomeScreen;
