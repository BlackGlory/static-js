# static-js
## Install
```sh
npm install --save @blackglory/static-js
# or
yarn add @blackglory/static-js
```

## API
### StaticClient
```ts
new StaticURLFactory({
  server: string
  secret: string
})
```

```ts
interface IDerivedImageMetadata {
  format: 'jpeg' | 'webp'
  quality: number
  maxWidth?: number
  maxHeight?: number
  multiple?: number
}
```

```ts
interface IDerivedFontMetadata {
  format: 'woff' | 'woff2'
  subset: string
}
```

#### createFileURL
```ts
StaticURLFactory#createFileURL(filename: string, contentType?: string): string
```

#### createDerivedImageURL
```ts
StaticURLFactory#createDerivedImageURL(
  filename: string
, metadata: IDerivedImageMetadata
, contentType?: string
): Promise<string>
```

#### createDerivedFontURL
```ts
StaticURLFactory#createDerivedFontURL(
  filename: string
, metadata: IDerivedFontMetadata
, contentType?: string
): Promise<string>
```
