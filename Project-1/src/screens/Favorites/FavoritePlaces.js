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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const RatingBadge = ({ rating }) => (
  <View style={styles.ratingBadge}>
    <Icon name="star" size={12} color="#FFB800" />
    <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
  </View>
);

const PlaceCard = ({ place, onPress, onFavoritePress }) => (
  <TouchableOpacity style={styles.placeCard} onPress={onPress}>
    <Image source={{ uri: place.image }} style={styles.placeImage} />
    <TouchableOpacity 
      style={styles.favoriteButton}
      onPress={onFavoritePress}
    >
      <Icon name="heart" size={20} color="#FF3B30" />
    </TouchableOpacity>
    {place.rating && <RatingBadge rating={place.rating} />}
    <View style={styles.placeInfo}>
      <Text style={styles.placeName}>{place.name}</Text>
      <View style={styles.placeDetails}>
        <View style={styles.detailItem}>
          <Icon name="map-marker" size={16} color="#666" />
          <Text style={styles.detailText}>{place.location}</Text>
        </View>
        <View style={styles.detailItem}>
          <Icon name="clock-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{place.openStatus}</Text>
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
      name: 'Özel Dentist Ağız ve Diş Sağlığı Kliniği',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800',
      location: 'Melikgazi, Kayseri',
      rating: 4.8,
      openStatus: 'Açık • 09:00 - 18:00',
    },
    {
      id: '2',
      name: 'Kayseri Diş Hastanesi',
      image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?w=800',
      location: 'Kocasinan, Kayseri',
      rating: 4.5,
      openStatus: 'Açık • 24 saat açık',
    },
    {
      id: '3',
      name: 'Özel Dent Kliniği',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800',
      location: 'Talas, Kayseri',
      rating: 4.6,
      openStatus: 'Kapalı • 09:00 - 17:00',
    },
  ]);

  const handlePlacePress = (place) => {
    navigation.navigate('PlaceDetails', { placeId: place.id });
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
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 16,
    paddingBottom: 90,
  },
  placeCard: {
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
  placeImage: {
    width: '100%',
    height: 200,
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
  ratingBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
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
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  placeInfo: {
    padding: 16,
  },
  placeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  placeDetails: {
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
});

export default FavoritePlaces; 