import { hmacSHA256 } from '@utils/hmac-sha256'
import { stringifyRecord } from '@utils/stringify-record'
import { StaticURLFactoryCommon } from './static-url-factory.common'

export class StaticURLFactory extends StaticURLFactoryCommon {
  protected computeSignature(
    secret: string
  , params: object
  ): string {
    const urlSearchParams = new URLSearchParams(stringifyRecord(params))
    urlSearchParams.sort()
    const text = urlSearchParams.toString()
    return hmacSHA256(secret, text)
  }
}
