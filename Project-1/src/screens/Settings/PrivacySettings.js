import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Platform,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const SettingItem = ({ icon, title, description, type = 'switch', value, onToggle, onPress }) => (
  <TouchableOpacity 
    style={styles.settingItem}
    onPress={type === 'arrow' ? onPress : null}
  >
    <View style={styles.settingInfo}>
      <View style={styles.settingIcon}>
        <Icon name={icon} size={22} color="#333" />
      </View>
      <View style={styles.settingTextContainer}>
        <Text style={styles.settingTitle}>{title}</Text>
        {description && (
          <Text style={styles.settingDescription}>{description}</Text>
        )}
      </View>
    </View>
    {type === 'switch' ? (
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#D1D1D6', true: '#007AFF' }}
        thumbColor={Platform.OS === 'ios' ? '#FFF' : value ? '#FFF' : '#F4F3F4'}
        ios_backgroundColor="#D1D1D6"
      />
    ) : (
      <Icon name="chevron-right" size={24} color="#666" />
    )}
  </TouchableOpacity>
);

const PrivacySettings = () => {
  const navigation = useNavigation();
  const [settings, setSettings] = useState({
    locationTracking: true,
    activityHistory: true,
    dataCollection: false,
    advertising: false,
    biometric: true,
    twoFactor: false,
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
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
        <Text style={styles.headerTitle}>Gizlilik</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Privacy Info */}
        <View style={styles.infoBox}>
          <Icon name="shield-check" size={24} color="#007AFF" />
          <Text style={styles.infoText}>
            Gizlilik ayarlarınızı özelleştirerek verilerinizin nasıl kullanılacağını kontrol edebilirsiniz.
          </Text>
        </View>

        {/* Location Privacy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Konum Gizliliği</Text>
          <View style={styles.settingsList}>
            <SettingItem
              icon="map-marker"
              title="Konum Takibi"
              description="Uygulama açıkken konumumu takip et"
              value={settings.locationTracking}
              onToggle={() => toggleSetting('locationTracking')}
            />
            <SettingItem
              icon="history"
              title="Konum Geçmişi"
              description="Konum geçmişimi kaydet"
              value={settings.activityHistory}
              onToggle={() => toggleSetting('activityHistory')}
            />
          </View>
        </View>

        {/* Data Privacy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Veri Gizliliği</Text>
          <View style={styles.settingsList}>
            <SettingItem
              icon="database"
              title="Veri Toplama"
              description="Kullanım verilerini topla"
              value={settings.dataCollection}
              onToggle={() => toggleSetting('dataCollection')}
            />
            <SettingItem
              icon="target"
              title="Kişiselleştirilmiş Reklamlar"
              description="İlgi alanlarıma göre reklamlar"
              value={settings.advertising}
              onToggle={() => toggleSetting('advertising')}
            />
          </View>
        </View>

        {/* Security */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Güvenlik</Text>
          <View style={styles.settingsList}>
            <SettingItem
              icon="fingerprint"
              title="Biyometrik Kimlik Doğrulama"
              description="Parmak izi veya yüz tanıma kullan"
              value={settings.biometric}
              onToggle={() => toggleSetting('biometric')}
            />
            <SettingItem
              icon="two-factor-authentication"
              title="İki Faktörlü Doğrulama"
              description="Ek güvenlik katmanı"
              value={settings.twoFactor}
              onToggle={() => toggleSetting('twoFactor')}
            />
          </View>
        </View>

        {/* Additional Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Diğer</Text>
          <View style={styles.settingsList}>
            <SettingItem
              icon="delete"
              title="Hesap Verilerini Sil"
              description="Tüm hesap verilerini kalıcı olarak sil"
              type="arrow"
              onPress={() => navigation.navigate('DeleteAccount')}
            />
            <SettingItem
              icon="download"
              title="Verilerimi İndir"
              description="Tüm verilerimin bir kopyasını al"
              type="arrow"
              onPress={() => navigation.navigate('DownloadData')}
            />
          </View>
        </View>

        <Text style={styles.note}>
          Gizlilik politikamız hakkında daha fazla bilgi için Yasal bölümünü ziyaret edin.
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
  settingsList: {
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
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  settingInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  settingDescription: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  note: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
});

export default PrivacySettings; 