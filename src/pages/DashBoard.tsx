import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Alert,
  RefreshControl,
  FlatList,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import { TextView } from "../components/TextView";
import { useTheme } from "../theme/useTheme";
import { Wrapper } from "../components/Wrapper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Spacer } from "@components/Spacer";
import { Button } from "@components/Button";
import Feather from "react-native-vector-icons/Feather";
import { DeviceWidth } from "@utils/common";
import { useDispatch, useSelector } from "react-redux";
import { getPropertiesSelector } from "@store/selectors";
import { getProperties } from "@services/propertyservice";

export default function Dashboard() {
  const { font, theme } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const insets = useSafeAreaInsets();
  const {data}=useSelector(getPropertiesSelector)
  console.log(data,'REstartttt')

  const [userName, setUserName] = useState("Rahul");

  useEffect(()=>{
    dispatch(getProperties())
  },[])
  

  // Dashboard state
  const [dashboardData, setDashboardData] = useState({
    totalRooms: 47,
    vacantBeds: 10,
    filledBeds: 96,
    rentPaid: 83,
  });

  const [refreshing, setRefreshing] = useState(false);

  const handleAddProperty = () => {
    navigation.navigate("AddProperty");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#F2F4F7",
      }}
    >
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor={theme.colors.primary.dark} 
        translucent={false}
      />
      
      <View
        style={{
          flex: 1,
          padding: 16,
          paddingTop: insets.top, // Use safe area insets
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <TextView
              title={`Welcome Rahul`}
              size={font.fontConfig.fontSizes.font24}
              color={theme.colors.black}
              weight={font.fontConfig.fontWeights.bold}
            />
            <TextView
              title={`PG Management Overview`}
              size={font.fontConfig.fontSizes.font14}
              color={theme.colors.black}
              weight={font.fontConfig.fontWeights.regular}
            />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile")}
            style={{
              backgroundColor: theme.colors.primary.dark,
              padding: 2,
              borderRadius: 50,
            }}
          >
          <Image
            source={{
              uri: "https://images.mubicdn.net/images/cast_member/2184/cache-2992-1547409411/image-w856.jpg ",
            }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
            }}
          />
          </TouchableOpacity>
        </View>
        <Spacer height={30} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors.white,
              borderColor: theme.colors.white,
              borderRadius: 20,
              width: (DeviceWidth - 60) / 3,
              padding: 12,
            }}
          >
            <Image
              source={{
                uri: "https://img.icons8.com/ios11/512w/228BE6/building.png",
              }}
              style={{
                width: 40,
                height: 40,
                alignSelf: "center",
              }}
            />
            <Spacer height={8} />
            <TextView
              title={`47`}
              size={font.fontConfig.fontSizes.font14}
              color={theme.colors.black}
              weight={font.fontConfig.fontWeights.bold}
              style={{
                alignSelf: "center",
              }}
            />
            <Spacer height={8} />
            <TextView
              title={`Total Rooms`}
              size={font.fontConfig.fontSizes.font14}
              color={theme.colors.black}
              weight={font.fontConfig.fontWeights.xMedium}
              style={{
                alignSelf: "center",
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: theme.colors.white,
              borderColor: theme.colors.white,
              borderRadius: 20,
              width: (DeviceWidth - 60) / 3,
              padding: 12,
            }}
          >
            <Image
              source={{
                uri: "https://cdn.creazilla.com/cliparts/76601/bed-clipart-original.png",
              }}
              style={{
                width: 40,
                height: 40,
                alignSelf: "center",
              }}
            />
            <Spacer height={8} />
            <TextView
              title={`10`}
              size={font.fontConfig.fontSizes.font14}
              color={theme.colors.black}
              weight={font.fontConfig.fontWeights.bold}
              style={{
                alignSelf: "center",
              }}
            />
            <Spacer height={8} />
            <TextView
              title={`Vacant Beds`}
              size={font.fontConfig.fontSizes.font14}
              color={theme.colors.black}
              weight={font.fontConfig.fontWeights.xMedium}
              style={{
                alignSelf: "center",
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: theme.colors.white,
              borderColor: theme.colors.white,
              borderRadius: 20,
              width: (DeviceWidth - 60) / 3,
              padding: 12,
            }}
          >
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/8539/8539461.png",
              }}
              style={{
                width: 40,
                height: 40,
                alignSelf: "center",
              }}
            />
            <Spacer height={8} />
            <TextView
              title={`83`}
              size={font.fontConfig.fontSizes.font14}
              color={theme.colors.black}
              weight={font.fontConfig.fontWeights.bold}
              style={{
                alignSelf: "center",
              }}
            />
            <Spacer height={8} />
            <TextView
              title={`Rent Paid`}
              size={font.fontConfig.fontSizes.font14}
              color={theme.colors.black}
              weight={font.fontConfig.fontWeights.xMedium}
              style={{
                alignSelf: "center",
              }}
            />
          </View>
        </View>
        <Spacer height={30} />
        <FlatList
          data={data || []}
          contentContainerStyle={{
            gap: 20,
            marginBottom: 200,
          }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("PropertyDetails")}
              style={{
                padding: 12,
                backgroundColor: theme.colors.white,
                borderRadius: 12,
              }}
            >
              <TextView
                title={item?.property_name}
                size={font.fontConfig.fontSizes.font20}
                color={theme.colors.black}
                weight={font.fontConfig.fontWeights.bold}
              />
              <TextView
                title={item?.full_address}
                size={font.fontConfig.fontSizes.font14}
                color={theme.colors.black}
                weight={font.fontConfig.fontWeights.regular}
              />
              <Spacer height={10} />
              <Image
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcqgtsGNO_IfzYM6VPS8lNikw4JWE-gsEBjQ&s",
                }}
                style={{
                  width: "100%",
                  height: 200,
                  borderRadius: 12,
                }}
              />
              <Spacer height={20} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <TextView
                  title={`${item?.total_rooms} Rooms`}
                  size={font.fontConfig.fontSizes.font14}
                  color={theme.colors.black}
                  weight={font.fontConfig.fontWeights.regular}
                />
                <TextView
                  title={`View Details`}
                  size={font.fontConfig.fontSizes.font14}
                  color={theme.colors.black}
                  weight={font.fontConfig.fontWeights.regular}
                />
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}