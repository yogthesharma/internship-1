import useSWR from "swr";
import axios from "axios";

export const fetcher = (url) => axios.get(url).then((res) => res.data);
export const useUser = () => {
  const { data, mutate } = useSWR("/api/user", fetcher);
  const loading = !data;
  const user = data?.user;

  // returing essentials
  return [user, { mutate, loading }];
};
