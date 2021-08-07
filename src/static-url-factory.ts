import { hmacSHA256 } from '@utils/hmac-sha256'
import 'core-js/es/object/from-entries'

export interface IStaticURLFactoryOptions {
  server: string
  secret: string
}

export interface IDerivedImageMetadata {
  format: 'jpeg' | 'webp'
  quality: number
  maxWidth?: number
  maxHeight?: number
  multiple?: number
}

export class StaticURLFactory {
  constructor(private options: IStaticURLFactoryOptions) {}

  createFileURL(filename: string): string {
    const url = new URL(`files/${filename}`, this.options.server)
    return url.href
  }

  createDerivedImageURL(filename: string, metadata: IDerivedImageMetadata): string {
    const url = new URL(`files/${filename}`, this.options.server)
    const searchParams = new URLSearchParams(stringifyRecord({
      ...metadata
    , signature: computeSignature(this.options.secret, metadata)
    }))
    url.search = searchParams.toString()
    return url.href
  }
}

function computeSignature(
  secret: string
, params: object
): string {
  const urlSearchParams = new URLSearchParams(stringifyRecord(params))
  urlSearchParams.sort()
  const text = urlSearchParams.toString()
  return hmacSHA256(secret, text)
}

function stringifyRecord(record: object): Record<string, string> {
  const entries = Object.entries(record).map(([key, value]) => [key, `${value}`])
  return Object.fromEntries(entries)
}
