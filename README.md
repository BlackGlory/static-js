# static-js
## Install
```sh
npm install --save @blackglory/static-js
# or
yarn add @blackglory/static-js
```

## API
### StaticURLFactory
```ts
interface IStaticURLFactoryOptions {
  server: string
  secret: string
}

interface IDerivedImageMetadata {
  format: 'jpeg' | 'webp'
  quality: number
  maxWidth?: number
  maxHeight?: number
  multiple?: number
}

interface IDerivedFontMetadata {
  format: 'woff' | 'woff2'
  subset: string
}

class StaticURLFactory {
  constructor(options: IStaticURLFactoryOptions)

  createFileURL(filename: string, contentType?: string): string

  createDerivedImageURL(
    filename: string
  , metadata: IDerivedImageMetadata
  , contentType?: string
  ): Promise<string>

  createDerivedFontURL(
    filename: string
  , metadata: IDerivedFontMetadata
  , contentType?: string
  ): Promise<string>
}
```
