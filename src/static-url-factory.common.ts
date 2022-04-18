import { stringifyRecord } from '@utils/stringify-record'
import { normalizeSubset } from '@utils/normalize-subset'
import { IDerivedFontMetadata, IDerivedImageMetadata, IStaticURLFactoryOptions } from './types'
import { Awaitable } from 'justypes'

export abstract class StaticURLFactoryCommon {
  constructor(private options: IStaticURLFactoryOptions) {}

  createFileURL(filename: string, contentType?: string): string {
    const url = new URL(`files/${filename}`, this.options.server)
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
    const url = new URL(`files/${filename}`, this.options.server)
    const searchParams = new URLSearchParams(stringifyRecord({
      ...metadata
    , ...(contentType ? { contentType } : {})
    , signature: await this.computeSignature(this.options.secret, {
        ...metadata
      , ...(contentType ? { contentType } : {})
      })
    }))
    url.search = searchParams.toString()
    return url.href
  }

  protected abstract computeSignature(
    secret: string
  , params: object
  ): Awaitable<string>
}
