import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Platform,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const ProfileField = ({ label, value, icon, onPress, editable = true }) => (
  <TouchableOpacity 
    style={styles.fieldContainer}
    onPress={onPress}
    disabled={!editable}
  >
    <View style={styles.fieldIcon}>
      <Icon name={icon} size={22} color="#007AFF" />
    </View>
    <View style={styles.fieldContent}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={[styles.fieldValue, !editable && styles.fieldValueDisabled]}>
        {value}
      </Text>
    </View>
    {editable && <Icon name="chevron-right" size={24} color="#C7C7CC" />}
  </TouchableOpacity>
);

const ProfileDetails = () => {
  const navigation = useNavigation();
  const [profileData] = useState({
    fullName: 'Fikret Arda Bulut',
    email: 'bilgi@ardabulut.tr',
    phone: '+90 551 048 0556',
    birthDate: '04.02.2006',
    gender: 'Erkek',
    occupation: 'Yazılım Geliştirici',
    bio: 'Akıllı şehir uygulaması kullanıcısı',
  });

  const handleEditField = (field) => {
    navigation.navigate('EditProfileField', { field, currentValue: profileData[field] });
  };

  const handleChangePhoto = () => {
    Alert.alert(
      'Profil Fotoğrafı',
      'Profil fotoğrafınızı değiştirmek için bir seçenek belirleyin',
      [
        { text: 'İptal', style: 'cancel' },
        { text: 'Kameradan Çek', onPress: () => {} },
        { text: 'Galeriden Seç', onPress: () => {} },
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
        <Text style={styles.headerTitle}>Profil Bilgileri</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* Profile Photo */}
        <View style={styles.photoSection}>
          <View style={styles.photoContainer}>
            <Image
              source={{ uri: 'https://images.catenasoft.com/public/uploads/medium/b0/54/9cd726073a42a0704d6feee18aee.jpg' }}
              style={styles.profilePhoto}
            />
            <TouchableOpacity 
              style={styles.changePhotoButton}
              onPress={handleChangePhoto}
            >
              <Icon name="camera" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
          
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kişisel Bilgiler</Text>
          <View style={styles.fieldsList}>
            <ProfileField
              label="Ad Soyad"
              value={profileData.fullName}
              icon="account"
              onPress={() => handleEditField('fullName')}
            />
            <ProfileField
              label="E-posta"
              value={profileData.email}
              icon="email"
              onPress={() => handleEditField('email')}
            />
            <ProfileField
              label="Telefon"
              value={profileData.phone}
              icon="phone"
              onPress={() => handleEditField('phone')}
            />
            <ProfileField
              label="Doğum Tarihi"
              value={profileData.birthDate}
              icon="calendar"
              onPress={() => handleEditField('birthDate')}
            />
            <ProfileField
              label="Cinsiyet"
              value={profileData.gender}
              icon="gender-male-female"
              onPress={() => handleEditField('gender')}
            />
          </View>
        </View>

        {/* Additional Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ek Bilgiler</Text>
          <View style={styles.fieldsList}>
            <ProfileField
              label="Meslek"
              value={profileData.occupation}
              icon="briefcase"
              onPress={() => handleEditField('occupation')}
            />
            <ProfileField
              label="Hakkımda"
              value={profileData.bio}
              icon="text"
              onPress={() => handleEditField('bio')}
            />
          </View>
        </View>

        {/* Account Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hesap Bilgileri</Text>
          <View style={styles.fieldsList}>
            <ProfileField
              label="Üyelik Tarihi"
              value="6 Şubat 2025"
              icon="clock"
              editable={false}
            />

            <ProfileField
              label="Hesap Durumu"
              value="Aktif"
              icon="shield-check"
              editable={false}
            />
          </View>
        </View>

        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => navigation.navigate('DeleteAccount')}
        >
          <Icon name="delete" size={20} color="#FF3B30" />
          <Text style={styles.deleteButtonText}>Hesabı Sil</Text>
        </TouchableOpacity>
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
    paddingBottom: 80,
  },
  photoSection: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#FFF',
  },
  photoContainer: {
    position: 'relative',
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changePhotoButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#007AFF',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  photoActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    padding: 8,
  },
  photoActionText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 16,
    marginBottom: 12,
  },
  fieldsList: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginHorizontal: 16,
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
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  fieldIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  fieldContent: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  fieldValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  fieldValueDisabled: {
    color: '#666',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    marginBottom: 16,
    padding: 16,
  },
  deleteButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#FF3B30',
    fontWeight: '500',
  },
});

export default ProfileDetails; 