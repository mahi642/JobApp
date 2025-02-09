import React, { createContext, useState, useEffect } from "react";
import {
  getBookmarkedJobs,
  saveJobToBookmarks,
  removeJobFromBookmarks,
} from "../utils/storage";

export const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  useEffect(() => {
    const loadBookmarks = async () => {
      const jobs = await getBookmarkedJobs(); // Fetch stored bookmarks
      setBookmarkedJobs(jobs || []);
    };
    loadBookmarks();
  }, []);

  const addBookmark = async (job) => {
    await saveJobToBookmarks(job);
    setBookmarkedJobs((prev) => [...prev, job]);
  };

  const removeBookmark = async (jobId) => {
    await removeJobFromBookmarks(jobId);
    setBookmarkedJobs((prev) => prev.filter((job) => job.id !== jobId));
  };

  return (
    <BookmarkContext.Provider
      value={{ bookmarkedJobs, addBookmark, removeBookmark }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};
