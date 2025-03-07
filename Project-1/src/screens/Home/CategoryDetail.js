import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRoute } from '@react-navigation/native';

const BusinessCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.businessCard} onPress={onPress}>
    <Image source={{ uri: item.image }} style={styles.businessImage} />
    <View style={styles.businessInfo}>
      <View style={styles.businessHeader}>
        <Text style={styles.businessName}>{item.name}</Text>
        <View style={[styles.statusBadge, item.isOpen ? styles.statusOpen : styles.statusClosed]}>
          <Text style={[styles.statusText, item.isOpen ? styles.statusTextOpen : styles.statusTextClosed]}>
            {item.isOpen ? 'Açık' : 'Kapalı'}
          </Text>
        </View>
      </View>
      <View style={styles.ratingContainer}>
        <Icon name="star" size={16} color="#FFB800" />
        <Text style={styles.ratingText}>{item.rating}</Text>
        <Text style={styles.reviewCount}>({item.reviewCount} değerlendirme)</Text>
      </View>
      <Text style={styles.businessCategory}>{item.category}</Text>
      <View style={styles.locationContainer}>
        <Icon name="map-marker-outline" size={14} color="#666" />
        <Text style={styles.locationText}>{item.location}</Text>
      </View>
      <View style={styles.hoursContainer}>
        <Icon name="clock-outline" size={14} color="#666" />
        <Text style={styles.hoursText}>{item.hours}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const CategoryDetail = ({ navigation }) => {
  const route = useRoute();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Örnek veri - gerçek uygulamada API'den gelecek
  const businesses = [
    {
      id: '1',
      name: 'Champions Spor Kompleksi',
      category: 'Spor Salonu',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
      location: 'Kocasinan, Kayseri',
      rating: 4.7,
      reviewCount: 189,
      isOpen: true,
      hours: "07:00 - 23:00",
      phone: '+90 (352) 234 56 78',
      description: 'Profesyonel spor salonu ve fitness merkezi.',
      services: [
        { name: 'Aylık Üyelik', price: 800 },
        { name: 'Yıllık Üyelik', price: 7200 },
        { name: 'PT Seansı', price: 350 }
      ]
    },
    {
      id: '2',
      name: 'Elit Güzellik Merkezi',
      category: 'Güzellik Merkezi',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
      location: 'Melikgazi, Kayseri',
      rating: 4.9,
      reviewCount: 276,
      isOpen: true,
      hours: "10:00 - 20:00",
      phone: '+90 (352) 345 67 89',
      description: 'Profesyonel cilt bakımı ve güzellik hizmetleri.',
      services: [
        { name: 'Cilt Bakımı', price: 600 },
        { name: 'Kalıcı Makyaj', price: 1500 },
        { name: 'Lazer Epilasyon', price: 250 }
      ]
    },
    {
      id: '3',
      name: 'Zen Yoga & Pilates',
      category: 'Spor Merkezi',
      image: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=800',
      location: 'Melikgazi, Kayseri',
      rating: 4.8,
      reviewCount: 167,
      isOpen: true,
      hours: "08:00 - 21:00",
      phone: '+90 (352) 567 89 01',
      description: 'Huzurlu ortamda profesyonel eğitmenlerle yoga ve pilates dersleri.',
      services: [
        { name: 'Tek Seans', price: 150 },
        { name: 'Aylık Paket', price: 1200 },
        { name: 'Özel Ders', price: 300 }
      ]
    },
    {
      id: '4',
      name: 'Fitness Zone',
      category: 'Fitness Center',
      image: 'https://images.unsplash.com/photo-1570829460005-c840387bb1ca?w=800',
      location: 'Talas, Kayseri',
      rating: 4.9,
      reviewCount: 245,
      isOpen: true,
      hours: "06:00 - 23:00",
      phone: '+90 (352) 123 45 67',
      description: '24/7 hizmet veren modern fitness merkezi.',
      services: [
        { name: 'Aylık Üyelik', price: 900 },
        { name: 'Yıllık Üyelik', price: 8000 },
        { name: 'PT Seansı', price: 400 }
      ]
    },
    {
      id: '5',
      name: 'Beauty Spa & Wellness',
      category: 'Spa Merkezi',
      image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800',
      location: 'Melikgazi, Kayseri',
      rating: 4.6,
      reviewCount: 167,
      isOpen: false,
      hours: "10:00 - 22:00",
      phone: '+90 (352) 234 56 78',
      description: 'Huzurlu bir spa deneyimi için sizleri bekliyoruz.',
      services: [
        { name: 'Klasik Masaj', price: 500 },
        { name: 'Aromaterapi', price: 700 },
        { name: 'VIP Paket', price: 1500 }
      ]
    }
  ];

  const filters = [
    { id: 'all', label: 'Tümü', icon: 'apps' },
    { id: 'open', label: 'Açık', icon: 'clock-outline' },
    { id: 'rating', label: 'En Yüksek Puan', icon: 'star-outline' },
    { id: 'distance', label: 'En Yakın', icon: 'map-marker-outline' },
  ];

  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'open') return matchesSearch && business.isOpen;
    if (selectedFilter === 'rating') return matchesSearch;
    if (selectedFilter === 'distance') return matchesSearch;
    return matchesSearch;
  });

  const renderFilterItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        selectedFilter === item.id && styles.filterButtonActive,
      ]}
      onPress={() => setSelectedFilter(item.id)}
    >
      <Icon name={item.icon} size={20} color={selectedFilter === item.id ? '#007AFF' : '#666'} />
      <Text
        style={[
          styles.filterButtonText,
          selectedFilter === item.id && styles.filterButtonTextActive,
        ]}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="İşletme ara..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      <FlatList
        data={filters}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderFilterItem}
        keyExtractor={item => item.id}
        style={styles.filterList}
        contentContainerStyle={styles.filterContainer}
      />

      <FlatList
        data={filteredBusinesses}
        renderItem={({ item }) => (
          <BusinessCard
            item={item}
            onPress={() => navigation.navigate('BusinessDetail', {
              businessId: item.id,
              businessName: item.name,
              businessImage: item.image,
              businessCategory: item.category,
              businessRating: item.rating,
              businessReviewCount: item.reviewCount,
              businessLocation: item.location,
              businessHours: item.hours,
              businessIsOpen: item.isOpen,
              businessPhone: item.phone,
              businessDescription: item.description,
              businessServices: item.services
            })}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.businessList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    margin: 16,
    paddingHorizontal: 12,
    height: 40,
    borderRadius: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  filterList: {
    maxHeight: 44,
    marginBottom: 8,
  },
  filterContainer: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    marginHorizontal: 4,
    gap: 6,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  filterButtonActive: {
    backgroundColor: '#EBF5FF',
    borderColor: '#007AFF',
  },
  filterButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666',
  },
  filterButtonTextActive: {
    color: '#007AFF',
    fontWeight: '600',
  },
  businessList: {
    padding: 16,
  },
  businessCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  businessImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#F8F9FA',
  },
  businessInfo: {
    padding: 12,
  },
  businessHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  businessName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusOpen: {
    backgroundColor: '#E8F5E9',
  },
  statusClosed: {
    backgroundColor: '#FFEBEE',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  statusTextOpen: {
    color: '#2E7D32',
  },
  statusTextClosed: {
    color: '#C62828',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  businessCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  hoursContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hoursText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
});

export default CategoryDetail; 