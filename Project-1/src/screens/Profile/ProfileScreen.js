import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // İkonları eklemek için
import styles from '../../styles/Profile/ProfileScreenStyles'; // Style dosyasını import ediyoruz

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Profil Fotoğrafı */}
      <View style={styles.profileImageContainer}>
        <Image
          source={{ uri: 'https://images.catenasoft.com/public/uploads/medium/b0/54/9cd726073a42a0704d6feee18aee.jpg' }}
          style={styles.profileImage}
        />
      </View>

      {/* Kullanıcı Bilgileri */}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>Fikret Arda Bulut</Text>
        <Text style={styles.email}>bilgi@ardabulut.tr</Text>
        <Text style={styles.location}>Konum: Kayseri, Türkiye</Text>
      </View>

      {/* Kullanıcıya ait randevu ve geçmiş bilgileri */}
      <View style={styles.bookingContainer}>
        <Text style={styles.sectionTitle}>Son Randevular</Text>
        <View style={styles.bookingItem}>
          <Text style={styles.bookingText}>İstanbul Fitness Salonu - 15:30</Text>
          <Text style={styles.bookingDate}>05 Şubat 2025</Text>
        </View>
        <View style={styles.bookingItem}>
          <Text style={styles.bookingText}>Büyük Restoran - 19:00</Text>
          <Text style={styles.bookingDate}>04 Şubat 2025</Text>
        </View>
      </View>

      {/* Profil Düzenleme ve Çıkış Butonları */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.editButton} onPress={() => {}}>
          <Icon name="pencil-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Profil Düzenle</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={() => {}}>
          <Icon name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>

      {/* Kullanıcıya yönlendiren butonlar */}
      <View style={styles.linkContainer}>
        <TouchableOpacity style={styles.linkButton} onPress={() => {}}>
          <Text style={styles.linkText}>Randevu Takvimi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkButton} onPress={() => {}}>
          <Text style={styles.linkText}>İşletme Bilgileri</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
