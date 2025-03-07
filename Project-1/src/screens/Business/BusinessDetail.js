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
  Share,
  StatusBar,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = 60;
const GALLERY_HEIGHT = 240;

const ServiceCard = ({ title, price, duration, description, onPress }) => (
  <TouchableOpacity 
    style={styles.serviceCard}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.serviceHeader}>
      <View style={styles.serviceTitleContainer}>
        <Text style={styles.serviceTitle}>{title}</Text>
        <View style={styles.durationContainer}>
          <Icon name="clock-outline" size={14} color="#666" />
          <Text style={styles.serviceDuration}>{duration} dk</Text>
        </View>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.servicePrice}>{price} TL</Text>
        <Icon name="chevron-right" size={20} color="#007AFF" />
      </View>
    </View>
    <Text style={styles.serviceDescription} numberOfLines={2}>
      {description}
    </Text>
  </TouchableOpacity>
);

const ReviewCard = ({ name, rating, date, comment, avatar }) => (
  <View style={styles.reviewCard}>
    <View style={styles.reviewHeader}>
      <Image 
        source={{ uri: avatar }}
        style={styles.reviewerAvatar}
        defaultSource={require('../../../assets/placeholder-avatar.png')}
      />
      <View style={styles.reviewerInfo}>
        <Text style={styles.reviewerName}>{name}</Text>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map(star => (
            <Icon
              key={star}
              name={star <= rating ? "star" : "star-outline"}
              size={16}
              color="#FFB800"
            />
          ))}
          <Text style={styles.reviewDate}>{date}</Text>
        </View>
      </View>
    </View>
    <Text style={styles.reviewComment}>{comment}</Text>
  </View>
);

const BusinessDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedTab, setSelectedTab] = useState('services');
  const scrollY = new Animated.Value(0);

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, GALLERY_HEIGHT - HEADER_HEIGHT],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  
  // Get the business data from route params
  const { 
    businessId,
    businessName,
    businessImage,
    businessCategory,
    businessRating,
    businessReviewCount,
    businessLocation,
    businessHours,
    businessIsOpen
  } = route.params;

  // In a real app, you would fetch additional business data using the businessId
  // For now, we'll combine route params with some hardcoded data
  const businessData = {
    id: businessId,
    name: businessName,
    rating: businessRating,
    reviewCount: businessReviewCount,
    address: businessLocation,
    phone: '+90 (216) 123 45 67',
    workingHours: businessHours,
    description: 'Profesyonel ekibimiz ve son teknoloji cihazlarımızla sizlere en iyi hizmeti sunuyoruz. 10 yılı aşkın tecrübemizle güzellik ve bakım hizmetleri veriyoruz.',
    images: [
      businessImage,
      'https://example.com/business2.jpg',
      'https://example.com/business3.jpg',
    ],
    services: [
      {
        id: '1',
        title: 'Klasik Manikür',
        price: 150,
        duration: 45,
        description: 'Tırnak bakımı, şekillendirme ve cilalama işlemlerini içerir.',
      },
      {
        id: '2',
        title: 'Protez Tırnak',
        price: 400,
        duration: 90,
        description: 'Kalıcı ve doğal görünümlü protez tırnak uygulaması.',
      },
      {
        id: '3',
        title: 'Kalıcı Oje',
        price: 200,
        duration: 60,
        description: '2-3 hafta dayanıklı, UV ile kurutulan özel oje uygulaması.',
      },
    ],
    reviews: [
      {
        id: '1',
        name: 'Ayşe Y.',
        rating: 5,
        date: '2 gün önce',
        comment: 'Çok memnun kaldım, personel çok ilgili ve profesyonel. Kesinlikle tavsiye ederim.',
        avatar: 'https://example.com/avatar1.jpg',
      },
      {
        id: '2',
        name: 'Zeynep K.',
        rating: 4,
        date: '1 hafta önce',
        comment: 'Hizmet kalitesi çok iyi, fiyatlar biraz yüksek ama değer.',
        avatar: 'https://example.com/avatar2.jpg',
      },
    ],
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${businessData.name}\n${businessData.address}\nTel: ${businessData.phone}`,
        title: businessData.name,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleBooking = (serviceId) => {
    const selectedService = businessData.services.find(service => service.id === serviceId);
    navigation.navigate('BookAppointment', { 
      businessId: businessId,
      businessName: businessData.name,
      serviceId: selectedService.id,
      serviceName: selectedService.title,
      servicePrice: selectedService.price,
      serviceDuration: selectedService.duration,
      businessImage: businessImage,
      businessCategory: businessCategory,
      businessIsOpen: businessIsOpen
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Animated Header */}
      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{businessData.name}</Text>
        <TouchableOpacity
          onPress={handleShare}
          style={styles.shareButton}
        >
          <Icon name="share-variant" size={24} color="#333" />
        </TouchableOpacity>
      </Animated.View>

      {/* Absolute positioned back button for gallery */}
      <TouchableOpacity
        style={styles.galleryBackButton}
        onPress={() => navigation.goBack()}
      >
        <View style={styles.galleryBackButtonContainer}>
          <Icon name="arrow-left" size={24} color="#FFF" />
        </View>
      </TouchableOpacity>

      <Animated.ScrollView 
        style={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {/* Image Gallery */}
        <ScrollView 
          horizontal 
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.gallery}
        >
          {businessData.images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              style={styles.galleryImage}
              resizeMode="cover"
            />
          ))}
        </ScrollView>

        {/* Business Info */}
        <View style={styles.infoSection}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{businessCategory}</Text>
          </View>
          
          <Text style={styles.businessName}>{businessData.name}</Text>
          
          <View style={styles.ratingRow}>
            <View style={styles.rating}>
              <Icon name="star" size={20} color="#FFB800" />
              <Text style={styles.ratingText}>{businessData.rating}</Text>
              <Text style={styles.reviewCount}>
                ({businessData.reviewCount} değerlendirme)
              </Text>
            </View>
            <TouchableOpacity style={styles.favoriteButton}>
              <Icon name="heart" size={24} color="#FF3B30" />
            </TouchableOpacity>
          </View>

          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <Icon name="map-marker" size={20} color="#666" />
              <Text style={styles.detailText}>{businessData.address}</Text>
            </View>
            <View style={styles.detailItem}>
              <Icon name="phone" size={20} color="#666" />
              <Text style={styles.detailText}>{businessData.phone}</Text>
            </View>
            <View style={styles.detailItem}>
              <Icon 
                name="clock" 
                size={20} 
                color={businessIsOpen ? "#4CAF50" : "#FF3B30"} 
              />
              <Text 
                style={[
                  styles.detailText, 
                  { color: businessIsOpen ? "#4CAF50" : "#FF3B30" }
                ]}
              >
                {businessIsOpen ? "Açık" : "Kapalı"} • {businessData.workingHours}
              </Text>
            </View>
          </View>

          <Text style={styles.description}>{businessData.description}</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'services' && styles.tabActive]}
            onPress={() => setSelectedTab('services')}
          >
            <Text style={[
              styles.tabText,
              selectedTab === 'services' && styles.tabTextActive
            ]}>
              Hizmetler
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'reviews' && styles.tabActive]}
            onPress={() => setSelectedTab('reviews')}
          >
            <Text style={[
              styles.tabText,
              selectedTab === 'reviews' && styles.tabTextActive
            ]}>
              Değerlendirmeler
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        <View style={styles.tabContent}>
          {selectedTab === 'services' ? (
            <View style={styles.servicesList}>
              {businessData.services.map(service => (
                <ServiceCard
                  key={service.id}
                  {...service}
                  onPress={() => handleBooking(service.id)}
                />
              ))}
            </View>
          ) : (
            <View style={styles.reviewsList}>
              {businessData.reviews.map(review => (
                <ReviewCard
                  key={review.id}
                  {...review}
                />
              ))}
              <TouchableOpacity style={styles.allReviewsButton}>
                <Text style={styles.allReviewsText}>
                  Tüm Değerlendirmeleri Gör
                </Text>
                <Icon name="chevron-right" size={20} color="#007AFF" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Animated.ScrollView>

    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    zIndex: 1000,
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
  galleryBackButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 44 : 16,
    left: 16,
    zIndex: 1000,
  },
  galleryBackButtonContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  shareButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  gallery: {
    height: GALLERY_HEIGHT,
  },
  galleryImage: {
    width: width,
    height: GALLERY_HEIGHT,
  },
  infoSection: {
    backgroundColor: '#FFF',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 12,
  },
  categoryText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
  },
  businessName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  reviewCount: {
    fontSize: 14,
    color: '#666',
  },
  favoriteButton: {
    padding: 8,
  },
  detailsRow: {
    gap: 12,
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  tabTextActive: {
    color: '#007AFF',
    fontWeight: '600',
  },
  tabContent: {
    padding: 16,
    paddingBottom: 100,
  },
  servicesList: {
    gap: 12,
  },
  serviceCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
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
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceTitleContainer: {
    flex: 1,
    marginRight: 16,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  serviceDuration: {
    fontSize: 13,
    color: '#666',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  reviewsList: {
    gap: 16,
  },
  reviewCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
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
    marginBottom: 12,
  },
  reviewerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  reviewDate: {
    fontSize: 13,
    color: '#666',
    marginLeft: 8,
  },
  reviewComment: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  allReviewsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 4,
  },
  allReviewsText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  bottomButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
  },
  bookButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BusinessDetail; 