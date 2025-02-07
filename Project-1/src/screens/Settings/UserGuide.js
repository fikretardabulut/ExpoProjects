import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const GuideSection = ({ title, steps }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.stepsList}>
      {steps.map((step, index) => (
        <View key={index} style={styles.stepItem}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>{index + 1}</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.stepDescription}>{step.description}</Text>
            {step.image && (
              <Image 
                source={{ uri: step.image }}
                style={styles.stepImage}
                resizeMode="cover"
              />
            )}
            {step.tip && (
              <View style={styles.tipContainer}>
                <Icon name="lightbulb" size={16} color="#FFB800" />
                <Text style={styles.tipText}>{step.tip}</Text>
              </View>
            )}
          </View>
        </View>
      ))}
    </View>
  </View>
);

const UserGuide = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('basics');

  const categories = [
    { id: 'basics', title: 'Temel Bilgiler', icon: 'information' },
    { id: 'appointments', title: 'Randevular', icon: 'calendar-clock' },
    { id: 'profile', title: 'Profil', icon: 'account' },
    { id: 'payments', title: 'Ödemeler', icon: 'credit-card' },
  ];

  const guideData = {
    basics: {
      title: 'Temel Bilgiler',
      steps: [
        {
          title: 'Uygulamaya Giriş',
          description: 'E-posta ve şifrenizle giriş yapın veya yeni hesap oluşturun.',
          image: 'https://example.com/login.jpg',
          tip: 'Şifrenizi unuttuysanız "Şifremi Unuttum" seçeneğini kullanabilirsiniz.',
        },
        {
          title: 'Ana Sayfa Kullanımı',
          description: 'Ana sayfada size özel öneriler, yakındaki tesisler ve popüler hizmetleri görebilirsiniz.',
          image: 'https://example.com/home.jpg'
        }
      ]
    },
    appointments: {
      title: 'Randevu İşlemleri',
      steps: [
        {
          title: 'Randevu Alma',
          description: 'İstediğiniz hizmeti seçin, uygun tarihi ve saati belirleyin, randevunuzu onaylayın.',
          image: 'https://example.com/appointment.jpg',
          tip: 'Randevu saatinden 15 dakika önce hatırlatma bildirimi alacaksınız.'
        },
        {
          title: 'Randevu İptali',
          description: 'Randevularım bölümünden iptal etmek istediğiniz randevuyu seçin ve "İptal Et" butonuna tıklayın.',
          tip: 'İptal işlemi için en az 24 saat önceden bildirim yapmanız gerekir.'
        }
      ]
    },
    profile: {
      title: 'Profil Yönetimi',
      steps: [
        {
          title: 'Profil Bilgilerini Güncelleme',
          description: 'Profil sayfanızdan kişisel bilgilerinizi, adres ve iletişim tercihlerinizi güncelleyebilirsiniz.',
          image: 'https://example.com/profile.jpg'
        },
        {
          title: 'Bildirim Ayarları',
          description: 'Hangi durumlarda bildirim almak istediğinizi özelleştirebilirsiniz.',
          tip: 'Önemli bildirimleri kaçırmamak için push bildirimleri açık tutmanızı öneririz.'
        }
      ]
    },
    payments: {
      title: 'Ödeme İşlemleri',
      steps: [
        {
          title: 'Ödeme Yöntemi Ekleme',
          description: 'Güvenli bir şekilde kredi kartı veya banka kartı ekleyebilirsiniz.',
          image: 'https://example.com/payment.jpg',
          tip: 'Tüm ödeme işlemleri 256-bit SSL ile şifrelenmektedir.'
        },
        {
          title: 'Fatura Görüntüleme',
          description: 'Geçmiş ödemelerinizi ve faturalarınızı görüntüleyebilir, indirebilirsiniz.',
        }
      ]
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
        <Text style={styles.headerTitle}>Kullanım Kılavuzu</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Icon
              name={category.icon}
              size={20}
              color={selectedCategory === category.id ? '#007AFF' : '#666'}
            />
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.id && styles.categoryTextActive,
              ]}
            >
              {category.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Content */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {guideData[selectedCategory] && (
          <GuideSection
            title={guideData[selectedCategory].title}
            steps={guideData[selectedCategory].steps}
          />
        )}

        <TouchableOpacity 
          style={styles.videoButton}
          onPress={() => navigation.navigate('VideoGuides')}
        >
          <Icon name="play-circle" size={20} color="#FFF" />
          <Text style={styles.videoButtonText}>Video Rehberleri İzle</Text>
        </TouchableOpacity>
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
  categoriesContainer: {
    maxHeight: 60,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  categoriesContent: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#F8F8F8',
    height: 40,
  },
  categoryButtonActive: {
    backgroundColor: '#E8F2FF',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  categoryTextActive: {
    color: '#007AFF',
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 80,
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
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  stepsList: {
    gap: 16,
  },
  stepItem: {
    flexDirection: 'row',
    gap: 12,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E8F2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  stepImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 8,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    color: '#B38300',
  },
  videoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
    gap: 8,
  },
  videoButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default UserGuide; 