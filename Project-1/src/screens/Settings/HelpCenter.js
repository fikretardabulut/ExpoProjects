import React, { useState } from 'react';
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

const FAQItem = ({ question, answer, isOpen, onToggle }) => (
  <View style={styles.faqItem}>
    <TouchableOpacity 
      style={styles.faqHeader}
      onPress={onToggle}
    >
      <Text style={styles.faqQuestion}>{question}</Text>
      <Icon 
        name={isOpen ? "chevron-up" : "chevron-down"} 
        size={24} 
        color="#666"
      />
    </TouchableOpacity>
    {isOpen && (
      <View style={styles.faqAnswer}>
        <Text style={styles.faqAnswerText}>{answer}</Text>
      </View>
    )}
  </View>
);

const SupportOption = ({ icon, title, description, onPress }) => (
  <TouchableOpacity style={styles.supportOption} onPress={onPress}>
    <View style={styles.supportIcon}>
      <Icon name={icon} size={24} color="#007AFF" />
    </View>
    <View style={styles.supportInfo}>
      <Text style={styles.supportTitle}>{title}</Text>
      <Text style={styles.supportDescription}>{description}</Text>
    </View>
    <Icon name="chevron-right" size={24} color="#C7C7CC" />
  </TouchableOpacity>
);

const HelpCenter = () => {
  const navigation = useNavigation();
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      id: 1,
      question: 'Nasıl randevu alabilirim?',
      answer: 'Ana sayfada bulunan "Randevu Al" butonuna tıklayarak istediğiniz hizmeti seçebilir ve uygun bir zaman dilimi belirleyebilirsiniz.',
    },
    {
      id: 2,
      question: 'Randevumu nasıl iptal edebilirim?',
      answer: 'Profil sayfanızdan "Randevularım" bölümüne giderek iptal etmek istediğiniz randevuyu seçebilir ve iptal işlemini gerçekleştirebilirsiniz.',
    },
    {
      id: 3,
      question: 'Bildirimler nasıl özelleştirilir?',
      answer: 'Ayarlar > Bildirimler menüsünden hangi konularda bildirim almak istediğinizi seçebilirsiniz.',
    },
    {
      id: 4,
      question: 'Şifremi unuttum, ne yapmalıyım?',
      answer: 'Giriş ekranında "Şifremi Unuttum" seçeneğine tıklayarak e-posta adresinize sıfırlama bağlantısı gönderebilirsiniz.',
    },
  ];

  const handleFAQToggle = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const handleContactSupport = () => {
    Linking.openURL('mailto:destek@akillisehir.com');
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
        <Text style={styles.headerTitle}>Yardım Merkezi</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Support Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Destek Seçenekleri</Text>
          <View style={styles.supportList}>
            <SupportOption
              icon="chat"
              title="Canlı Destek"
              description="Müşteri temsilcisiyle görüşün"
              onPress={() => navigation.navigate('LiveSupport')}
            />
            <SupportOption
              icon="email"
              title="E-posta Desteği"
              description="destek@akillisehir.com"
              onPress={handleContactSupport}
            />
            <SupportOption
              icon="phone"
              title="Telefon Desteği"
              description="0551 048 05 56"
              onPress={() => Linking.openURL('tel:05510480556')}
            />
          </View>
        </View>

        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sık Sorulan Sorular</Text>
          <View style={styles.faqList}>
            {faqs.map((faq) => (
              <FAQItem
                key={faq.id}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === faq.id}
                onToggle={() => handleFAQToggle(faq.id)}
              />
            ))}
          </View>
        </View>

        {/* Additional Help */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Diğer Yardım Kaynakları</Text>
          <View style={styles.supportList}>
            <SupportOption
              icon="video"
              title="Video Rehberler"
              description="Uygulama kullanım videoları"
              onPress={() => navigation.navigate('VideoGuides')}
            />
            <SupportOption
              icon="book-open-page-variant"
              title="Kullanım Kılavuzu"
              description="Detaylı kullanım rehberi"
              onPress={() => navigation.navigate('UserGuide')}
            />
            <SupportOption
              icon="frequently-asked-questions"
              title="Tüm SSS"
              description="Tüm sık sorulan sorular"
              onPress={() => navigation.navigate('FAQ')}
            />
          </View>
        </View>

        <Text style={styles.note}>
          7/24 destek ekibimiz size yardımcı olmaktan mutluluk duyacaktır.
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
  supportList: {
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
  supportOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  supportIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  supportInfo: {
    flex: 1,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  supportDescription: {
    fontSize: 13,
    color: '#666',
  },
  faqList: {
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
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  faqQuestion: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginRight: 16,
  },
  faqAnswer: {
    padding: 16,
    paddingTop: 0,
    backgroundColor: '#F8F8F8',
  },
  faqAnswerText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
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

export default HelpCenter; 