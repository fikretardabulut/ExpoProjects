import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const AddressItem = ({ type, title, address, isDefault, onPress, onSetDefault, onDelete }) => (
  <View style={styles.addressItem}>
    <TouchableOpacity style={styles.addressContent} onPress={onPress}>
      <View style={styles.addressIcon}>
        <Icon 
          name={type === 'home' ? 'home' : type === 'work' ? 'briefcase' : 'map-marker'} 
          size={24} 
          color="#007AFF" 
        />
      </View>
      <View style={styles.addressInfo}>
        <View style={styles.addressHeader}>
          <Text style={styles.addressTitle}>{title}</Text>
          {isDefault && (
            <View style={styles.defaultBadge}>
              <Text style={styles.defaultText}>Varsayılan</Text>
            </View>
          )}
        </View>
        <Text style={styles.addressText} numberOfLines={2}>{address}</Text>
      </View>
    </TouchableOpacity>
    <View style={styles.addressActions}>
      {!isDefault && (
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={onSetDefault}
        >
          <Icon name="star-outline" size={22} color="#666" />
        </TouchableOpacity>
      )}
      <TouchableOpacity 
        style={styles.actionButton} 
        onPress={onDelete}
      >
        <Icon name="trash-can-outline" size={22} color="#FF3B30" />
      </TouchableOpacity>
    </View>
  </View>
);

const AddressSettings = () => {
  const navigation = useNavigation();
  const [addresses] = useState([
    {
      id: '1',
      type: 'home',
      title: 'Ev',
      address: 'Cumhuriyet Mahallesi, Şehit Pilot Caddesi No:12/3, Melikgazi, Kayseri',
      isDefault: true,
    },
    {
      id: '2',
      type: 'work',
      title: 'İş',
      address: 'Mimar Sinan Mahallesi, İnönü Bulvarı No:45, Kocasinan, Kayseri',
      isDefault: false,
    },
    {
      id: '3',
      type: 'other',
      title: 'Spor Salonu',
      address: 'Alparslan Mahallesi, Bahar Caddesi No:78, Melikgazi, Kayseri',
      isDefault: false,
    },
  ]);

  const handleAddAddress = () => {
    navigation.navigate('AddAddress');
  };

  const handleEditAddress = (address) => {
    navigation.navigate('EditAddress', { address });
  };

  const handleSetDefault = (addressId) => {
    // Varsayılan adres ayarlama işlemi
  };

  const handleDeleteAddress = (addressId) => {
    Alert.alert(
      'Adresi Sil',
      'Bu adresi silmek istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Sil',
          style: 'destructive',
          onPress: () => {
            // Adres silme işlemi
          }
        }
      ]
    );
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
        <Text style={styles.headerTitle}>Adres Bilgileri</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddAddress}
        >
          <Icon name="plus" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* Address List */}
        <View style={styles.addressList}>
          {addresses.map((address) => (
            <AddressItem
              key={address.id}
              {...address}
              onPress={() => handleEditAddress(address)}
              onSetDefault={() => handleSetDefault(address.id)}
              onDelete={() => handleDeleteAddress(address.id)}
            />
          ))}
        </View>

        {/* Add New Address Button */}
        <TouchableOpacity 
          style={styles.addAddressButton}
          onPress={handleAddAddress}
        >
          <Icon name="plus-circle-outline" size={24} color="#007AFF" />
          <Text style={styles.addAddressText}>Yeni Adres Ekle</Text>
        </TouchableOpacity>

        <Text style={styles.note}>
          Varsayılan adresiniz randevu oluştururken otomatik olarak seçilecektir.
        </Text>
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
  addButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 80,
  },
  addressList: {
    paddingTop: 16,
  },
  addressItem: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
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
  addressContent: {
    flexDirection: 'row',
    padding: 16,
  },
  addressIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  addressInfo: {
    flex: 1,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  defaultBadge: {
    backgroundColor: '#E8F2FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 8,
  },
  defaultText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  addressActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#EFEFEF',
  },
  addAddressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginTop: 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
  },
  addAddressText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#007AFF',
    marginLeft: 8,
  },
  note: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
});

export default AddressSettings; 