import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  ScrollView,
  Platform,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from 'react-native-geolocation-service';

const LocationPicker = ({ visible, onClose, onSelectLocation, currentLocation }) => {
  const [loading, setLoading] = useState(false);

  // Konum izni isteme fonksiyonu
  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const status = await Geolocation.requestAuthorization('whenInUse');
      return status === 'granted';
    }

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Konum İzni",
        message: "Mevcut konumunuzu kullanabilmek için konum iznine ihtiyacımız var.",
        buttonNeutral: "Daha Sonra Sor",
        buttonNegative: "İptal",
        buttonPositive: "Tamam"
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  // Mevcut konumu alma fonksiyonu
  const getCurrentLocation = async () => {
    setLoading(true);
    try {
      const hasPermission = await requestLocationPermission();
      
      if (!hasPermission) {
        Alert.alert('Hata', 'Konum izni verilmedi.');
        return;
      }

      Geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          // Burada Geocoding API ile koordinatları adrese çevirebilirsiniz
          // Şimdilik örnek olarak koordinatları kullanıyoruz
          const locationData = {
            id: 'current',
            name: 'Mevcut Konum',
            district: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
            coordinates: { latitude, longitude }
          };
          
          onSelectLocation(locationData);
          onClose();
        },
        (error) => {
          Alert.alert('Hata', 'Konum alınamadı. Lütfen tekrar deneyin.');
          console.log(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } catch (err) {
      Alert.alert('Hata', 'Konum alınırken bir hata oluştu.');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Örnek lokasyonlar - gerçek uygulamada API'den gelecek
  const locations = [
    { id: '1', name: 'Kayseri', district: 'Melikgazi' },
    { id: '2', name: 'Kayseri', district: 'Kocasinan' },
    { id: '3', name: 'Kayseri', district: 'Talas' },
    { id: '4', name: 'Kayseri', district: 'Develi' },
    { id: '5', name: 'Kayseri', district: 'Yahyalı' },
  ];

  const handleSelectLocation = (location) => {
    onSelectLocation(location);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Konum Seç</Text>
            <View style={styles.headerRight} />
          </View>

          {/* Current Location Button */}
          <TouchableOpacity 
            style={styles.currentLocationButton}
            onPress={getCurrentLocation}
            disabled={loading}
          >
            <Icon name="crosshairs-gps" size={24} color="#007AFF" />
            <Text style={styles.currentLocationText}>
              {loading ? 'Konum Alınıyor...' : 'Mevcut Konumu Kullan'}
            </Text>
          </TouchableOpacity>

          {/* Location List */}
          <ScrollView style={styles.locationList}>
            {locations.map((location) => (
              <TouchableOpacity
                key={location.id}
                style={styles.locationItem}
                onPress={() => handleSelectLocation(location)}
              >
                <View style={styles.locationInfo}>
                  <Text style={styles.locationName}>{location.name}</Text>
                  <Text style={styles.locationDistrict}>{location.district}</Text>
                </View>
                {currentLocation?.id === location.id && (
                  <Icon name="check" size={24} color="#007AFF" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#FFF',
    marginTop: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  closeButton: {
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
  currentLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  currentLocationText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  locationList: {
    flex: 1,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  locationDistrict: {
    fontSize: 14,
    color: '#666',
  },
});

export default LocationPicker; 