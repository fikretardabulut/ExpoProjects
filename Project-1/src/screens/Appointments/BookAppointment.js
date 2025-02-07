import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  Alert,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

const ServiceSummary = ({ service }) => (
  <View style={styles.serviceSummary}>
    <View style={styles.serviceIconContainer}>
      <Icon name="spa" size={24} color="#007AFF" />
    </View>
    <View style={styles.serviceDetails}>
      <Text style={styles.serviceTitle}>{service.title}</Text>
      <View style={styles.serviceMetaInfo}>
        <View style={styles.metaItem}>
          <Icon name="clock-outline" size={16} color="#666" />
          <Text style={styles.metaText}>{service.duration} dk</Text>
        </View>
        <View style={styles.metaItem}>
          <Icon name="currency-try" size={16} color="#666" />
          <Text style={styles.metaText}>{service.price} TL</Text>
        </View>
      </View>
    </View>
  </View>
);

const TimeSlot = ({ time, isAvailable, isSelected, onSelect }) => (
  <TouchableOpacity
    style={[
      styles.timeSlot,
      !isAvailable && styles.timeSlotUnavailable,
      isSelected && styles.timeSlotSelected,
    ]}
    onPress={onSelect}
    disabled={!isAvailable}
  >
    <Text
      style={[
        styles.timeSlotText,
        !isAvailable && styles.timeSlotTextUnavailable,
        isSelected && styles.timeSlotTextSelected,
      ]}
    >
      {time}
    </Text>
    {isAvailable && !isSelected && (
      <Text style={styles.availableText}>Müsait</Text>
    )}
    {!isAvailable && (
      <Text style={styles.unavailableText}>Dolu</Text>
    )}
  </TouchableOpacity>
);

const DateButton = ({ date, isSelected, onSelect, isAvailable }) => {
  const dayNames = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
  const monthNames = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
  const dateObj = new Date(date);
  const dayName = dayNames[dateObj.getDay()];
  const dayNumber = dateObj.getDate();
  const month = monthNames[dateObj.getMonth()];

  return (
    <TouchableOpacity
      style={[
        styles.dateButton,
        isSelected && styles.dateButtonSelected,
        !isAvailable && styles.dateButtonUnavailable,
      ]}
      onPress={onSelect}
      disabled={!isAvailable}
    >
      <Text style={[styles.dateDay, isSelected && styles.dateTextSelected]}>
        {dayName}
      </Text>
      <Text style={[styles.dateNumber, isSelected && styles.dateTextSelected]}>
        {dayNumber}
      </Text>
      <Text style={[styles.dateMonth, isSelected && styles.dateTextSelected]}>
        {month}
      </Text>
    </TouchableOpacity>
  );
};

