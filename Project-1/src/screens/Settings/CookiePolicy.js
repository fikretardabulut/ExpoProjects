import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const CookieType = ({ title, description, enabled, onToggle }) => (
  <View style={styles.cookieItem}>
    <View style={styles.cookieInfo}>
      <Text style={styles.cookieTitle}>{title}</Text>
      <Text style={styles.cookieDescription}>{description}</Text>
    </View>
    <Switch
      value={enabled}
      onValueChange={onToggle}
      trackColor={{ false: '#D1D1D6', true: '#007AFF' }}
      thumbColor={Platform.OS === 'ios' ? '#FFF' : enabled ? '#FFF' : '#F4F3F4'}
      ios_backgroundColor="#D1D1D6"
    />
  </View>
);

const CookiePolicy = () => {
  const navigation = useNavigation();
  const [cookieSettings, setCookieSettings] = useState({
    necessary: true,
    functional: true,
    analytics: false,
    advertising: false,
  });

  const handleToggle = (type) => {
    if (type === 'necessary') return; // Zorunlu çerezler devre dışı bırakılamaz
    setCookieSettings(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleSaveSettings = () => {
    // Çerez ayarlarını kaydet
    navigation.goBack();
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
        <Text style={styles.headerTitle}>Çerez Politikası</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={[styles.content, { paddingBottom: 80 }]}>
          <View style={styles.infoBox}>
            <Icon name="cookie" size={24} color="#007AFF" />
            <Text style={styles.infoText}>
              Size daha iyi bir deneyim sunabilmek için çerezleri kullanıyoruz. 
              Çerez tercihlerinizi buradan yönetebilirsiniz.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Çerez Tercihleri</Text>
            
            <CookieType
              title="Zorunlu Çerezler"
              description="Bu çerezler, web sitesinin temel işlevleri için gereklidir ve devre dışı bırakılamaz."
              enabled={cookieSettings.necessary}
              onToggle={() => handleToggle('necessary')}
            />

            <CookieType
              title="İşlevsel Çerezler"
              description="Bu çerezler, dil tercihi gibi kişiselleştirilmiş özellikleri etkinleştirir."
              enabled={cookieSettings.functional}
              onToggle={() => handleToggle('functional')}
            />

            <CookieType
              title="Analitik Çerezler"
              description="Bu çerezler, web sitesi trafiğini analiz etmemize yardımcı olur."
              enabled={cookieSettings.analytics}
              onToggle={() => handleToggle('analytics')}
            />

            <CookieType
              title="Reklam Çerezleri"
              description="Bu çerezler, size kişiselleştirilmiş reklamlar göstermek için kullanılır."
              enabled={cookieSettings.advertising}
              onToggle={() => handleToggle('advertising')}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Çerez Kullanımı</Text>
            <Text style={styles.sectionText}>
              Çerezler, web sitemizin daha verimli çalışmasını sağlayan küçük metin 
              dosyalarıdır. Çerezleri aşağıdaki amaçlar için kullanıyoruz:
            </Text>
            <View style={styles.bulletPoints}>
              <Text style={styles.bulletPoint}>• Oturum yönetimi</Text>
              <Text style={styles.bulletPoint}>• Kullanıcı tercihlerinin hatırlanması</Text>
              <Text style={styles.bulletPoint}>• Site kullanımının analizi</Text>
              <Text style={styles.bulletPoint}>• Güvenlik önlemleri</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Çerez Süreleri</Text>
            <View style={styles.bulletPoints}>
              <Text style={styles.bulletPoint}>• Oturum çerezleri: Tarayıcı kapatıldığında silinir</Text>
              <Text style={styles.bulletPoint}>• Kalıcı çerezler: Belirli bir süre saklanır</Text>
              <Text style={styles.bulletPoint}>• Üçüncü taraf çerezleri: Harici hizmetler tarafından kullanılır</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSaveSettings}
          >
            <Text style={styles.saveButtonText}>Ayarları Kaydet</Text>
          </TouchableOpacity>

          <Text style={styles.lastUpdate}>
            Son güncelleme: 1 Mart 2024
          </Text>
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
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F2FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  section: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  sectionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  cookieItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  cookieInfo: {
    flex: 1,
    marginRight: 16,
  },
  cookieTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  cookieDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  bulletPoints: {
    marginLeft: 8,
  },
  bulletPoint: {
    fontSize: 14,
    color: '#666',
    lineHeight: 24,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  lastUpdate: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});

export default CookiePolicy; 