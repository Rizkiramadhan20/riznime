"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase/firebase";
import { UserAccount, Role } from "@/utils/context/types/Auth";

export function useUsers() {
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string)
        );
        const usersData = querySnapshot.docs
          .map((doc) => ({ ...doc.data(), uid: doc.id } as UserAccount))
          .filter((user) => user.role === Role.USER);
        setUsers(usersData);
      } catch {
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return { users, loading };
}
