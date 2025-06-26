import { useEffect, useState } from "react";
import { ref, onValue, off, DataSnapshot } from "firebase/database";
import { database } from "@/utils/firebase/firebase";
import { HistoryItem, BookmarkItem } from "@/utils/context/types/Auth";

export function useHistory(uid: string | undefined) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!uid) {
      setHistory([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const historyRef = ref(database, `history/${uid}`);
    const handleValue = (snapshot: DataSnapshot) => {
      const data = snapshot.val();
      if (data) {
        setHistory(Object.values(data));
      } else {
        setHistory([]);
      }
      setLoading(false);
    };
    const handleError = (err: Error) => {
      setError(err.message || "Failed to fetch history");
      setLoading(false);
    };
    onValue(historyRef, handleValue, handleError);
    return () => {
      off(historyRef, "value", handleValue);
    };
  }, [uid]);

  return { history, loading, error };
}

export function useBookmarks(uid: string | undefined) {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!uid) {
      setBookmarks([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const bookmarksRef = ref(database, `bookmarks/${uid}`);
    const handleValue = (snapshot: DataSnapshot) => {
      const data = snapshot.val();
      if (data) {
        setBookmarks(Object.values(data));
      } else {
        setBookmarks([]);
      }
      setLoading(false);
    };
    const handleError = (err: Error) => {
      setError(err.message || "Failed to fetch bookmarks");
      setLoading(false);
    };
    onValue(bookmarksRef, handleValue, handleError);
    return () => {
      off(bookmarksRef, "value", handleValue);
    };
  }, [uid]);

  return { bookmarks, loading, error };
}
