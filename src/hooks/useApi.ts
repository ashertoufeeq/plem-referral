import { useEffect, useState } from "react";

import { loadAPI } from "helpers/api";

interface APIResponse<T> {
  loading: boolean;
  data?: T;
  error: any;
  status: number;
}

interface UseAPIOptions<T> {
  defaultData?: T;
  [key: string]: any;
}

const defaultAPIResponse: APIResponse<any> = {
  loading: true,
  data: undefined,
  error: null,
  status: 0,
};

export const useAPI = <T>(
  url: string,
  opts: UseAPIOptions<T> = {},
): APIResponse<T> & { reload: () => void } => {
  const { defaultData, ...options } = opts;
  const [response, setResponse] = useState<APIResponse<T>>(defaultAPIResponse);
  const [refresh, setRefresh] = useState(0);
  const reload = () => setRefresh(refresh + 1);

  const ox = JSON.stringify(options);

  useEffect(() => {
    setResponse(defaultAPIResponse);
    const load = async () => {
      setResponse({
        data: undefined,
        status: 200,
        error: undefined,
        loading: true,
      });
      if (defaultData)
        setResponse({
          data: defaultData,
          status: 200,
          error: undefined,
          loading: false,
        });
      setResponse(
        await loadAPI(
          url,
          options
        )
      );
    };

    load().then();
  }, [url, ox, refresh]);

  return { ...response, reload };
};
