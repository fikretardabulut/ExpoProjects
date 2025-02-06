import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const languages = [
  { id: 'tr', name: 'Türkçe', localName: 'Türkçe' },
  { id: 'en', name: 'English', localName: 'English' },
  { id: 'de', name: 'German', localName: 'Deutsch' },
  { id: 'fr', name: 'French', localName: 'Français' },
  { id: 'es', name: 'Spanish', localName: 'Español' },
  { id: 'it', name: 'Italian', localName: 'Italiano' },
  { id: 'ru', name: 'Russian', localName: 'Русский' },
  { id: 'ar', name: 'Arabic', localName: 'العربية' },
];

const LanguageSettings = () => {
  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState('tr');

  const handleLanguageSelect = (langId) => {
    setSelectedLanguage(langId);
    // Burada dil değişikliği için gerekli işlemler yapılacak
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
        <Text style={styles.headerTitle}>Dil Seçimi</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.infoBox}>
          <Icon name="information" size={24} color="#007AFF" />
          <Text style={styles.infoText}>
            Seçtiğiniz dil, uygulamanın tüm arayüzünde kullanılacaktır.
          </Text>
        </View>

        <View style={styles.languageList}>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.id}
              style={styles.languageItem}
              onPress={() => handleLanguageSelect(lang.id)}
            >
              <View style={styles.languageInfo}>
                <Text style={styles.languageName}>{lang.name}</Text>
                <Text style={styles.languageLocalName}>{lang.localName}</Text>
              </View>
              {selectedLanguage === lang.id && (
                <Icon name="check" size={24} color="#007AFF" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.note}>
          Not: Dil değişikliği uygulamayı yeniden başlatabilir.
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
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F2FF',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
  },
  infoText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  languageList: {
    backgroundColor: '#FFF',
    marginTop: 20,
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
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  languageLocalName: {
    fontSize: 14,
    color: '#666',
  },
  note: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
});

export default LanguageSettings; 