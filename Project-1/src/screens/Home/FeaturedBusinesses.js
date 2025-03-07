import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  TextInput,
  FlatList,
  Dimensions,
  RefreshControl,
  StatusBar,
  Image,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import BusinessCard from '../../components/BusinessCard';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32; // Tek kolon için tam genişlik

const FilterButton = ({ title, isActive, onPress, icon }) => (
  <TouchableOpacity
    style={[styles.filterButton, isActive && styles.filterButtonActive]}
    onPress={onPress}
  >
    <Icon name={icon} size={20} color={isActive ? '#007AFF' : '#666'} />
    <Text style={[styles.filterButtonText, isActive && styles.filterButtonTextActive]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const FeaturedBusinesses = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const filters = [
    { id: 'all', title: 'Tümü', icon: 'apps' },
    { id: 'open', title: 'Açık', icon: 'clock-outline' },
    { id: 'rating', title: 'En İyi', icon: 'star-outline' },
    { id: 'distance', title: 'En Yakın', icon: 'map-marker-outline' },
  ];

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
    }
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const handleBusinessPress = (business) => {
    navigation.navigate('BusinessDetail', {
      businessId: business.id,
      businessName: business.name,
      businessImage: business.image,
      businessCategory: business.category,
      businessRating: business.rating,
      businessReviewCount: business.reviewCount,
      businessLocation: business.location,
      businessHours: business.hours,
      businessIsOpen: business.isOpen,
      businessPhone: business.phone,
      businessDescription: business.description,
      businessServices: business.services
    });
  };

  const handleFilterPress = () => {
    setShowFilterModal(true);
  };

  const renderFilterModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showFilterModal}
      onRequestClose={() => setShowFilterModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filtrele</Text>
            <TouchableOpacity 
              onPress={() => setShowFilterModal(false)}
              style={styles.closeButton}
            >
              <Icon name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalBody}>
            {filters.map(filter => (
              <TouchableOpacity
                key={filter.id}
                style={[
                  styles.modalFilterButton,
                  activeFilter === filter.id && styles.modalFilterButtonActive
                ]}
                onPress={() => {
                  setActiveFilter(filter.id);
                  setShowFilterModal(false);
                }}
              >
                <Icon 
                  name={filter.icon} 
                  size={24} 
                  color={activeFilter === filter.id ? '#007AFF' : '#666'} 
                />
                <Text style={[
                  styles.modalFilterText,
                  activeFilter === filter.id && styles.modalFilterTextActive
                ]}>
                  {filter.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const renderBusinessCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.cardContainer}
      onPress={() => handleBusinessPress(item)}
      activeOpacity={0.9}
    >
      <BusinessCard {...item} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-left" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Öne Çıkan İşletmeler</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="İşletme veya hizmet ara..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      {/* Filters */}
      <View style={styles.filtersWrapper}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
          {filters.map(filter => (
            <FilterButton
              key={filter.id}
              title={filter.title}
              icon={filter.icon}
              isActive={activeFilter === filter.id}
              onPress={() => setActiveFilter(filter.id)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Business List */}
      <FlatList
        data={businesses}
        renderItem={renderBusinessCard}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.columnWrapper}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#007AFF"
          />
        }
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        ListHeaderComponent={() => <View style={{ height: 8 }} />}
        ListFooterComponent={() => <View style={{ height: 20 }} />}
      />
      
      {renderFilterModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFF',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  headerRight: {
    width: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    marginHorizontal: 16,
    marginVertical: 8,
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
  filtersWrapper: {
    backgroundColor: '#FFF',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F5',
  },
  filtersContainer: {
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
  listContainer: {
    padding: 16,
    paddingTop: 8,
  },
  columnWrapper: {
    gap: 16,
    justifyContent: 'space-between',
  },
  cardContainer: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: Platform.OS === 'ios' ? 34 : 24,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F5',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    padding: 16,
  },
  modalFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#F8F9FA',
    gap: 12,
  },
  modalFilterButtonActive: {
    backgroundColor: '#EBF5FF',
  },
  modalFilterText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  modalFilterTextActive: {
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default FeaturedBusinesses; 