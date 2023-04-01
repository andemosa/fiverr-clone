import { useQuery } from "@tanstack/react-query";

import LoadingSpinner from "./Spinner";

import { axiosInstance } from "@services/index";

interface IProps<T> {
  url: string;
  buildUI: (data: T, refetch?: any) => JSX.Element;
}

const DataFetcher = <T extends unknown>({ url, buildUI }: IProps<T>) => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: [url],
    queryFn: (): Promise<T> => axiosInstance.get(url).then((res) => res.data),
  });

  if (isLoading) return <LoadingSpinner />;

  if (error) return <>An error occurred</>;

  if (data) return buildUI(data, refetch);

  return <></>;
};

export default DataFetcher;
