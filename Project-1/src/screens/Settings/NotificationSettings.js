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

const SettingItem = ({ icon, title, description, value, onToggle }) => (
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
    <Switch
      value={value}
      onValueChange={onToggle}
      trackColor={{ false: '#D1D1D6', true: '#007AFF' }}
      thumbColor={Platform.OS === 'ios' ? '#FFF' : value ? '#FFF' : '#F4F3F4'}
      ios_backgroundColor="#D1D1D6"
    />
  </View>
);

const NotificationSettings = () => {
  const navigation = useNavigation();
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    statusUpdates: true,
    promotionalMessages: false,
    soundEnabled: true,
    vibrationEnabled: true,
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
        <Text style={styles.headerTitle}>Bildirim Ayarları</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* Notification Channels */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bildirim Kanalları</Text>
          <View style={styles.settingsList}>
            <SettingItem
              icon="bell-ring"
              title="Anlık Bildirimler"
              description="Uygulama bildirimleri"
              value={settings.pushNotifications}
              onToggle={() => toggleSetting('pushNotifications')}
            />
            <SettingItem
              icon="email"
              title="E-posta Bildirimleri"
              description="E-posta ile bilgilendirme"
              value={settings.emailNotifications}
              onToggle={() => toggleSetting('emailNotifications')}
            />
            <SettingItem
              icon="message"
              title="SMS Bildirimleri"
              description="SMS ile bilgilendirme"
              value={settings.smsNotifications}
              onToggle={() => toggleSetting('smsNotifications')}
            />
          </View>
        </View>

        {/* Notification Types */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bildirim Türleri</Text>
          <View style={styles.settingsList}>
            <SettingItem
              icon="calendar-clock"
              title="Randevu Hatırlatmaları"
              description="Yaklaşan randevular için bildirim"
              value={settings.appointmentReminders}
              onToggle={() => toggleSetting('appointmentReminders')}
            />
            <SettingItem
              icon="information"
              title="Durum Güncellemeleri"
              description="İşlem durumu değişiklikleri"
              value={settings.statusUpdates}
              onToggle={() => toggleSetting('statusUpdates')}
            />
            <SettingItem
              icon="tag"
              title="Promosyon Mesajları"
              description="Kampanya ve fırsatlar"
              value={settings.promotionalMessages}
              onToggle={() => toggleSetting('promotionalMessages')}
            />
          </View>
        </View>

        {/* Alert Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Uyarı Ayarları</Text>
          <View style={styles.settingsList}>
            <SettingItem
              icon="volume-high"
              title="Bildirim Sesi"
              description="Bildirimlerde ses çal"
              value={settings.soundEnabled}
              onToggle={() => toggleSetting('soundEnabled')}
            />
            <SettingItem
              icon="vibrate"
              title="Titreşim"
              description="Bildirimlerde titreşim"
              value={settings.vibrationEnabled}
              onToggle={() => toggleSetting('vibrationEnabled')}
            />
          </View>
        </View>

        <Text style={styles.note}>
          Bildirim ayarlarını istediğiniz zaman değiştirebilirsiniz.
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

export default NotificationSettings; 