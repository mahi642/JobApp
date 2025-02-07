import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

export default function JobDetailsScreen({ route }) {
  const { job } = route.params; // Get job details from navigation params
  console.log(job);
  return (
    <ScrollView style={styles.container}>
      {/* Job Image */}
      {job.creatives[0]?.thumb_url ? (
        <Image
          source={{ uri: job.creatives[0].thumb_url}}
          style={styles.image}
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imagePlaceholderText}>No Image Available</Text>
        </View>
      )}

      {/* Job Details */}
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.detail}>📍 Location: {job.location}</Text>
      <Text style={styles.detail}>
        💰 Salary: {job.salary || "Not specified"}
      </Text>
      <Text style={styles.detail}>
        📝 Description: {job.description || "No description available"}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
    resizeMode:"stretch"
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 10,
  },
});
