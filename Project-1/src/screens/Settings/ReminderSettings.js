import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const ReminderOption = ({ title, subtitle, value, onValueChange }) => (
  <View style={styles.optionContainer}>
    <View style={styles.optionContent}>
      <Text style={styles.optionTitle}>{title}</Text>
      {subtitle && <Text style={styles.optionSubtitle}>{subtitle}</Text>}
    </View>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: '#D1D1D6', true: '#007AFF' }}
      thumbColor={Platform.OS === 'ios' ? '#FFFFFF' : value ? '#FFFFFF' : '#F4F4F4'}
    />
  </View>
);

const TimeOption = ({ title, value, onPress }) => (
  <TouchableOpacity style={styles.optionContainer} onPress={onPress}>
    <Text style={styles.optionTitle}>{title}</Text>
    <View style={styles.timeContainer}>
      <Text style={styles.timeValue}>{value}</Text>
      <Icon name="chevron-right" size={20} color="#C7C7CC" />
    </View>
  </TouchableOpacity>
);

const ReminderSettings = () => {
  const navigation = useNavigation();
  const [settings, setSettings] = useState({
    appointmentReminders: true,
    dayBefore: true,
    dayBeforeTime: '18:00',
    hourBefore: true,
    hourBeforeTime: '1 saat',
    medicationReminders: true,
    medicationTime: '09:00',
    followUpReminders: true,
    followUpDays: '3 gün',
  });

  const handleTimeSelect = (setting) => {
    // Time picker modal'ı
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
        <Text style={styles.headerTitle}>Hatırlatıcı Ayarları</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Appointment Reminders */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Randevu Hatırlatıcıları</Text>
          <View style={styles.card}>
            <ReminderOption
              title="Randevu Hatırlatıcıları"
              subtitle="Yaklaşan randevularınız için bildirim alın"
              value={settings.appointmentReminders}
              onValueChange={(value) => 
                setSettings(prev => ({ ...prev, appointmentReminders: value }))
              }
            />
            {settings.appointmentReminders && (
              <>
                <View style={styles.divider} />
                <ReminderOption
                  title="1 Gün Önce"
                  value={settings.dayBefore}
                  onValueChange={(value) =>
                    setSettings(prev => ({ ...prev, dayBefore: value }))
                  }
                />
                {settings.dayBefore && (
                  <TimeOption
                    title="Bildirim Zamanı"
                    value={settings.dayBeforeTime}
                    onPress={() => handleTimeSelect('dayBeforeTime')}
                  />
                )}
                <View style={styles.divider} />
                <ReminderOption
                  title="1 Saat Önce"
                  value={settings.hourBefore}
                  onValueChange={(value) =>
                    setSettings(prev => ({ ...prev, hourBefore: value }))
                  }
                />
                {settings.hourBefore && (
                  <TimeOption
                    title="Bildirim Zamanı"
                    value={settings.hourBeforeTime}
                    onPress={() => handleTimeSelect('hourBeforeTime')}
                  />
                )}
              </>
            )}
          </View>
        </View>

        {/* Medication Reminders */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>İlaç Hatırlatıcıları</Text>
          <View style={styles.card}>
            <ReminderOption
              title="İlaç Hatırlatıcıları"
              subtitle="İlaç kullanım zamanlarınız için bildirim alın"
              value={settings.medicationReminders}
              onValueChange={(value) =>
                setSettings(prev => ({ ...prev, medicationReminders: value }))
              }
            />
            {settings.medicationReminders && (
              <>
                <View style={styles.divider} />
                <TimeOption
                  title="Varsayılan Bildirim Zamanı"
                  value={settings.medicationTime}
                  onPress={() => handleTimeSelect('medicationTime')}
                />
              </>
            )}
          </View>
        </View>

        {/* Follow-up Reminders */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Takip Hatırlatıcıları</Text>
          <View style={styles.card}>
            <ReminderOption
              title="Takip Hatırlatıcıları"
              subtitle="Kontrol randevularınız için bildirim alın"
              value={settings.followUpReminders}
              onValueChange={(value) =>
                setSettings(prev => ({ ...prev, followUpReminders: value }))
              }
            />
            {settings.followUpReminders && (
              <>
                <View style={styles.divider} />
                <TimeOption
                  title="Varsayılan Hatırlatma Süresi"
                  value={settings.followUpDays}
                  onPress={() => handleTimeSelect('followUpDays')}
                />
              </>
            )}
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
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
    marginLeft: 4,
  },
  card: {
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
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  optionContent: {
    flex: 1,
    marginRight: 16,
  },
  optionTitle: {
    fontSize: 16,
    color: '#333',
  },
  optionSubtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#EFEFEF',
    marginHorizontal: 16,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeValue: {
    fontSize: 16,
    color: '#007AFF',
    marginRight: 8,
  },
});

export default ReminderSettings; 