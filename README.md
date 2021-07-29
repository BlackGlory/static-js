# static-js

## Install

```sh
npm install --save @blackglory/static-js
# or
yarn add @blackglory/static-js
```

## API

### StoreClient

```ts
new StaticURLFactory({
  server: string
  secret: string
})
```

```ts
interface IDerviedImageMetadata {
  format: 'jpeg' | 'webp'
  quality: number
  maxWidth?: number
  maxHeight?: number
  multiple?: number
}
```

#### set

```ts
StaticURLFactory#createFileURL(filename: string): string 
```

#### setJSON (Node.js)

```ts
StaticURLFactory#createDerviedImageURL(
  filename: string
, metadata: IDerviedImageMetadata
): string 
```

#### setJSON (browser)

```ts
StaticURLFactory#createDerviedImageURL(
  filename: string
, metadata: IDerviedImageMetadata
): Promise<string>
```
