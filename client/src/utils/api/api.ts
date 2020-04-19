import { toast } from 'react-toastify'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'
enum ContentTypeEnum {
  JSON = 'application/json',
}
type Body =
  | string
  | Blob
  | ArrayBufferView
  | ArrayBuffer
  | FormData
  | URLSearchParams
  | ReadableStream<Uint8Array>
  | object
  | null
  | undefined

export interface ApiProps {
  url: string
  method?: Method
  contentType?: ContentTypeEnum
  body?: Body
  queryString?: any
  noError?: boolean
  signal?: AbortSignal
}

export const api = async <T extends {} | null>({
  url,
  method = 'GET',
  contentType = ContentTypeEnum.JSON,
  body,
  queryString,
  noError,
  signal,
}: ApiProps) => {
  let queryStringParsed: string
  let response: Response
  try {
    queryStringParsed = queryString
      ? '?' + new URLSearchParams(queryString).toString()
      : ''

    switch (contentType) {
      case ContentTypeEnum.JSON: {
        body = JSON.stringify(body)
        break
      }
    }

    response = await fetch(`/api/${url}${queryStringParsed}`, {
      method,
      headers: {
        'Content-Type': contentType,
      },
      body,
      signal,
    })
  } catch (e) {
    if (noError) {
      return null
    }
    if (e.name === 'AbortError') {
      return null
    }
    toast.error(`Chyba sítě: ${e.message}`)
    console.log('e', e)
    return null
  }

  let result = null
  if (response.ok) {
    switch (contentType) {
      case ContentTypeEnum.JSON: {
        result = (await response.json()) as T
        break
      }
    }
  } else {
    if (noError) {
      return null
    }
    toast.error(`Chyba: ${response.statusText}`)
    return null
  }

  return result
}
