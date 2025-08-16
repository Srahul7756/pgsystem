import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import { TextView } from "../components/TextView";
import { useTheme } from "../theme/useTheme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Spacer } from "@components/Spacer";
import { Button } from "@components/Button";
import Feather from "react-native-vector-icons/Feather";
import { DeviceWidth } from "@utils/common";
import { Header } from "@components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getRooms } from "@services/roomservice";
import { getRoomsSelector } from "@store/selectors";

export default function PropertyDetails({ route }) {
  const { font, theme } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const {data} = useSelector(getRoomsSelector)
  console.log('data: ', data);

  // Property data - can be passed from route params or fetched
  const [propertyData, setPropertyData] = useState({
    id: 1,
    name: "Sunset Apartments",
    address: "123 Main Street, Downtown, City 12345",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcqgtsGNO_IfzYM6VPS8lNikw4JWE-gsEBjQ&s",
    totalRooms: 24,
    totalBeds: 48,
    filled: 36,
    vacant: 12,
  });

  const [rooms, setRooms] = useState([
    {
      id: 1,
      name: "Room A1",
      type: "Single Occupancy",
      totalBeds: 4,
      occupied: 4,
      vacant: 0,
      status: "4/4 Filled",
    },
    {
      id: 2,
      name: "Room A2",
      type: "Shared",
      totalBeds: 3,
      occupied: 2,
      vacant: 1,
      status: "2/3 Filled",
    },
    {
      id: 3,
      name: "Room B1",
      type: "Single Occupancy",
      totalBeds: 2,
      occupied: 0,
      vacant: 2,
      status: "0/2 Filled",
    },
  ]);

  useEffect(()=>{
    dispatch(getRooms()) // Fetch rooms for the property
  },[])

  const handleEditProperty = () => {
    // Navigate to edit property screen
    navigation.navigate("EditRoom", { propertyId: propertyData.id });
  };

  const handleAddRoom = () => {
    // Navigate to add room screen
    navigation.navigate("AddRoom", { propertyId: propertyData.id });
  };

  const handleEditRoom = (roomId) => {
    // Navigate to edit room screen
    navigation.navigate("EditRoom", {
      roomId: roomId,
      propertyId: propertyData.id,
    });
  };

  const handleViewBeds = (roomId) => {
    // Navigate to view beds screen
    navigation.navigate("ViewBeds", {
      roomId: roomId,
      propertyId: propertyData.id,
    });
  };

  const renderRoomCard = ({ item }) => (
    <View
      style={{
        backgroundColor: theme.colors.white,
        borderRadius: 12,
        padding: 16,
        flex: 1,
        marginRight: 8,
        borderColor: "#D0D5DD",
        borderWidth: 1,
      }}
    >
      {console.log('item: ', item)}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <View style={{ flex: 1 }}>
          <TextView
            title={item.name}
            size={font.fontConfig.fontSizes.font18}
            color={theme.colors.black}
            weight={font.fontConfig.fontWeights.bold}
          />
          <TextView
            title={item.type}
            size={font.fontConfig.fontSizes.font14}
            color={theme.colors.gray}
            weight={font.fontConfig.fontWeights.regular}
          />
        </View>
        <TextView
          title={item.status}
          size={font.fontConfig.fontSizes.font14}
          color={item.vacant === 0 ? theme.colors.green : theme.colors.orange}
          weight={font.fontConfig.fontWeights.medium}
        />
      </View>

      <Spacer height={12} />

      <TextView
        title={`Total Beds: ${item?.total_beds}`}
        size={font.fontConfig.fontSizes.font14}
        color={theme.colors.black}
        weight={font.fontConfig.fontWeights.regular}
      />
      <TextView
        title={`Occupied: ${item.occupied} | Vacant: ${item.vacant}`}
        size={font.fontConfig.fontSizes.font14}
        color={theme.colors.gray}
        weight={font.fontConfig.fontWeights.regular}
      />

      <Spacer height={16} />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <Button
          title={"Edit Room"}
          onPress={() => handleEditRoom(item.id)}
          width={(DeviceWidth - 72) / 2}
        />

        <Button
          title={"View Beds"}
          onPress={() => handleViewBeds(item.id)}
          width={(DeviceWidth - 72) / 2}
        />
      </View>
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

      <Header title={"SunSet Apartment"} withBack />

      <ScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          padding: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Property Image */}
        <View
          style={{
            backgroundColor: theme.colors.lightGray,
            borderRadius: 12,
            height: 200,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
            marginTop: 4,
          }}
        >
          <Image
            source={{ uri: propertyData.image }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 12,
            }}
            resizeMode="cover"
          />
        </View>

        {/* Property Name and Address */}
        <TextView
          title={propertyData.name}
          size={font.fontConfig.fontSizes.font24}
          color={theme.colors.black}
          weight={font.fontConfig.fontWeights.bold}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 8,
          }}
        >
          <Feather name="map-pin" size={16} color={theme.colors.gray} />
          <TextView
            title={propertyData.address}
            size={font.fontConfig.fontSizes.font14}
            color={theme.colors.gray}
            weight={font.fontConfig.fontWeights.regular}
            style={{ marginLeft: 8 }}
          />
        </View>

        <Spacer height={24} />

        {/* Stats Cards */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 24,
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors.white,
              borderRadius: 12,
              padding: 16,
              alignItems: "center",
              flex: 1,
              marginRight: 8,
              borderColor: "#D0D5DD",
              borderWidth: 1,
            }}
          >
            <TextView
              title={propertyData.totalRooms.toString()}
              size={font.fontConfig.fontSizes.font24}
              color={theme.colors.black}
              weight={font.fontConfig.fontWeights.bold}
            />
            <TextView
              title="Total Rooms"
              size={font.fontConfig.fontSizes.font12}
              color={theme.colors.gray}
              weight={font.fontConfig.fontWeights.regular}
            />
          </View>

          <View
            style={{
              backgroundColor: theme.colors.white,
              borderRadius: 12,
              padding: 16,
              alignItems: "center",
              flex: 1,
              marginRight: 8,
              borderColor: "#D0D5DD",
              borderWidth: 1,
            }}
          >
            <TextView
              title={propertyData.totalBeds.toString()}
              size={font.fontConfig.fontSizes.font24}
              color={theme.colors.black}
              weight={font.fontConfig.fontWeights.bold}
            />
            <TextView
              title="Total Beds"
              size={font.fontConfig.fontSizes.font12}
              color={theme.colors.gray}
              weight={font.fontConfig.fontWeights.regular}
            />
          </View>

          <View
            style={{
              backgroundColor: theme.colors.white,
              borderRadius: 12,
              padding: 16,
              alignItems: "center",
              flex: 1,
              marginRight: 8,
              borderColor: "#D0D5DD",
              borderWidth: 1,
            }}
          >
            <TextView
              title={propertyData.filled.toString()}
              size={font.fontConfig.fontSizes.font24}
              color={theme.colors.black}
              weight={font.fontConfig.fontWeights.bold}
            />
            <TextView
              title="Filled"
              size={font.fontConfig.fontSizes.font12}
              color={theme.colors.gray}
              weight={font.fontConfig.fontWeights.regular}
            />
          </View>
        </View>

        {/* Action Buttons */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 12,
            marginBottom: 24,
          }}
        >
          <Button
            title={"Edit Property"}
            onPress={handleEditProperty}
            width={(DeviceWidth - 36) / 2}
          />

          <Button
            title={"Add Room"}
            onPress={handleAddRoom}
            width={(DeviceWidth - 36) / 2}
          />
        </View>

        {/* Rooms Section */}
        <TextView
          title="Rooms"
          size={font.fontConfig.fontSizes.font20}
          color={theme.colors.black}
          weight={font.fontConfig.fontWeights.bold}
          style={{ marginBottom: 16 }}
        />

        <FlatList
          data={data || []}
          renderItem={renderRoomCard}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          contentContainerStyle={{
            paddingBottom: 40,
            gap: 12,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
