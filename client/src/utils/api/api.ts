type Method = "GET" | "POST" | "PUT" | "DELETE";
type ContentType = "application/json";
type Body =
  | string
  | Blob
  | ArrayBufferView
  | ArrayBuffer
  | FormData
  | URLSearchParams
  | ReadableStream<Uint8Array>
  | null
  | undefined;

export const api = async <T extends {}, K extends {}>(
  url: string,
  body: Body,
  method: Method = "GET",
  contentType: ContentType = "application/json",
  queryString: K
) => {
  const queryStringParsed = queryString
    ? "?" + new URLSearchParams(queryString).toString()
    : "";
  const response = await fetch(`/api/${url}${queryStringParsed}`, {
    method,
    headers: {
      "Content-Type": contentType
    },
    body
  });

  let result = null;
  if (response.ok) {
    switch (contentType) {
      case "application/json": {
        result = (await response.json()) as T;
        break;
      }
    }
  }

  return result;
};
