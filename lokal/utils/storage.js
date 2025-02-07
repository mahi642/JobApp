import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

// Store only job IDs
export const saveJobToBookmarks = (jobId) => {
  const bookmarks = getBookmarkedJobs();
  if (!bookmarks.includes(jobId)) {
    storage.set("bookmarked_jobs", JSON.stringify([...bookmarks, jobId]));
  }
};

export const getBookmarkedJobs = () => {
  const storedData = storage.getString("bookmarked_jobs");
  return storedData ? JSON.parse(storedData) : [];
};

export const removeJobFromBookmarks = (jobId) => {
  const bookmarks = getBookmarkedJobs().filter((id) => id !== jobId);
  storage.set("bookmarked_jobs", JSON.stringify(bookmarks));
};

export const isJobBookmarked = (jobId) => {
  return getBookmarkedJobs().includes(jobId);
};
