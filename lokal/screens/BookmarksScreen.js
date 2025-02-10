import React, { useContext } from "react";
import { View, Text, Image, StyleSheet,FlatList } from "react-native";
import { BookmarkContext } from "../context/BookmarkContext";
import JobCard from "../components/JobCard";

export default function BookmarksScreen({ navigation }) {
  const { bookmarkedJobs } = useContext(BookmarkContext);
  const isEmpty = bookmarkedJobs.length === 0;

  return (
    <View style={[styles.container, isEmpty && styles.whiteBackground]}>
      <Text style={styles.title}>Bookmarked Jobs</Text>

      {isEmpty ? (
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/not_availble.gif")}
            style={styles.gif}
          />
          <Text style = {styles.text1} >No bookmarks available</Text>
        </View>
      ) : (
        <FlatList
          data={bookmarkedJobs}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <JobCard job={item} index={index} navigation={navigation} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5", 
  },
  whiteBackground: {
    backgroundColor: "#ffffff", // White background when no bookmarks
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  imageContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  gif: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    alignSelf: "center",
  },
  text1:{
    fontSize:20,
    fontWeight:400,

  }
});

