import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Platform,
  Image,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const SettingItem = ({ icon, title, subtitle, type = 'arrow', value, onPress, onToggle }) => (
  <TouchableOpacity 
    style={styles.settingItem}
    onPress={type === 'arrow' ? onPress : null}
  >
    <View style={styles.settingIcon}>
      <Icon name={icon} size={24} color="#007AFF" />
    </View>
    <View style={styles.settingContent}>
      <Text style={styles.settingTitle}>{title}</Text>
      {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
    </View>
    {type === 'arrow' && (
      <Icon name="chevron-right" size={24} color="#C7C7CC" />
    )}
    {type === 'switch' && (
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#D1D1D6', true: '#007AFF' }}
        thumbColor={Platform.OS === 'ios' ? '#FFF' : value ? '#FFF' : '#F4F3F4'}
        ios_backgroundColor="#D1D1D6"
      />
    )}
  </TouchableOpacity>
);

const SettingsScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ayarlar</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* Profile Section */}
        <TouchableOpacity style={styles.profileSection} onPress={() => navigation.navigate('EditProfile')}>
          <Image
            source={{ uri: 'https://images.catenasoft.com/public/uploads/medium/b0/54/9cd726073a42a0704d6feee18aee.jpg' }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Fikret Arda Bulut</Text>
            <Text style={styles.profileEmail}>bilgi@ardabulut.tr</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#C7C7CC" />
        </TouchableOpacity>

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hesap</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon="account-edit"
              title="Profil Bilgileri"
              subtitle="Ad, e-posta, telefon"
              onPress={() => navigation.navigate('ProfileDetails')}
            />
            <SettingItem
              icon="map-marker"

              title="Adres Bilgileri"
              subtitle="Ev, iş ve diğer adresler"
              onPress={() => navigation.navigate('AddressSettings')}
            />
            <SettingItem
              icon="shield-check"
              title="Güvenlik"
              subtitle="Şifre, kimlik doğrulama"
              onPress={() => navigation.navigate('SecuritySettings')}
            />
          </View>
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tercihler</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon="bell"
              title="Bildirimler"
              subtitle="Bildirim tercihleri ve ayarları"
              onPress={() => navigation.navigate('NotificationSettings')}
            />
            <SettingItem
              icon="translate"
              title="Dil"
              subtitle="Türkçe"
              onPress={() => navigation.navigate('LanguageSettings')}
            />
            <SettingItem
              icon="theme-light-dark"
              title="Görünüm"
              subtitle="Tema ve görsel tercihler"
              onPress={() => navigation.navigate('AppearanceSettings')}
            />
          </View>
        </View>

        {/* Privacy & Data */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gizlilik ve Veriler</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon="lock"
              title="Gizlilik Ayarları"
              subtitle="Veri kullanımı ve izinler"
              onPress={() => navigation.navigate('PrivacySettings')}
            />
            <SettingItem
              icon="database"
              title="Veri ve Depolama"
              subtitle="Önbellek ve depolama yönetimi"
              onPress={() => navigation.navigate('StorageSettings')}
            />
            <SettingItem
              icon="backup-restore"
              title="Yedekleme"
              subtitle="Veri yedekleme ve geri yükleme"
              onPress={() => navigation.navigate('BackupSettings')}
            />
          </View>
        </View>

        {/* Support & About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Destek ve Hakkında</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon="help-circle"
              title="Yardım Merkezi"
              subtitle="SSS ve destek"
              onPress={() => navigation.navigate('HelpCenter')}
            />
            <SettingItem
              icon="information"
              title="Hakkında"
              subtitle="Versiyon 1.0.0"
              onPress={() => navigation.navigate('About')}
            />
            <SettingItem
              icon="file-document"
              title="Yasal"
              subtitle="Gizlilik politikası ve koşullar"
              onPress={() => navigation.navigate('Legal')}
            />
          </View>
        </View>

        {/* Danger Zone */}
        <View style={[styles.section, styles.dangerSection]}>
          <View style={styles.sectionContent}>
            <TouchableOpacity 
              style={styles.dangerButton}
              onPress={() => {/* Handle logout */}}
            >
              <Icon name="logout" size={24} color="#FF3B30" />
              <Text style={styles.dangerButtonText}>Çıkış Yap</Text>
            </TouchableOpacity>
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
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
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
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    letterSpacing: -0.5,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 60,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF',
    marginBottom: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 20,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  sectionContent: {
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  settingIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  dangerSection: {
    marginTop: 20,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  dangerButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FF3B30',
    marginLeft: 8,
  },
});

export default SettingsScreen; 