import * as crypto from 'crypto'

export function hmacSHA256(secret: string, text: string): string {
  return crypto.createHmac('sha256', secret)
    .update(text)
    .digest()
    .toString('hex')
}