const BookAppointment = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { businessId, serviceId, businessData, selectedService } = route.params || {};

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // İşletmenin çalışma günleri (0: Pazar, 6: Cumartesi)
  const workingDays = [1, 2, 3, 4, 5]; // Pazartesi-Cuma

  // Sonraki 14 günü hesapla
  const nextTwoWeeks = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      date: date.toISOString().split('T')[0],
      isAvailable: workingDays.includes(date.getDay())
    };
  });

  // Sayfa açıldığında ilk müsait günü seç
  useEffect(() => {
    const firstAvailableDate = nextTwoWeeks.find(day => day.isAvailable);
    if (firstAvailableDate) {
      setSelectedDate(firstAvailableDate.date);
    }
  }, []);

  // Eğer gerekli veriler yoksa ana sayfaya yönlendir
  useEffect(() => {
    if (!businessId || !serviceId || !selectedService) {
      Alert.alert(
        'Hata',
        'Randevu bilgileri eksik. Lütfen tekrar deneyin.',
        [
          {
            text: 'Tamam',
            onPress: () => navigation.goBack()
          }
        ]
      );
    }
  }, [businessId, serviceId, selectedService]);

  const timeSlots = [
    { time: '09:00', available: true },
    { time: '09:30', available: true },
    { time: '10:00', available: false },
    { time: '10:30', available: true },
    { time: '11:00', available: true },
    { time: '11:30', available: false },
    { time: '12:00', available: true },
    { time: '14:00', available: true },
    { time: '14:30', available: true },
    { time: '15:00', available: true },
    { time: '15:30', available: false },
    { time: '16:00', available: true },
    { time: '16:30', available: true },
    { time: '17:00', available: true },
  ];

  const handleConfirmAppointment = () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert('Hata', 'Lütfen tarih ve saat seçin.');
      return;
    }

    // Burada API'ye randevu kaydı yapılacak
    Alert.alert(
      'Başarılı',
      'Randevunuz başarıyla oluşturuldu.',
      [
        {
          text: 'Tamam',
          onPress: () => navigation.navigate('MyAppointments')
        }
      ]
    );
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
        <Text style={styles.headerTitle}>Randevu Al</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Service Summary */}
        {selectedService && <ServiceSummary service={selectedService} />}

        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tarih Seçin</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dateList}
          >
            {nextTwoWeeks.map((day) => (
              <DateButton
                key={day.date}
                date={day.date}
                isSelected={selectedDate === day.date}
                isAvailable={day.isAvailable}
                onSelect={() => setSelectedDate(day.date)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Time Selection */}
        {selectedDate && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Saat Seçin</Text>
            <View style={styles.timeGrid}>
              {timeSlots.map((slot) => (
                <TimeSlot
                  key={slot.time}
                  time={slot.time}
                  isAvailable={slot.available}
                  isSelected={selectedTime === slot.time}
                  onSelect={() => setSelectedTime(slot.time)}
                />
              ))}
            </View>
          </View>
        )}

        {/* Selected Time Summary */}
        {selectedDate && selectedTime && (
          <View style={styles.summary}>
            <Icon name="calendar-clock" size={24} color="#007AFF" />
            <View style={styles.summaryContent}>
              <Text style={styles.summaryTitle}>Seçilen Randevu</Text>
              <Text style={styles.summaryText}>
                {new Date(selectedDate).toLocaleDateString('tr-TR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })} - {selectedTime}
              </Text>
            </View>
          </View>
        )}

        {/* Appointment Rules */}
        <View style={styles.rulesContainer}>
          <Text style={styles.rulesTitle}>Önemli Bilgiler</Text>
          <View style={styles.ruleItem}>
            <Icon name="information" size={16} color="#666" />
            <Text style={styles.ruleText}>
              Randevunuza son 1 saat kalana kadar iptal edebilirsiniz.
            </Text>
          </View>
          <View style={styles.ruleItem}>
            <Icon name="clock-alert" size={16} color="#666" />
            <Text style={styles.ruleText}>
              Lütfen randevu saatinizden 5 dakika önce hazır olunuz.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Confirm Button */}
      <View style={[styles.bottomButton, { marginBottom: 60 }]}>
        <TouchableOpacity
          style={[
            styles.confirmButton,
            (!selectedDate || !selectedTime) && styles.confirmButtonDisabled,
          ]}
          onPress={handleConfirmAppointment}
          disabled={!selectedDate || !selectedTime}
        >
          <Icon name="check" size={24} color="#FFF" />
          <Text style={styles.confirmButtonText}>Randevuyu Onayla</Text>
        </TouchableOpacity>
      </View>
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
  serviceSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    margin: 16,
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
  serviceIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  serviceDetails: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  serviceMetaInfo: {
    flexDirection: 'row',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  dateList: {
    paddingHorizontal: 4,
  },
  dateButton: {
    width: 72,
    height: 84,
    borderRadius: 12,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
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
  dateButtonSelected: {
    backgroundColor: '#007AFF',
  },
  dateButtonUnavailable: {
    backgroundColor: '#F8F8F8',
    opacity: 0.6,
  },
  dateDay: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  dateNumber: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  dateMonth: {
    fontSize: 12,
    color: '#666',
  },
  dateTextSelected: {
    color: '#FFF',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeSlot: {
    width: '23%',
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderRadius: 8,
    alignItems: 'center',
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
  timeSlotUnavailable: {
    backgroundColor: '#F8F8F8',
    opacity: 0.6,
  },
  timeSlotSelected: {
    backgroundColor: '#007AFF',
  },
  timeSlotText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  timeSlotTextUnavailable: {
    color: '#999',
  },
  timeSlotTextSelected: {
    color: '#FFF',
  },
  availableText: {
    fontSize: 10,
    color: '#4CAF50',
  },
  unavailableText: {
    fontSize: 10,
    color: '#999',
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  summaryContent: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  summaryText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  rulesContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: '#FFF',
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
  rulesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  ruleText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  bottomButton: {
    padding: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
  },
  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  confirmButtonDisabled: {
    opacity: 0.6,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});

export default BookAppointment; 