import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { getBookmarkedJobs } from "../utils/storage";
import JobCard from "../components/JobCard"; // Ensure JobCard handles full job objects

export default function BookmarksScreen({ navigation }) {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const isFocused = useIsFocused();
  const [flag,setFlag] = useState(false);
  


  // Load bookmarked jobs
  useEffect(() => {
    if (isFocused) {
      const jobs = getBookmarkedJobs(); // Get full job objects
      setBookmarkedJobs(jobs);
      console.log("Loaded bookmarked jobs:", jobs);
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bookmarked Jobs</Text>
      {bookmarkedJobs.length === 0 ? (
        <Text>No bookmarks yet.</Text>
      ) : (
        <FlatList
          data={bookmarkedJobs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <JobCard
              job={item}
              index={bookmarkedJobs.indexOf(item)}
              navigation={navigation}
            />
          )}
        />
      )}
    </View>
  );
}

// Styles
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
