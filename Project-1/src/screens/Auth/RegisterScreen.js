import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  Platform,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Animated,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    username: '',
  });
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState({
    password: true,
    confirmPassword: true,
  });
  const [focusedInput, setFocusedInput] = useState(null);
  const [step, setStep] = useState(1);
  const slideAnim = useState(new Animated.Value(0))[0];

  const inputRefs = {
    email: useRef(null),
    password: useRef(null),
    confirmPassword: useRef(null),
    fullName: useRef(null),
    username: useRef(null),
  };

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        if (focusedInput) {
          setTimeout(() => {
            inputRefs[focusedInput]?.current?.focus();
          }, 100);
        }
      }
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, [focusedInput]);

  const handleNextStep = () => {
    const { email, password, confirmPassword } = formData;

    if (!email || !password || !confirmPassword) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Hata', 'Şifreler eşleşmiyor');
      return;
    }

    Animated.timing(slideAnim, {
      toValue: -width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setStep(2);
      slideAnim.setValue(0);
    });
  };

  const handleRegister = async () => {
    const { fullName, username } = formData;

    if (!fullName || !username) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }

    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      Alert.alert('Başarılı', 'Kayıt işlemi başarıyla tamamlandı', [
        { text: 'Tamam', onPress: () => navigation.navigate('Login') }
      ]);
    } catch (error) {
      Alert.alert('Hata', 'Kayıt olurken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (field, label, placeholder, icon, options = {}) => (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={[
        styles.inputWrapper,
        focusedInput === field && styles.inputWrapperFocused
      ]}>
        <Icon 
          name={icon} 
          size={20} 
          color={focusedInput === field ? '#007AFF' : '#666'} 
          style={styles.inputIcon} 
        />
        <TextInput
          style={[styles.input, Platform.select({
            android: {
              height: 48,
              paddingVertical: 0,
            }
          })]}
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={formData[field]}
          onChangeText={(text) => setFormData({ ...formData, [field]: text })}
          onFocus={() => setFocusedInput(field)}
          onBlur={() => setFocusedInput(null)}
          ref={inputRefs[field]}
          returnKeyType={field === 'confirmPassword' || field === 'username' ? 'done' : 'next'}
          blurOnSubmit={field === 'confirmPassword' || field === 'username'}
          onSubmitEditing={() => {
            if (field === 'email') inputRefs.password.current?.focus();
            else if (field === 'password') inputRefs.confirmPassword.current?.focus();
            else if (field === 'confirmPassword') handleNextStep();
            else if (field === 'fullName') inputRefs.username.current?.focus();
            else if (field === 'username') handleRegister();
          }}
          textContentType="none"
          importantForAutofill="no"
          autoComplete="off"
          contextMenuHidden={true}
          disableFullscreenUI={true}
          {...options}
        />
        {(field === 'password' || field === 'confirmPassword') && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setSecureTextEntry({
              ...secureTextEntry,
              [field]: !secureTextEntry[field]
            })}
          >
            <Icon
              name={secureTextEntry[field] ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      <View style={styles.stepLine}>
        <View style={[styles.stepLineInner, { width: step === 1 ? '50%' : '100%' }]} />
      </View>
      <View style={styles.stepCircles}>
        <View style={[styles.stepCircle, styles.stepCircleActive]}>
          <Text style={styles.stepNumber}>1</Text>
        </View>
        <View style={[styles.stepCircle, step === 2 && styles.stepCircleActive]}>
          <Text style={[styles.stepNumber, step === 2 && styles.stepNumberActive]}>2</Text>
        </View>
      </View>
      <View style={styles.stepTexts}>
        <Text style={[styles.stepText, styles.stepTextActive]}>Hesap</Text>
        <Text style={[styles.stepText, step === 2 && styles.stepTextActive]}>Kişisel Bilgiler</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="none"
        overScrollMode="never"
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => step === 1 ? navigation.goBack() : setStep(1)}
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon name="chevron-left" size={28} color="#1A1A1A" />
          </TouchableOpacity>
        </View>

        {renderStepIndicator()}

        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {step === 1 ? 'Hesap Oluştur' : 'Kişisel Bilgiler'}
            </Text>
            <Text style={styles.subtitle}>
              {step === 1 
                ? 'Hemen ücretsiz hesap oluşturarak randevu almaya başlayın'
                : 'Size daha iyi hizmet verebilmemiz için bilgilerinizi girin'
              }
            </Text>
          </View>

          <Animated.View 
            style={[
              styles.form,
              { transform: [{ translateX: slideAnim }] }
            ]}
          >
            {step === 1 ? (
              <>
                {renderInput('email', 'E-posta', 'E-posta adresinizi girin', 'email-outline', {
                  keyboardType: 'email-address',
                  autoCapitalize: 'none',
                  autoComplete: 'email'
                })}
                {renderInput('password', 'Şifre', 'Şifrenizi girin', 'lock-outline', {
                  secureTextEntry: secureTextEntry.password
                })}
                {renderInput('confirmPassword', 'Şifre Tekrarı', 'Şifrenizi tekrar girin', 'lock-outline', {
                  secureTextEntry: secureTextEntry.confirmPassword
                })}

                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={handleNextStep}
                >
                  <Text style={styles.registerButtonText}>Devam Et</Text>
                  <Icon name="arrow-right" size={20} color="#FFF" />
                </TouchableOpacity>
              </>
            ) : (
              <>
                {renderInput('fullName', 'Ad Soyad', 'Ad ve soyadınızı girin', 'account-circle-outline')}
                {renderInput('username', 'Kullanıcı Adı', 'Kullanıcı adınızı girin', 'account-outline')}

                <TouchableOpacity
                  style={[styles.registerButton, loading && styles.registerButtonDisabled]}
                  onPress={handleRegister}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFF" />
                  ) : (
                    <>
                      <Text style={styles.registerButtonText}>Kayıt Ol</Text>
                      <Icon name="arrow-right" size={20} color="#FFF" />
                    </>
                  )}
                </TouchableOpacity>
              </>
            )}

            <TouchableOpacity
              style={styles.loginLink}
              onPress={() => navigation.navigate('Login')}
              disabled={loading}
            >
              <Text style={styles.loginLinkText}>
                Zaten hesabınız var mı? <Text style={styles.loginLinkTextBold}>Giriş Yap</Text>
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: Platform.OS === 'ios' ? 50 : 80,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepIndicator: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  stepLine: {
    height: 3,
    backgroundColor: '#E9ECEF',
    borderRadius: 1.5,
    marginBottom: 16,
  },
  stepLineInner: {
    height: 3,
    backgroundColor: '#007AFF',
    borderRadius: 1.5,
  },
  stepCircles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 24,
    top: -8,
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#E9ECEF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleActive: {
    borderColor: '#007AFF',
    backgroundColor: '#007AFF',
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  stepNumberActive: {
    color: '#FFF',
  },
  stepTexts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  stepText: {
    fontSize: 13,
    color: '#666',
  },
  stepTextActive: {
    color: '#007AFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  titleContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E9ECEF',
    paddingHorizontal: 16,
    height: Platform.OS === 'ios' ? 56 : 54,
    overflow: 'hidden',
  },
  inputWrapperFocused: {
    borderColor: '#007AFF',
    backgroundColor: '#FFF',
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
    textAlignVertical: 'center',
  },
  eyeIcon: {
    padding: 8,
  },
  registerButton: {
    backgroundColor: '#007AFF',
    height: 56,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    gap: 8,
  },
  registerButtonDisabled: {
    opacity: 0.7,
  },
  registerButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loginLink: {
    alignItems: 'center',
    padding: 16,
  },
  loginLinkText: {
    color: '#666',
    fontSize: 15,
  },
  loginLinkTextBold: {
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default RegisterScreen;
