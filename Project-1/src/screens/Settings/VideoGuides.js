import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const VideoCard = ({ title, duration, thumbnail, views, onPress }) => (
  <TouchableOpacity style={styles.videoCard} onPress={onPress}>
    <View style={styles.thumbnailContainer}>
      <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
      <View style={styles.durationBadge}>
        <Text style={styles.durationText}>{duration}</Text>
      </View>
    </View>
    <View style={styles.videoInfo}>
      <Text style={styles.videoTitle} numberOfLines={2}>{title}</Text>
      <View style={styles.videoStats}>
        <View style={styles.statItem}>
          <Icon name="eye" size={14} color="#666" />
          <Text style={styles.statText}>{views} görüntülenme</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const VideoGuides = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', title: 'Tümü', icon: 'play-circle' },
    { id: 'basics', title: 'Temel Bilgiler', icon: 'information' },
    { id: 'appointments', title: 'Randevu İşlemleri', icon: 'calendar-clock' },
    { id: 'payments', title: 'Ödeme İşlemleri', icon: 'credit-card' },
  ];

  const videos = [
    {
      id: '1',
      category: 'basics',
      title: 'Uygulamaya Giriş ve Kayıt',
      duration: '3:45',
      thumbnail: 'https://example.com/thumbnail1.jpg',
      views: '1.2K',
    },
    {
      id: '2',
      category: 'appointments',
      title: 'Nasıl Randevu Alınır?',
      duration: '4:20',
      thumbnail: 'https://example.com/thumbnail2.jpg',
      views: '856',
    },
    {
      id: '3',
      category: 'payments',
      title: 'Güvenli Ödeme Yapma',
      duration: '2:55',
      thumbnail: 'https://example.com/thumbnail3.jpg',
      views: '1.5K',
    },
  ];

  const filteredVideos = selectedCategory === 'all' 
    ? videos 
    : videos.filter(video => video.category === selectedCategory);

  const handlePlayVideo = (videoId) => {
    // Video oynatma işlemi
    console.log('Playing video:', videoId);
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
        <Text style={styles.headerTitle}>Video Rehberler</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Icon
              name={category.icon}
              size={20}
              color={selectedCategory === category.id ? '#007AFF' : '#666'}
            />
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.id && styles.categoryTextActive,
              ]}
            >
              {category.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Videos List */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {filteredVideos.map((video) => (
          <VideoCard
            key={video.id}
            {...video}
            onPress={() => handlePlayVideo(video.id)}
          />
        ))}
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
  categoriesContainer: {
    maxHeight: 60,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  categoriesContent: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#F8F8F8',
    height: 40,
  },
  categoryButtonActive: {
    backgroundColor: '#E8F2FF',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  categoryTextActive: {
    color: '#007AFF',
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  videoCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
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
  thumbnailContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  durationText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '500',
  },
  videoInfo: {
    padding: 12,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  videoStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: '#666',
  },
});

export default VideoGuides; 