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
  Alert,
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

const SecuritySettings = () => {
  const navigation = useNavigation();
  const [settings, setSettings] = useState({
    biometricAuth: true,
    twoFactorAuth: false,
    rememberMe: true,
    screenLock: false,
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

  const handleResetSecurity = () => {
    Alert.alert(
      'Güvenlik Ayarlarını Sıfırla',
      'Tüm güvenlik ayarlarınız varsayılan değerlere döndürülecek. Devam etmek istiyor musunuz?',
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Sıfırla',
          style: 'destructive',
          onPress: () => {
            // Güvenlik ayarlarını sıfırlama işlemi
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
        <Text style={styles.headerTitle}>Güvenlik</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* Authentication */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kimlik Doğrulama</Text>
          <View style={styles.settingsList}>
            <SettingItem
              icon="fingerprint"
              title="Biyometrik Kimlik Doğrulama"
              description="Parmak izi veya yüz tanıma ile giriş"
              value={settings.biometricAuth}
              onToggle={() => toggleSetting('biometricAuth')}
            />
            <SettingItem
              icon="two-factor-authentication"
              title="İki Faktörlü Doğrulama"
              description="SMS veya e-posta ile ek güvenlik"
              value={settings.twoFactorAuth}
              onToggle={() => toggleSetting('twoFactorAuth')}
            />
            <SettingItem
              icon="key-change"
              title="Şifre Değiştir"
              description="Hesap şifrenizi güncelleyin"
              type="arrow"
              onPress={handleChangePassword}
            />
          </View>
        </View>

        {/* Security Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Güvenlik Seçenekleri</Text>
          <View style={styles.settingsList}>
            <SettingItem
              icon="account-check"
              title="Oturumu Açık Tut"
              description="Güvenli cihazlarda oturumu açık tut"
              value={settings.rememberMe}
              onToggle={() => toggleSetting('rememberMe')}
            />
            <SettingItem
              icon="cellphone-lock"
              title="Ekran Kilidi"
              description="Uygulama için ekran kilidi kullan"
              value={settings.screenLock}
              onToggle={() => toggleSetting('screenLock')}
            />
          </View>
        </View>

        {/* Security History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Güvenlik Geçmişi</Text>
          <View style={styles.settingsList}>
            <SettingItem
              icon="history"
              title="Oturum Geçmişi"
              description="Son giriş yapılan cihazlar"
              type="arrow"
              onPress={() => navigation.navigate('LoginHistory')}
            />
            <SettingItem
              icon="shield-alert"
              title="Güvenlik Aktiviteleri"
              description="Şüpheli aktivite bildirimleri"
              type="arrow"
              onPress={() => navigation.navigate('SecurityActivities')}
            />
          </View>
        </View>

        {/* Advanced */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gelişmiş</Text>
          <View style={styles.settingsList}>
            <SettingItem
              icon="refresh"
              title="Güvenlik Ayarlarını Sıfırla"
              description="Tüm güvenlik ayarlarını varsayılana döndür"
              type="arrow"
              onPress={handleResetSecurity}
            />
          </View>
        </View>

        <Text style={styles.note}>
          Güvenliğiniz için düzenli olarak şifrenizi değiştirmenizi öneririz.
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
  scrollViewContent: {
    paddingBottom: 80,
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

export default SecuritySettings; 