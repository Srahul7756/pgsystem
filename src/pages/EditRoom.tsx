import {
  ScrollView,
  View,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { TextView } from "../components/TextView";
import { useTheme } from "../theme/useTheme";
import { Wrapper } from "../components/Wrapper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Spacer } from "@components/Spacer";
import { Button } from "@components/Button";
import { DeviceWidth } from "@utils/common";
import { Header } from "@components/Header";
import Feather from "react-native-vector-icons/Feather";

export default function EditRoom({ route }) {
  const { font, theme } = useTheme();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  
  // Get room data and property ID from route params
  const { roomData, propertyId } = route.params || {};

  // Form state - initialize with existing room data
  const [formData, setFormData] = useState({
    roomName: "",
    roomType: "Single Occupancy",
    totalBeds: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Room type options
  const roomTypes = ["Single Occupancy", "Shared", "Private", "Dormitory"];

  // Pre-fill form with existing room data
  useEffect(() => {
    if (roomData) {
      setFormData({
        roomName: roomData.name || "",
        roomType: roomData.type || "Single Occupancy",
        totalBeds: roomData.totalBeds ? roomData.totalBeds.toString() : "",
        description: roomData.description || "",
      });
    }
  }, [roomData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
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

  const handleUpdateRoom = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Here you would typically make an API call to update the room
      // For now, we'll simulate an API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedRoom = {
        ...roomData,
        id: roomData.id,
        name: formData.roomName,
        type: formData.roomType,
        totalBeds: parseInt(formData.totalBeds),
        // Keep existing occupied count if available
        occupied: roomData.occupied || 0,
        vacant: parseInt(formData.totalBeds) - (roomData.occupied || 0),
        status: `${roomData.occupied || 0}/${formData.totalBeds} Filled`,
        description: formData.description,
        propertyId: propertyId || roomData.propertyId,
      };

      // Show success message
      Alert.alert(
        "Success",
        "Room updated successfully!",
        [
          {
            text: "OK",
            onPress: () => {
              // Navigate back with updated data
              navigation.goBack();
              // You might want to pass the updated room data back
              // navigation.navigate('PreviousScreen', { updatedRoom });
            },
          },
        ]
      );

    } catch (error) {
      Alert.alert("Error", "Failed to update room. Please try again.");
      console.error("Error updating room:", error);
    } finally {
      setIsLoading(false);
    }
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
              borderColor: formData.roomType === type ? theme.colors.primary.dark : theme.colors.bgColor,
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
    <Wrapper
      header={<Header title={"Edit Room"} withBack />}
      bgColor={"#F2F4F7"}
      statusBarColor={theme.colors.white}
      noPadding={false}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
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
              <Feather name="edit" size={20} color={theme.colors.primary} />
            </View>
            <View>
              <TextView
                title="Edit Room Details"
                size={font.fontConfig.fontSizes.font18}
                color={theme.colors.black}
                weight={font.fontConfig.fontWeights.bold}
              />
              <TextView
                title="Update the information below"
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
              title="Current Status:"
              size={font.fontConfig.fontSizes.font14}
              color={theme.colors.gray}
              weight={font.fontConfig.fontWeights.regular}
            />
            <TextView
              title={
                formData.totalBeds 
                  ? `${roomData?.occupied || 0}/${formData.totalBeds} Filled` 
                  : "0/0 Filled"
              }
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
            variant="secondary"
          />

          <Button
            title={isLoading ? "Updating..." : "Update Room"}
            onPress={handleUpdateRoom}
            width={(DeviceWidth - 36) / 2}
            disabled={isLoading}
          />
        </View>
      </ScrollView>
    </Wrapper>
  );
}
