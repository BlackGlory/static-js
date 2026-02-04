import { stringifyRecord } from '@utils/stringify-record.js'
import { normalizeSubset } from '@utils/normalize-subset.js'
import { appendPathname } from 'url-operator'
import { hmacSHA256 } from 'extra-compatible'

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

export interface IDerivedFontMetadata {
  format: 'woff' | 'woff2'
  subset: string
}

export class StaticURLFactory {
  constructor(private options: IStaticURLFactoryOptions) {}

  createFileURL(filename: string, contentType?: string): string {
    const url = appendPathname(this.options.server, `files/${filename}`)
    if (contentType) {
      url.search = new URLSearchParams({ contentType }).toString()
    }
    return url.href
  }

  createDerivedImageURL(
    filename: string
  , metadata: IDerivedImageMetadata
  , contentType?: string
  ): Promise<string> {
    return this.createDerivedFileURL(filename, metadata, contentType)
  }

  createDerivedFontURL(
    filename: string
  , metadata: IDerivedFontMetadata
  , contentType?: string
  ): Promise<string> {
    metadata.subset = normalizeSubset(metadata.subset)
    return this.createDerivedFileURL(filename, metadata, contentType)
  }

  private async createDerivedFileURL(
    filename: string
  , metadata: object
  , contentType?: string
  ): Promise<string> {
    const url = appendPathname(this.options.server, `files/${filename}`)
    const searchParams = new URLSearchParams(stringifyRecord({
      ...metadata
    , ...contentType && { contentType }
    , signature: await this.computeSignature(this.options.secret, {
        ...metadata
      , ...contentType && { contentType }
      })
    }))
    url.search = searchParams.toString()
    return url.href
  }

  private async computeSignature(
    secret: string
  , params: object
  ): Promise<string> {
    const urlSearchParams = new URLSearchParams(stringifyRecord(params))
    urlSearchParams.sort()
    const text = urlSearchParams.toString()
    return await hmacSHA256(secret, text)
  }
}
