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
      <View style={styles.popularityContainer}>
        <Icon name="trending-up" size={16} color="#28A745" />
        <Text style={styles.popularityText}>{item.popularityReason}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const PopularBusinesses = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Tümü' },
    { id: 'health', label: 'Sağlık' },
    { id: 'sports', label: 'Spor' },
    { id: 'beauty', label: 'Güzellik' },
    { id: 'wellness', label: 'Wellness' },
  ];

  // Örnek veri - gerçek uygulamada API'den gelecek
  const businesses = [
    {
      id: '1',
      image: 'https://example.com/business1.jpg',
      name: 'Fitness Zone',
      rating: 4.9,
      reviewCount: 312,
      category: 'Spor Salonu',
      location: 'Talas, Kayseri',
      popularityReason: 'Son 30 günde 500+ ziyaret',
      categoryId: 'sports',
    },
    {
      id: '2',
      image: 'https://example.com/business2.jpg',
      name: 'Modern Diş Kliniği',
      rating: 4.8,
      reviewCount: 156,
      category: 'Diş Hekimi',
      location: 'Melikgazi, Kayseri',
      popularityReason: 'Bu hafta en çok tercih edilen',
      categoryId: 'health',
    },
    {
      id: '3',
      image: 'https://example.com/business3.jpg',
      name: 'Lotus Spa Center',
      rating: 4.7,
      reviewCount: 89,
      category: 'Spa & Masaj',
      location: 'Kocasinan, Kayseri',
      popularityReason: 'Yükselen popülerlik',
      categoryId: 'wellness',
    },
    // Daha fazla işletme eklenebilir
  ];

  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || business.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item.id && styles.categoryButtonActive,
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Text
        style={[
          styles.categoryButtonText,
          selectedCategory === item.id && styles.categoryButtonTextActive,
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
          placeholder="Popüler işletmelerde ara..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id}
        style={styles.categoryList}
        contentContainerStyle={styles.categoryContainer}
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
  categoryList: {
    maxHeight: 44,
    marginBottom: 8,
  },
  categoryContainer: {
    paddingHorizontal: 12,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFF',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  categoryButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#666',
  },
  categoryButtonTextActive: {
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
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  popularityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 8,
    borderRadius: 8,
  },
  popularityText: {
    fontSize: 14,
    color: '#28A745',
    marginLeft: 4,
    flex: 1,
  },
});

export default PopularBusinesses; 