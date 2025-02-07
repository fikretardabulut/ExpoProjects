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

const TermsOfService = () => {
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
        <Text style={styles.headerTitle}>Kullanım Koşulları</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={[styles.content, { paddingBottom: 80 }]}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Genel Hükümler</Text>
            <Text style={styles.sectionText}>
              Bu uygulamayı kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız. 
              Bu koşulları kabul etmiyorsanız, lütfen uygulamayı kullanmayınız.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Hizmet Kullanımı</Text>
            <Text style={styles.sectionText}>
              Uygulamamızı kullanırken:
            </Text>
            <View style={styles.bulletPoints}>
              <Text style={styles.bulletPoint}>• Doğru ve güncel bilgi sağlamalısınız</Text>
              <Text style={styles.bulletPoint}>• Hesap güvenliğinizi korumalısınız</Text>
              <Text style={styles.bulletPoint}>• Yasalara uygun davranmalısınız</Text>
              <Text style={styles.bulletPoint}>• Başkalarının haklarına saygı göstermelisiniz</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Kullanıcı Sorumlulukları</Text>
            <Text style={styles.sectionText}>
              Kullanıcılar aşağıdaki durumlardan kaçınmalıdır:
            </Text>
            <View style={styles.bulletPoints}>
              <Text style={styles.bulletPoint}>• Yanıltıcı bilgi paylaşımı</Text>
              <Text style={styles.bulletPoint}>• Spam veya zararlı içerik</Text>
              <Text style={styles.bulletPoint}>• Yasadışı faaliyetler</Text>
              <Text style={styles.bulletPoint}>• Sistemin kötüye kullanımı</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Fikri Mülkiyet</Text>
            <Text style={styles.sectionText}>
              Uygulamamızdaki tüm içerik ve materyaller şirketimize aittir ve telif hakkı 
              yasaları ile korunmaktadır. İzinsiz kullanım yasaktır.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. Hizmet Değişiklikleri</Text>
            <Text style={styles.sectionText}>
              Şirketimiz, herhangi bir zamanda:
            </Text>
            <View style={styles.bulletPoints}>
              <Text style={styles.bulletPoint}>• Hizmetleri değiştirme</Text>
              <Text style={styles.bulletPoint}>• Fiyatları güncelleme</Text>
              <Text style={styles.bulletPoint}>• Özellikleri ekleme/kaldırma</Text>
              <Text style={styles.bulletPoint}>• Hizmeti sonlandırma</Text>
            </View>
            <Text style={styles.sectionText}>
              haklarını saklı tutar.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>6. Sorumluluk Reddi</Text>
            <Text style={styles.sectionText}>
              Hizmetlerimiz "olduğu gibi" sunulmaktadır. Kesintisiz veya hatasız hizmet 
              garantisi verilmemektedir.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>7. İletişim</Text>
            <Text style={styles.sectionText}>
              Kullanım koşulları hakkında sorularınız için:
            </Text>
            <Text style={styles.contactInfo}>E-posta: terms@example.com</Text>
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
    marginBottom: 12,
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

export default TermsOfService; 