import { useEffect, useState } from "react";
import { ref, onValue, off, DataSnapshot } from "firebase/database";
import { database } from "@/utils/firebase/firebase";
import { HistoryItem } from "@/utils/context/types/Auth";

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
