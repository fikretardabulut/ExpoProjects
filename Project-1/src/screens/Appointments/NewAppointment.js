import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Platform,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const SelectField = ({ icon, title, value, placeholder, onPress }) => (
  <TouchableOpacity style={styles.field} onPress={onPress}>
    <View style={styles.fieldIcon}>
      <Icon name={icon} size={24} color="#007AFF" />
    </View>
    <View style={styles.fieldContent}>
      <Text style={styles.fieldLabel}>{title}</Text>
      <Text style={[styles.fieldValue, !value && styles.placeholder]}>
        {value || placeholder}
      </Text>
    </View>
    <Icon name="chevron-right" size={24} color="#C7C7CC" />
  </TouchableOpacity>
);

const NewAppointment = () => {
  const navigation = useNavigation();
  const [appointmentData, setAppointmentData] = useState({
    specialty: '',
    doctor: '',
    date: '',
    time: '',
    location: '',
    notes: '',
  });

  const handleSelectSpecialty = () => {
    // Uzmanlık alanı seçim modalı
  };

  const handleSelectDoctor = () => {
    // Doktor seçim modalı
  };

  const handleSelectDate = () => {
    // Tarih seçim modalı
  };

  const handleSelectTime = () => {
    // Saat seçim modalı
  };

  const handleSelectLocation = () => {
    // Konum seçim modalı
  };

  const handleCreateAppointment = () => {
    // Randevu oluştur
    navigation.goBack();
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
        <Text style={styles.headerTitle}>Yeni Randevu</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Progress Steps */}
        <View style={styles.progressContainer}>
          <View style={styles.progressStep}>
            <View style={[styles.stepDot, styles.activeStep]} />
            <Text style={[styles.stepText, styles.activeStepText]}>Uzmanlık</Text>
          </View>
          <View style={[styles.progressLine, appointmentData.specialty ? styles.activeLine : null]} />
          <View style={styles.progressStep}>
            <View style={[styles.stepDot, appointmentData.doctor ? styles.activeStep : null]} />
            <Text style={[styles.stepText, appointmentData.doctor ? styles.activeStepText : null]}>Doktor</Text>
          </View>
          <View style={[styles.progressLine, appointmentData.date ? styles.activeLine : null]} />
          <View style={styles.progressStep}>
            <View style={[styles.stepDot, appointmentData.time ? styles.activeStep : null]} />
            <Text style={[styles.stepText, appointmentData.time ? styles.activeStepText : null]}>Zaman</Text>
          </View>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          <SelectField
            icon="doctor"
            title="Uzmanlık Alanı"
            value={appointmentData.specialty}
            placeholder="Uzmanlık alanı seçin"
            onPress={handleSelectSpecialty}
          />
          <SelectField
            icon="account"
            title="Doktor"
            value={appointmentData.doctor}
            placeholder="Doktor seçin"
            onPress={handleSelectDoctor}
          />
          <SelectField
            icon="calendar"
            title="Tarih"
            value={appointmentData.date}
            placeholder="Tarih seçin"
            onPress={handleSelectDate}
          />
          <SelectField
            icon="clock"
            title="Saat"
            value={appointmentData.time}
            placeholder="Saat seçin"
            onPress={handleSelectTime}
          />
          <SelectField
            icon="map-marker"
            title="Konum"
            value={appointmentData.location}
            placeholder="Klinik seçin"
            onPress={handleSelectLocation}
          />

          {/* Notes */}
          <View style={styles.notesContainer}>
            <Text style={styles.notesLabel}>Notlar</Text>
            <TextInput
              style={styles.notesInput}
              placeholder="Randevu ile ilgili notlarınız..."
              multiline
              numberOfLines={4}
              value={appointmentData.notes}
              onChangeText={(text) => setAppointmentData(prev => ({ ...prev, notes: text }))}
            />
          </View>
        </View>
      </ScrollView>

      {/* Create Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={handleCreateAppointment}
        >
          <Icon name="check" size={20} color="#FFF" />
          <Text style={styles.createButtonText}>Randevu Oluştur</Text>
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
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  progressStep: {
    alignItems: 'center',
  },
  stepDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
    marginBottom: 8,
  },
  activeStep: {
    backgroundColor: '#007AFF',
  },
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 8,
  },
  activeLine: {
    backgroundColor: '#007AFF',
  },
  stepText: {
    fontSize: 12,
    color: '#666',
  },
  activeStepText: {
    color: '#007AFF',
    fontWeight: '500',
  },
  formContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 24,
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
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  fieldIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  fieldContent: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  fieldValue: {
    fontSize: 16,
    color: '#333',
  },
  placeholder: {
    color: '#999',
  },
  notesContainer: {
    padding: 16,
  },
  notesLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  notesInput: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 12,
    height: 100,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    marginLeft: 8,
  },
});

export default NewAppointment; 