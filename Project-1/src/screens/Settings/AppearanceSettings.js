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

const ThemeOption = ({ title, description, selected, onSelect }) => (
  <TouchableOpacity
    style={[styles.themeOption, selected && styles.selectedTheme]}
    onPress={onSelect}
  >
    <View style={styles.themeContent}>
      <Text style={[styles.themeTitle, selected && styles.selectedText]}>
        {title}
      </Text>
      <Text style={[styles.themeDescription, selected && styles.selectedText]}>
        {description}
      </Text>
    </View>
    {selected && <Icon name="check-circle" size={24} color="#007AFF" />}
  </TouchableOpacity>
);

const SettingItem = ({ icon, title, description, value, onToggle }) => (
  <View style={styles.settingItem}>
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
    <Switch
      value={value}
      onValueChange={onToggle}
      trackColor={{ false: '#D1D1D6', true: '#007AFF' }}
      thumbColor={Platform.OS === 'ios' ? '#FFF' : value ? '#FFF' : '#F4F3F4'}
      ios_backgroundColor="#D1D1D6"
    />
  </View>
);

const AppearanceSettings = () => {
  const navigation = useNavigation();
  const [theme, setTheme] = useState('system');
  const [settings, setSettings] = useState({
    darkMode: false,
    reducedMotion: false,
    increasedContrast: false,
    largeText: false,
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
        <Text style={styles.headerTitle}>Görünüm</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Theme Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tema</Text>
          <View style={styles.themeOptions}>
            <ThemeOption
              title="Sistem"
              description="Cihaz ayarlarını kullan"
              selected={theme === 'system'}
              onSelect={() => setTheme('system')}
            />
            <ThemeOption
              title="Açık"
              description="Her zaman açık tema"
              selected={theme === 'light'}
              onSelect={() => setTheme('light')}
            />
            <ThemeOption
              title="Koyu"
              description="Her zaman koyu tema"
              selected={theme === 'dark'}
              onSelect={() => setTheme('dark')}
            />
          </View>
        </View>

        {/* Display Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ekran Ayarları</Text>
          <View style={styles.settingsList}>
            <SettingItem
              icon="theme-light-dark"
              title="Otomatik Karanlık Mod"
              description="Gün batımında karanlık moda geç"
              value={settings.darkMode}
              onToggle={() => toggleSetting('darkMode')}
            />
            <SettingItem
              icon="motion-reduce"
              title="Azaltılmış Hareket"
              description="Animasyonları azalt"
              value={settings.reducedMotion}
              onToggle={() => toggleSetting('reducedMotion')}
            />
            <SettingItem
              icon="contrast-box"
              title="Yüksek Kontrast"
              description="Görünürlüğü artır"
              value={settings.increasedContrast}
              onToggle={() => toggleSetting('increasedContrast')}
            />
            <SettingItem
              icon="format-font-size-increase"
              title="Büyük Metin"
              description="Yazı boyutunu artır"
              value={settings.largeText}
              onToggle={() => toggleSetting('largeText')}
            />
          </View>
        </View>

        <Text style={styles.note}>
          Not: Bazı görünüm değişiklikleri uygulamayı yeniden başlatabilir.
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
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 16,
    marginBottom: 12,
  },
  themeOptions: {
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
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  selectedTheme: {
    backgroundColor: '#F0F9FF',
  },
  themeContent: {
    flex: 1,
  },
  themeTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  themeDescription: {
    fontSize: 14,
    color: '#666',
  },
  selectedText: {
    color: '#007AFF',
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
    marginTop: 20,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
});

export default AppearanceSettings; 