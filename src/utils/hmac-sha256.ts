import * as crypto from 'crypto'
import { memoize } from './memoize'

export const hmacSHA256 = memoize(
  function (secret: string, text: string): string {
    return crypto.createHmac('sha256', secret)
      .update(text)
      .digest()
      .toString('hex')
  }
)
