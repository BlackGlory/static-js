import { hmacSHA256 } from '@utils/hmac-sha256.browser'
import '@blackglory/jest-matchers'
import '@test/polyfill'

test('hmacSHA256(secret: string, text: string): Promise<string>', async () => {
  const secret = 'secret'
  const text = 'text'

  const result = hmacSHA256(secret, text)
  const proResult = await result

  expect(result).toBePromise()
  expect(proResult).toBe('2f443685592900e619f2f3b2350c3c8a5738e2e7a26bc9a244d3393c3cd6abd6')
})
