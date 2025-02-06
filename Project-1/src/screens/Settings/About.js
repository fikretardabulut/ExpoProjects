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
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const InfoItem = ({ icon, title, value }) => (
  <View style={styles.infoItem}>
    <View style={styles.infoIcon}>
      <Icon name={icon} size={22} color="#007AFF" />
    </View>
    <View style={styles.infoContent}>
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

const LinkItem = ({ icon, title, subtitle, onPress }) => (
  <TouchableOpacity style={styles.linkItem} onPress={onPress}>
    <View style={styles.linkIcon}>
      <Icon name={icon} size={22} color="#007AFF" />
    </View>
    <View style={styles.linkContent}>
      <Text style={styles.linkTitle}>{title}</Text>
      {subtitle && <Text style={styles.linkSubtitle}>{subtitle}</Text>}
    </View>
    <Icon name="chevron-right" size={24} color="#C7C7CC" />
  </TouchableOpacity>
);

const About = () => {
  const navigation = useNavigation();

  const handleWebsite = () => {
    Linking.openURL('https://www.smartcity.com');
  };

  const handleRateApp = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('https://apps.apple.com/app/id123456789');
    } else {
      Linking.openURL('https://play.google.com/store/apps/details?id=com.smartcity');
    }
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
        <Text style={styles.headerTitle}>Hakkında</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* App Info */}
        <View style={styles.appInfo}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.appLogo}
          />
          <Text style={styles.appName}>Smart City</Text>
          <Text style={styles.appVersion}>Versiyon 1.0.0 (Build 100)</Text>
        </View>

        {/* App Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Uygulama Bilgileri</Text>
          <View style={styles.infoList}>
            <InfoItem
              icon="update"
              title="Son Güncelleme"
              value="1 Mart 2024"
            />
            <InfoItem
              icon="cellphone"
              title="Minimum Gereksinim"
              value="iOS 13.0 / Android 8.0"
            />
            <InfoItem
              icon="translate"
              title="Desteklenen Diller"
              value="Türkçe, English, Deutsch"
            />
            <InfoItem
              icon="database"
              title="Veritabanı Versiyonu"
              value="v2.1.0"
            />
          </View>
        </View>

        {/* Links */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bağlantılar</Text>
          <View style={styles.linkList}>
            <LinkItem
              icon="web"
              title="Web Sitemiz"
              subtitle="www.smartcity.com"
              onPress={handleWebsite}
            />
            <LinkItem
              icon="star"
              title="Uygulamayı Değerlendir"
              subtitle="Bizi değerlendirerek gelişmemize yardımcı olun"
              onPress={handleRateApp}
            />
            <LinkItem
              icon="file-document"
              title="Lisans Bilgileri"
              subtitle="Açık kaynak lisansları"
              onPress={() => navigation.navigate('Licenses')}
            />
            <LinkItem
              icon="shield-check"
              title="Güvenlik Politikası"
              subtitle="Güvenlik bilgileri ve sertifikalar"
              onPress={() => navigation.navigate('SecurityPolicy')}
            />
          </View>
        </View>

        {/* Development */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Geliştirici</Text>
          <View style={styles.developerInfo}>
            <Text style={styles.developerText}>
              © 2024 Smart City Platform. Tüm hakları saklıdır.
            </Text>
            <Text style={styles.developerSubtext}>
              Türkiye'de ❤️ ile geliştirildi
            </Text>
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
    paddingBottom: 80, // Navigation bar height + extra padding
  },
  appInfo: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#FFF',
  },
  appLogo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  appVersion: {
    fontSize: 14,
    color: '#666',
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
  infoList: {
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
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  linkList: {
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
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  linkIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  linkContent: {
    flex: 1,
  },
  linkTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  linkSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  developerInfo: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginHorizontal: 16,
    padding: 20,
    alignItems: 'center',
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
  developerText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  developerSubtext: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
  },
});

export default About; 