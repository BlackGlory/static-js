import { StaticURLFactory } from '@src/static-url-factory'

describe('StaticURLFactory', () => {
  test('createFileURL(filename: string): string', () => {
    const factory = createFactory()

    const result = factory.createFileURL('filename')

    expect(result).toBe('https://localhost:8080/files/filename')
  })

  test(`
    createDerivedImageURL(filename: string, metadata: IDerivedImageMetadata): string
  `, () => {
    const factory = createFactory()

    const result = factory.createDerivedImageURL('filename', {
      format: 'webp'
    , quality: 80
    , maxWidth: 800
    , maxHeight: 600
    , multiple: 0.5
    })

    expect(result).toBe('https://localhost:8080/files/filename?format=webp&quality=80&maxWidth=800&maxHeight=600&multiple=0.5&signature=7ce78b8956d67e13788d9c3493e9ef3092a245bc1b1018736f3692a267676feb')
  })
})

function createFactory() {
  return new StaticURLFactory({
    server: 'https://localhost:8080/'
  , secret: 'secret'
  })
}
