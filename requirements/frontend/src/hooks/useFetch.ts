export type FetcherType = (
  token: string,
  method: string,
  uri: string,
  data: object | undefined,
  needResponse: boolean,
) => Promise<any>;

export function useFetch() {
  return (
    token: string,
    method: string,
    uri: string,
    data: object | undefined = undefined,
    needResponse: boolean = true,
  ) => {
    if (method === 'GET') return requestGet(token, uri);

    if (data === undefined) throw new Error();

    return requestBody(method, token, uri, data, needResponse);
  };
}

const requestGet = async (token: string, uri: string) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_EP}/${uri}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status >= 400) throw new Error();

  const data = await response.json();
  return data;
};

const requestBody = async (
  method: string,
  token: string,
  uri: string,
  data: object,
  needResponse: boolean,
) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_EP}/${uri}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (response.status >= 400) throw new Error();

  if (needResponse) return true;

  const ret = await response.json();
  return ret;
};
