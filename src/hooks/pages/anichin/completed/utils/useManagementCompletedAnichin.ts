import { useState, useEffect, useCallback } from "react";

import type { MouseEvent } from "react";

import { useRouter } from "next/navigation";

import { fetchDonghuaCompletedData } from "@/lib/FetchAnichin";

import { DonghuaContentProps } from "@/interface/anichin";

export const useManagementCompletedAnichin = ({
  anichinData,
}: DonghuaContentProps) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(
    anichinData.pagination.currentPage
  );
  const [donghuaList, setDonghuaList] = useState(anichinData.animeList);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [totalPages, setTotalPages] = useState(
    anichinData.pagination.totalPages
  );

  const getUrlParams = () => {
    if (typeof window === "undefined") return new URLSearchParams();
    return new URLSearchParams(window.location.search);
  };

  const handlePageChange = useCallback(
    async (page: number) => {
      try {
        setLoadingProgress(0);
        router.push(`/donghua/completed?page=${page}`, { scroll: false });

        const data = await fetchDonghuaCompletedData(page);

        if (data && data.data && data.data.animeList && data.pagination) {
          setDonghuaList(data.data.animeList);
          setCurrentPage(data.pagination.currentPage);
          setTotalPages(data.pagination.totalPages);
        } else {
          console.error("Invalid data structure received:", data);
          throw new Error("Invalid data structure");
        }

        setLoadingProgress(100);
        setTimeout(() => {
          setLoadingProgress(0);
        }, 500);
      } catch (error) {
        console.error("Failed to fetch donghua data:", error);
        setLoadingProgress(0);
      }
    },
    [router]
  );

  useEffect(() => {
    const urlParams = getUrlParams();
    const page = urlParams.get("page");
    if (page) {
      handlePageChange(parseInt(page));
    }
  }, [handlePageChange]);

  const handleDonghuaClick = (
    e: MouseEvent<HTMLAnchorElement>,
    anichinId: string
  ) => {
    e.preventDefault();
    setLoadingId(anichinId);
    setLoadingProgress(0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setLoadingProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        router.push(`/donghua/${anichinId}`);
      }
    }, 100);
  };

  return {
    currentPage,
    donghuaList,
    loadingId,
    loadingProgress,
    totalPages,
    handlePageChange,
    handleDonghuaClick,
  };
};
