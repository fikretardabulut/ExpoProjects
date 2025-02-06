import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Platform,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const LegalItem = ({ icon, title, subtitle, onPress }) => (
  <TouchableOpacity style={styles.legalItem} onPress={onPress}>
    <View style={styles.legalIcon}>
      <Icon name={icon} size={22} color="#007AFF" />
    </View>
    <View style={styles.legalContent}>
      <Text style={styles.legalTitle}>{title}</Text>
      {subtitle && <Text style={styles.legalSubtitle}>{subtitle}</Text>}
    </View>
    <Icon name="chevron-right" size={24} color="#C7C7CC" />
  </TouchableOpacity>
);

const Legal = () => {
  const navigation = useNavigation();

  const handleOpenLink = (url) => {
    Linking.openURL(url);
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
        <Text style={styles.headerTitle}>Yasal</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Legal Documents */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Yasal Belgeler</Text>
          <View style={styles.legalList}>
            <LegalItem
              icon="shield-check"
              title="Gizlilik Politikası"
              subtitle="Verilerinizi nasıl kullandığımız hakkında bilgi"
              onPress={() => navigation.navigate('PrivacyPolicy')}
            />
            <LegalItem
              icon="file-document"
              title="Kullanım Koşulları"
              subtitle="Uygulama kullanım şartları"
              onPress={() => navigation.navigate('TermsOfService')}
            />
            <LegalItem
              icon="license"
              title="Lisans Bilgileri"
              subtitle="Açık kaynak lisansları ve telif hakları"
              onPress={() => navigation.navigate('Licenses')}
            />
          </View>
        </View>

        {/* Compliance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Uyumluluk</Text>
          <View style={styles.legalList}>
            <LegalItem
              icon="shield-lock"
              title="KVKK Uyumluluğu"
              subtitle="Kişisel Verilerin Korunması Kanunu"
              onPress={() => navigation.navigate('KVKKCompliance')}
            />
            <LegalItem
              icon="cookie"
              title="Çerez Politikası"
              subtitle="Çerez kullanımı hakkında bilgi"
              onPress={() => navigation.navigate('CookiePolicy')}
            />
            <LegalItem
              icon="security"
              title="Güvenlik Politikası"
              subtitle="Güvenlik önlemleri ve sertifikalar"
              onPress={() => navigation.navigate('SecurityPolicy')}
            />
          </View>
        </View>

        {/* Third Party */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Üçüncü Taraf</Text>
          <View style={styles.legalList}>
            <LegalItem
              icon="handshake"
              title="İş Ortakları"
              subtitle="İş ortaklarımız ve hizmet sağlayıcılarımız"
              onPress={() => navigation.navigate('Partners')}
            />
            <LegalItem
              icon="api"
              title="API Kullanım Şartları"
              subtitle="API kullanım koşulları ve limitleri"
              onPress={() => navigation.navigate('APITerms')}
            />
          </View>
        </View>

        {/* Contact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>İletişim</Text>
          <View style={styles.legalList}>
            <LegalItem
              icon="email"
              title="Yasal İletişim"
              subtitle="Hukuki konularda bizimle iletişime geçin"
              onPress={() => handleOpenLink('mailto:legal@smartcity.com')}
            />
            <LegalItem
              icon="frequently-asked-questions"
              title="Sıkça Sorulan Sorular"
              subtitle="Yasal konularda sık sorulan sorular"
              onPress={() => navigation.navigate('LegalFAQ')}
            />
          </View>
        </View>

        {/* Version Info */}
        <View style={styles.versionInfo}>
          <Text style={styles.versionText}>
            Bu belgelerin son güncellenme tarihi: 1 Mart 2024
          </Text>
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
  legalList: {
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
  legalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  legalIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  legalContent: {
    flex: 1,
  },
  legalTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  legalSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  versionInfo: {
    marginTop: 32,
    marginBottom: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
  },
});

export default Legal; 