import {
  ActivityIndicator,
  Animated,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Alert,
  StatusBar,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { TextView } from "../components/TextView";
import { useTheme } from "../theme/useTheme";
import { Wrapper } from "../components/Wrapper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Spacer } from "@components/Spacer";
import { TextInput } from "@components/TextInput";
import { Button } from "@components/Button";
import Feather from "react-native-vector-icons/Feather";
import { HOME, TABS } from "@constants/Textkeys";
import { useDispatch } from "react-redux";
import { loginUser } from "@services/loginservice";

export default function Login() {
  const { font, theme } = useTheme();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  // Form state
  const [formData, setFormData] = useState({
    email: "srahul9134@gmail.com",
    password: "Rahul@123",
  });

  // UI state
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      return "Email is required";
    }
    if (!emailRegex.test(email.trim())) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (!password.trim()) {
      return "Password is required";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    return "";
  };

  const validateForm = () => {
    const newErrors = {};

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    setIsFormValid(isValid);
    return isValid;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }

    // Real-time validation for better UX
    setTimeout(() => {
      if (field === "email" && value.trim()) {
        const emailError = validateEmail(value);
        if (emailError) {
          setErrors((prev) => ({ ...prev, email: emailError }));
        }
      }
      if (field === "password" && value.trim()) {
        const passwordError = validatePassword(value);
        if (passwordError) {
          setErrors((prev) => ({ ...prev, password: passwordError }));
        }
      }
    }, 500);
  };

  const handleLogin = async () => {
    Keyboard.dismiss();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call - Replace with your actual login API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const payload = {
        email: formData.email.trim(),
        password: formData.password.trim(),
      };
      dispatch(loginUser(payload));
     
    } catch (error) {
      Alert.alert(
        "Login Failed",
        error.message || "Something went wrong. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert(
      "Forgot Password",
      "Please enter your email address to reset your password.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Send Reset Link",
          onPress: () => {
            if (!formData.email) {
              Alert.alert("Error", "Please enter your email address first.");
              return;
            }
            // Handle forgot password logic
            Alert.alert("Success", "Password reset link sent to your email.");
          },
        },
      ]
    );
  };

  const handleSignUp = () => {
    // Navigate to sign up screen
    // navigation.navigate('SignUp');
    Alert.alert("Sign Up", "Navigate to Sign Up screen");
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.primary.dark,
      }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, alignItems: "center" }}>
            {/* Header Section */}
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
                alignItems: "center",
              }}
            >
              <Image
                source={{
                  uri: "https://i.pinimg.com/736x/cd/11/20/cd112018eac15544698b49d7e4d676f6.jpg",
                }}
                height={100}
                width={100}
                style={{
                  borderRadius: 50,
                  marginTop: "15%",
                }}
              />
              <Spacer height={16} />
              <TextView
                title={"PG System Management"}
                size={font.fontConfig.fontSizes.font20}
                color={theme.colors.white}
                weight={font.fontConfig.fontWeights.bold}
              />
              <Spacer height={8} />
              <TextView
                title={"Sign in to continue"}
                size={font.fontConfig.fontSizes.font14}
                color={theme.colors.white}
                weight={font.fontConfig.fontWeights.medium}
              />
            </Animated.View>

            <Spacer height={50} />

            {/* Form Section */}
            <Animated.View
              style={{
                flex: 1,
                width: "100%",
                backgroundColor: theme.colors.white,
                borderStartEndRadius: 12,
                borderTopLeftRadius: 12,
                padding: 24,
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }}
            >
              {/* Email Input */}
              <View>
                <TextInput
                  value={formData.email}
                  hint="Email"
                  onChangeText={(text) => handleInputChange("email", text)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                />
                {errors.email && (
                  <View style={{ marginTop: 4 }}>
                    <TextView
                      title={errors.email}
                      size={font.fontConfig.fontSizes.font12}
                      color={theme.colors.error || "#FF6B6B"}
                      weight={font.fontConfig.fontWeights.medium}
                    />
                  </View>
                )}
              </View>

              <Spacer height={20} />

              {/* Password Input */}
              <View>
                <View style={{ position: "relative" }}>
                  <TextInput
                    value={formData.password}
                    hint="Password"
                    onChangeText={(text) => handleInputChange("password", text)}
                    secureTextEntry={!showPassword}
                    returnKeyType="done"
                    onSubmitEditing={handleLogin}
                  />
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      right: 12,
                      top: 12,
                      padding: 4,
                    }}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Feather
                      name={showPassword ? "eye-off" : "eye"}
                      size={20}
                      color={theme.colors.neutral?.normal || "#666"}
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <View style={{ marginTop: 4 }}>
                    <TextView
                      title={errors.password}
                      size={font.fontConfig.fontSizes.font12}
                      color={theme.colors.error || "#FF6B6B"}
                      weight={font.fontConfig.fontWeights.medium}
                    />
                  </View>
                )}
              </View>

              <TouchableOpacity
                style={{ alignItems: "flex-end", marginTop: 12 }}
                onPress={handleForgotPassword}
              >
                <TextView
                  title="Forgot Password?"
                  size={font.fontConfig.fontSizes.font14}
                  color={theme.colors.primary?.dark || "#2B6CB0"}
                  weight={font.fontConfig.fontWeights.medium}
                  underline
                />
              </TouchableOpacity>

              <Spacer height={30} />

              {/* Sign In Button */}
              <Button
                title={isLoading ? "Signing In..." : "Sign In"}
                onPress={handleLogin}
                disabled={
                  isLoading ||
                  !formData.email.trim() ||
                  !formData.password.trim()
                }
                variant="primary"
              />

              {/* Loading Indicator */}
              {isLoading && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 16,
                  }}
                >
                  <ActivityIndicator
                    size="small"
                    color={theme.colors.primary?.dark || "#2B6CB0"}
                  />
                  <Spacer width={8} />
                  <TextView
                    title="Please wait..."
                    size={font.fontConfig.fontSizes.font12}
                    color={theme.colors.neutral?.normal || "#666"}
                    weight={font.fontConfig.fontWeights.medium}
                  />
                </View>
              )}

              <Spacer height={30} />

              {/* Divider */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 20,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor:
                      theme.colors.neutral?.lightActive || "#E5E5E5",
                  }}
                />
                <TextView
                  title="  OR  "
                  size={font.fontConfig.fontSizes.font12}
                  color={theme.colors.neutral?.normal || "#666"}
                  weight={font.fontConfig.fontWeights.medium}
                />
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor:
                      theme.colors.neutral?.lightActive || "#E5E5E5",
                  }}
                />
              </View>

              {/* Sign Up Link */}
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  paddingVertical: 12,
                }}
                onPress={handleSignUp}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TextView
                    title="Don't have an account? "
                    size={font.fontConfig.fontSizes.font14}
                    color={theme.colors.neutral?.normal || "#666"}
                    weight={font.fontConfig.fontWeights.regular}
                  />
                  <TextView
                    title="Contact Us"
                    size={font.fontConfig.fontSizes.font14}
                    color={theme.colors.primary?.dark || "#2B6CB0"}
                    weight={font.fontConfig.fontWeights.bold}
                    underline
                  />
                </View>
              </TouchableOpacity>

              {/* Form Validation Status */}
              {formData.email.trim() &&
                formData.password.trim() &&
                !isFormValid && (
                  <Animated.View
                    style={{
                      backgroundColor: "#FFF3CD",
                      borderColor: "#FFEAA7",
                      borderWidth: 1,
                      borderRadius: 8,
                      padding: 12,
                      marginTop: 16,
                      opacity: fadeAnim,
                    }}
                  >
                    <TextView
                      title="Please fix the errors above to continue"
                      size={font.fontConfig.fontSizes.font12}
                      color="#856404"
                      weight={font.fontConfig.fontWeights.medium}
                    />
                  </Animated.View>
                )}
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}
