import React from 'react';
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

const LicenseItem = ({ name, version, license, link }) => (
  <View style={styles.licenseItem}>
    <View style={styles.packageInfo}>
      <Text style={styles.packageName}>{name}</Text>
      <Text style={styles.packageVersion}>v{version}</Text>
    </View>
    <Text style={styles.licenseType}>{license}</Text>
    <Text style={styles.licenseLink}>{link}</Text>
  </View>
);

const Licenses = () => {
  const navigation = useNavigation();

  const licenses = [
    {
      name: 'react-native',
      version: '0.72.6',
      license: 'MIT License',
      link: 'https://github.com/facebook/react-native',
    },
    {
      name: '@react-navigation/native',
      version: '6.1.9',
      license: 'MIT License',
      link: 'https://github.com/react-navigation/react-navigation',
    },
    {
      name: 'react-native-vector-icons',
      version: '10.0.0',
      license: 'MIT License',
      link: 'https://github.com/oblador/react-native-vector-icons',
    },
    {
      name: '@react-native-async-storage/async-storage',
      version: '1.21.0',
      license: 'MIT License',
      link: 'https://github.com/react-native-async-storage/async-storage',
    },
    {
      name: 'react-native-reanimated',
      version: '3.6.1',
      license: 'MIT License',
      link: 'https://github.com/software-mansion/react-native-reanimated',
    },
  ];

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
        <Text style={styles.headerTitle}>Lisans Bilgileri</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={[styles.content, { paddingBottom: 80 }]}>
          <View style={styles.infoBox}>
            <Icon name="information" size={24} color="#007AFF" />
            <Text style={styles.infoText}>
              Bu uygulama, aşağıdaki açık kaynak yazılımları kullanmaktadır. 
              Her bir paketin lisans bilgilerine linklerden ulaşabilirsiniz.
            </Text>
          </View>

          <View style={styles.licensesList}>
            {licenses.map((item, index) => (
              <LicenseItem
                key={index}
                name={item.name}
                version={item.version}
                license={item.license}
                link={item.link}
              />
            ))}
          </View>

          <View style={styles.additionalInfo}>
            <Text style={styles.additionalInfoTitle}>
              Diğer Bilgiler
            </Text>
            <Text style={styles.additionalInfoText}>
              Bu uygulama MIT lisansı altında lisanslanmıştır. Detaylı bilgi için 
              GitHub repository'mizi ziyaret edebilirsiniz.
            </Text>
            <TouchableOpacity style={styles.githubButton}>
              <Icon name="github" size={20} color="#FFF" />
              <Text style={styles.githubButtonText}>GitHub'da Görüntüle</Text>
            </TouchableOpacity>
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
  content: {
    padding: 16,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F2FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  licensesList: {
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
  licenseItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  packageInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  packageName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  packageVersion: {
    fontSize: 14,
    color: '#666',
  },
  licenseType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  licenseLink: {
    fontSize: 14,
    color: '#007AFF',
  },
  additionalInfo: {
    marginTop: 24,
    backgroundColor: '#FFF',
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
  additionalInfoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  additionalInfoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  githubButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  githubButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Licenses; 