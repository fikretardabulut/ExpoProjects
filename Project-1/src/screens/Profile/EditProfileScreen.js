import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Platform,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    fullName: 'Fikret Arda Bulut',
    email: 'bilgi@ardabulut.tr',
    phone: '+90 551 048 0556',
    location: 'Kayseri, Türkiye',
    bio: 'Akıllı şehir uygulaması kullanıcısı',
    notificationPreferences: {
      email: true,
      push: true,
      sms: false
    }
  });

  const handleSave = () => {
    // API call to update profile would go here
    Alert.alert(
      "Başarılı",
      "Profil bilgileriniz güncellendi.",
      [{ text: "Tamam", onPress: () => navigation.goBack() }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profili Düzenle</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Kaydet</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        {/* Profile Photo Section */}
        <View style={styles.photoSection}>
          <Image
            source={{ uri: 'https://images.catenasoft.com/public/uploads/medium/b0/54/9cd726073a42a0704d6feee18aee.jpg' }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.changePhotoButton}>
            <Icon name="camera" size={20} color="#FFF" />
            <Text style={styles.changePhotoText}>Fotoğrafı Değiştir</Text>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Ad Soyad</Text>
            <TextInput
              style={styles.input}
              value={formData.fullName}
              onChangeText={(text) => setFormData({ ...formData, fullName: text })}
              placeholder="Ad Soyad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>E-posta</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              placeholder="E-posta"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Telefon</Text>
            <TextInput
              style={styles.input}
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
              placeholder="Telefon"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Konum</Text>
            <TouchableOpacity style={styles.locationInput}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                value={formData.location}
                onChangeText={(text) => setFormData({ ...formData, location: text })}
                placeholder="Konum"
              />
              <Icon name="map-marker" size={24} color="#007AFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Hakkımda</Text>
            <TextInput
              style={[styles.input, styles.bioInput]}
              value={formData.bio}
              onChangeText={(text) => setFormData({ ...formData, bio: text })}
              placeholder="Kendinizden bahsedin"
              multiline
              numberOfLines={4}
            />
          </View>

          {/* Notification Preferences */}
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>Bildirim Tercihleri</Text>
          </View>

          <View style={styles.notificationPreferences}>
            <TouchableOpacity
              style={styles.preferenceItem}
              onPress={() => setFormData({
                ...formData,
                notificationPreferences: {
                  ...formData.notificationPreferences,
                  email: !formData.notificationPreferences.email
                }
              })}
            >
              <Text style={styles.preferenceText}>E-posta Bildirimleri</Text>
              <Icon
                name={formData.notificationPreferences.email ? "checkbox-marked" : "checkbox-blank-outline"}
                size={24}
                color="#007AFF"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.preferenceItem}
              onPress={() => setFormData({
                ...formData,
                notificationPreferences: {
                  ...formData.notificationPreferences,
                  push: !formData.notificationPreferences.push
                }
              })}
            >
              <Text style={styles.preferenceText}>Anlık Bildirimler</Text>
              <Icon
                name={formData.notificationPreferences.push ? "checkbox-marked" : "checkbox-blank-outline"}
                size={24}
                color="#007AFF"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.preferenceItem, styles.lastPreferenceItem]}
              onPress={() => setFormData({
                ...formData,
                notificationPreferences: {
                  ...formData.notificationPreferences,
                  sms: !formData.notificationPreferences.sms
                }
              })}
            >
              <Text style={styles.preferenceText}>SMS Bildirimleri</Text>
              <Icon
                name={formData.notificationPreferences.sms ? "checkbox-marked" : "checkbox-blank-outline"}
                size={24}
                color="#007AFF"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
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
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  saveButton: {
    padding: 8,
  },
  saveButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  photoSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changePhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 12,
  },
  changePhotoText: {
    color: '#FFF',
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  formContainer: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 100 : 80,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  locationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 8,
    paddingRight: 12,
  },
  sectionTitle: {
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitleText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  notificationPreferences: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    overflow: 'hidden',
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  lastPreferenceItem: {
    borderBottomWidth: 0,
  },
  preferenceText: {
    fontSize: 16,
    color: '#333',
  },
});

export default EditProfileScreen;
