import React, { useState } from 'react';
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

const AppointmentItem = ({ appointment, onPress }) => (
  <TouchableOpacity style={styles.appointmentCard} onPress={onPress}>
    <View style={styles.appointmentHeader}>
      <View style={styles.doctorInfo}>
        <View style={styles.doctorIcon}>
          <Icon name="doctor" size={24} color="#007AFF" />
        </View>
        <View>
          <Text style={styles.doctorName}>{appointment.doctorName}</Text>
          <Text style={styles.specialty}>{appointment.specialty}</Text>
        </View>
      </View>
      <View style={[styles.statusBadge, 
        { backgroundColor: appointment.status === 'Onaylandı' ? '#E8F5E9' : 
          appointment.status === 'Bekliyor' ? '#FFF3E0' : '#FFEBEE' }]}>
        <Text style={[styles.statusText, 
          { color: appointment.status === 'Onaylandı' ? '#4CAF50' :
            appointment.status === 'Bekliyor' ? '#FF9800' : '#F44336' }]}>
          {appointment.status}
        </Text>
      </View>
    </View>

    <View style={styles.appointmentDetails}>
      <View style={styles.detailItem}>
        <Icon name="calendar" size={20} color="#666" />
        <Text style={styles.detailText}>{appointment.date}</Text>
      </View>
      <View style={styles.detailItem}>
        <Icon name="clock-outline" size={20} color="#666" />
        <Text style={styles.detailText}>{appointment.time}</Text>
      </View>
      <View style={styles.detailItem}>
        <Icon name="map-marker" size={20} color="#666" />
        <Text style={styles.detailText} numberOfLines={1}>{appointment.location}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const MyAppointments = () => {
  const navigation = useNavigation();
  const [appointments] = useState([
    {
      id: '1',
      doctorName: 'Dr. Ahmet Yılmaz',
      specialty: 'Diş Hekimi',
      status: 'Onaylandı',
      date: '15 Mart 2024',
      time: '14:30',
      location: 'Özel Dentist Ağız ve Diş Sağlığı Kliniği'
    },
    {
      id: '2',
      doctorName: 'Dr. Ayşe Kaya',
      specialty: 'Ortodonti Uzmanı',
      status: 'Bekliyor',
      date: '20 Mart 2024',
      time: '11:00',
      location: 'Kayseri Diş Hastanesi'
    },
    {
      id: '3',
      doctorName: 'Dr. Mehmet Demir',
      specialty: 'Diş Hekimi',
      status: 'İptal Edildi',
      date: '10 Mart 2024',
      time: '09:30',
      location: 'Özel Dent Kliniği'
    },
  ]);

  const handleAppointmentPress = (appointment) => {
    navigation.navigate('AppointmentDetails', { appointmentId: appointment.id });
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
        <Text style={styles.headerTitle}>Randevularım</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('NewAppointment')}
        >
          <Icon name="plus" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {appointments.map((appointment) => (
          <AppointmentItem
            key={appointment.id}
            appointment={appointment}
            onPress={() => handleAppointmentPress(appointment)}
          />
        ))}

        <TouchableOpacity 
          style={styles.newAppointmentButton}
          onPress={() => navigation.navigate('NewAppointment')}
        >
          <Icon name="plus-circle-outline" size={24} color="#007AFF" />
          <Text style={styles.newAppointmentText}>Yeni Randevu Al</Text>
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
  addButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 16,
    paddingBottom: 90,
  },
  appointmentCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 16,
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
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doctorIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  appointmentDetails: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#333',
  },
  newAppointmentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
    marginTop: 8,
    gap: 8,
  },
  newAppointmentText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#007AFF',
  },
});

export default MyAppointments; 