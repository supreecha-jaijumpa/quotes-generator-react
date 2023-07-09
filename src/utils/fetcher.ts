import axios from "axios";

export const fetcher = async <T>(url: string): Promise<T> => {
  const res = await axios.get(url);
  return res.data as T;
};
