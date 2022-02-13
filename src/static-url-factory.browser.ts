import { hmacSHA256 } from '@utils/hmac-sha256.browser'
import { stringifyRecord } from '@utils/stringify-record'
import { StaticURLFactoryCommon } from './static-url-factory.common'

export class StaticURLFactory extends StaticURLFactoryCommon {
  async computeSignature(
    secret: string
  , params: object
  ): Promise<string> {
    const urlSearchParams = new URLSearchParams(stringifyRecord(params))
    urlSearchParams.sort()
    const text = urlSearchParams.toString()
    return await hmacSHA256(secret, text)
  }
}
