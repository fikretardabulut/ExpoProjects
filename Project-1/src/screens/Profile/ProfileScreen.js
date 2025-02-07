import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userStats] = useState({
    reservations: 12,
    reviews: 8,
    favoritePlaces: 15
  });

  return (
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: 'https://images.catenasoft.com/public/uploads/medium/b0/54/9cd726073a42a0704d6feee18aee.jpg' }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editImageButton}>
            <Icon name="camera" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.name}>Fikret Arda Bulut</Text>
          <Text style={styles.email}>bilgi@ardabulut.tr</Text>
          <View style={styles.locationContainer}>
            <Icon name="map-marker" size={16} color="#007AFF" />
            <Text style={styles.location}>Kayseri, Türkiye</Text>
          </View>
        </View>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statColumn}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userStats.reservations}</Text>
            <Text style={styles.statLabel}>Randevular</Text>
          </View>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statColumn}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userStats.reviews}</Text>
            <Text style={styles.statLabel}>Değerlendirmeler</Text>
          </View>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statColumn}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userStats.favoritePlaces}</Text>
            <Text style={styles.statLabel}>Favori Mekanlar</Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => navigation.navigate('EditProfileScreen')}
        >
          <View style={[styles.actionIcon, { backgroundColor: '#F8F8F8' }]}>
            <Icon name="account-edit" size={24} color="#007AFF" />
          </View>
          <Text style={styles.actionText}>Profili Düzenle</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => navigation.navigate('ProfileNotificationScreen')}
        >
          <View style={[styles.actionIcon, { backgroundColor: '#F8F8F8' }]}>
            <Icon name="bell" size={24} color="#007AFF" />
          </View>
          <Text style={styles.actionText}>Bildirimler</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => navigation.navigate('SettingsScreen')}
        >
          <View style={[styles.actionIcon, { backgroundColor: '#F8F8F8' }]}>
            <Icon name="cog" size={24} color="#007AFF" />
          </View>
          <Text style={styles.actionText}>Ayarlar</Text>
        </TouchableOpacity>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('MyAppointments')}>
          <View style={[styles.menuIcon, { backgroundColor: '#F8F8F8' }]}>
            <Icon name="calendar-clock" size={24} color="#007AFF" />
          </View>
          <View style={styles.menuContent}>
            <Text style={styles.menuText}>Randevularım</Text>
            <Text style={styles.menuSubtext}>Tüm randevularınızı görüntüleyin</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#007AFF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('FavoritePlaces')}>
          <View style={[styles.menuIcon, { backgroundColor: '#F8F8F8' }]}>
            <Icon name="heart" size={24} color="#007AFF" />
          </View>
          <View style={styles.menuContent}>
            <Text style={styles.menuText}>Favori Mekanlarım</Text>
            <Text style={styles.menuSubtext}>Kaydettiğiniz mekanlar</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#007AFF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('MyReviews')}>
          <View style={[styles.menuIcon, { backgroundColor: '#F8F8F8' }]}>
            <Icon name="star" size={24} color="#007AFF" />
          </View>
          <View style={styles.menuContent}>
            <Text style={styles.menuText}>Değerlendirmelerim</Text>
            <Text style={styles.menuSubtext}>Yaptığınız tüm değerlendirmeler</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#007AFF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('AddressSettings')}>
          <View style={[styles.menuIcon, { backgroundColor: '#F8F8F8' }]}>
            <Icon name="map-marker" size={24} color="#007AFF" />
          </View>
          <View style={styles.menuContent}>
            <Text style={styles.menuText}>Kayıtlı Adreslerim</Text>
            <Text style={styles.menuSubtext}>Adres bilgilerinizi yönetin</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#007AFF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('SecuritySettings')}>
          <View style={[styles.menuIcon, { backgroundColor: '#F8F8F8' }]}>
            <Icon name="shield-check" size={24} color="#007AFF" />
          </View>
          <View style={styles.menuContent}>
            <Text style={styles.menuText}>Güvenlik Ayarları</Text>
            <Text style={styles.menuSubtext}>Hesap güvenliğinizi yönetin</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  contentContainer: {
    paddingBottom: 60,
  },
  header: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: '#FFF',
  },
  editImageButton: {
    position: 'absolute',
    right: -4,
    bottom: -4,
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerInfo: {
    alignItems: 'center',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginTop: -20,
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  statColumn: {
    flex: 1,
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#EFEFEF',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 24,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    marginTop: 12,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  actionText: {
    fontSize: 13,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
  menuContainer: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginHorizontal: 20,
    marginBottom: 30,
    marginTop: 12,
    padding: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F8F8',
  },
  menuIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  menuSubtext: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
});

export default ProfileScreen;
