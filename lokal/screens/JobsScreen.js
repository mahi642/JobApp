import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import JobCard from "../components/JobCard";
import { saveJobId, getJobId, removeJobId } from "../utils/storage";

export default function JobsScreen() {
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Track if more data is available

  useEffect(() => {
    fetchJobData(page);
  }, []);

  const fetchJobData = async (pageNumber) => {
    if (!hasMore) return; // Stop fetching if there's no more data

    try {
      if (pageNumber === 1) {
        setLoading(true);
      } else {
        setIsFetchingMore(true);
      }

      const response = await fetch(
        `https://testapi.getlokalapp.com/common/jobs?page=${pageNumber}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        setJobData((prevJobs) => [...prevJobs, ...data.results]);
        setPage(pageNumber + 1);
      } else {
        setHasMore(false); // No more jobs available
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  };

  const loadMoreJobs = () => {
    if (!isFetchingMore && hasMore) {
      fetchJobData(page);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
          data={jobData}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => <JobCard job={item} index={index} />}
          onEndReached={loadMoreJobs} // Trigger when reaching the bottom
          onEndReachedThreshold={0.5} // Adjust when to fetch next page (0.5 = 50% from bottom)
          ListFooterComponent={
            isFetchingMore ? (
              <ActivityIndicator size="small" color="#007AFF" />
            ) : null
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
