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

const RatingStars = ({ rating }) => (
  <View style={styles.ratingContainer}>
    {[1, 2, 3, 4, 5].map((star) => (
      <Icon
        key={star}
        name={star <= rating ? "star" : "star-outline"}
        size={16}
        color={star <= rating ? "#FFB800" : "#CCC"}
      />
    ))}
  </View>
);

const ReviewItem = ({ review, onPress }) => (
  <TouchableOpacity style={styles.reviewCard} onPress={onPress}>
    <View style={styles.reviewHeader}>
      <Image source={{ uri: review.placeImage }} style={styles.placeImage} />
      <View style={styles.reviewInfo}>
        <Text style={styles.placeName}>{review.placeName}</Text>
        <Text style={styles.reviewDate}>{review.date}</Text>
      </View>
      <RatingStars rating={review.rating} />
    </View>
    <Text style={styles.reviewText} numberOfLines={3}>{review.text}</Text>
    {review.images && review.images.length > 0 && (
      <View style={styles.imageGrid}>
        {review.images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.reviewImage} />
        ))}
      </View>
    )}
  </TouchableOpacity>
);

const MyReviews = () => {
  const navigation = useNavigation();
  const [reviews] = useState([
    {
      id: '1',
      placeName: 'Özel Dentist Ağız ve Diş Sağlığı Kliniği',
      placeImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800',
      rating: 5,
      date: '10 Mart 2024',
      text: 'Çok profesyonel bir klinik. Dr. Ahmet Bey son derece ilgili ve işinin ehli. Tüm tedavi sürecim boyunca kendimi çok rahat hissettim.',
      images: [
        'https://images.unsplash.com/photo-1629909615184-74f495363b67?w=800',
        'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800'
      ]
    },
    {
      id: '2',
      placeName: 'Kayseri Diş Hastanesi',
      placeImage: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?w=800',
      rating: 4,
      date: '5 Mart 2024',
      text: 'Genel olarak memnun kaldım. Bekleme süresi biraz uzun olsa da hizmet kalitesi iyiydi.',
      images: []
    },
  ]);

  const handleReviewPress = (review) => {
    navigation.navigate('ReviewDetails', { reviewId: review.id });
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
        <Text style={styles.headerTitle}>Değerlendirmelerim</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {reviews.map((review) => (
          <ReviewItem
            key={review.id}
            review={review}
            onPress={() => handleReviewPress(review)}
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
  reviewCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
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
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  placeImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  reviewInfo: {
    flex: 1,
  },
  placeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  reviewDate: {
    fontSize: 13,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 12,
  },
  imageGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  reviewImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
});

export default MyReviews; 