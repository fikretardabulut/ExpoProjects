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

const KVKKCompliance = () => {
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
        <Text style={styles.headerTitle}>KVKK Uyumluluğu</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={[styles.content, { paddingBottom: 80 }]}>
          <View style={styles.infoBox}>
            <Icon name="shield-check" size={24} color="#007AFF" />
            <Text style={styles.infoText}>
              6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında haklarınız ve 
              verilerinizin nasıl işlendiği hakkında bilgi.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Veri Sorumlusu</Text>
            <Text style={styles.sectionText}>
              [Şirket Adı] olarak, veri sorumlusu sıfatıyla, kişisel verilerinizi 
              aşağıda açıklanan amaçlar kapsamında ve mevzuata uygun olarak işlemekteyiz.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Kişisel Verilerin İşlenme Amaçları</Text>
            <View style={styles.bulletPoints}>
              <Text style={styles.bulletPoint}>• Hizmet kalitesinin artırılması</Text>
              <Text style={styles.bulletPoint}>• Kullanıcı deneyiminin iyileştirilmesi</Text>
              <Text style={styles.bulletPoint}>• Yasal yükümlülüklerin yerine getirilmesi</Text>
              <Text style={styles.bulletPoint}>• Güvenliğin sağlanması</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Kişisel Veri Kategorileri</Text>
            <View style={styles.bulletPoints}>
              <Text style={styles.bulletPoint}>• Kimlik bilgileri</Text>
              <Text style={styles.bulletPoint}>• İletişim bilgileri</Text>
              <Text style={styles.bulletPoint}>• Kullanıcı işlem bilgileri</Text>
              <Text style={styles.bulletPoint}>• Konum bilgileri</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Haklarınız</Text>
            <Text style={styles.sectionText}>
              KVKK'nın 11. maddesi uyarınca sahip olduğunuz haklar:
            </Text>
            <View style={styles.bulletPoints}>
              <Text style={styles.bulletPoint}>• Kişisel verilerinizin işlenip işlenmediğini öğrenme</Text>
              <Text style={styles.bulletPoint}>• Kişisel verileriniz işlenmişse bilgi talep etme</Text>
              <Text style={styles.bulletPoint}>• İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</Text>
              <Text style={styles.bulletPoint}>• Yurt içinde / yurt dışında aktarıldığı 3. kişileri bilme</Text>
              <Text style={styles.bulletPoint}>• Eksik / yanlış işlenmişse düzeltilmesini isteme</Text>
              <Text style={styles.bulletPoint}>• KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde silinmesini isteme</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Başvuru Yöntemi</Text>
            <Text style={styles.sectionText}>
              Haklarınız kapsamındaki taleplerinizi aşağıdaki yöntemlerle iletebilirsiniz:
            </Text>
            <View style={styles.contactInfo}>
              <View style={styles.contactItem}>
                <Icon name="email" size={20} color="#007AFF" />
                <Text style={styles.contactText}>kvkk@catenasoft.tr</Text>
              </View>
              <View style={styles.contactItem}>
                <Icon name="map-marker" size={20} color="#007AFF" />
                <Text style={styles.contactText}>Melikgazi/Kayseri</Text>
              </View>
              <View style={styles.contactItem}>
                <Icon name="phone" size={20} color="#007AFF" />
                <Text style={styles.contactText}>+90 551 506 05 56</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.downloadButton}>
            <Icon name="download" size={20} color="#FFF" />
            <Text style={styles.downloadButtonText}>KVKK Aydınlatma Metnini İndir</Text>
          </TouchableOpacity>

          <Text style={styles.lastUpdate}>
            Son güncelleme:  05.03.2025
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
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 24,
    gap: 8,
  },
  downloadButtonText: {
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

export default KVKKCompliance; 