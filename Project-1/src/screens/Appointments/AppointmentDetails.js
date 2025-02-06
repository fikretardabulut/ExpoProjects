import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

const AppointmentDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { appointmentId } = route.params;

  const appointmentData = {
    id: appointmentId,
    doctorName: 'Dr. Ahmet Yılmaz',
    specialty: 'Diş Hekimi',
    date: '15 Mart 2024',
    time: '14:30',
    location: 'Özel Dentist Ağız ve Diş Sağlığı Kliniği',
    address: 'Cumhuriyet Mah. Şehit Pilot Cad. No:12/3, Melikgazi, Kayseri',
    status: 'Onaylandı',
    notes: 'Lütfen randevudan 15 dakika önce gelmeniz rica olunur.',
  };

  const handleCancel = () => {
    // İptal işlemi
    navigation.goBack();
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
        <TouchableOpacity style={styles.moreButton}>
          <Icon name="dots-horizontal" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Status Badge */}
        <View style={styles.statusContainer}>
          <View style={styles.statusBadge}>
            <Icon name="check-circle" size={20} color="#4CAF50" />
            <Text style={styles.statusText}>{appointmentData.status}</Text>
          </View>
        </View>

        {/* Doctor Info */}
        <View style={styles.section}>
          <View style={styles.doctorInfo}>
            <View style={styles.doctorIconContainer}>
              <Icon name="doctor" size={32} color="#007AFF" />
            </View>
            <View style={styles.doctorDetails}>
              <Text style={styles.doctorName}>{appointmentData.doctorName}</Text>
              <Text style={styles.specialty}>{appointmentData.specialty}</Text>
            </View>
          </View>
        </View>

        {/* Date & Time */}
        <View style={styles.section}>
          <View style={styles.infoRow}>
            <Icon name="calendar" size={24} color="#666" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Tarih</Text>
              <Text style={styles.infoValue}>{appointmentData.date}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Icon name="clock-outline" size={24} color="#666" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Saat</Text>
              <Text style={styles.infoValue}>{appointmentData.time}</Text>
            </View>
          </View>
        </View>

        {/* Location */}
        <View style={styles.section}>
          <View style={styles.infoRow}>
            <Icon name="hospital-building" size={24} color="#666" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Klinik</Text>
              <Text style={styles.infoValue}>{appointmentData.location}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Icon name="map-marker" size={24} color="#666" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Adres</Text>
              <Text style={styles.infoValue}>{appointmentData.address}</Text>
            </View>
          </View>
        </View>

        {/* Notes */}
        <View style={styles.section}>
          <View style={styles.notesContainer}>
            <Icon name="information" size={24} color="#666" />
            <Text style={styles.notesText}>{appointmentData.notes}</Text>
          </View>
        </View>

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
  },
  moreButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  statusContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
    marginLeft: 6,
  },
  section: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
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
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doctorIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E8F2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  doctorDetails: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 14,
    color: '#666',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
  },
  notesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  notesText: {
    flex: 1,
    marginLeft: 12,
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