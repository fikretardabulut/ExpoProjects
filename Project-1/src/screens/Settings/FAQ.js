import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  const animatedHeight = useState(new Animated.Value(0))[0];

  React.useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: isOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isOpen]);

  return (
    <View style={styles.faqItem}>
      <TouchableOpacity 
        style={styles.questionContainer} 
        onPress={onToggle}
        activeOpacity={0.7}
      >
        <Text style={styles.question}>{question}</Text>
        <Icon 
          name={isOpen ? "chevron-up" : "chevron-down"} 
          size={24} 
          color="#666"
        />
      </TouchableOpacity>
      <Animated.View 
        style={[
          styles.answerContainer,
          {
            maxHeight: animatedHeight.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 500]
            }),
            opacity: animatedHeight
          }
        ]}
      >
        <Text style={styles.answer}>{answer}</Text>
      </Animated.View>
    </View>
  );
};

const FAQ = () => {
  const navigation = useNavigation();
  const [openQuestions, setOpenQuestions] = useState({});

  const faqData = [
    {
      id: '1',
      category: 'Genel',
      questions: [
        {
          id: '1-1',
          question: 'Nasıl üye olabilirim?',
          answer: 'Uygulamayı indirdikten sonra ana sayfadaki "Kayıt Ol" butonuna tıklayarak üyelik formunu doldurabilirsiniz. E-posta adresinizi onayladıktan sonra üyeliğiniz aktif hale gelecektir.'
        },
        {
          id: '1-2',
          question: 'Şifremi unuttum, ne yapmalıyım?',
          answer: 'Giriş ekranındaki "Şifremi Unuttum" bağlantısına tıklayarak şifre sıfırlama sürecini başlatabilirsiniz. E-posta adresinize gönderilecek bağlantı ile yeni şifrenizi oluşturabilirsiniz.'
        }
      ]
    },
    {
      id: '2',
      category: 'Randevular',
      questions: [
        {
          id: '2-1',
          question: 'Randevu nasıl alabilirim?',
          answer: 'Ana menüden "Randevu Al" seçeneğine tıklayarak istediğiniz hizmeti, tarihi ve saati seçebilirsiniz. Randevunuz onaylandığında size bildirim gönderilecektir.'
        },
        {
          id: '2-2',
          question: 'Randevumu nasıl iptal edebilirim?',
          answer: 'Randevularım bölümünden ilgili randevuyu seçip "İptal Et" butonuna tıklayarak iptal işlemini gerçekleştirebilirsiniz. İptal işlemi için en az 24 saat önceden bildirim yapmanız gerekmektedir.'
        }
      ]
    },
    {
      id: '3',
      category: 'Ödemeler',
      questions: [
        {
          id: '3-1',
          question: 'Hangi ödeme yöntemlerini kullanabilirim?',
          answer: 'Kredi kartı, banka kartı ve havale/EFT ile ödeme yapabilirsiniz. Tüm ödemeleriniz 256-bit SSL ile şifrelenerek güvenle gerçekleştirilmektedir.'
        },
        {
          id: '3-2',
          question: 'İade politikanız nedir?',
          answer: 'Hizmet alımından memnun kalmamanız durumunda 24 saat içinde iade talep edebilirsiniz. İade talepleriniz 3-5 iş günü içinde değerlendirilip sonuçlandırılacaktır.'
        }
      ]
    }
  ];

  const toggleQuestion = (questionId) => {
    setOpenQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
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
        <Text style={styles.headerTitle}>Sıkça Sorulan Sorular</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={[styles.content, { paddingBottom: 80 }]}>
          <View style={styles.searchInfo}>
            <Icon name="frequently-asked-questions" size={24} color="#007AFF" />
            <Text style={styles.searchInfoText}>
              Aradığınız sorunun cevabını bulamadıysanız, destek ekibimizle iletişime geçebilirsiniz.
            </Text>
          </View>

          {faqData.map(category => (
            <View key={category.id} style={styles.categorySection}>
              <Text style={styles.categoryTitle}>{category.category}</Text>
              {category.questions.map(item => (
                <FAQItem
                  key={item.id}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openQuestions[item.id]}
                  onToggle={() => toggleQuestion(item.id)}
                />
              ))}
            </View>
          ))}

          <TouchableOpacity 
            style={styles.supportButton}
            onPress={() => navigation.navigate('Support')}
          >
            <Icon name="headphones" size={20} color="#FFF" />
            <Text style={styles.supportButtonText}>Destek Ekibine Ulaşın</Text>
          </TouchableOpacity>
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
  searchInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F2FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  searchInfoText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  faqItem: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 8,
    overflow: 'hidden',
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
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  question: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginRight: 16,
  },
  answerContainer: {
    overflow: 'hidden',
  },
  answer: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    padding: 16,
    paddingTop: 0,
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
    gap: 8,
  },
  supportButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FAQ; 