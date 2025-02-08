import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

export default function JobDetailsScreen({ route }) {
  const { job } = route.params; // Get job details from navigation params

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

      {/* Job Details */}
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.detail}>
        📍 Location: {job.primary_details?.Place || "Not specified"}
      </Text>
      <Text style={styles.detail}>
        💰 Salary: {job.primary_details?.Salary || "Not specified"}
      </Text>
      <Text style={styles.detail}>
        💼 Experience: {job.primary_details?.Experience || "Not specified"}
      </Text>
      <Text style={styles.detail}>
        📑 Work Location: {job.primary_details?.Job_Type || "Not specified"}
      </Text>
      <Text style={styles.detail}>
        🎓 Qualification:{" "}
        {job.primary_details?.Qualification || "Not specified"}
      </Text>
      <Text style={styles.detail}>
        ⏳ Job Type: {job.job_hours || "Not specified"}
      </Text>

      {/* Job Vacancies */}
      {job.job_tags?.length > 0 && (
        <View style={styles.tagContainer}>
          {job.job_tags.map((tag, index) => (
            <View
              key={index}
              style={[styles.tag, { backgroundColor: tag.bg_color }]}
            >
              <Text style={[styles.tagText, { color: tag.text_color }]}>
                {tag.value}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Job Description */}
      <Text style={styles.subTitle}>📝 Description</Text>
      <Text style={styles.detail}>
        {job.description || "No description available"}
      </Text>

      {/* Job Content (if available) */}
      {job.content && (
        <View>
          <Text style={styles.subTitle}>📌 Additional Details</Text>
          {Object.values(JSON.parse(job.content)).map((block, index) => (
            <Text key={index} style={styles.detail}>
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
    backgroundColor: "#fff",
    padding: 20,
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
  },
  detail: {
    fontSize: 16,
    marginBottom: 10,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  tag: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  tagText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
