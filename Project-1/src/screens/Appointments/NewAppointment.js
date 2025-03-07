import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Platform,
  TextInput,
  ActivityIndicator,
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
    category: '',
    business: '',
    service: '',
    date: '',
    time: '',
    notes: '',
  });
  const [saving, setSaving] = useState(false);

  const isFormValid = useMemo(() => {
    return (
      appointmentData.category.trim() !== '' &&
      appointmentData.business.trim() !== '' &&
      appointmentData.service.trim() !== '' &&
      appointmentData.date.trim() !== '' &&
      appointmentData.time.trim() !== ''
    );
  }, [appointmentData]);

  const handleSelectCategory = () => {
    // İşletme kategorisi seçim modalı
  };

  const handleSelectBusiness = () => {
    // İşletme seçim modalı
  };

  const handleSelectService = () => {
    // Hizmet seçim modalı
  };

  const handleSelectDate = () => {
    // Tarih seçim modalı
  };

  const handleSelectTime = () => {
    // Saat seçim modalı
  };

  const handleCreateAppointment = async () => {
    setSaving(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigation.goBack();
    } catch (e) {
      console.error('Randevu oluşturulurken hata oluştu:', e);
    } finally {
      setSaving(false);
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
        <Text style={styles.headerTitle}>Yeni Randevu</Text>
        <View style={styles.headerRight}>
          {isFormValid ? (
            <TouchableOpacity 
              onPress={handleCreateAppointment}
              disabled={saving}
            >
              {saving ? (
                <ActivityIndicator size="small" color="#007AFF" />
              ) : (
                <Text style={styles.saveText}>Kaydet</Text>
              )}
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Progress Steps */}
        <View style={styles.progressContainer}>
          <View style={styles.progressStep}>
            <View style={[styles.stepDot, styles.activeStep]} />
            <Text style={[styles.stepText, styles.activeStepText]}>Kategori</Text>
          </View>
          <View style={[styles.progressLine, appointmentData.category ? styles.activeLine : null]} />
          <View style={styles.progressStep}>
            <View style={[styles.stepDot, appointmentData.business ? styles.activeStep : null]} />
            <Text style={[styles.stepText, appointmentData.business ? styles.activeStepText : null]}>İşletme</Text>
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
            icon="shape"
            title="Kategori"
            value={appointmentData.category}
            placeholder="İşletme kategorisi seçin"
            onPress={handleSelectCategory}
          />
          <SelectField
            icon="store"
            title="İşletme"
            value={appointmentData.business}
            placeholder="İşletme seçin"
            onPress={handleSelectBusiness}
          />
          <SelectField
            icon="tag"
            title="Hizmet"
            value={appointmentData.service}
            placeholder="Hizmet seçin"
            onPress={handleSelectService}
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
    marginLeft: -8,
    width: 60,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    flex: 1,
  },
  headerRight: {
    width: 60,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  saveText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
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
});

export default NewAppointment; 