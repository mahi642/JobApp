import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { getBookmarkedJobs } from "../utils/storage";
import JobCard from "../components/JobCard"; // Make sure to import JobCard

export default function BookmarksScreen({ navigation }) {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]); // Add state for all jobs
  const isFocused = useIsFocused();

  // Load all jobs and bookmarks
  useEffect(() => {
    if (isFocused) {
      // You'll need to implement this function to get all jobs from your API/state
      const loadJobs = async () => {
        const response = await fetch(
          "https://testapi.getlokalapp.com/common/jobs"
        );
        const data = await response.json();
        setAllJobs(data.results);
      };

      loadJobs();
      setBookmarkedJobs(getBookmarkedJobs());
    }
  }, [isFocused]);

  // Filter jobs that are bookmarked
  const filteredJobs = allJobs.filter((job) => bookmarkedJobs.includes(job.id));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bookmarked Jobs</Text>
      {filteredJobs.length === 0 ? (
        <Text>No bookmarks yet.</Text>
      ) : (
        <FlatList
          data={filteredJobs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <JobCard
              job={item}
              index={filteredJobs.indexOf(item)}
              navigation={navigation}
            />
          )}
        />
      )}
    </View>
  );
}

// Keep styles the same

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  job: {
    fontSize: 16,
    paddingVertical: 5,
  },
});
