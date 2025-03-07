import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userStats] = useState({
    reservations: 12,
    reviews: 8,
    favoritePlaces: 15
  });

  const loadProfile = async () => {
    try {
      setLoading(true);
      
      // Token kontrolü
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        console.log('No access token found, redirecting to auth');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Auth' }],
        });
        return;
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock user data
      const mockUser = {
        full_name: 'Fikret Arda Bulut',
        email: 'ardablt2099@gmail.com',
        phone: '+90 551 506 0556',
        location: 'Kayseri',
        bio: 'Akıllı şehir uygulaması kullanıcısı',
        avatar: 'https://catenasoft.tr/9cd726073a42a0704d6feee18aee.jpg',
        created_at: '2024-02-09T08:47:46.693Z'
      };

      setUser(mockUser);
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      
    } catch (error) {
      console.error('Profile Screen - Load Error:', error);
      Alert.alert('Hata', 'Profil bilgileri alınamadı');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadProfile();
    });

    return unsubscribe;
  }, [navigation]);

  const handleImagePick = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Hata', 'Galeriye erişim izni gerekli');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        // Update local state with the new image
        setUser(prev => ({ ...prev, avatar: result.assets[0].uri }));
        
        // Update AsyncStorage
        const updatedUser = { ...user, avatar: result.assets[0].uri };
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Image Pick Error:', error);
      Alert.alert('Hata', 'Resim seçilirken bir hata oluştu');
    }
  };

  const handleCameraCapture = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Hata', 'Kamera erişim izni gerekli');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        // Update local state with the new image
        setUser(prev => ({ ...prev, avatar: result.assets[0].uri }));
        
        // Update AsyncStorage
        const updatedUser = { ...user, avatar: result.assets[0].uri };
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Camera Capture Error:', error);
      Alert.alert('Hata', 'Fotoğraf çekilirken bir hata oluştu');
    }
  };

  const handleAvatarPress = () => {
    Alert.alert(
      'Profil Resmi',
      'Profil resmi eklemek için bir seçenek belirleyin',
      [
        {
          text: 'Galeriden Seç',
          onPress: handleImagePick
        },
        {
          text: 'Fotoğraf Çek',
          onPress: handleCameraCapture
        },
        {
          text: 'İptal',
          style: 'cancel'
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Profil bilgileri yüklenemedi</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadProfile}>
          <Text style={styles.retryButtonText}>Tekrar Dene</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <TouchableOpacity onPress={handleAvatarPress}>
            <Image
              source={
                user?.avatar
                  ? { uri: user.avatar }
                  : require('../../assets/default-avatar.png')
              }
              style={styles.profileImage}
            />
            <View style={styles.editImageButton}>
              <Icon name="camera" size={18} color="#FFF" />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{user.full_name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        {user.location && (
          <View style={styles.locationContainer}>
            <Icon name="map-marker" size={16} color="#666" />
            <Text style={styles.location}>{user.location}</Text>
          </View>
        )}
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{userStats.reservations}</Text>
          <Text style={styles.statLabel}>Randevular</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{userStats.reviews}</Text>
          <Text style={styles.statLabel}>Değerlendirmeler</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{userStats.favoritePlaces}</Text>
          <Text style={styles.statLabel}>Favori Mekanlar</Text>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => navigation.navigate('EditProfileScreen')}
        >
          <Icon name="account-edit" size={24} color="#007AFF" style={styles.menuIcon} />
          <View style={styles.menuContent}>
            <Text style={styles.menuText}>Profili Düzenle</Text>
            <Text style={styles.menuSubtext}>Kişisel bilgilerinizi güncelleyin</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#C7C7CC" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => navigation.navigate('MyAppointments')}
        >
          <Icon name="calendar-clock" size={24} color="#007AFF" style={styles.menuIcon} />
          <View style={styles.menuContent}>
            <Text style={styles.menuText}>Randevularım</Text>
            <Text style={styles.menuSubtext}>Tüm randevularınızı görüntüleyin</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#C7C7CC" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => navigation.navigate('FavoritePlaces')}
        >
          <Icon name="heart" size={24} color="#007AFF" style={styles.menuIcon} />
          <View style={styles.menuContent}>
            <Text style={styles.menuText}>Favori Mekanlarım</Text>
            <Text style={styles.menuSubtext}>Kaydettiğiniz mekanlar</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#C7C7CC" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => navigation.navigate('ProfileNotificationScreen')}
        >
          <Icon name="bell" size={24} color="#007AFF" style={styles.menuIcon} />
          <View style={styles.menuContent}>
            <Text style={styles.menuText}>Bildirimler</Text>
            <Text style={styles.menuSubtext}>Bildirim tercihlerinizi yönetin</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#C7C7CC" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => navigation.navigate('SettingsScreen')}
        >
          <Icon name="cog" size={24} color="#007AFF" style={styles.menuIcon} />
          <View style={styles.menuContent}>
            <Text style={styles.menuText}>Ayarlar</Text>
            <Text style={styles.menuSubtext}>Uygulama ayarlarını düzenleyin</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#C7C7CC" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  contentContainer: {
    paddingBottom: 30,
  },
  header: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  editImageButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
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
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  statDivider: {
    width: 1,
    height: '70%',
    backgroundColor: '#E5E5EA',
    alignSelf: 'center',
  },
  menuContainer: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 45,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  menuIcon: {
    marginRight: 16,
    width: 24,
  },
  menuContent: {
    flex: 1,
  },
  menuText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  menuSubtext: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;
