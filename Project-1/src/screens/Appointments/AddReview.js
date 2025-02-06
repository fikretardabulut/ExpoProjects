import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const RatingButton = ({ rating, selectedRating, onSelect }) => (
  <TouchableOpacity
    style={[
      styles.ratingButton,
      rating === selectedRating && styles.selectedRating,
    ]}
    onPress={() => onSelect(rating)}
  >
    <Icon
      name="star"
      size={24}
      color={rating === selectedRating ? '#FFF' : '#FFB800'}
    />
    <Text
      style={[
        styles.ratingText,
        rating === selectedRating && styles.selectedRatingText,
      ]}
    >
      {rating}
    </Text>
  </TouchableOpacity>
);

const AddReview = () => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [pros, setPros] = useState('');
  const [cons, setCons] = useState('');

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert('Uyarı', 'Lütfen bir puan seçin');
      return;
    }

    if (review.trim().length < 10) {
      Alert.alert('Uyarı', 'Lütfen en az 10 karakter uzunluğunda bir değerlendirme yazın');
      return;
    }

    // Submit review
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
        <Text style={styles.headerTitle}>Değerlendirme Yaz</Text>
        <TouchableOpacity 
          style={[styles.submitButton, !rating && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={!rating}
        >
          <Text style={[styles.submitButtonText, !rating && styles.submitButtonTextDisabled]}>
            Gönder
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Doctor Info */}
        <View style={styles.doctorInfo}>
          <View style={styles.doctorAvatar}>
            <Icon name="account" size={32} color="#007AFF" />
          </View>
          <View style={styles.doctorDetails}>
            <Text style={styles.doctorName}>Dr. Ahmet Yılmaz</Text>
            <Text style={styles.doctorSpecialty}>Kardiyoloji</Text>
          </View>
        </View>

        {/* Rating */}
        <View style={styles.ratingSection}>
          <Text style={styles.sectionTitle}>Puanınız</Text>
          <View style={styles.ratingButtons}>
            {[1, 2, 3, 4, 5].map((value) => (
              <RatingButton
                key={value}
                rating={value}
                selectedRating={rating}
                onSelect={setRating}
              />
            ))}
          </View>
        </View>

        {/* Review */}
        <View style={styles.reviewSection}>
          <Text style={styles.sectionTitle}>Değerlendirmeniz</Text>
          <TextInput
            style={styles.reviewInput}
            placeholder="Deneyiminizi paylaşın..."
            multiline
            numberOfLines={4}
            value={review}
            onChangeText={setReview}
          />
        </View>

        {/* Pros & Cons */}
        <View style={styles.prosConsSection}>
          <View style={styles.prosSection}>
            <View style={styles.sectionTitleContainer}>
              <Icon name="plus-circle" size={20} color="#34C759" />
              <Text style={styles.sectionTitle}>Artıları</Text>
            </View>
            <TextInput
              style={styles.prosConsInput}
              placeholder="Olumlu yönleri..."
              multiline
              numberOfLines={3}
              value={pros}
              onChangeText={setPros}
            />
          </View>

          <View style={styles.consSection}>
            <View style={styles.sectionTitleContainer}>
              <Icon name="minus-circle" size={20} color="#FF3B30" />
              <Text style={styles.sectionTitle}>Eksileri</Text>
            </View>
            <TextInput
              style={styles.prosConsInput}
              placeholder="Geliştirilmesi gereken yönleri..."
              multiline
              numberOfLines={3}
              value={cons}
              onChangeText={setCons}
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
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  submitButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  submitButtonTextDisabled: {
    color: '#999',
  },
  scrollView: {
    flex: 1,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    marginBottom: 16,
  },
  doctorAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
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
  doctorSpecialty: {
    fontSize: 14,
    color: '#666',
  },
  ratingSection: {
    padding: 16,
    backgroundColor: '#FFF',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  ratingButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFB800',
  },
  selectedRating: {
    backgroundColor: '#FFB800',
    borderColor: '#FFB800',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFB800',
    marginTop: 4,
  },
  selectedRatingText: {
    color: '#FFF',
  },
  reviewSection: {
    padding: 16,
    backgroundColor: '#FFF',
    marginBottom: 16,
  },
  reviewInput: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 12,
    height: 120,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#333',
  },
  prosConsSection: {
    backgroundColor: '#FFF',
    padding: 16,
    marginBottom: 24,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  prosSection: {
    marginBottom: 16,
  },
  prosConsInput: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 12,
    height: 80,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#333',
  },
});

export default AddReview;