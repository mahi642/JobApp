import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

export default function JobDetailsScreen({ route }) {
  const { job } = route.params;

  // Define job details with corresponding icons
  const jobDetails = [
    {
      icon: "place",
      label: "Location",
      value: job.primary_details?.Place || "Not specified",
    },
    {
      icon: "attach-money",
      label: "Salary",
      value: job.primary_details?.Salary || "Not specified",
    },
    {
      icon: "business-center",
      label: "Experience",
      value: job.primary_details?.Experience || "Not specified",
    },
    {
      icon: "location-city",
      label: "Work Location",
      value: job.primary_details?.Job_Type || "Not specified",
    },
    {
      icon: "school",
      label: "Qualification",
      value: job.primary_details?.Qualification || "Not specified",
    },
    {
      icon: "access-time",
      label: "Job Type",
      value: job.job_hours || "Not specified",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Job Image */}
      {job.creatives?.[0]?.thumb_url ? (
        <Image
          source={{ uri: job.creatives[0].thumb_url }}
          style={styles.image}
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imagePlaceholderText}>No Image Available</Text>
        </View>
      )}

      {/* Job Title */}   
      <Text style={styles.title}>{job.title}</Text>

      {/* Job Details Grid */}
      <View style={styles.detailsGrid}>
        {jobDetails.map((item, index) => (
          <View key={index} style={styles.detailCard}>
            <MaterialIcons name={item.icon} size={30} color="#007BFF" />
            <Text style={styles.detailLabel}>{item.label}</Text>
            <Text style={styles.detailValue}>{item.value}</Text>
          </View>
        ))}
      </View>

      {/* Job Description */}
      <View style = {styles.descriptionBox}>
        <Text style={styles.subTitle}>📝 Other details given by company</Text>
        <Text style={styles.detail}>
          {job.other_details || "No description available"}
        </Text>
      </View>

      {/* Additional Details */}
      {job.content && (
        <View style={styles.additionalDetailsBox}>
          <Text style={styles.subTitle}>
            📌 Information for Telugu speaking people
          </Text>
          {Object.values(JSON.parse(job.content)).map((block, index) => (
            <Text key={index} style={styles.additionalDetailText}>
              {block}
            </Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,

  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
    resizeMode: "stretch",
  },
  imagePlaceholder: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    backgroundColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  imagePlaceholderText: {
    fontSize: 16,
    color: "#777",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  descriptionBox: {
    backgroundColor: "lightgrey",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  detailCard: {
    width: "48%", // Two cards per row
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    elevation: 3,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
  detailValue: {
    fontSize: 14,
    color: "#333",
    marginTop: 3,
    textAlign: "center",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 15,
  },
  detail: {
    fontSize: 19,
    marginBottom: 10,
    fontWeight:400,

  },
  additionalDetailsBox: {
    backgroundColor: "#f98",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  additionalDetailText: {
    fontSize: 18,
    color: "#555",
    marginVertical: 10,
    fontWeight: 800,
  },
});
