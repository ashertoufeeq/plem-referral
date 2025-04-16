import { useState, useEffect, useRef } from 'react';
import { debounce } from 'lodash';
import { ApiResponse } from "interfaces/entity/pagination";
import {fetchApiData} from 'interfaces/services/pagination'

interface UsePaginatedDataParams<T> {
  endpoint?: string;
  transformData?: (data: ApiResponse<T>) => ApiResponse<T>;
  autoLoad?: boolean;
  limit?: number
  getUrl?: (o: { page: number; search?: string; limit?: number }) => string
}

const usePaginatedData = <T>({
  endpoint = 'list',
  transformData = (data) => data,
  autoLoad = true,
  limit = 10,
  getUrl
}: UsePaginatedDataParams<T>) => {
  const [apiData, setApiData] = useState<ApiResponse<T> | null>(null);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<number>(0);

  const generateUrl = (page: number, searchQuery: string) => {
    return getUrl? getUrl({page, search:searchQuery, limit }):`${endpoint}?page=${page}&limit=${limit}${searchQuery?`&search${searchQuery}`:''}`;
  };
  

  const fetchData = async (url: string) => {
    setLoading(true);
    fetchApiData(url)
      .then(({data}) => {
        setApiData(transformData(data));
      })
      .finally(() => setLoading(false));
  };

  const searchFuncRef = useRef(
    debounce((url: string) => {
      return  fetchData(url)
    
    }, 800)
  ).current;

  const searchFunc = (searchQuery: string) => {
    setSearch(searchQuery);
    searchFuncRef(generateUrl(apiData?.data.pageable.pageNumber || 0, searchQuery));
  };

  useEffect(() => {
    if (autoLoad) {
      fetchData(generateUrl(apiData?.data.pageable.pageNumber || 0, search));
    }
  }, [autoLoad, refresh, ]);

  return {
    state: { apiData, loading, search, },
    fetchData,
    search: (query: string) => searchFunc(query),
    nextPage: () => apiData?.data.pageable.pageNumber !== undefined && apiData?.data.last === false && fetchData(generateUrl(apiData.data.pageable.pageNumber + 1, search)),
    prevPage: () => apiData?.data.pageable.pageNumber !== undefined && apiData?.data.first === false && fetchData(generateUrl(apiData.data.pageable.pageNumber - 1, search)),
    gotoPage: (page: number) => fetchData(generateUrl(page, search)),
    reload: () => setRefresh((prev) => prev + 1),
    reset: () => {
      setApiData(null);
      setSearch('');
    },
  };
};

export default usePaginatedData;
