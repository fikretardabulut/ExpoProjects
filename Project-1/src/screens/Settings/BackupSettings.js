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

const BackupSettings = () => {
  const navigation = useNavigation();
  const [settings, setSettings] = useState({
    autoBackup: true,
    wifiOnly: true,
    includePhotos: true,
    includeDocuments: true,
  });

  const [lastBackup] = useState('2 saat önce');

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleBackupNow = () => {
    Alert.alert(
      'Yedekleme Başlat',
      'Verileriniz buluta yedeklenecek. Bu işlem birkaç dakika sürebilir.',
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Yedekle',
          onPress: () => {
            // Yedekleme işlemi başlatılacak
          }
        }
      ]
    );
  };

  const handleRestore = () => {
    Alert.alert(
      'Yedekten Geri Yükle',
      'En son yedekten verileriniz geri yüklenecek. Bu işlem mevcut verilerinizin üzerine yazacaktır.',
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Geri Yükle',
          style: 'destructive',
          onPress: () => {
            // Geri yükleme işlemi başlatılacak
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
        <Text style={styles.headerTitle}>Yedekleme</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Backup Status */}
        <View style={styles.statusCard}>
          <Icon name="cloud-check" size={32} color="#007AFF" />
          <View style={styles.statusInfo}>
            <Text style={styles.statusTitle}>Son Yedekleme</Text>
            <Text style={styles.statusTime}>{lastBackup}</Text>
          </View>
          <TouchableOpacity 
            style={styles.backupButton}
            onPress={handleBackupNow}
          >
            <Text style={styles.backupButtonText}>Şimdi Yedekle</Text>
          </TouchableOpacity>
        </View>

        {/* Auto Backup Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Otomatik Yedekleme</Text>
          <View style={styles.settingsList}>
            <SettingItem
              icon="cloud-upload"
              title="Otomatik Yedekleme"
              description="Verilerinizi düzenli olarak yedekleyin"
              value={settings.autoBackup}
              onToggle={() => toggleSetting('autoBackup')}
            />
            <SettingItem
              icon="wifi"
              title="Sadece Wi-Fi"
              description="Yalnızca Wi-Fi bağlantısında yedekle"
              value={settings.wifiOnly}
              onToggle={() => toggleSetting('wifiOnly')}
            />
          </View>
        </View>

        {/* Backup Content */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Yedekleme İçeriği</Text>
          <View style={styles.settingsList}>
            <SettingItem
              icon="image"
              title="Fotoğraflar ve Videolar"
              description="Medya dosyalarını yedekle"
              value={settings.includePhotos}
              onToggle={() => toggleSetting('includePhotos')}
            />
            <SettingItem
              icon="file-document"
              title="Belgeler"
              description="Belge ve dosyaları yedekle"
              value={settings.includeDocuments}
              onToggle={() => toggleSetting('includeDocuments')}
            />
          </View>
        </View>

        {/* Restore Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Geri Yükleme</Text>
          <View style={styles.settingsList}>
            <SettingItem
              icon="cloud-download"
              title="Yedekten Geri Yükle"
              description="En son yedekten verileri geri yükle"
              type="arrow"
              onPress={handleRestore}
            />
            <SettingItem
              icon="history"
              title="Yedekleme Geçmişi"
              description="Önceki yedeklemeleri görüntüle"
              type="arrow"
              onPress={() => navigation.navigate('BackupHistory')}
            />
          </View>
        </View>

        <Text style={styles.note}>
          Not: Yedekleme işlemi internet bağlantınızın hızına göre değişiklik gösterebilir.
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
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    margin: 16,
    padding: 20,
    borderRadius: 12,
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
  statusInfo: {
    flex: 1,
    marginLeft: 16,
  },
  statusTitle: {
    fontSize: 14,
    color: '#666',
  },
  statusTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 4,
  },
  backupButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  backupButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
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

export default BackupSettings; 