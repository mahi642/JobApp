import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

export const saveJobToBookmarks = (job) => {
  const bookmarks = getBookmarkedJobs();
  const jobExists = bookmarks.some((b) => b.id === job.id);

  if (!jobExists) {
    const newBookmarks = [...bookmarks, job]; // Store full job object
    storage.set("bookmarked_jobs", JSON.stringify(newBookmarks));
    console.log("Bookmarked jobs after save:", newBookmarks);
  } else {
    console.log("Job already bookmarked, skipping...");
  }
};

export const getBookmarkedJobs = () => {
  const storedData = storage.getString("bookmarked_jobs");
  return storedData ? JSON.parse(storedData) : [];
};

export const removeJobFromBookmarks = (jobId) => {
  const bookmarks = getBookmarkedJobs();

  // Check if the job exists before filtering
  const jobExists = bookmarks.some((job) => job.id === jobId);

  if (jobExists) {
    const updatedBookmarks = bookmarks.filter((job) => job.id !== jobId);
    storage.set("bookmarked_jobs", JSON.stringify(updatedBookmarks));
    console.log("Bookmarked jobs after removal:", updatedBookmarks);
  } else {
    console.log("Job not found in bookmarks, skipping...");
  }
};

export const isJobBookmarked = (jobId) => {
  return getBookmarkedJobs().some((job) => job.id === jobId);
};
