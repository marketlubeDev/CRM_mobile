import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";

// Import dummy data (you might want to move this to a separate data file)
const dummyLeads = [
  {
    _id: "68cd1beb2777fbc3ccc4f608",
    leadSource: "WhatsApp",
    name: "Aswin",
    email: "",
    phone: "8606785438",
    district: "Kozhikode",
    status: "University Student",
    country: "India",
  },
  {
    _id: "68cd1bdb2777fbc3ccc39a75",
    leadSource: "Meta",
    name: "Athirasurendranath",
    email: "athirasnath0411@gmail.com",
    phone: "9656624929",
    district: "N/A",
    status: "University Student",
    country: "India",
  },
  // Add more dummy data as needed
];

export default function Filters() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    status: null,
    source: null,
    country: null,
  });

  const handleFilterSelect = (filterType, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType] === value ? null : value,
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      status: null,
      source: null,
      country: null,
    });
    setSearchQuery("");
  };

  const getFilterCount = (filterType, value) => {
    if (filterType === "status" && value === "All") {
      return dummyLeads.length;
    }
    return dummyLeads.filter((lead) => {
      switch (filterType) {
        case "status":
          return lead.status === value;
        case "source":
          return lead.leadSource === value;
        case "country":
          return lead.country === value;
        default:
          return false;
      }
    }).length;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Filter Options</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={colors.iconLight} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search leads..."
          placeholderTextColor={colors.placeholderText}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Clear Filters Button */}
      <TouchableOpacity style={styles.clearButton} onPress={clearAllFilters}>
        <Ionicons name="refresh" size={16} color={colors.primary} />
        <Text style={styles.clearButtonText}>Clear All Filters</Text>
      </TouchableOpacity>

      {/* Status Filters */}
      <View style={styles.filterSection}>
        <Text style={styles.filterSectionTitle}>Status</Text>
        {["All", "New Lead", "University Student", "Converted"].map(
          (status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.filterOption,
                selectedFilters.status === status &&
                  styles.selectedFilterOption,
              ]}
              onPress={() => handleFilterSelect("status", status)}
            >
              <Text
                style={[
                  styles.filterOptionText,
                  selectedFilters.status === status &&
                    styles.selectedFilterText,
                ]}
              >
                {status}
              </Text>
              <View style={styles.filterCount}>
                <Text style={styles.filterCountText}>
                  {getFilterCount("status", status)}
                </Text>
              </View>
            </TouchableOpacity>
          )
        )}
      </View>

      {/* Source Filters */}
      <View style={styles.filterSection}>
        <Text style={styles.filterSectionTitle}>Lead Source</Text>
        {["WhatsApp", "Meta", "Website", "Referral"].map((source) => (
          <TouchableOpacity
            key={source}
            style={[
              styles.filterOption,
              selectedFilters.source === source && styles.selectedFilterOption,
            ]}
            onPress={() => handleFilterSelect("source", source)}
          >
            <Text
              style={[
                styles.filterOptionText,
                selectedFilters.source === source && styles.selectedFilterText,
              ]}
            >
              {source}
            </Text>
            <View style={styles.filterCount}>
              <Text style={styles.filterCountText}>
                {getFilterCount("source", source)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Country Filters */}
      <View style={styles.filterSection}>
        <Text style={styles.filterSectionTitle}>Country</Text>
        {["India", "UAE", "Canada", "Australia"].map((country) => (
          <TouchableOpacity
            key={country}
            style={[
              styles.filterOption,
              selectedFilters.country === country &&
                styles.selectedFilterOption,
            ]}
            onPress={() => handleFilterSelect("country", country)}
          >
            <Text
              style={[
                styles.filterOptionText,
                selectedFilters.country === country &&
                  styles.selectedFilterText,
              ]}
            >
              {country}
            </Text>
            <View style={styles.filterCount}>
              <Text style={styles.filterCountText}>
                {getFilterCount("country", country)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Apply Filters Button */}
      <TouchableOpacity style={styles.applyButton}>
        <Text style={styles.applyButtonText}>Apply Filters</Text>
      </TouchableOpacity>
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: colors.primaryText,
  },
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    marginBottom: 16,
  },
  clearButtonText: {
    color: colors.primary,
    fontSize: 14,
    marginLeft: 4,
    fontWeight: "600",
  },
  filterSection: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  filterSectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.primaryText,
    marginBottom: 12,
  },
  filterOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  selectedFilterOption: {
    backgroundColor: colors.navActive,
    marginHorizontal: -16,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  filterOptionText: {
    fontSize: 16,
    color: colors.primaryText,
  },
  selectedFilterText: {
    color: colors.primary,
    fontWeight: "600",
  },
  filterCount: {
    backgroundColor: colors.navActive,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  filterCountText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: "600",
  },
  applyButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.whiteText,
  },
});
