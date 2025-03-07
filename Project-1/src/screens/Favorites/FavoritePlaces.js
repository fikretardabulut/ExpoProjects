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
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const cardWidth = width - 32; // 16 padding on each side

const RatingBadge = ({ rating, reviewCount }) => (
  <View style={styles.ratingBadge}>
    <Icon name="star" size={14} color="#FFB800" />
    <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
    {reviewCount && (
      <Text style={styles.reviewCount}>({reviewCount})</Text>
    )}
  </View>
);

const CategoryBadge = ({ category }) => (
  <View style={styles.categoryBadge}>
    <Text style={styles.categoryText}>{category}</Text>
  </View>
);

const PlaceCard = ({ place, onPress, onFavoritePress }) => (
  <TouchableOpacity style={styles.placeCard} onPress={onPress}>
    <View style={styles.imageContainer}>
      <Image 
        source={{ uri: place.image }} 
        style={styles.placeImage}
        defaultSource={require('../../../assets/placeholder.png')}
      />
      <TouchableOpacity 
        style={styles.favoriteButton}
        onPress={onFavoritePress}
      >
        <Icon name="heart" size={22} color="#FF3B30" />
      </TouchableOpacity>
      <View style={styles.badgeContainer}>
        <RatingBadge rating={place.rating} reviewCount={place.reviewCount} />
        <CategoryBadge category={place.category} />
      </View>
    </View>
    <View style={styles.placeInfo}>
      <Text style={styles.placeName} numberOfLines={1}>{place.name}</Text>
      <View style={styles.placeDetails}>
        <View style={styles.detailItem}>
          <Icon name="map-marker" size={16} color="#666" />
          <Text style={styles.detailText} numberOfLines={1}>{place.location}</Text>
        </View>
        <View style={styles.detailItem}>
          <Icon name="clock-outline" size={16} color={place.isOpen ? '#4CAF50' : '#FF3B30'} />
          <Text 
            style={[
              styles.detailText, 
              { color: place.isOpen ? '#4CAF50' : '#FF3B30' }
            ]}
          >
            {place.isOpen ? 'Açık' : 'Kapalı'} • {place.hours}
          </Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const FavoritePlaces = () => {
  const navigation = useNavigation();
  const [places] = useState([
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
  ]);

  const handlePlacePress = (place) => {
    navigation.navigate('BusinessDetail', { 
      businessId: place.id,
      businessName: place.name,
      businessImage: place.image,
      businessCategory: place.category,
      businessRating: place.rating,
      businessReviewCount: place.reviewCount,
      businessLocation: place.location,
      businessHours: place.hours,
      businessIsOpen: place.isOpen
    });
  };

  const handleFavoritePress = (placeId) => {
    // Favori kaldırma işlemi
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favori Mekanlarım</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {places.map((place) => (
          <PlaceCard
            key={place.id}
            place={place}
            onPress={() => handlePlacePress(place)}
            onFavoritePress={() => handleFavoritePress(place.id)}
          />
        ))}
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
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
    width: 60,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    width: 60,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 16,
    paddingBottom: 90,
  },
  placeCard: {
    width: cardWidth,
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 16,
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
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
  },
  placeImage: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FFF',
    padding: 8,
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  badgeContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
    gap: 8,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  reviewCount: {
    fontSize: 12,
    color: '#666',
  },
  categoryBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFF',
  },
  placeInfo: {
    padding: 16,
  },
  placeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  placeDetails: {
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
});

export default FavoritePlaces; 