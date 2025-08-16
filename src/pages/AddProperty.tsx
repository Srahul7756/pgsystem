import {
  ScrollView,
  View,
  TouchableOpacity,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Image
} from 'react-native';
import React, { useState, useRef } from 'react';
import { TextView } from '../components/TextView';
import { useTheme } from '../theme/useTheme';
import { Wrapper } from '../components/Wrapper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Spacer } from '@components/Spacer';
import { TextInput } from '@components/TextInput';
import { Button } from '@components/Button';
import Feather from 'react-native-vector-icons/Feather';

export default function AddProperty() {
  const { font, theme } = useTheme();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  // Form state for property details
  const [propertyData, setPropertyData] = useState({
    // Property Details
    propertyName: '',
    propertyType: 'PG',
    address: '',
    city: '',
    state: '',
    pincode: '',
    totalRooms: '',
    totalBeds: '',
    rentPerBed: '',
    securityDeposit: '',
    description: '',
    
    // Owner Details
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    ownerAddress: '',
    ownerAadhar: '',
    ownerPan: '',
    
    // Additional Details
    amenities: [],
    rules: '',
    nearbyPlaces: ''
  });

  // UI state
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPropertyTypeModal, setShowPropertyTypeModal] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const propertyTypes = ['PG', 'Hostel', 'Lodge', 'Guest House', 'Dormitory'];
  const availableAmenities = [
    'WiFi', 'AC', 'Laundry', 'Parking', 'Security', 'CCTV',
    'Gym', 'Mess', 'Kitchen', 'Generator', 'Water Purifier', 'TV'
  ];

  // Validation functions
  const validateRequired = (value, fieldName) => {
    if (!value || !value.toString().trim()) {
      return `${fieldName} is required`;
    }
    return '';
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email.trim())) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    if (phone && !phoneRegex.test(phone.trim())) {
      return 'Please enter a valid 10-digit phone number';
    }
    return '';
  };

  const validatePincode = (pincode) => {
    const pincodeRegex = /^\d{6}$/;
    if (pincode && !pincodeRegex.test(pincode.trim())) {
      return 'Please enter a valid 6-digit pincode';
    }
    return '';
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Property validations
    const propertyNameError = validateRequired(propertyData.propertyName, 'Property Name');
    const addressError = validateRequired(propertyData.address, 'Address');
    const cityError = validateRequired(propertyData.city, 'City');
    const stateError = validateRequired(propertyData.state, 'State');
    const pincodeError = validateRequired(propertyData.pincode, 'Pincode') || validatePincode(propertyData.pincode);
    const totalRoomsError = validateRequired(propertyData.totalRooms, 'Total Rooms');
    const totalBedsError = validateRequired(propertyData.totalBeds, 'Total Beds');
    const rentError = validateRequired(propertyData.rentPerBed, 'Rent per Bed');
    
    // Owner validations
    const ownerNameError = validateRequired(propertyData.ownerName, 'Owner Name');
    const ownerPhoneError = validateRequired(propertyData.ownerPhone, 'Owner Phone') || validatePhone(propertyData.ownerPhone);
    const ownerEmailError = validateEmail(propertyData.ownerEmail);
    
    // Set errors
    if (propertyNameError) newErrors.propertyName = propertyNameError;
    if (addressError) newErrors.address = addressError;
    if (cityError) newErrors.city = cityError;
    if (stateError) newErrors.state = stateError;
    if (pincodeError) newErrors.pincode = pincodeError;
    if (totalRoomsError) newErrors.totalRooms = totalRoomsError;
    if (totalBedsError) newErrors.totalBeds = totalBedsError;
    if (rentError) newErrors.rentPerBed = rentError;
    if (ownerNameError) newErrors.ownerName = ownerNameError;
    if (ownerPhoneError) newErrors.ownerPhone = ownerPhoneError;
    if (ownerEmailError) newErrors.ownerEmail = ownerEmailError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setPropertyData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleAmenityToggle = (amenity) => {
    setSelectedAmenities(prev => {
      if (prev.includes(amenity)) {
        return prev.filter(item => item !== amenity);
      } else {
        return [...prev, amenity];
      }
    });
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please fix the errors and try again.');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      const formDataWithAmenities = {
        ...propertyData,
        amenities: selectedAmenities
      };
      
      console.log('Property Data:', formDataWithAmenities);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Success',
        'Property added successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
            }
          }
        ]
      );
      
    } catch (error) {
      Alert.alert(
        'Error',
        error.message || 'Failed to add property. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormField = (field, hint, keyboardType = 'default', multiline = false) => (
    <View style={{ marginBottom: 16 }}>
      <TextInput
        value={propertyData[field]}
        hint={hint}
        onChangeText={(text) => handleInputChange(field, text)}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
        autoCapitalize={keyboardType === 'email-address' ? 'none' : 'words'}
      />
      {errors[field] && (
        <View style={{ marginTop: 4 }}>
          <TextView
            title={errors[field]}
            size={font.fontConfig.fontSizes.font12}
            color={theme.colors.error || '#FF6B6B'}
            weight={font.fontConfig.fontWeights.medium}
          />
        </View>
      )}
    </View>
  );

  const PropertyTypeModal = () => (
    <Modal
      visible={showPropertyTypeModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowPropertyTypeModal(false)}>
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <View style={{
          backgroundColor: theme.colors.white,
          borderRadius: 12,
          padding: 20,
          width: '80%',
          maxHeight: '60%'
        }}>
          <TextView
            title="Select Property Type"
            size={font.fontConfig.fontSizes.font18}
            color={theme.colors.text?.primary || '#000'}
            weight={font.fontConfig.fontWeights.bold}
            style={{ textAlign: 'center', marginBottom: 20 }}
          />
          
          {propertyTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={{
                padding: 16,
                borderBottomWidth: 1,
                borderBottomColor: theme.colors.neutral?.lightActive || '#E5E5E5'
              }}
              onPress={() => {
                handleInputChange('propertyType', type);
                setShowPropertyTypeModal(false);
              }}>
              <TextView
                title={type}
                size={font.fontConfig.fontSizes.font16}
                color={propertyData.propertyType === type ? theme.colors.primary?.dark : theme.colors.text?.primary}
                weight={propertyData.propertyType === type ? font.fontConfig.fontWeights.bold : font.fontConfig.fontWeights.regular}
              />
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity
            style={{ marginTop: 16, alignItems: 'center' }}
            onPress={() => setShowPropertyTypeModal(false)}>
            <TextView
              title="Cancel"
              size={font.fontConfig.fontSizes.font16}
              color={theme.colors.primary?.dark}
              weight={font.fontConfig.fontWeights.medium}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <Wrapper
      statusBarColor={theme.colors.primary?.dark || '#2B6CB0'}
      bgColor={theme.colors.background?.primary || '#F8F9FA'}
      noPadding>
      
      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            
            {/* Header */}
            <View style={{ 
              backgroundColor: theme.colors.primary?.dark || '#2B6CB0',
              paddingHorizontal: 20,
              paddingBottom: 20,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20
            }}>
              <Spacer height={20} />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{ marginRight: 16 }}>
                  <Feather name="arrow-left" size={24} color={theme.colors.white} />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                  <TextView
                    title="Add New Property"
                    size={font.fontConfig.fontSizes.font20 || 20}
                    color={theme.colors.white}
                    weight={font.fontConfig.fontWeights.bold}
                  />
                  <Spacer height={4} />
                  <TextView
                    title="Fill property and owner details"
                    size={font.fontConfig.fontSizes.font14 || 14}
                    color={theme.colors.white}
                    weight={font.fontConfig.fontWeights.regular}
                  />
                </View>
              </View>
            </View>

            <ScrollView 
              style={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ padding: 20 }}>
              
              {/* Property Details Section */}
              <View style={{
                backgroundColor: theme.colors.white,
                borderRadius: 12,
                padding: 20,
                marginBottom: 20,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3
              }}>
                <TextView
                  title="Property Details"
                  size={font.fontConfig.fontSizes.font18}
                  color={theme.colors.text?.primary || '#000'}
                  weight={font.fontConfig.fontWeights.bold}
                  style={{ marginBottom: 16 }}
                />
                
                {renderFormField('propertyName', 'Property Name *')}
                
                {/* Property Type Selector */}
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: theme.colors.neutral?.lightActive || '#E5E5E5',
                    borderRadius: 8,
                    padding: 16,
                    marginBottom: 16,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                  onPress={() => setShowPropertyTypeModal(true)}>
                  <TextView
                    title={propertyData.propertyType || 'Select Property Type *'}
                    size={font.fontConfig.fontSizes.font16}
                    color={propertyData.propertyType ? theme.colors.text?.primary : theme.colors.text?.secondary}
                    weight={font.fontConfig.fontWeights.regular}
                  />
                  <Feather name="chevron-down" size={20} color={theme.colors.text?.secondary} />
                </TouchableOpacity>
                
                {renderFormField('address', 'Full Address *')}
                
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ width: '48%' }}>
                    {renderFormField('city', 'City *')}
                  </View>
                  <View style={{ width: '48%' }}>
                    {renderFormField('state', 'State *')}
                  </View>
                </View>
                
                {renderFormField('pincode', 'Pincode *', 'numeric')}
                
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ width: '48%' }}>
                    {renderFormField('totalRooms', 'Total Rooms *', 'numeric')}
                  </View>
                  <View style={{ width: '48%' }}>
                    {renderFormField('totalBeds', 'Total Beds *', 'numeric')}
                  </View>
                </View>
                
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ width: '48%' }}>
                    {renderFormField('rentPerBed', 'Rent per Bed *', 'numeric')}
                  </View>
                  <View style={{ width: '48%' }}>
                    {renderFormField('securityDeposit', 'Security Deposit', 'numeric')}
                  </View>
                </View>
                
                {renderFormField('description', 'Property Description', 'default', true)}
              </View>

              {/* Owner Details Section */}
              <View style={{
                backgroundColor: theme.colors.white,
                borderRadius: 12,
                padding: 20,
                marginBottom: 20,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3
              }}>
                <TextView
                  title="Owner Details"
                  size={font.fontConfig.fontSizes.font18}
                  color={theme.colors.text?.primary || '#000'}
                  weight={font.fontConfig.fontWeights.bold}
                  style={{ marginBottom: 16 }}
                />
                
                {renderFormField('ownerName', 'Owner Name *')}
                {renderFormField('ownerPhone', 'Owner Phone *', 'phone-pad')}
                {renderFormField('ownerEmail', 'Owner Email', 'email-address')}
                {renderFormField('ownerAddress', 'Owner Address')}
                {renderFormField('ownerAadhar', 'Aadhar Number', 'numeric')}
                {renderFormField('ownerPan', 'PAN Number')}
              </View>

              {/* Amenities Section */}
              <View style={{
                backgroundColor: theme.colors.white,
                borderRadius: 12,
                padding: 20,
                marginBottom: 20,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3
              }}>
                <TextView
                  title="Amenities"
                  size={font.fontConfig.fontSizes.font18}
                  color={theme.colors.text?.primary || '#000'}
                  weight={font.fontConfig.fontWeights.bold}
                  style={{ marginBottom: 16 }}
                />
                
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  {availableAmenities.map((amenity) => (
                    <TouchableOpacity
                      key={amenity}
                      style={{
                        backgroundColor: selectedAmenities.includes(amenity) 
                          ? theme.colors.primary?.dark 
                          : theme.colors.neutral?.lightActive,
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        borderRadius: 20,
                        margin: 4
                      }}
                      onPress={() => handleAmenityToggle(amenity)}>
                      <TextView
                        title={amenity}
                        size={font.fontConfig.fontSizes.font12}
                        color={selectedAmenities.includes(amenity) 
                          ? theme.colors.white 
                          : theme.colors.text?.primary}
                        weight={font.fontConfig.fontWeights.medium}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Additional Details Section */}
              <View style={{
                backgroundColor: theme.colors.white,
                borderRadius: 12,
                padding: 20,
                marginBottom: 20,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3
              }}>
                <TextView
                  title="Additional Details"
                  size={font.fontConfig.fontSizes.font18}
                  color={theme.colors.text?.primary || '#000'}
                  weight={font.fontConfig.fontWeights.bold}
                  style={{ marginBottom: 16 }}
                />
                
                {renderFormField('rules', 'Property Rules', 'default', true)}
                {renderFormField('nearbyPlaces', 'Nearby Places (Metro, Bus Stop, etc.)', 'default', true)}
              </View>

              {/* Submit Button */}
              <Button
                title={isLoading ? 'Adding Property...' : 'Add Property'}
                onPress={handleSubmit}
                disabled={isLoading}
                variant="primary"
                style={{
                  backgroundColor: theme.colors.primary?.dark || '#2B6CB0',
                  marginBottom: 40
                }}
              />
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      
      <PropertyTypeModal />
    </Wrapper>
  );
}