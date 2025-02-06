import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Platform,
  Animated,
  Modal,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const NotificationDetailModal = ({ notification, visible, onClose }) => {
  if (!notification) return null;
  const navigation = useNavigation();

  const handleActionPress = (type) => {
    onClose(); // Modal'ı kapat
    switch (type) {
      case 'calendar-check':
        navigation.navigate('AppointmentDetails', { appointmentId: notification.id });
        break;
      case 'bell-ring':
        navigation.navigate('ReminderSettings', { appointmentId: notification.id });
        break;
      case 'calendar-remove':
        navigation.navigate('NewAppointment');
        break;
      case 'star':
        navigation.navigate('AddReview', { appointmentId: notification.id });
        break;
    }
  };

  const handleMoreOptions = () => {
    onClose(); // Modal'ı kapat
    const options = [
      { label: 'Bildirimi Sil', value: 'delete', icon: 'trash-can-outline', destructive: true },
      { label: 'Bildirimi Paylaş', value: 'share', icon: 'share-variant' },
      { label: 'Takvime Ekle', value: 'calendar', icon: 'calendar-plus' },
      { label: 'Bildirimi Gizle', value: 'hide', icon: 'eye-off-outline' },
    ];

    Alert.alert(
      'Daha Fazla Seçenek',
      '',
      options.map(option => ({
        text: option.label,
        onPress: () => handleOptionSelect(option.value, notification),
        style: option.destructive ? 'destructive' : 'default',
      })),
      { cancelable: true }
    );
  };

  const getActionButton = (type) => {
    switch (type) {
      case 'calendar-check':
        return (
          <TouchableOpacity 
            style={styles.modalActionButton}
            onPress={() => handleActionPress(type)}
          >
            <Icon name="calendar" size={20} color="#007AFF" />
            <Text style={styles.modalActionText}>Randevuyu Görüntüle</Text>
          </TouchableOpacity>
        );
      case 'bell-ring':
        return (
          <TouchableOpacity 
            style={styles.modalActionButton}
            onPress={() => handleActionPress(type)}
          >
            <Icon name="clock-outline" size={20} color="#007AFF" />
            <Text style={styles.modalActionText}>Hatırlatıcı Ayarla</Text>
          </TouchableOpacity>
        );
      case 'calendar-remove':
        return (
          <TouchableOpacity 
            style={styles.modalActionButton}
            onPress={() => handleActionPress(type)}
          >
            <Icon name="calendar-plus" size={20} color="#007AFF" />
            <Text style={styles.modalActionText}>Yeni Randevu Al</Text>
          </TouchableOpacity>
        );
      case 'star':
        return (
          <TouchableOpacity 
            style={styles.modalActionButton}
            onPress={() => handleActionPress(type)}
          >
            <Icon name="star-outline" size={20} color="#007AFF" />
            <Text style={styles.modalActionText}>Değerlendirme Yap</Text>
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <View style={styles.modalHeaderLeft}>
              <View style={[styles.modalIconContainer, { backgroundColor: '#E8F2FF' }]}>
                <Icon name={notification.icon} size={24} color="#007AFF" />
              </View>
              <View style={styles.modalTypeContainer}>
                <Text style={styles.modalType}>
                  {notification.icon.includes('calendar') ? 'Randevu Bildirimi' : 
                   notification.icon.includes('star') ? 'Değerlendirme' : 'Bildirim'}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
              <Icon name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          
          {/* Body */}
          <View style={styles.modalBody}>
            <Text style={styles.modalTitle}>{notification.title}</Text>
            <View style={styles.modalTimeContainer}>
              <Icon name="clock-outline" size={16} color="#666" />
              <Text style={styles.modalTime}>{notification.time}</Text>
            </View>
            <View style={styles.modalDivider} />
            <Text style={styles.modalMessage}>{notification.message}</Text>
            
            {/* Action Buttons */}
            <View style={styles.modalActions}>
              {getActionButton(notification.icon)}
              <TouchableOpacity 
                style={[styles.modalActionButton, styles.modalSecondaryButton]}
                onPress={handleMoreOptions}
              >
                <Icon name="dots-horizontal" size={20} color="#666" />
                <Text style={styles.modalSecondaryText}>Daha Fazla</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const NotificationItem = ({ icon, title, time, message, isNew, onPress }) => {
  const [scale] = useState(new Animated.Value(1));

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
    <Animated.View style={[styles.notificationItem, { transform: [{ scale }] }]}>
      <TouchableOpacity
        style={styles.notificationContent}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <View style={[styles.iconContainer, isNew && styles.newIconContainer]}>
          <Icon name={icon} size={24} color={isNew ? "#007AFF" : "#333"} />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.titleRow}>
            <Text style={[styles.title, isNew && styles.newTitle]}>{title}</Text>
            <Text style={styles.time}>{time}</Text>
          </View>
          <Text style={styles.message} numberOfLines={2}>
            {message}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const ProfileNotificationScreen = () => {
  const navigation = useNavigation();
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      icon: 'calendar-check',
      title: 'Randevu Onaylandı',
      time: '5 dk önce',
      message: 'Diş hekimi randevunuz onaylandı. 15 Mart 2024, 14:30',
      isNew: true,
    },
    {
      id: '2',
      icon: 'bell-ring',
      title: 'Randevu Hatırlatması',
      time: '1 saat önce',
      message: 'Yarınki randevunuza 24 saat kaldı.',
      isNew: true,
    },
    {
      id: '3',
      icon: 'calendar-remove',
      title: 'Randevu İptali',
      time: '2 saat önce',
      message: 'Göz doktoru randevunuz iptal edildi.',
      isNew: false,
    },
    {
      id: '4',
      icon: 'star',
      title: 'Değerlendirme Hatırlatması',
      time: '1 gün önce',
      message: 'Son randevunuzu değerlendirmeyi unutmayın.',
      isNew: false,
    },
  ]);

  const handleNotificationPress = (notification) => {
    // Bildirimi okundu olarak işaretle
    const updatedNotifications = notifications.map(n => 
      n.id === notification.id ? { ...n, isNew: false } : n
    );
    setNotifications(updatedNotifications);
    setSelectedNotification(notification);
  };

  const clearAllNotifications = () => {
    setNotifications([]);
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
        <Text style={styles.headerTitle}>Bildirimler</Text>
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => navigation.navigate('NotificationSettings')}
        >
          <Icon name="cog" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Notifications List */}
        <View style={styles.notificationsList}>
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              {...notification}
              onPress={() => handleNotificationPress(notification)}
            />
          ))}
        </View>

        {/* Clear All Button */}
        {notifications.length > 0 && (
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={clearAllNotifications}
          >
            <Icon name="notification-clear-all" size={20} color="#FF3B30" />
            <Text style={styles.clearButtonText}>Tümünü Temizle</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <NotificationDetailModal
        notification={selectedNotification}
        visible={!!selectedNotification}
        onClose={() => setSelectedNotification(null)}
      />
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
  settingsButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  notificationsList: {
    paddingTop: 12,
  },
  notificationItem: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginBottom: 12,
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
  notificationContent: {
    flexDirection: 'row',
    padding: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  newIconContainer: {
    backgroundColor: '#E8F2FF',
  },
  textContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  newTitle: {
    color: '#007AFF',
  },
  time: {
    fontSize: 12,
    color: '#666',
  },
  message: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 24,
    padding: 12,
  },
  clearButtonText: {
    fontSize: 16,
    color: '#FF3B30',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: '60%',
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  modalTypeContainer: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  modalType: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  modalCloseButton: {
    padding: 8,
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
  },
  modalBody: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  modalTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTime: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  modalDivider: {
    height: 1,
    backgroundColor: '#EFEFEF',
    marginVertical: 16,
  },
  modalMessage: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 24,
  },
  modalActions: {
    marginTop: 'auto',
    gap: 12,
  },
  modalActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F2FF',
    padding: 16,
    borderRadius: 12,
  },
  modalActionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    marginLeft: 8,
  },
  modalSecondaryButton: {
    backgroundColor: '#F8F8F8',
  },
  modalSecondaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginLeft: 8,
  },
});

export default ProfileNotificationScreen; 