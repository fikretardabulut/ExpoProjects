import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

const BusinessCard = ({
  image,
  name,
  rating,
  reviewCount,
  category,
  location,
  isOpen,
  hours,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {/* Image Container */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
        {/* Status Badge */}
        <View style={[
          styles.statusBadge,
          { backgroundColor: isOpen ? '#4CAF50' : '#FF5252' }
        ]}>
          <Text style={styles.statusText}>
            {isOpen ? 'Açık' : 'Kapalı'}
          </Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Name */}
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>

        {/* Category */}
        <Text style={styles.category} numberOfLines={1}>
          {category}
        </Text>

        {/* Rating */}
        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color="#FFB800" />
          <Text style={styles.rating}>{rating}</Text>
          <Text style={styles.reviewCount}>({reviewCount})</Text>
        </View>

        {/* Location */}
        <View style={styles.locationContainer}>
          <Icon name="map-marker-outline" size={14} color="#666" />
          <Text style={styles.location} numberOfLines={1}>
            {location}
          </Text>
        </View>

        {/* Working Hours */}
        <View style={styles.hoursContainer}>
          <Icon name="clock-outline" size={14} color="#666" />
          <Text style={styles.hours} numberOfLines={1}>
            {hours}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    backgroundColor: '#FFF',
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: CARD_WIDTH * 0.75,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  statusBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  category: {
    fontSize: 13,
    color: '#007AFF',
    fontWeight: '500',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: '#666',
    marginLeft: 2,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  location: {
    flex: 1,
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  hoursContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hours: {
    flex: 1,
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
});

export default BusinessCard; 