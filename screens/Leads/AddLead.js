import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";

export default function AddLead() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    leadSource: "",
    country: "",
    district: "",
    branch: "",
    notes: "",
  });

  const [showSourceDropdown, setShowSourceDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const leadSources = [
    "WhatsApp",
    "Meta",
    "Website",
    "Referral",
    "Cold Call",
    "Email Campaign",
  ];
  const countries = ["India", "UAE", "Canada", "Australia", "USA", "UK"];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSourceSelect = (source) => {
    handleInputChange("leadSource", source);
    setShowSourceDropdown(false);
  };

  const handleCountrySelect = (country) => {
    handleInputChange("country", country);
    setShowCountryDropdown(false);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert("Error", "Please enter the lead's name");
      return false;
    }
    if (!formData.phone.trim()) {
      Alert.alert("Error", "Please enter the phone number");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Here you would typically send the data to your backend
      Alert.alert("Success", "Lead added successfully!", [
        {
          text: "OK",
          onPress: () => {
            // Reset form
            setFormData({
              name: "",
              email: "",
              phone: "",
              leadSource: "",
              country: "",
              district: "",
              branch: "",
              notes: "",
            });
          },
        },
      ]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add New Lead</Text>

      <View style={styles.formContainer}>
        {/* Name Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Full Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter full name"
            placeholderTextColor={colors.placeholderText}
            value={formData.name}
            onChangeText={(value) => handleInputChange("name", value)}
          />
        </View>

        {/* Email Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter email address"
            placeholderTextColor={colors.placeholderText}
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email}
            onChangeText={(value) => handleInputChange("email", value)}
          />
        </View>

        {/* Phone Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Phone Number *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter phone number"
            placeholderTextColor={colors.placeholderText}
            keyboardType="phone-pad"
            value={formData.phone}
            onChangeText={(value) => handleInputChange("phone", value)}
          />
        </View>

        {/* Lead Source Dropdown */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Lead Source</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowSourceDropdown(!showSourceDropdown)}
          >
            <Text
              style={[
                styles.dropdownText,
                formData.leadSource && styles.dropdownTextSelected,
              ]}
            >
              {formData.leadSource || "Select source"}
            </Text>
            <Ionicons
              name={showSourceDropdown ? "chevron-up" : "chevron-down"}
              size={20}
              color={colors.iconLight}
            />
          </TouchableOpacity>
          {showSourceDropdown && (
            <View style={styles.dropdownList}>
              {leadSources.map((source) => (
                <TouchableOpacity
                  key={source}
                  style={styles.dropdownItem}
                  onPress={() => handleSourceSelect(source)}
                >
                  <Text style={styles.dropdownItemText}>{source}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Country Dropdown */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Country</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowCountryDropdown(!showCountryDropdown)}
          >
            <Text
              style={[
                styles.dropdownText,
                formData.country && styles.dropdownTextSelected,
              ]}
            >
              {formData.country || "Select country"}
            </Text>
            <Ionicons
              name={showCountryDropdown ? "chevron-up" : "chevron-down"}
              size={20}
              color={colors.iconLight}
            />
          </TouchableOpacity>
          {showCountryDropdown && (
            <View style={styles.dropdownList}>
              {countries.map((country) => (
                <TouchableOpacity
                  key={country}
                  style={styles.dropdownItem}
                  onPress={() => handleCountrySelect(country)}
                >
                  <Text style={styles.dropdownItemText}>{country}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* District Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>District/City</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter district or city"
            placeholderTextColor={colors.placeholderText}
            value={formData.district}
            onChangeText={(value) => handleInputChange("district", value)}
          />
        </View>

        {/* Branch Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Branch</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter branch"
            placeholderTextColor={colors.placeholderText}
            value={formData.branch}
            onChangeText={(value) => handleInputChange("branch", value)}
          />
        </View>

        {/* Notes Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Notes</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter any additional notes..."
            placeholderTextColor={colors.placeholderText}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={formData.notes}
            onChangeText={(value) => handleInputChange("notes", value)}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Add Lead</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primaryText,
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primaryText,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.primaryText,
    backgroundColor: colors.backgroundLight,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.backgroundLight,
  },
  dropdownText: {
    fontSize: 16,
    color: colors.placeholderText,
  },
  dropdownTextSelected: {
    color: colors.primaryText,
  },
  dropdownList: {
    backgroundColor: colors.backgroundLight,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginTop: 4,
    maxHeight: 200,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dropdownItemText: {
    fontSize: 16,
    color: colors.primaryText,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.whiteText,
  },
});
