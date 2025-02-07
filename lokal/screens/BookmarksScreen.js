import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { getBookmarkedJobs } from "../utils/storage";

export default function BookmarksScreen() {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  useEffect(() => {
    const storedJobs = getBookmarkedJobs();
    setBookmarkedJobs(storedJobs);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bookmarked Jobs</Text>
      {bookmarkedJobs.length === 0 ? (
        <Text>No bookmarks yet.</Text>
      ) : (
        <FlatList
          data={bookmarkedJobs}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => <Text style={styles.job}>{item}</Text>}
        />
      )}
    </View>
  );
}

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
