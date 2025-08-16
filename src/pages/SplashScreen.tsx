import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import { HOME, TABS } from '@constants/Textkeys';
function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Login");
    }, 3000);
  }, []);

  return (
    <View>
      <Text>SplashScreen</Text>
    </View>
  );
}

export {SplashScreen};

const styles = StyleSheet.create({});
