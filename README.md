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
interface IDerviedImageMetadata {
  format: 'jpeg' | 'webp'
  quality: number
  maxWidth?: number
  maxHeight?: number
  multiple?: number
}
```

#### createFileURL

```ts
StaticURLFactory#createFileURL(filename: string): string 
```

#### createDerviedImageURL (Node.js)

```ts
StaticURLFactory#createDerviedImageURL(
  filename: string
, metadata: IDerviedImageMetadata
): string 
```

#### createDerviedImageURL (browser)

```ts
StaticURLFactory#createDerviedImageURL(
  filename: string
, metadata: IDerviedImageMetadata
): Promise<string>
```
