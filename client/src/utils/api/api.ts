import { toast } from 'react-toastify'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'
type ContentType = 'application/json'
type Body =
  | string
  | Blob
  | ArrayBufferView
  | ArrayBuffer
  | FormData
  | URLSearchParams
  | ReadableStream<Uint8Array>
  | null
  | undefined

export const api = async <T extends {} | null, K extends {} = {}>(
  url: string,
  method: Method = 'GET',
  contentType: ContentType = 'application/json',
  body?: Body,
  queryString?: K
) => {
  const queryStringParsed = queryString
    ? '?' + new URLSearchParams(queryString).toString()
    : ''
  const response = await fetch(`/api/${url}${queryStringParsed}`, {
    method,
    headers: {
      'Content-Type': contentType,
    },
    body,
  })

  let result = null
  if (response.ok) {
    switch (contentType) {
      case 'application/json': {
        result = (await response.json()) as T
        break
      }
    }
  } else {
    toast.error(`CHYBA: ${response.statusText}`)
  }

  return result
}
