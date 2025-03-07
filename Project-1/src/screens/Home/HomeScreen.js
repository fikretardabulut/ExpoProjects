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
      <Icon name={icon} size={28} color="#007AFF" />
    </View>
    <Text numberOfLines={1} style={styles.categoryTitle}>{title}</Text>
  </TouchableOpacity>
);

const BusinessCard = ({ 
  image, 
  name, 
  rating, 
  category, 
  location, 
  isOpen, 
  hours, 
  reviewCount,
  onPress 
}) => (
  <TouchableOpacity style={styles.businessCard} onPress={onPress}>
    <Image source={{ uri: image }} style={styles.businessImage} />
    <View style={styles.businessInfo}>
      <View style={styles.businessHeader}>
        <Text numberOfLines={1} style={styles.businessName}>{name}</Text>
        <View style={[styles.statusBadge, !isOpen && styles.statusBadgeClosed]}>
          <View style={[styles.statusDot, !isOpen && styles.statusDotClosed]} />
          <Text style={[styles.statusText, !isOpen && styles.statusTextClosed]}>
            {isOpen ? 'Açık' : 'Kapalı'}
          </Text>
        </View>
      </View>
      <View style={styles.ratingContainer}>
        <Icon name="star" size={16} color="#FFB800" />
        <Text style={styles.ratingText}>{rating}</Text>
        <Text style={styles.ratingCount}>({reviewCount})</Text>
      </View>
      <View style={styles.locationContainer}>
        <Icon name="map-marker" size={14} color="#666" />
        <Text numberOfLines={1} style={styles.locationText}>{location}</Text>
      </View>
      <View style={styles.workingHoursContainer}>
        <Icon name="clock-outline" size={14} color="#666" />
        <Text style={styles.workingHoursText}>{hours}</Text>
      </View>
    </View>
    <View style={styles.bookmarkButton}>
      <Icon name="bookmark-outline" size={20} color="#007AFF" />
    </View>
  </TouchableOpacity>
);

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({ name: 'Kayseri', district: 'Melikgazi' });
  const [notificationCount, setNotificationCount] = useState(2);

  const categories = [
    { id: '1', icon: 'basketball', title: 'Spor' },
    { id: '2', icon: 'spa', title: 'Spa' },
    { id: '3', icon: 'hair-dryer', title: 'Kuaför' },
    { id: '4', icon: 'dumbbell', title: 'Fitness' },
    { id: '5', icon: 'more', title: 'Diğer' },
  ];

  const featuredBusinesses = [
    {
      id: '1',
      name: 'Güzellik Salonu A',
      category: 'Güzellik & Bakım',
      image: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=800',
      location: 'Melikgazi, Kayseri',
      rating: 4.8,
      reviewCount: 128,
      isOpen: true,
      hours: '09:00 - 18:00',
    },
    {
      id: '2',
      name: 'Spor Salonu B',
      category: 'Spor & Fitness',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
      location: 'Kocasinan, Kayseri',
      rating: 4.5,
      reviewCount: 89,
      isOpen: true,
      hours: '24 saat açık',
    },
    {
      id: '3',
      name: 'Kafe C',
      category: 'Yeme & İçme',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
      location: 'Talas, Kayseri',
      rating: 4.9,
      reviewCount: 156,
      isOpen: false,
      hours: '09:00 - 22:00',
    },
  ];

  const popularBusinesses = [
    {
      id: '4',
      name: 'Güzellik Salonu A',
      category: 'Güzellik & Bakım',
      image: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=800',
      location: 'Melikgazi, Kayseri',
      rating: 4.8,
      reviewCount: 128,
      isOpen: true,
      hours: '09:00 - 18:00',
    },
    {
      id: '5',
      name: 'Spor Salonu B',
      category: 'Spor & Fitness',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
      location: 'Kocasinan, Kayseri',
      rating: 4.5,
      reviewCount: 89,
      isOpen: true,
      hours: '24 saat açık',
    },
    {
      id: '6',
      name: 'Kafe C',
      category: 'Yeme & İçme',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
      location: 'Talas, Kayseri',
      rating: 4.9,
      reviewCount: 156,
      isOpen: false,
      hours: '09:00 - 22:00',
    },
  ];

  const handleBusinessPress = (business) => {
    navigation.navigate('BusinessDetail', { 
      businessId: business.id,
      businessName: business.name,
      businessImage: business.image,
      businessCategory: business.category,
      businessRating: business.rating,
      businessReviewCount: business.reviewCount,
      businessLocation: business.location,
      businessHours: business.hours,
      businessIsOpen: business.isOpen
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.locationHeader}
          onPress={() => setShowLocationPicker(true)}
        >
          <View style={styles.locationIconContainer}>
            <Icon name="map-marker" size={20} color="#007AFF" />
          </View>
          <View>
            <Text style={styles.locationLabel}>Konum</Text>
            <Text style={styles.locationTitle}>
              {selectedLocation ? `${selectedLocation.name}, ${selectedLocation.district}` : 'Konum Seç'}
            </Text>
          </View>
          <Icon name="chevron-down" size={20} color="#007AFF" style={styles.chevronIcon} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.notificationButton} 
          onPress={() => navigation.navigate('ProfileNotificationScreen')}
        >
          <Icon name="bell-outline" size={24} color="#333" />
          {notificationCount > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>{notificationCount}</Text>
            </View>
          )}
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
                onPress={() => handleBusinessPress(business)}
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
                onPress={() => handleBusinessPress(business)}
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
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  locationIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  chevronIcon: {
    marginLeft: 4,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: '#FFF',
  },
  notificationBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFF',
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
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginLeft: 16,
    marginBottom: 16,
  },
  categoriesContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  categoryCard: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 72,
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 20,
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  categoryTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 16,
    marginBottom: 16,
  },
  seeAllButton: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  businessList: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  businessCard: {
    width: CARD_WIDTH,
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginHorizontal: 8,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  businessImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  businessInfo: {
    padding: 16,
  },
  businessHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusBadgeClosed: {
    backgroundColor: '#FFEBEE',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4CAF50',
  },
  statusDotClosed: {
    backgroundColor: '#F44336',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4CAF50',
  },
  statusTextClosed: {
    color: '#F44336',
  },
  businessName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  ratingCount: {
    fontSize: 12,
    color: '#666',
    marginLeft: 2,
  },
  businessCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    flex: 1,
    fontSize: 12,
    color: '#666',
  },
  workingHoursContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  workingHoursText: {
    fontSize: 12,
    color: '#666',
  },
  bookmarkButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default HomeScreen;
