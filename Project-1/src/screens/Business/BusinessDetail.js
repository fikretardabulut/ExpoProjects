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
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;

const ServiceCard = ({ title, price, duration, description, onPress }) => (
  <TouchableOpacity 
    style={styles.serviceCard}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.serviceHeader}>
      <Text style={styles.serviceTitle}>{title}</Text>
      <View style={styles.serviceMeta}>
        <Text style={styles.servicePrice}>{price} TL</Text>
        <Text style={styles.serviceDuration}>{duration} dk</Text>
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
  const [selectedTab, setSelectedTab] = useState('services');

  const businessData = {
    id: '1',
    name: 'Elit Güzellik Merkezi',
    rating: 4.8,
    reviewCount: 256,
    address: 'Bağdat Caddesi No: 123, Kadıköy/İstanbul',
    phone: '+90 (216) 123 45 67',
    workingHours: '09:00 - 20:00',
    description: 'Profesyonel ekibimiz ve son teknoloji cihazlarımızla sizlere en iyi hizmeti sunuyoruz. 10 yılı aşkın tecrübemizle güzellik ve bakım hizmetleri veriyoruz.',
    images: [
      'https://example.com/business1.jpg',
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
    
    if (!selectedService) {
      Alert.alert('Hata', 'Seçilen hizmet bulunamadı.');
      return;
    }

    if (!businessData.id) {
      Alert.alert('Hata', 'İşletme bilgisi bulunamadı.');
      return;
    }
    
    navigation.navigate('BookAppointment', {
      businessId: businessData.id,
      serviceId: serviceId,
      businessData: businessData,
      selectedService: {
        id: selectedService.id,
        title: selectedService.title,
        duration: selectedService.duration,
        price: selectedService.price,
      }
    });
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
        <Text style={styles.headerTitle}>{businessData.name}</Text>
        <TouchableOpacity
          onPress={handleShare}
          style={styles.shareButton}
        >
          <Icon name="share-variant" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
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
          <View style={styles.ratingRow}>
            <View style={styles.rating}>
              <Icon name="star" size={20} color="#FFB800" />
              <Text style={styles.ratingText}>{businessData.rating}</Text>
              <Text style={styles.reviewCount}>
                ({businessData.reviewCount} değerlendirme)
              </Text>
            </View>
            <TouchableOpacity style={styles.favoriteButton}>
              <Icon name="heart-outline" size={24} color="#FF4B4B" />
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
              <Icon name="clock" size={20} color="#666" />
              <Text style={styles.detailText}>{businessData.workingHours}</Text>
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
  shareButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  gallery: {
    height: 240,
  },
  galleryImage: {
    width: width,
    height: 240,
  },
  infoSection: {
    backgroundColor: '#FFF',
    padding: 16,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
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
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
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
  },
  servicesList: {
    gap: 12,
  },
  serviceCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
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
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  serviceMeta: {
    alignItems: 'flex-end',
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  serviceDuration: {
    fontSize: 13,
    color: '#666',
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
    borderRadius: 12,
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
  bottomButtons: {
    backgroundColor: '#FFF',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 4,
  },
  shareButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
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