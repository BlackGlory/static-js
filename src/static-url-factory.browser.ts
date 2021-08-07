import { hmacSHA256 } from '@utils/hmac-sha256.browser'
import 'core-js/es/object/from-entries'
import { stringifyRecord } from '@utils/stringify-record'
import { normalizeSubset } from '@utils/normalize-subset'
import { IDerivedFontMetadata, IDerivedImageMetadata, IStaticURLFactoryOptions }
  from './types'

export class StaticURLFactory {
  constructor(private options: IStaticURLFactoryOptions) {}

  createFileURL(filename: string): string {
    const url = new URL(`files/${filename}`, this.options.server)
    return url.href
  }

  createDerivedImageURL(
    filename: string
  , metadata: IDerivedImageMetadata
  ): Promise<string> {
    return this.createDerivedFileURL(filename, metadata)
  }

  createDerivedFontURL(
    filename: string
  , metadata: IDerivedFontMetadata
  ): Promise<string> {
    metadata.subset = normalizeSubset(metadata.subset)
    return this.createDerivedFileURL(filename, metadata)
  }

  private async createDerivedFileURL(
    filename: string
  , metadata: object
  ): Promise<string> {
    const url = new URL(`files/${filename}`, this.options.server)
    const searchParams = new URLSearchParams(stringifyRecord({
      ...metadata
    , signature: await computeSignature(this.options.secret, metadata)
    }))
    url.search = searchParams.toString()
    return url.href
  }
}

async function computeSignature(
  secret: string
, params: object
): Promise<string> {
  const urlSearchParams = new URLSearchParams(stringifyRecord(params))
  urlSearchParams.sort()
  const text = urlSearchParams.toString()
  return await hmacSHA256(secret, text)
}
