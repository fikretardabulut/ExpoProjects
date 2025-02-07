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

const PrivacyPolicy = () => {
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
        <Text style={styles.headerTitle}>Gizlilik Politikası</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={[styles.content, { paddingBottom: 80 }]}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Veri Toplama</Text>
            <Text style={styles.sectionText}>
              Uygulamamız, size daha iyi bir hizmet sunabilmek için bazı kişisel verilerinizi toplamaktadır. 
              Bu veriler şunları içerebilir:
            </Text>
            <View style={styles.bulletPoints}>
              <Text style={styles.bulletPoint}>• İsim ve iletişim bilgileri</Text>
              <Text style={styles.bulletPoint}>• Konum bilgileri</Text>
              <Text style={styles.bulletPoint}>• Kullanım istatistikleri</Text>
              <Text style={styles.bulletPoint}>• Cihaz bilgileri</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Veri Kullanımı</Text>
            <Text style={styles.sectionText}>
              Toplanan veriler aşağıdaki amaçlar için kullanılmaktadır:
            </Text>
            <View style={styles.bulletPoints}>
              <Text style={styles.bulletPoint}>• Hizmet kalitesini iyileştirme</Text>
              <Text style={styles.bulletPoint}>• Kişiselleştirilmiş deneyim sunma</Text>
              <Text style={styles.bulletPoint}>• Güvenlik ve doğrulama</Text>
              <Text style={styles.bulletPoint}>• Yasal yükümlülükler</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Veri Güvenliği</Text>
            <Text style={styles.sectionText}>
              Verilerinizin güvenliği bizim için önemlidir. Bu nedenle:
            </Text>
            <View style={styles.bulletPoints}>
              <Text style={styles.bulletPoint}>• SSL şifreleme kullanıyoruz</Text>
              <Text style={styles.bulletPoint}>• Düzenli güvenlik kontrolleri yapıyoruz</Text>
              <Text style={styles.bulletPoint}>• Erişim kısıtlamaları uyguluyoruz</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Veri Paylaşımı</Text>
            <Text style={styles.sectionText}>
              Verileriniz, yalnızca aşağıdaki durumlarda üçüncü taraflarla paylaşılabilir:
            </Text>
            <View style={styles.bulletPoints}>
              <Text style={styles.bulletPoint}>• Yasal zorunluluk durumunda</Text>
              <Text style={styles.bulletPoint}>• Açık rızanız olması halinde</Text>
              <Text style={styles.bulletPoint}>• Hizmet sağlayıcılarımızla</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. Haklarınız</Text>
            <Text style={styles.sectionText}>
              KVKK kapsamında aşağıdaki haklara sahipsiniz:
            </Text>
            <View style={styles.bulletPoints}>
              <Text style={styles.bulletPoint}>• Verilerinize erişim hakkı</Text>
              <Text style={styles.bulletPoint}>• Düzeltme talep etme hakkı</Text>
              <Text style={styles.bulletPoint}>• Silme talep etme hakkı</Text>
              <Text style={styles.bulletPoint}>• İşlemeyi kısıtlama hakkı</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>6. İletişim</Text>
            <Text style={styles.sectionText}>
              Gizlilik politikamız hakkında sorularınız için:
            </Text>
            <Text style={styles.contactInfo}>E-posta: privacy@example.com</Text>
            <Text style={styles.contactInfo}>Tel: +90 xxx xxx xx xx</Text>
          </View>

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
    fontSize: 14,
    color: '#007AFF',
    marginTop: 8,
  },
  lastUpdate: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
});

export default PrivacyPolicy; 