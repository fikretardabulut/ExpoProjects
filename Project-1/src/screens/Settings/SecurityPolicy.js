import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const SecurityPolicy = () => {
  const navigation = useNavigation();

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
        <Text style={styles.headerTitle}>Güvenlik Politikası</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={[styles.content, { paddingBottom: 80 }]}>
          <View style={styles.infoBox}>
            <Icon name="shield-lock" size={24} color="#007AFF" />
            <Text style={styles.infoText}>
              Verilerinizin güvenliği bizim için önemlidir. En son güvenlik teknolojilerini 
              kullanarak bilgilerinizi koruyoruz.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Veri Güvenliği</Text>
            <Text style={styles.sectionText}>
              Tüm verileriniz endüstri standardı güvenlik protokolleri ile korunmaktadır:
            </Text>
            <View style={styles.bulletPoints}>
              <Text style={styles.bulletPoint}>• 256-bit SSL şifreleme</Text>
              <Text style={styles.bulletPoint}>• End-to-end şifreleme</Text>
              <Text style={styles.bulletPoint}>• Güvenli veri depolama</Text>
              <Text style={styles.bulletPoint}>• Düzenli güvenlik denetimleri</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Kimlik Doğrulama</Text>
            <Text style={styles.sectionText}>
              Hesabınızın güvenliği için çok katmanlı kimlik doğrulama sistemleri kullanıyoruz:
            </Text>
            <View style={styles.bulletPoints}>
              <Text style={styles.bulletPoint}>• İki faktörlü kimlik doğrulama (2FA)</Text>
              <Text style={styles.bulletPoint}>• Biyometrik kimlik doğrulama</Text>
              <Text style={styles.bulletPoint}>• Güvenli şifre politikası</Text>
              <Text style={styles.bulletPoint}>• Oturum yönetimi ve izleme</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ödeme Güvenliği</Text>
            <Text style={styles.sectionText}>
              Ödeme işlemleriniz için en güvenli sistemleri kullanıyoruz:
            </Text>
            <View style={styles.bulletPoints}>
              <Text style={styles.bulletPoint}>• PCI DSS uyumlu altyapı</Text>
              <Text style={styles.bulletPoint}>• 3D Secure ödeme sistemi</Text>
              <Text style={styles.bulletPoint}>• Tokenization teknolojisi</Text>
              <Text style={styles.bulletPoint}>• Anlık dolandırıcılık tespiti</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Güvenlik İpuçları</Text>
            <View style={styles.bulletPoints}>
              <Text style={styles.bulletPoint}>• Güçlü şifreler kullanın</Text>
              <Text style={styles.bulletPoint}>• Şifrenizi kimseyle paylaşmayın</Text>
              <Text style={styles.bulletPoint}>• Düzenli olarak şifrenizi değiştirin</Text>
              <Text style={styles.bulletPoint}>• Şüpheli aktiviteleri bildirin</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>İletişim</Text>
            <Text style={styles.sectionText}>
              Güvenlikle ilgili sorularınız için:
            </Text>
            <View style={styles.contactInfo}>
              <View style={styles.contactItem}>
                <Icon name="email" size={20} color="#007AFF" />
                <Text style={styles.contactText}>security@example.com</Text>
              </View>
              <View style={styles.contactItem}>
                <Icon name="phone" size={20} color="#007AFF" />
                <Text style={styles.contactText}>0850 XXX XX XX</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.reportButton}>
            <Icon name="shield-alert" size={20} color="#FFF" />
            <Text style={styles.reportButtonText}>Güvenlik İhlali Bildir</Text>
          </TouchableOpacity>

          <Text style={styles.lastUpdate}>
            Son güncelleme: 1 Mart 2024
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
  content: {
    padding: 16,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F2FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  section: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  bulletPoints: {
    marginLeft: 8,
  },
  bulletPoint: {
    fontSize: 14,
    color: '#666',
    lineHeight: 24,
  },
  contactInfo: {
    marginTop: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#333',
  },
  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF3B30',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 24,
    gap: 8,
  },
  reportButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  lastUpdate: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});

export default SecurityPolicy; 