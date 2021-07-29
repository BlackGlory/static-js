import { StaticURLFactory } from '@src/static-url-factory.browser'
import '@blackglory/jest-matchers'
import '@test/polyfill'

describe('StaticURLFactory', () => {
  test('createFileURL(filename: string): string', () => {
    const factory = createFactory()

    const result = factory.createFileURL('filename')

    expect(result).toBe('https://localhost:8080/files/filename')
  })

  test(`
    createDerviedImageURL(
      filename: string
    , metadata: IDerviedImageMetadata
    ): Promise<string>
  `, async () => {
    const factory = createFactory()

    const result = factory.createDerviedImageURL('filename', {
      format: 'webp'
    , quality: 80
    , maxWidth: 800
    , maxHeight: 600
    , multiple: 0.5
    })
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBe('https://localhost:8080/files/filename?format=webp&quality=80&maxWidth=800&maxHeight=600&multiple=0.5&signature=7ce78b8956d67e13788d9c3493e9ef3092a245bc1b1018736f3692a267676feb')
  })
})

function createFactory() {
  return new StaticURLFactory({
    server: 'https://localhost:8080/'
  , secret: 'secret'
  })
}
