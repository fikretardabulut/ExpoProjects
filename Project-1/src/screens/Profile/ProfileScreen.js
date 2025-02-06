import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
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
    <ScrollView style={styles.container}>
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
            <Icon name="map-marker" size={16} color="#666" />
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
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('EditProfileScreen')}>
          <Icon name="account-edit" size={24} color="#007AFF" />
          <Text style={styles.actionText}>Profili Düzenle</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('ProfileNotificationScreen')}>
          <Icon name="bell" size={24} color="#007AFF" />
          <Text style={styles.actionText}>Bildirimler</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('SettingsScreen')}>
          <Icon name="cog" size={24} color="#007AFF" />
          <Text style={styles.actionText}>Ayarlar</Text>
        </TouchableOpacity>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('MyReservations')}>
          <Icon name="calendar-clock" size={24} color="#333" />
          <Text style={styles.menuText}>Randevularım</Text>
          <Icon name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('FavoritePlaces')}>
          <Icon name="heart" size={24} color="#333" />
          <Text style={styles.menuText}>Favori Mekanlarım</Text>
          <Icon name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('MyReviews')}>
          <Icon name="star" size={24} color="#333" />
          <Text style={styles.menuText}>Değerlendirmelerim</Text>
          <Icon name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('SavedAddresses')}>
          <Icon name="map-marker" size={24} color="#333" />
          <Text style={styles.menuText}>Kayıtlı Adreslerim</Text>
          <Icon name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('SecuritySettings')}>
          <Icon name="shield-check" size={24} color="#333" />
          <Text style={styles.menuText}>Güvenlik Ayarları</Text>
          <Icon name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, styles.logoutButton]} onPress={() => {}}>
          <Icon name="logout" size={24} color="#FF3B30" />
          <Text style={[styles.menuText, styles.logoutText]}>Çıkış Yap</Text>
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
  header: {
    backgroundColor: '#FFF',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editImageButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 20,
    elevation: 2,
  },
  headerInfo: {
    alignItems: 'center',
    marginTop: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingVertical: 15,
    marginTop: 10,
    alignItems: 'center',
  },
  statColumn: {
    flex: 1,
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    width: '100%',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#EFEFEF',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFF',
    padding: 15,
    marginTop: 10,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    fontSize: 12,
    color: '#007AFF',
    marginTop: 4,
  },
  menuContainer: {
    backgroundColor: '#FFF',
    marginTop: 10,
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  logoutButton: {
    marginTop: 10,
  },
  logoutText: {
    color: '#FF3B30',
  },
});

export default ProfileScreen;
