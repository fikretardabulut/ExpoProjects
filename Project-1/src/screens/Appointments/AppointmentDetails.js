import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

const AppointmentDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { appointmentId } = route.params;

  // Mock appointment data
  const appointmentData = {
    id: appointmentId,
    businessName: 'Güzellik Salonu A',
    category: 'Güzellik & Bakım',
    service: 'Saç Bakımı',
    date: '15 Mart 2024',
    time: '14:30',
    location: 'Cumhuriyet Mah. Şehit Pilot Cad. No:12/3',
    district: 'Melikgazi',
    city: 'Kayseri',
    status: 'Onaylandı',
    price: '350 TL',
    duration: '45 dakika',
    notes: 'Lütfen randevudan 10 dakika önce gelmeniz rica olunur.',
  };

  const handleCancel = () => {
    Alert.alert(
      'Randevu İptali',
      'Randevunuzu iptal etmek istediğinizden emin misiniz?',
      [
        {
          text: 'Vazgeç',
          style: 'cancel',
        },
        {
          text: 'İptal Et',
          style: 'destructive',
          onPress: () => {
            // İptal işlemi
            navigation.goBack();
          },
        },
      ]
    );
  };

  const handleReschedule = () => {
    navigation.navigate('RescheduleAppointment', { appointmentId });
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
        <Text style={styles.headerTitle}>Randevu Detayları</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={[styles.scrollView, { marginTop: 10 }]}>
        {/* Business Info */}
        <View style={styles.section}>
          <View style={styles.businessCard}>
            <View style={styles.businessIcon}>
              <Icon name="store" size={32} color="#007AFF" />
            </View>
            <View style={styles.businessInfo}>
              <Text style={styles.businessName}>{appointmentData.businessName}</Text>
              <Text style={styles.category}>{appointmentData.category}</Text>
              <View style={[styles.statusBadge, 
                { backgroundColor: appointmentData.status === 'Onaylandı' ? '#E8F5E9' : 
                  appointmentData.status === 'Bekliyor' ? '#FFF3E0' : '#FFEBEE' }]}>
                <Text style={[styles.statusText, 
                  { color: appointmentData.status === 'Onaylandı' ? '#4CAF50' :
                    appointmentData.status === 'Bekliyor' ? '#FF9800' : '#F44336' }]}>
                  {appointmentData.status}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Service Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hizmet Bilgileri</Text>
          <View style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <Icon name="tag" size={20} color="#666" />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Hizmet</Text>
                <Text style={styles.detailValue}>{appointmentData.service}</Text>
              </View>
            </View>
            <View style={styles.detailRow}>
              <Icon name="clock-outline" size={20} color="#666" />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Süre</Text>
                <Text style={styles.detailValue}>{appointmentData.duration}</Text>
              </View>
            </View>
            <View style={styles.detailRow}>
              <Icon name="currency-try" size={20} color="#666" />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Ücret</Text>
                <Text style={styles.detailValue}>{appointmentData.price}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Date and Time */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Randevu Zamanı</Text>
          <View style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <Icon name="calendar" size={20} color="#666" />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Tarih</Text>
                <Text style={styles.detailValue}>{appointmentData.date}</Text>
              </View>
            </View>
            <View style={styles.detailRow}>
              <Icon name="clock-outline" size={20} color="#666" />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Saat</Text>
                <Text style={styles.detailValue}>{appointmentData.time}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Konum</Text>
          <View style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <Icon name="map-marker" size={20} color="#666" />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Adres</Text>
                <Text style={styles.detailValue}>{appointmentData.location}</Text>
                <Text style={styles.detailValue}>{appointmentData.district}, {appointmentData.city}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Notes */}
        {appointmentData.notes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notlar</Text>
            <View style={styles.detailsCard}>
              <View style={styles.detailRow}>
                <Icon name="information" size={20} color="#666" />
                <View style={styles.detailContent}>
                  <Text style={styles.noteText}>{appointmentData.notes}</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.cancelButton]}
            onPress={handleCancel}
          >
            <Icon name="close" size={20} color="#FF3B30" />
            <Text style={[styles.actionButtonText, styles.cancelButtonText]}>
              Randevuyu İptal Et
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.rescheduleButton]}
            onPress={handleReschedule}
          >
            <Icon name="calendar-clock" size={20} color="#007AFF" />
            <Text style={[styles.actionButtonText, styles.rescheduleButtonText]}>
              Randevuyu Değiştir
            </Text>
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
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  businessCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
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
  businessIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  businessInfo: {
    flex: 1,
  },
  businessName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  detailsCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    borderRadius: 12,
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
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  detailContent: {
    marginLeft: 12,
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
  },
  noteText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  actionButtons: {
    padding: 16,
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
  },
  cancelButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  rescheduleButton: {
    backgroundColor: '#E8F2FF',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  cancelButtonText: {
    color: '#FF3B30',
  },
  rescheduleButtonText: {
    color: '#007AFF',
  },
});

export default AppointmentDetails; 