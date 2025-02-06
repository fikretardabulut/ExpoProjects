import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Switch,
  SafeAreaView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const SettingItem = ({ icon, title, description, value, onToggle, type = 'switch' }) => (
  <View style={styles.settingItem}>
    <View style={styles.settingInfo}>
      <View style={styles.settingIconContainer}>
        <Icon name={icon} size={22} color="#333" />
      </View>
      <View style={styles.settingTextContainer}>
        <Text style={styles.settingText}>{title}</Text>
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
  </View>
);

const NotificationSettingsScreen = () => {
  const navigation = useNavigation();
  const [settings, setSettings] = useState({
    sound: true,
    vibration: true,
    inAppNotifications: true,
    showPreview: true,
    grouping: true,
    doNotDisturb: false,
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
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bildirim Ayarları</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* General Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Genel Ayarlar</Text>
          <View style={styles.settingsList}>
            <SettingItem
              icon="volume-high"
              title="Bildirim Sesi"
              description="Bildirimlerde ses çal"
              value={settings.sound}
              onToggle={() => toggleSetting('sound')}
            />
            <SettingItem
              icon="vibrate"
              title="Titreşim"
              description="Bildirimlerde titreşim"
              value={settings.vibration}
              onToggle={() => toggleSetting('vibration')}
            />
            <SettingItem
              icon="bell-ring"
              title="Uygulama İçi Bildirimler"
              description="Uygulama açıkken bildirim göster"
              value={settings.inAppNotifications}
              onToggle={() => toggleSetting('inAppNotifications')}
            />
          </View>
        </View>

        {/* Privacy Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gizlilik</Text>
          <View style={styles.settingsList}>
            <SettingItem
              icon="eye"
              title="Bildirim Önizleme"
              description="Kilit ekranında içerik göster"
              value={settings.showPreview}
              onToggle={() => toggleSetting('showPreview')}
            />
            <SettingItem
              icon="folder"
              title="Bildirim Gruplandırma"
              description="Benzer bildirimleri grupla"
              value={settings.grouping}
              onToggle={() => toggleSetting('grouping')}
            />
          </View>
        </View>

        {/* Time Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Zaman Ayarları</Text>
          <View style={styles.settingsList}>
            <SettingItem
              icon="moon-waning-crescent"
              title="Rahatsız Etme"
              description="Belirli saatlerde bildirimleri sustur"
              value={settings.doNotDisturb}
              onToggle={() => toggleSetting('doNotDisturb')}
            />
            <SettingItem
              icon="clock-outline"
              title="Sessiz Saatler"
              description="Rahatsız etme zaman aralığını ayarla"
              type="navigation"
              onPress={() => {}}
            />
          </View>
        </View>

        {/* Advanced Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gelişmiş Ayarlar</Text>
          <View style={styles.settingsList}>
            <SettingItem
              icon="tune"
              title="Bildirim Kanalları"
              description="Bildirim türlerini özelleştir"
              type="navigation"
              onPress={() => {}}
            />
            <SettingItem
              icon="refresh"
              title="Varsayılana Sıfırla"
              description="Tüm bildirim ayarlarını sıfırla"
              type="navigation"
              onPress={() => {}}
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
    paddingHorizontal: 20,
    paddingVertical: 16,
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
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 16,
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 80, // Navigation bar height + extra padding
  },
  section: {
    backgroundColor: '#FFF',
    marginTop: 12,
    paddingVertical: 20,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    paddingHorizontal: 20,
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  settingsList: {
    paddingHorizontal: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  settingInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  settingIconContainer: {
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
  settingText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    letterSpacing: -0.3,
  },
  settingDescription: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
    letterSpacing: -0.2,
  },
});

export default NotificationSettingsScreen; 