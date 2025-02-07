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
      <Text style={styles.businessName}>{item.name}</Text>
      <View style={styles.ratingContainer}>
        <Icon name="star" size={16} color="#FFB800" />
        <Text style={styles.ratingText}>{item.rating}</Text>
        <Text style={styles.reviewCount}>({item.reviewCount} değerlendirme)</Text>
      </View>
      <Text style={styles.businessCategory}>{item.category}</Text>
      <View style={styles.locationContainer}>
        <Icon name="map-marker" size={14} color="#666" />
        <Text style={styles.locationText}>{item.location}</Text>
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
      image: 'https://example.com/business1.jpg',
      name: 'Özel Dentist Ağız ve Diş Sağlığı',
      rating: 4.8,
      reviewCount: 156,
      category: 'Diş Hekimi',
      location: 'Melikgazi, Kayseri',
      isPopular: true,
    },
    {
      id: '2',
      image: 'https://example.com/business2.jpg',
      name: 'Modern Diş Kliniği',
      rating: 4.6,
      reviewCount: 98,
      category: 'Diş Hekimi',
      location: 'Kocasinan, Kayseri',
      isPopular: false,
    },
    // Daha fazla işletme eklenebilir
  ];

  const filters = [
    { id: 'all', label: 'Tümü' },
    { id: 'popular', label: 'Popüler' },
    { id: 'rating', label: 'En Yüksek Puan' },
    { id: 'distance', label: 'En Yakın' },
  ];

  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'popular') return matchesSearch && business.isPopular;
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
            onPress={() => navigation.navigate('BusinessDetail', { businessId: item.id })}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={[styles.businessList, { paddingBottom: 60 }]}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
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
  filterList: {
    maxHeight: 44,
    marginBottom: 8,
  },
  filterContainer: {
    paddingHorizontal: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFF',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#666',
  },
  filterButtonTextActive: {
    color: '#FFF',
  },
  businessList: {
    padding: 12,
  },
  businessCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 12,
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
    height: 200,
  },
  businessInfo: {
    padding: 12,
  },
  businessName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
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
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
});

export default CategoryDetail; 