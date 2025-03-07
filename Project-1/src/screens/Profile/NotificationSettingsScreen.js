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
  StatusBar,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const SettingItem = ({ icon, title, description, value, onToggle, type = 'switch', isLast = false }) => {
  const scale = new Animated.Value(1);

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <AnimatedTouchable 
      style={[
        styles.settingItem,
        !isLast && styles.settingItemBorder,
        { transform: [{ scale }] }
      ]}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={type === 'navigation' ? onToggle : undefined}
      activeOpacity={1}
    >
      <View style={styles.settingInfo}>
        <View style={[
          styles.settingIconContainer,
          { backgroundColor: value ? '#EBF5FF' : '#F8F9FA' }
        ]}>
          <Icon 
            name={icon} 
            size={22} 
            color={value ? '#007AFF' : '#666'} 
          />
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
          trackColor={{ false: '#E9ECEF', true: '#007AFF' }}
          thumbColor={'#FFF'}
          ios_backgroundColor="#E9ECEF"
          style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
        />
      ) : (
        <View style={styles.navigationButton}>
          <Text style={styles.navigationButtonText}>Düzenle</Text>
          <Icon name="chevron-right" size={20} color="#007AFF" />
        </View>
      )}
    </AnimatedTouchable>
  );
};


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
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon name="chevron-left" size={28} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bildirim Ayarları</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* General Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Genel Ayarlar</Text>
          <View style={styles.settingsList}>
            <SettingItem
              icon="bell-outline"
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
              isLast
            />
          </View>
        </View>

        {/* Privacy Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gizlilik</Text>
          <View style={styles.settingsList}>
            <SettingItem
              icon="eye-outline"
              title="Bildirim Önizleme"
              description="Kilit ekranında içerik göster"
              value={settings.showPreview}
              onToggle={() => toggleSetting('showPreview')}
            />
            <SettingItem
              icon="folder-outline"
              title="Bildirim Gruplandırma"
              description="Benzer bildirimleri grupla"
              value={settings.grouping}
              onToggle={() => toggleSetting('grouping')}
              isLast
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
              icon="clock-time-four-outline"
              title="Sessiz Saatler"
              description="Rahatsız etme zaman aralığını ayarla"
              type="navigation"
              onToggle={() => {}}
              isLast
            />
          </View>
        </View>

        {/* Advanced Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gelişmiş Ayarlar</Text>
          <View style={styles.settingsList}>
            <SettingItem
              icon="tune-vertical-variant"
              title="Bildirim Kanalları"
              description="Bildirim türlerini özelleştir"
              type="navigation"
              onToggle={() => {}}
            />
            <SettingItem
              icon="refresh"
              title="Varsayılana Sıfırla"
              description="Tüm bildirim ayarlarını sıfırla"
              type="navigation"
              onToggle={() => {}}
              isLast
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
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingTop: 16,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    paddingHorizontal: 16,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingsList: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginHorizontal: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
  },
  settingIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 2,
    letterSpacing: -0.2,
  },
  settingDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  navigationButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navigationButtonText: {
    fontSize: 15,
    color: '#007AFF',
    marginRight: 4,
  },
});

export default NotificationSettingsScreen; 