import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const StorageItem = ({ icon, title, size, color = '#333' }) => (
  <View style={styles.storageItem}>
    <View style={[styles.storageIcon, { backgroundColor: `${color}15` }]}>
      <Icon name={icon} size={24} color={color} />
    </View>
    <View style={styles.storageInfo}>
      <Text style={styles.storageTitle}>{title}</Text>
      <Text style={styles.storageSize}>{size}</Text>
    </View>
  </View>
);

const ActionButton = ({ icon, title, description, onPress }) => (
  <TouchableOpacity style={styles.actionButton} onPress={onPress}>
    <View style={styles.actionIcon}>
      <Icon name={icon} size={24} color="#007AFF" />
    </View>
    <View style={styles.actionInfo}>
      <Text style={styles.actionTitle}>{title}</Text>
      <Text style={styles.actionDescription}>{description}</Text>
    </View>
    <Icon name="chevron-right" size={24} color="#C7C7CC" />
  </TouchableOpacity>
);

const StorageSettings = () => {
  const navigation = useNavigation();
  const [storageData] = useState({
    total: '64 GB',
    used: '48.5 GB',
    available: '15.5 GB',
    breakdown: [
      { icon: 'image', title: 'Fotoğraflar', size: '12.4 GB', color: '#007AFF' },
      { icon: 'video', title: 'Videolar', size: '8.2 GB', color: '#FF2D55' },
      { icon: 'file-document', title: 'Belgeler', size: '2.1 GB', color: '#FF9500' },
      { icon: 'download', title: 'İndirilenler', size: '5.8 GB', color: '#34C759' },
      { icon: 'database', title: 'Uygulama Verileri', size: '15.6 GB', color: '#5856D6' },
      { icon: 'folder', title: 'Diğer', size: '4.4 GB', color: '#666' },
    ],
  });

  const handleClearCache = () => {
    Alert.alert(
      'Önbelleği Temizle',
      'Önbellek temizlenecek. Bu işlem geri alınamaz.',
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Temizle',
          style: 'destructive',
          onPress: () => {
            // Önbellek temizleme işlemi
          }
        }
      ]
    );
  };

  const handleOptimize = () => {
    Alert.alert(
      'Depolama Alanını Optimize Et',
      'Bu işlem gereksiz dosyaları temizleyecek ve depolama alanını optimize edecek.',
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Optimize Et',
          onPress: () => {
            // Optimizasyon işlemi
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
        <Text style={styles.headerTitle}>Depolama</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Storage Overview */}
        <View style={styles.overviewCard}>
          <View style={styles.storageOverview}>
            <Text style={styles.usedStorage}>{storageData.used}</Text>
            <Text style={styles.totalStorage}>/ {storageData.total} kullanılıyor</Text>
          </View>
          <Text style={styles.availableStorage}>
            {storageData.available} kullanılabilir
          </Text>
          <View style={styles.storageBar}>
            <View 
              style={[
                styles.storageBarFill,
                { width: `${(parseFloat(storageData.used) / parseFloat(storageData.total)) * 100}%` }
              ]} 
            />
          </View>
        </View>

        {/* Storage Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Depolama Alanı Kullanımı</Text>
          <View style={styles.breakdownList}>
            {storageData.breakdown.map((item, index) => (
              <StorageItem
                key={index}
                icon={item.icon}
                title={item.title}
                size={item.size}
                color={item.color}
              />
            ))}
          </View>
        </View>

        {/* Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Depolama Yönetimi</Text>
          <View style={styles.actionsList}>
            <ActionButton
              icon="broom"
              title="Önbelleği Temizle"
              description="Geçici dosyaları ve önbelleği temizle"
              onPress={handleClearCache}
            />
            <ActionButton
              icon="rocket-launch"
              title="Depolamayı Optimize Et"
              description="Gereksiz dosyaları temizle ve alanı optimize et"
              onPress={handleOptimize}
            />
            <ActionButton
              icon="cloud-upload"
              title="Yedekleme Ayarları"
              description="Otomatik yedekleme ve bulut depolama"
              onPress={() => navigation.navigate('BackupSettings')}
            />
          </View>
        </View>

        <Text style={styles.note}>
          Not: Depolama kullanımı yaklaşık değerlerdir ve değişiklik gösterebilir.
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
  overviewCard: {
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
  storageOverview: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  usedStorage: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
  },
  totalStorage: {
    fontSize: 16,
    color: '#666',
    marginLeft: 4,
  },
  availableStorage: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  storageBar: {
    height: 6,
    backgroundColor: '#EFEFEF',
    borderRadius: 3,
    marginTop: 16,
    overflow: 'hidden',
  },
  storageBarFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 3,
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
  breakdownList: {
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
  storageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  storageIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  storageInfo: {
    flex: 1,
  },
  storageTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  storageSize: {
    fontSize: 14,
    color: '#666',
  },
  actionsList: {
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
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionInfo: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 13,
    color: '#666',
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

export default StorageSettings; 