export async function hmacSHA256(secret: string, text: string): Promise<string> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw'
  , encoder.encode(secret)
  , {
      name: 'HMAC'
    , hash: { name: 'SHA-256' }
    }
  , false
  , ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(text))
  return toHex(signature)
}

function toHex(buffer: ArrayBuffer): string {
  return Array.prototype.map.call(
    new Uint8Array(buffer)
  , x => `00${x.toString(16)}`.slice(-2)
  ).join('')
}
