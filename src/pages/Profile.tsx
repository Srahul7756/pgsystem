import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Header } from "@components/Header";
import { useTheme } from "@theme/useTheme";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { TextView } from "@components/TextView";
import { Spacer } from "@components/Spacer";

export default function Profile() {
  const { font, theme } = useTheme();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
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

      <Header title={"Profile"} withBack />

      <ScrollView style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <Image
            source={{ uri: "https://images.mubicdn.net/images/cast_member/2184/cache-2992-1547409411/image-w856.jpg" }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              borderWidth: 3,
              borderColor: theme.colors.primary.dark,
            }}
          />

          <Spacer height={20} />

          <TextView
            title={"Rahul Shinde"}
            size={font.fontConfig.fontSizes.font20}
            color={theme.colors.black}
            weight={font.fontConfig.fontWeights.bold}
            style={{ textAlign: "center", marginBottom: 4 }}
          />

          <TextView
            title="PG Manager"
            size={font.fontConfig.fontSizes.font14}
            color={theme.colors.gray}
            weight={font.fontConfig.fontWeights.regular}
            style={{ textAlign: "center", marginBottom: 16 }}
          />

          

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
