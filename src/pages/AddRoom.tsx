import {
  ScrollView,
  View,
  TouchableOpacity,
  Alert,
  TextInput,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { TextView } from "../components/TextView";
import { useTheme } from "../theme/useTheme";
import { Wrapper } from "../components/Wrapper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Spacer } from "@components/Spacer";
import { Button } from "@components/Button";
import { DeviceWidth } from "@utils/common";
import { Header } from "@components/Header";
import Feather from "react-native-vector-icons/Feather";
import { useDispatch } from "react-redux";
import { addRoom } from "@services/roomservice";

export default function AddRoom({ route }) {
  const { font, theme } = useTheme();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  
  const { propertyId } = route.params || {};

  // Form state
  const [formData, setFormData] = useState({
    roomName: "",
    roomType: "Single Occupancy",
    totalBeds: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const roomTypes = ["Single Occupancy", "Shared", "Private", "Dormitory"];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.roomName.trim()) {
      newErrors.roomName = "Room name is required";
    }

    if (!formData.totalBeds.trim()) {
      newErrors.totalBeds = "Total beds is required";
    } else if (isNaN(formData.totalBeds) || parseInt(formData.totalBeds) <= 0) {
      newErrors.totalBeds = "Please enter a valid number of beds";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveRoom = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

      const payload = {
        pg_property_id: Date.now(),
        room_number: formData.roomName,
        room_type: formData.roomType,
        total_beds: parseInt(formData.totalBeds),
        description: formData.description,
      };

      dispatch(addRoom(payload));
  
  };

  const renderRoomTypeSelector = () => (
    <View>
      <TextView
        title="Room Type"
        size={font.fontConfig.fontSizes.font16}
        color={theme.colors.black}
        weight={font.fontConfig.fontWeights.medium}
        style={{ marginBottom: 8 }}
      />
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: 16,
        }}
      >
        {roomTypes.map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => handleInputChange("roomType", type)}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: formData.roomType === type ? theme.colors.primary.dark :theme.colors.bgColor,
              backgroundColor: formData.roomType === type ? theme.colors.primary : theme.colors.white,
            }}
          >
            <TextView
              title={type}
              size={font.fontConfig.fontSizes.font14}
              color={theme.colors.black}
              weight={font.fontConfig.fontWeights.regular}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderInputField = (label, field, placeholder, keyboardType = "default", multiline = false) => (
    <View style={{ marginBottom: 16 }}>
      <TextView
        title={label}
        size={font.fontConfig.fontSizes.font16}
        color={theme.colors.black}
        weight={font.fontConfig.fontWeights.medium}
        style={{ marginBottom: 8 }}
      />
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: errors[field] ? theme.colors.red : "#D0D5DD",
          borderRadius: 8,
          padding: 12,
          fontSize: font.fontConfig.fontSizes.font14,
          color: theme.colors.black,
          backgroundColor: theme.colors.white,
          textAlignVertical: multiline ? "top" : "center",
          minHeight: multiline ? 80 : 48,
        }}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.gray}
        value={formData[field]}
        onChangeText={(value) => handleInputChange(field, value)}
        keyboardType={keyboardType}
        multiline={multiline}
      />
      {errors[field] && (
        <TextView
          title={errors[field]}
          size={font.fontConfig.fontSizes.font12}
          color={theme.colors.red}
          weight={font.fontConfig.fontWeights.regular}
          style={{ marginTop: 4 }}
        />
      )}
    </View>
  );

  return (
    <SafeAreaView
         style={{
           flex: 1,
           backgroundColor: theme.colors.white,
           paddingTop: insets.top, // Use safe area insets
         }}
       >
         <StatusBar
           barStyle="dark-content"
           backgroundColor={theme.colors.white}
           translucent={false}
         />
   
         <Header title={"Add New Room"} withBack />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40,padding:12 }}
      >
        {/* Form Card */}
        <View
          style={{
            backgroundColor: theme.colors.white,
            borderRadius: 12,
            padding: 20,
            borderColor: "#D0D5DD",
            borderWidth: 1,
            marginBottom: 24,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: theme.colors.lightGray,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 12,
              }}
            >
              <Feather name="home" size={20} color={theme.colors.primary} />
            </View>
            <View>
              <TextView
                title="Room Details"
                size={font.fontConfig.fontSizes.font18}
                color={theme.colors.black}
                weight={font.fontConfig.fontWeights.bold}
              />
              <TextView
                title="Fill in the information below"
                size={font.fontConfig.fontSizes.font14}
                color={theme.colors.gray}
                weight={font.fontConfig.fontWeights.regular}
              />
            </View>
          </View>

          {renderInputField("Room Name", "roomName", "Enter room name (e.g., Room A1)")}
          
          <Spacer height={8} />
          
          {renderRoomTypeSelector()}
          
          {renderInputField("Total Beds", "totalBeds", "Enter number of beds", "numeric")}
          
          {renderInputField("Description (Optional)", "description", "Enter room description...", "default", true)}
        </View>

        {/* Summary Card */}
        <View
          style={{
            backgroundColor: theme.colors.white,
            borderRadius: 12,
            padding: 20,
            borderColor: "#D0D5DD",
            borderWidth: 1,
            marginBottom: 24,
          }}
        >
          <TextView
            title="Summary"
            size={font.fontConfig.fontSizes.font18}
            color={theme.colors.black}
            weight={font.fontConfig.fontWeights.bold}
            style={{ marginBottom: 12 }}
          />
          
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
            <TextView
              title="Room Name:"
              size={font.fontConfig.fontSizes.font14}
              color={theme.colors.gray}
              weight={font.fontConfig.fontWeights.regular}
            />
            <TextView
              title={formData.roomName || "Not specified"}
              size={font.fontConfig.fontSizes.font14}
              color={theme.colors.black}
              weight={font.fontConfig.fontWeights.medium}
            />
          </View>
          
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
            <TextView
              title="Room Type:"
              size={font.fontConfig.fontSizes.font14}
              color={theme.colors.gray}
              weight={font.fontConfig.fontWeights.regular}
            />
            <TextView
              title={formData.roomType}
              size={font.fontConfig.fontSizes.font14}
              color={theme.colors.black}
              weight={font.fontConfig.fontWeights.medium}
            />
          </View>
          
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
            <TextView
              title="Total Beds:"
              size={font.fontConfig.fontSizes.font14}
              color={theme.colors.gray}
              weight={font.fontConfig.fontWeights.regular}
            />
            <TextView
              title={formData.totalBeds || "0"}
              size={font.fontConfig.fontSizes.font14}
              color={theme.colors.black}
              weight={font.fontConfig.fontWeights.medium}
            />
          </View>
          
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <TextView
              title="Initial Status:"
              size={font.fontConfig.fontSizes.font14}
              color={theme.colors.gray}
              weight={font.fontConfig.fontWeights.regular}
            />
            <TextView
              title={formData.totalBeds ? `0/${formData.totalBeds} Filled` : "0/0 Filled"}
              size={font.fontConfig.fontSizes.font14}
              color={theme.colors.orange}
              weight={font.fontConfig.fontWeights.medium}
            />
          </View>
        </View>

        {/* Action Buttons */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <Button
            title={"Cancel"}
            onPress={() => navigation.goBack()}
            width={(DeviceWidth - 36) / 2}
            variant="secondary" // Assuming you have a secondary variant
          />

          <Button
            title={isLoading ? "Saving..." : "Save Room"}
            onPress={handleSaveRoom}
            width={(DeviceWidth - 36) / 2}
            disabled={isLoading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}