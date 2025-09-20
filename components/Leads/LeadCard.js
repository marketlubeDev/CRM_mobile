import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

let dummyImageUrl =
  "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg";

const LeadCard = ({ Lead }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigation = useNavigation();
  const toggleExpanded = (event) => {
    event.stopPropagation(); // Prevent card press when toggling
    setIsExpanded(!isExpanded);
  };

  const handleCardPress = () => {
    navigation.navigate("LeadDetails", { lead: Lead });
  };

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={handleCardPress}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Image
            source={{ uri: Lead?.img || dummyImageUrl }}
            style={styles.avatarImage}
          />
        </View>

        <View style={styles.info}>
          <Text style={styles.name}>{Lead?.name || "N/A"}</Text>
          <Text style={styles.company}>{Lead?.branch}</Text>
        </View>

        {/* <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{Lead?.countryCode || "N/A"}</Text>
        </View> */}
      </View>

      {/* Actions Row */}
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="flag" size={12} color={colors.primary} />
          <Text style={styles.actionText}>{Lead?.status || "N/A"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="flag-outline" size={12} color={colors.primary} />
          <Text style={styles.actionText}>{Lead?.country || "N/A"}</Text>
        </TouchableOpacity>
      </View>

      {/* Details - Collapsible */}
      {isExpanded && (
        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Ionicons name="call-outline" size={16} color={colors.success} />
            <Text style={styles.detailText}>{Lead?.phone || "N/A"}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="mail-outline" size={16} color={colors.primary} />
            <Text style={styles.detailText}>{Lead?.email || "N/A"}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons
              name="chatbox-ellipses-outline"
              size={16}
              color={colors.warning}
            />
            <Text style={styles.detailText}>{Lead?.leadSource || "N/A"}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="globe-outline" size={16} color={colors.secondary} />
            <Text style={styles.detailText}>{Lead?.followupDate || "N/A"}</Text>
          </View>
        </View>
      )}

      {/* Footer - Clickable Toggle */}
      <TouchableOpacity style={styles.footer} onPress={toggleExpanded}>
        <Text style={styles.footerText}>
          Added on {Lead?.createdAt || "N/A"}
        </Text>
        <Ionicons
          name={isExpanded ? "chevron-up" : "chevron-down"}
          size={16}
          color={colors.iconLight}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.cardBackground,
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primaryText,
  },
  company: {
    fontSize: 12,
    color: colors.secondaryText,
    marginTop: 2,
  },
  statusBadge: {
    backgroundColor: colors.overlay,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 10,
    color: colors.whiteText,
    fontWeight: "600",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.navActive,
    marginHorizontal: 4,
    paddingVertical: 8,
    borderRadius: 12,
  },
  actionText: {
    fontSize: 10,
    fontWeight: "600",
    color: colors.primaryText,
    marginLeft: 4,
  },
  details: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
    marginTop: 8,
    gap: 8,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.primaryText,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  footerText: {
    fontSize: 12,
    color: colors.lightText,
  },
});

export default LeadCard;
