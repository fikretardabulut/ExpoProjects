import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

const TimeSlot = ({ time, isSelected, isAvailable, onPress }) => {
  const scale = new Animated.Value(1);

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        style={[
          styles.timeSlot,
          isSelected && styles.timeSlotSelected,
          !isAvailable && styles.timeSlotUnavailable,
        ]}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        disabled={!isAvailable}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.timeSlotText,
            isSelected && styles.timeSlotTextSelected,
            !isAvailable && styles.timeSlotTextUnavailable,
          ]}
        >
          {time}
        </Text>
        {isAvailable && !isSelected && (
          <View style={styles.availableIndicator} />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const DateCard = ({ date, day, isSelected, isAvailable, onPress }) => {
  const scale = new Animated.Value(1);

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        style={[
          styles.dateCard,
          isSelected && styles.dateCardSelected,
          !isAvailable && styles.dateCardUnavailable,
        ]}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        disabled={!isAvailable}
        activeOpacity={0.8}
      >
        <Text style={[
          styles.dateDay,
          isSelected && styles.dateTextSelected,
          !isAvailable && styles.dateTextUnavailable,
        ]}>
          {day}
        </Text>
        <Text style={[
          styles.dateText,
          isSelected && styles.dateTextSelected,
          !isAvailable && styles.dateTextUnavailable,
        ]}>
          {date}
        </Text>
        {isAvailable && !isSelected && (
          <View style={styles.availableDateIndicator} />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const BookAppointment = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const {
    businessId,
    businessName,
    serviceId,
    serviceName,
    servicePrice,
    serviceDuration,
    businessIsOpen,
    businessCategory
  } = route.params;

  // Örnek tarihler - gerçek uygulamada API'den gelecek
  const availableDates = [
    { date: '25 Mart', day: 'Pzt', available: true },
    { date: '26 Mart', day: 'Sal', available: true },
    { date: '27 Mart', day: 'Çar', available: true },
    { date: '28 Mart', day: 'Per', available: true },
    { date: '29 Mart', day: 'Cum', available: false },
    { date: '30 Mart', day: 'Cmt', available: true },
    { date: '31 Mart', day: 'Paz', available: true },
  ];

  // Örnek saatler - gerçek uygulamada API'den gelecek
  const timeSlots = [
    { time: '09:00', available: true },
    { time: '10:00', available: true },
    { time: '11:00', available: false },
    { time: '12:00', available: true },
    { time: '13:00', available: false },
    { time: '14:00', available: true },
    { time: '15:00', available: true },
    { time: '16:00', available: true },
    { time: '17:00', available: true },
    { time: '18:00', available: false },
  ];

  const handleConfirmBooking = () => {
    navigation.navigate('BookingConfirmation', {
      businessName,
      serviceName,
      servicePrice,
      date: selectedDate,
      time: selectedTime,
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon name="chevron-left" size={28} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Randevu Al</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
        bounces={true}
        overScrollMode="always"
      >
        {/* Service Info */}
        <View style={styles.serviceInfo}>
          <View style={styles.serviceDetails}>
            <View style={styles.serviceHeader}>
              <View style={styles.businessInfo}>
                <Text style={styles.businessName}>{businessName}</Text>
                {businessIsOpen ? (
                  <View style={styles.statusBadge}>
                    <View style={styles.statusDot} />
                    <Text style={styles.statusText}>Açık</Text>
                  </View>
                ) : (
                  <View style={[styles.statusBadge, styles.statusBadgeClosed]}>
                    <View style={[styles.statusDot, styles.statusDotClosed]} />
                    <Text style={[styles.statusText, styles.statusTextClosed]}>Kapalı</Text>
                  </View>
                )}
              </View>
              <View style={styles.serviceBadge}>
                <Text style={styles.serviceBadgeText}>{businessCategory}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.serviceContent}>
              <Text style={styles.serviceName}>{serviceName}</Text>
              <View style={styles.serviceMetaInfo}>
                <View style={styles.metaItem}>
                  <Icon name="clock-outline" size={16} color="#666" />
                  <Text style={styles.metaText}>{serviceDuration} dk</Text>
                </View>
                <View style={styles.metaItem}>
                  <Icon name="currency-try" size={16} color="#666" />
                  <Text style={styles.metaText}>{servicePrice} ₺</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tarih Seçin</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.dateList}
            contentContainerStyle={styles.dateListContent}
          >
            {availableDates.map((item, index) => (
              <DateCard
                key={index}
                date={item.date}
                day={item.day}
                isSelected={selectedDate === item.date}
                isAvailable={item.available}
                onPress={() => item.available && setSelectedDate(item.date)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Time Selection */}
        {selectedDate && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Saat Seçin</Text>
            <View style={styles.timeGrid}>
              {timeSlots.map((slot, index) => (
                <TimeSlot
                  key={index}
                  time={slot.time}
                  isSelected={selectedTime === slot.time}
                  isAvailable={slot.available}
                  onPress={() => setSelectedTime(slot.time)}
                />
              ))}
            </View>
          </View>
        )}

        {/* Legend */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#E8F5E9' }]} />
            <Text style={styles.legendText}>Müsait</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#007AFF' }]} />
            <Text style={styles.legendText}>Seçili</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#F5F5F5' }]} />
            <Text style={styles.legendText}>Dolu</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        {selectedDate && selectedTime ? (
          <View style={styles.summaryContainer}>
            <View style={styles.summaryInfo}>
              <Text style={styles.summaryTitle}>Seçilen Randevu</Text>
              <Text style={styles.summaryText}>{selectedDate} - {selectedTime}</Text>
            </View>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirmBooking}
            >
              <Text style={styles.confirmButtonText}>Onayla</Text>
              <Icon name="arrow-right" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.confirmButton, styles.confirmButtonDisabled]}
            disabled={true}
          >
            <Text style={styles.confirmButtonText}>
              {!selectedDate ? 'Tarih Seçin' : 'Saat Seçin'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1A1A1A',
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
    marginBottom: 20,
  },
  serviceInfo: {
    padding: 16,
    backgroundColor: '#F8F9FA',
  },
  serviceDetails: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  businessInfo: {
    flex: 1,
    marginRight: 12,
  },
  businessName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  statusBadgeClosed: {
    backgroundColor: '#FFEBEE',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4CAF50',
    marginRight: 4,
  },
  statusDotClosed: {
    backgroundColor: '#F44336',
  },
  statusText: {
    fontSize: 12,
    color: '#2E7D32',
    fontWeight: '500',
  },
  statusTextClosed: {
    color: '#C62828',
  },
  serviceBadge: {
    backgroundColor: '#EBF5FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  serviceBadgeText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 12,
  },
  serviceContent: {
    marginTop: 4,
  },
  serviceName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  serviceMetaInfo: {
    flexDirection: 'row',
    gap: 16,
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
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  dateList: {
    marginHorizontal: -16,
  },
  dateListContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  dateCard: {
    width: 72,
    height: 84,
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  dateCardSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  dateCardUnavailable: {
    backgroundColor: '#F5F5F5',
    borderColor: '#E9ECEF',
  },
  dateDay: {
    fontSize: 15,
    color: '#666',
    marginBottom: 4,
    fontWeight: '500',
  },
  dateText: {
    fontSize: 13,
    color: '#1A1A1A',
  },
  dateTextSelected: {
    color: '#FFF',
  },
  dateTextUnavailable: {
    color: '#CCC',
  },
  availableDateIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#4CAF50',
    position: 'absolute',
    bottom: 12,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeSlot: {
    width: (Platform.OS === 'ios' ? 343 : 360) / 4 - 8,
    height: 44,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  timeSlotSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  timeSlotUnavailable: {
    backgroundColor: '#F5F5F5',
    borderColor: '#E9ECEF',
  },
  timeSlotText: {
    fontSize: 15,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  timeSlotTextSelected: {
    color: '#FFF',
  },
  timeSlotTextUnavailable: {
    color: '#CCC',
  },
  availableIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#4CAF50',
    position: 'absolute',
    bottom: 8,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 13,
    color: '#666',
  },
  bottomContainer: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 16 : 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFF',
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 85 : 65,
    left: 0,
    right: 0,
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  summaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryInfo: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  summaryText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    height: 48,
    borderRadius: 24,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
    minWidth: 140,
  },
  confirmButtonDisabled: {
    backgroundColor: '#E9ECEF',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});
export default BookAppointment; 