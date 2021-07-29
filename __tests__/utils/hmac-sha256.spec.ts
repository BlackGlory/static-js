import { hmacSHA256 } from '@utils/hmac-sha256'
import '@blackglory/jest-matchers'

test('hmacSHA256(secret: string, text: string): string', () => {
  const secret = 'secret'
  const text = 'text'

  const result = hmacSHA256(secret, text)

  expect(result).toBe('2f443685592900e619f2f3b2350c3c8a5738e2e7a26bc9a244d3393c3cd6abd6')
})
