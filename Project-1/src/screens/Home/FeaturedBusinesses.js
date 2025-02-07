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
      {item.featuredReason && (
        <View style={styles.featuredContainer}>
          <Icon name="star-circle" size={16} color="#007AFF" />
          <Text style={styles.featuredText}>{item.featuredReason}</Text>
        </View>
      )}
    </View>
  </TouchableOpacity>
);

const FeaturedBusinesses = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

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
      featuredReason: 'En çok tercih edilen diş kliniği',
    },
    {
      id: '2',
      image: 'https://example.com/business2.jpg',
      name: 'Champions Spor Kompleksi',
      rating: 4.7,
      reviewCount: 203,
      category: 'Spor Salonu',
      location: 'Kocasinan, Kayseri',
      featuredReason: 'Bu ayki en popüler spor salonu',
    },
    {
      id: '3',
      image: 'https://example.com/business3.jpg',
      name: 'Beauty Spa & Wellness',
      rating: 4.9,
      reviewCount: 128,
      category: 'Spa Merkezi',
      location: 'Melikgazi, Kayseri',
      featuredReason: 'En yüksek müşteri memnuniyeti',
    },
    // Daha fazla işletme eklenebilir
  ];

  const filteredBusinesses = businesses.filter(business =>
    business.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Öne çıkan işletmelerde ara..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

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
  featuredContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    padding: 8,
    borderRadius: 8,
  },
  featuredText: {
    fontSize: 14,
    color: '#007AFF',
    marginLeft: 4,
    flex: 1,
  },
});

export default FeaturedBusinesses; 