import type { Service } from "../types/types";
import { pb } from "./PocketBase";
import useSWRImmutable from "swr/immutable";

export const fetchServices = async () => {
  return await pb
    .collection<Service>("Service")
    .getFullList({ requestKey: null });
};

export const useServices = () => {
  const { data, error, isLoading, isValidating, mutate } = useSWRImmutable<
    Service[]
  >("services", fetchServices, {
    revalidateIfStale: false,
    dedupingInterval: 60_000, // 1 минута дедупликации
  });

  return {
    data: data ?? [],
    isLoading,
    isValidating,
    error,
    mutate,
  };
};
