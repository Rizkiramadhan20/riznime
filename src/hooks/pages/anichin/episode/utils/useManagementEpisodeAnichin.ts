"use client";

import { useState, useEffect } from "react";

import { usePathname, useRouter } from "next/navigation";

import {
  Quality,
  Server,
  Episode,
  PopularSeriesItem,
  DetailsEpisodeContentProps,
} from "@/hooks/pages/anichin/episode/types/EpisodeDetails";

import { fetchServerUrl } from "@/lib/FetchAnichin";

import { formatSlug } from "@/base/helper/FormatSlug";

import { useAuth } from "@/utils/context/AuthContext";

export const useManagementEpisodeAnichin = ({
  episodeData,
  slug,
}: DetailsEpisodeContentProps) => {
  const { user, loading, addToHistory } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedQuality, setSelectedQuality] = useState<Quality>(() => {
    const firstValidQuality = episodeData.server.qualities.find(
      (q) => q.serverList && q.serverList.length > 0
    );
    return firstValidQuality || episodeData.server.qualities[0];
  });

  const [selectedServer, setSelectedServer] = useState<Server>(() => {
    const firstValidQuality = episodeData.server.qualities.find(
      (q) => q.serverList && q.serverList.length > 0
    );
    return (
      firstValidQuality?.serverList[0] ||
      episodeData.server.qualities[0].serverList[0]
    );
  });

  const [currentStreamingUrl, setCurrentStreamingUrl] = useState(
    episodeData.defaultStreamingUrl
  );
  const [isEpisodeLoading, setIsEpisodeLoading] = useState(false);
  const [isRecommendedLoading, setIsRecommendedLoading] = useState(false);
  const [popularFilter, setPopularFilter] = useState<
    "weekly" | "monthly" | "allTime" | "movies"
  >("weekly");

  const isEpisodeActive = (episodeHref: string) => {
    const cleanPathname = pathname.split("?")[0].replace(/\/$/, "");
    const cleanHref = episodeHref.split("?")[0].replace(/\/$/, "");
    const pathnameParts = cleanPathname.split("/");
    const hrefParts = cleanHref.split("/");
    return (
      formatSlug(pathnameParts[pathnameParts.length - 1]) ===
      formatSlug(hrefParts[hrefParts.length - 1])
    );
  };

  const handleServerSelect = async (server: Server) => {
    try {
      const response = await fetchServerUrl(server.href);
      if (response.ok) {
        setSelectedServer(server);
        setCurrentStreamingUrl(response.data.url);
      }
    } catch (error) {
      console.error("Failed to fetch server URL:", error);
    }
  };

  useEffect(() => {
    handleServerSelect(selectedServer);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (loading || !user || !slug) {
      return;
    }

    const historySavedKey = `history-saved-${user.uid}-${slug}`;
    const isAlreadySaved = localStorage.getItem(historySavedKey);

    if (!isAlreadySaved) {
      addToHistory({
        animeId: episodeData.anichinId,
        episodeId: slug,
        title: episodeData.title,
        poster: episodeData.poster,
        href: pathname,
      });
      localStorage.setItem(historySavedKey, "true");
    }
  }, [user, loading, slug, episodeData, addToHistory, pathname]);

  const handleEpisodeClick = (href: string) => {
    if (!href) return;
    setIsEpisodeLoading(true);
    router.push(`/anime/episode/${href}`);
  };

  const handleRecommendedClick = (href: string) => {
    setIsRecommendedLoading(true);
    router.push(href);
  };

  const filteredEpisodes = (episodeData.episodeList ?? []).filter(
    (ep: Episode) => {
      if (!ep || ep.title === undefined || ep.title === null) return false;
      const titleStr = ep.title.toString().toLowerCase();
      const searchStr = search.toLowerCase();
      return (
        titleStr.includes(searchStr) ||
        `episode ${titleStr}`.includes(searchStr) ||
        `e${titleStr}`.includes(searchStr)
      );
    }
  );

  const getFilteredPopular = () => {
    if (!episodeData.popularSeries) return [];
    const list = episodeData.popularSeries[popularFilter] || [];
    const seenTitles = new Set<string>();
    return list.filter((anime: PopularSeriesItem) => {
      if (seenTitles.has(anime.title)) return false;
      seenTitles.add(anime.title);
      return true;
    });
  };

  return {
    search,
    setSearch,
    selectedQuality,
    setSelectedQuality,
    selectedServer,
    currentStreamingUrl,
    isEpisodeLoading,
    isRecommendedLoading,
    popularFilter,
    setPopularFilter,
    isEpisodeActive,
    handleServerSelect,
    handleEpisodeClick,
    handleRecommendedClick,
    filteredEpisodes,
    getFilteredPopular,
  };
};
