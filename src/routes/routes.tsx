import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import Feather from "react-native-vector-icons/Feather";
import {
  BackHandler,
  ImageBackground,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RouteTypes } from "../types/common";
import { alertExit } from "../utils/basicActions";
import { DeviceWidth } from "../utils/common";
import { HOME, SKIP, SPLASH_SCREEN, TABS } from "../constants/Textkeys";
import { Image } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { navigationRef } from "../../App";
import { StackCardInterpolationProps } from "@react-navigation/stack";
import { NotificationIcon } from "../../assets/common";
import DashBoard from "@pages/DashBoard";
import { useTheme } from "@theme/useTheme";
import { TextView } from "@components/TextView";
import { SplashScreen } from "@pages/SplashScreen";
import Login from "@pages/Login";
import AddProperty from "@pages/AddProperty";
import RoomsList from "@pages/RoomsList";
import AddRoom from "@pages/AddRoom";
import PropertyDetails from "@pages/PropertyDetails";
import EditRoom from "@pages/EditRoom";
import Profile from "@pages/Profile";

const horizontalAnimation = {
  route: "horizontal",
  cardStyleInterpolator: ({
    current,
    layouts,
  }: StackCardInterpolationProps) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const tabRoutes = [
  {
    name: HOME,
    component: DashBoard,
    icon: NotificationIcon,
    activeIcon: NotificationIcon,
    isLazy: true,
  },
];

function CustomTabBar({ state, navigation }) {
  const { theme, font } = useTheme();

  return (
    <View
      style={{
        width: DeviceWidth,
      }}
    >
      {/* <Image
        source={require('@assets/common/bottombar.png')}
        style={{
          width: DeviceWidth,
          height: 8,
        }}
        resizeMode="cover"
      /> */}

      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const tabItem = tabRoutes.find((t) => t.name === route.name);
        const Icon = isFocused ? tabItem?.activeIcon : tabItem?.icon;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            onPress={onPress}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: isFocused
                ? theme.colors.primary.lighter
                : "transparent",
              margin: 6,
              borderRadius: 8,
              paddingVertical: 6,
            }}
          >
            {Icon && (
              <Image
                source={Icon}
                style={{
                  width: route.name !== HOME ? 50 : 76,
                  height: route.name !== HOME ? 50 : 66,
                  resizeMode: "contain",
                }}
                resizeMode="contain"
              />
            )}
            {route.name !== HOME && (
              <TextView
                size={font.fontConfig.fontSizes.font12}
                color={theme.colors.white}
                weight={font.fontConfig.fontWeights.bold}
                title={route.name === EXPLORE_TEMPLES ? TEMPLES : route.name}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
function TabView() {
  const navigation = useNavigation();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        const rootState = navigationRef.current?.getRootState();
        if (
          rootState?.routes.length > 0 &&
          navigationRef.current?.canGoBack()
        ) {
          navigation.goBack();
          return true;
        }
        alertExit();
        // navigation.navigate(SIGN_IN);
        return true;
      }
    );

    return () => backHandler.remove();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          width: "100%",
          height: 0,
        },
      }}
      tabBarPosition="bottom"
      backBehavior="none"
      initialRouteName={HOME}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      {tabRoutes.map((tabItem) => (
        <Tab.Screen
          options={{
            tabBarAndroidRipple: {
              radius: 0,
              borderless: true,
            },
            animationEnabled: true,
            swipeEnabled: false,
            lazy: tabItem?.isLazy,
          }}
          key={tabItem.name}
          name={tabItem.name}
          component={tabItem.component}
        />
      ))}
    </Tab.Navigator>
  );
}

const routes: RouteTypes[] = [
  {
    name: SPLASH_SCREEN,
    component: SplashScreen,
    headerShown: false,
  },
  {
    name: TABS,
    component: TabView,
    headerShown: false,
  },
  {
    name: "Dashbaord",
    component: DashBoard,
    headerShown: false,
  },
  {
    name: "Login",
    component: Login,
    headerShown: false,
  },
  {
    name: "AddProperty",
    component: AddProperty,
    headerShown: false,
  },
  {
    name: "RoomsList",
    component: RoomsList,
    headerShown: false,
  },
  {
    name: "AddRoom",
    component: AddRoom,
    headerShown: false,
  },
   {
    name: "EditRoom",
    component: EditRoom,
    headerShown: false,
  },
   {
    name: "PropertyDetails",
    component: PropertyDetails,
    headerShown: false,
  },
   {
    name: "Profile",
    component: Profile,
    headerShown: false,
  },
];

function Routes(initialRoute: any) {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={horizontalAnimation}
        initialRouteName={SPLASH_SCREEN}
      >
        {routes &&
          routes.length > 0 &&
          routes.map((route) => (
            <Stack.Screen
              key={route.name}
              name={route.name}
              component={route.component}
              options={
                route.options || {
                  cardStyleInterpolator:
                    CardStyleInterpolators.forHorizontalIOS,
                  headerShown: route.headerShown,
                }
              }
            />
          ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { Routes };
