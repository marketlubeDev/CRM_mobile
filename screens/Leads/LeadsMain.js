import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";

// Import the separate screen components
import AllLeads from "./AllLeads";
import Filters from "./Filters";
import Analytics from "./Analytics";
import AddLead from "./AddLead";

export default function LeadsMain() {
  const [activeTab, setActiveTab] = useState("all");

  const renderTabContent = () => {
    switch (activeTab) {
      case "all":
        return <AllLeads />;
      case "filters":
        return <Filters />;
      case "analytics":
        return <Analytics />;
      case "add":
        return <AddLead />;
      default:
        return <AllLeads />;
    }
  };

  const tabs = [
    { id: "all", label: "All Leads", icon: "list" },
    { id: "filters", label: "Filters", icon: "funnel" },
    { id: "analytics", label: "Analytics", icon: "bar-chart" },
    { id: "add", label: "Add Lead", icon: "add-circle" },
  ];

  return (
    <View style={styles.container}>
      {/* Main Content */}
      <View style={styles.content}>{renderTabContent()}</View>

      {/* Bottom Tab Navigation */}
      <View style={styles.bottomTabs}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tabButton,
              activeTab === tab.id && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Ionicons
              name={tab.icon}
              size={20}
              color={activeTab === tab.id ? colors.primary : colors.iconLight}
            />
            <Text
              style={[
                styles.tabLabel,
                activeTab === tab.id && styles.activeTabLabel,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  // Bottom Tabs
  bottomTabs: {
    flexDirection: "row",
    backgroundColor: colors.cardBackground,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  activeTabButton: {
    backgroundColor: colors.navActive,
    borderRadius: 8,
  },
  tabLabel: {
    fontSize: 10,
    color: colors.iconLight,
    marginTop: 4,
    textAlign: "center",
  },
  activeTabLabel: {
    color: colors.primary,
    fontWeight: "600",
  },
});
