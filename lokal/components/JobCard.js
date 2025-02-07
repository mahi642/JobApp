import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  saveJobToBookmarks,
  removeJobFromBookmarks,
  isJobBookmarked,
} from "../utils/storage";

const colors = [
  "#E3F2FD",
  "#E8F5E9",
  "#FFF3E0",
  "#F3E5F5",
  "#E1F5FE",
  "#FBE9E7",
];

export default function JobCard({ job, index }) {
  const navigation = useNavigation();
  const backgroundColor = colors[index % colors.length];
  const [bookmarked, setBookmarked] = useState(false);

 const toggleBookmark = () => {
   if (bookmarked) {
     removeJobFromBookmarks(job.id);
   } else {
     saveJobToBookmarks(job.id); // Store only the ID
   }
   setBookmarked(!bookmarked);
 };

 // Update the useEffect to sync with storage
 useEffect(() => {
   const check = () => setBookmarked(isJobBookmarked(job.id));
   check();
 }, [job.id]);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("JobDetails", { job })}
    >
      <View style={{ padding: 5 }}>
        <View style={[styles.card, { backgroundColor }]}>
          <View style={styles.detailsContainer}>
            <View style={styles.top}>
              <View style={styles.row}>
                <Ionicons name="business-outline" size={20} color="#007AFF" />
                <Text style={styles.companyName}>{job.company_name}</Text>
              </View>
              <TouchableOpacity
                style={styles.bookmarkContainer}
                onPress={toggleBookmark}
              >
                <Ionicons
                  style={styles.icon}
                  name={bookmarked ? "bookmark" : "bookmark-outline"}
                  size={35}
                  color={bookmarked ? "red" : "#007AFF"}
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

            <View style={styles.contain}>
              <View style={styles.row1}>
                <Ionicons
                  name="cash-outline"
                  size={25}
                  color="#28A745"
                  style={styles.whatsappIcon}
                />
                <Text style={styles.salary}>
                  {job.salary_max ? ` ${job.salary_max}` : " Not specified"}
                </Text>
              </View>

              <View style={styles.row1}>
                <Ionicons
                  name="logo-whatsapp"
                  size={25}
                  color="#25D366"
                  style={styles.whatsappIcon}
                />
                <Text style={styles.whatsappNo}>
                  {job.whatsapp_no ? `${job.whatsapp_no}` : " N/A"}
                </Text>
              </View>
            </View>
          </View>
          {/* ... */}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  top: {
    flexDirection: "row",
  },
  card: {
    flexDirection: "row",
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
    minHeight: 230,
  },
  contain: {
    flexDirection: "row",
    marginTop:10
  },
  detailsContainer: {
    flex: 9,
    padding: 4,
  },
  bookmarkContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    flex: 9,
  },
  row1: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    flex: 9,
    backgroundColor:"white",
    borderRadius:8,
    marginRight:8
  },
  companyName: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#007AFF",
    marginLeft: 8,
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
    fontSize: 19,
    fontWeight: "600",
    color: "black",
    marginLeft: 8,
  },
  whatsappNo: {
    fontSize: 19,
    color: "black",
    fontWeight: "600",
    marginLeft: 10,
    backgroundColor: "white",
    padding: 9,
  },
  icon: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 5,
  },
  whatsappIcon: {
    backgroundColor: "white",
    marginLeft:14,
  },
});
