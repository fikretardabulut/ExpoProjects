import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const AddNewAddress = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    title: '',
    fullName: '',
    phone: '',
    city: '',
    district: '',
    neighborhood: '',
    street: '',
    buildingNo: '',
    floor: '',
    apartmentNo: '',
    directions: '',
  });

  const handleSave = () => {
    if (!formData.title || !formData.fullName || !formData.phone || !formData.city || !formData.district) {
      Alert.alert('Uyarı', 'Lütfen zorunlu alanları doldurun');
      return;
    }

    // Adres kaydetme işlemi burada yapılacak
    Alert.alert('Başarılı', 'Adres başarıyla kaydedildi', [
      { text: 'Tamam', onPress: () => navigation.goBack() }
    ]);
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
        <Text style={styles.headerTitle}>Yeni Adres Ekle</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Kaydet</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={[styles.form, { paddingBottom: 80 }]}>
          {/* Adres Başlığı */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Adres Başlığı*</Text>
            <TextInput
              style={styles.input}
              placeholder="Örn: Ev, İş"
              value={formData.title}
              onChangeText={(text) => setFormData({ ...formData, title: text })}
            />
          </View>

          {/* Ad Soyad */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Ad Soyad*</Text>
            <TextInput
              style={styles.input}
              placeholder="Ad Soyad"
              value={formData.fullName}
              onChangeText={(text) => setFormData({ ...formData, fullName: text })}
            />
          </View>

          {/* Telefon */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Telefon*</Text>
            <TextInput
              style={styles.input}
              placeholder="Telefon Numarası"
              keyboardType="phone-pad"
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
            />
          </View>

          {/* İl */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>İl*</Text>
            <TextInput
              style={styles.input}
              placeholder="İl"
              value={formData.city}
              onChangeText={(text) => setFormData({ ...formData, city: text })}
            />
          </View>

          {/* İlçe */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>İlçe*</Text>
            <TextInput
              style={styles.input}
              placeholder="İlçe"
              value={formData.district}
              onChangeText={(text) => setFormData({ ...formData, district: text })}
            />
          </View>

          {/* Mahalle */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mahalle</Text>
            <TextInput
              style={styles.input}
              placeholder="Mahalle"
              value={formData.neighborhood}
              onChangeText={(text) => setFormData({ ...formData, neighborhood: text })}
            />
          </View>

          {/* Sokak */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Sokak</Text>
            <TextInput
              style={styles.input}
              placeholder="Sokak"
              value={formData.street}
              onChangeText={(text) => setFormData({ ...formData, street: text })}
            />
          </View>

          {/* Bina No */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Bina No</Text>
            <TextInput
              style={styles.input}
              placeholder="Bina No"
              value={formData.buildingNo}
              onChangeText={(text) => setFormData({ ...formData, buildingNo: text })}
            />
          </View>

          {/* Kat */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Kat</Text>
            <TextInput
              style={styles.input}
              placeholder="Kat"
              value={formData.floor}
              onChangeText={(text) => setFormData({ ...formData, floor: text })}
            />
          </View>

          {/* Daire No */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Daire No</Text>
            <TextInput
              style={styles.input}
              placeholder="Daire No"
              value={formData.apartmentNo}
              onChangeText={(text) => setFormData({ ...formData, apartmentNo: text })}
            />
          </View>

          {/* Adres Tarifi */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Adres Tarifi</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Adres Tarifi"
              multiline
              numberOfLines={4}
              value={formData.directions}
              onChangeText={(text) => setFormData({ ...formData, directions: text })}
            />
          </View>
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
  saveButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  saveButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  form: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default AddNewAddress; 