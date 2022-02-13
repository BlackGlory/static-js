import { StaticURLFactory } from '@src/static-url-factory'
import '@blackglory/jest-matchers'

describe('StaticURLFactory', () => {
  describe('createFileURL', () => {
    test('only filename', () => {
      const factory = createFactory()

      const result = factory.createFileURL('filename')

      expect(result).toBe('https://localhost:8080/files/filename')
    })

    test('with contentType', () => {
      const factory = createFactory()

      const result = factory.createFileURL('filename', 'image/png')

      expect(result).toBe('https://localhost:8080/files/filename?contentType=image%2Fpng')
    })
  })

  describe('createDerivedImageURL', () => {
    test('only metadata', async () => {
      const factory = createFactory()

      const result = factory.createDerivedImageURL('filename', {
        format: 'webp'
      , quality: 80
      , maxWidth: 800
      , maxHeight: 600
      , multiple: 0.5
      })
      const proResult = await result

      expect(proResult).toBe('https://localhost:8080/files/filename?format=webp&quality=80&maxWidth=800&maxHeight=600&multiple=0.5&signature=7ce78b8956d67e13788d9c3493e9ef3092a245bc1b1018736f3692a267676feb')
    })

    test('with contentType', async () => {
      const factory = createFactory()

      const result = factory.createDerivedImageURL(
        'filename'
      , {
          format: 'webp'
        , quality: 80
        , maxWidth: 800
        , maxHeight: 600
        , multiple: 0.5
        }
      , 'image/webp'
      )
      const proResult = await result

      expect(proResult).toBe('https://localhost:8080/files/filename?format=webp&quality=80&maxWidth=800&maxHeight=600&multiple=0.5&contentType=image%2Fwebp&signature=64a37802e472873968fa174153d5ccf60556028f6847ecde00a4f7ce441041fc')
    })
  })

  describe('createDerivedFontURL', () => {
    test('only metadata', async () => {
      const factory = createFactory()

      const result = factory.createDerivedFontURL('filename', {
        format: 'woff'
      , subset: 'Hello World'
      })
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBe('https://localhost:8080/files/filename?format=woff&subset=+HWdelor&signature=0ba316164747e67a676ec9749594cc7f9c4b1faec4e795d34ea96567bb32f5ff')
    })

    test('with contentType', async () => {
      const factory = createFactory()

      const result = factory.createDerivedFontURL(
        'filename'
      , {
          format: 'woff'
        , subset: 'Hello World'
        }
      , 'font/woff'
      )
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBe('https://localhost:8080/files/filename?format=woff&subset=+HWdelor&contentType=font%2Fwoff&signature=ce9304342567e883056739214d38318602c6ae2259854b0f2f610244a34b1350')
    })
  })
})

function createFactory() {
  return new StaticURLFactory({
    server: 'https://localhost:8080/'
  , secret: 'secret'
  })
}
