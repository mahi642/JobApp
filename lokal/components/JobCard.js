import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Icons for UI elements

const colors = [
  "#E3F2FD",
  "#E8F5E9",
  "#FFF3E0",
  "#F3E5F5",
  "#E1F5FE",
  "#FBE9E7",
]; // Light background colors

export default function JobCard({ job, index }) {
  const navigation = useNavigation();
  const backgroundColor = colors[index % colors.length]; // Alternating background colors

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("JobDetails", { job })}
    >
      <View style={{ padding: 5 }}>
        <View style={[styles.card, { backgroundColor }]}>
          {/* Job Details Section */}
          <View style={styles.detailsContainer}>
            <View style={styles.top}>
              <View style={styles.row}>
                <Ionicons name="business-outline" size={20} color="#007AFF" />
                <Text style={styles.companyName}>{job.company_name}</Text>
              </View>
              <TouchableOpacity style={styles.bookmarkContainer}>
                <Ionicons
                  style={styles.icon}
                  name="bookmark-outline"
                  size={35}
                  color="#007AFF"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <Ionicons name="briefcase-outline" size={20} color="#333" />
              <Text style={styles.title}>{job.title}</Text>
            </View>

            <View style={styles.row}>
              <Ionicons name="location-outline" size={20} color="gray" />
              <Text style={styles.location}>{job.location}</Text>
            </View>

            <View style={styles.row}>
              <Ionicons name="cash-outline" size={20} color="#28A745" />
              <Text style={styles.salary}>
                {job.salary_max
                  ? `Salary: ${job.salary_max}`
                  : "Salary: Not specified"}
              </Text>
            </View>

            <View style={styles.row}>
              <Ionicons name="logo-whatsapp" size={20} color="#25D366" />
              <Text style={styles.whatsappNo}>
                {job.whatsapp_no
                  ? `WhatsApp: ${job.whatsapp_no}`
                  : "WhatsApp: N/A"}
              </Text>
            </View>
          </View>

          {/* Bookmark Icon */}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  top:{
    flexDirection:"row"
  },
  card: {
    flexDirection: "row", // Job details and bookmark side by side
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 3,
    minHeight: 230, // Uniform height for all cards
  },
  detailsContainer: {
    flex: 9,
    padding: 4,
  },
  bookmarkContainer: {
    flex: 1, // Takes 10% of the width
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    flex:9,
  },
  companyName: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#007AFF",
    marginLeft: 8, // Spacing after icon
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 8,
  },
  location: {
    fontSize: 14,
    color: "gray",
    marginLeft: 8,
  },
  salary: {
    fontSize: 14,
    fontWeight: "600",
    color: "#28A745",
    marginLeft: 8,
  },
  whatsappNo: {
    fontSize: 14,
    color: "#25D366",
    fontWeight: "600",
    marginLeft: 8,
  },
  icon: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 5,
  },
});
