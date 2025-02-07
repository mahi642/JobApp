import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

// Save a job to bookmarks
export const saveJobToBookmarks = (jobId) => {
  let bookmarks = getBookmarkedJobs();
  if (!bookmarks.includes(jobId)) {
    bookmarks.push(jobId);
    storage.set("bookmarked_jobs", JSON.stringify(bookmarks));
  }
};

// Get all bookmarked jobs
export const getBookmarkedJobs = () => {
  const storedData = storage.getString("bookmarked_jobs");
  return storedData ? JSON.parse(storedData) : [];
};

// Remove a job from bookmarks
export const removeJobFromBookmarks = (jobId) => {
  let bookmarks = getBookmarkedJobs().filter((id) => id !== jobId);
  storage.set("bookmarked_jobs", JSON.stringify(bookmarks));
};

// Check if a job is bookmarked
export const isJobBookmarked = (jobId) => {
  return getBookmarkedJobs().includes(jobId);
};
