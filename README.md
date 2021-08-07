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

#### createFileURL

```ts
StaticURLFactory#createFileURL(filename: string): string 
```

#### createDerivedImageURL (Node.js)

```ts
StaticURLFactory#createDerivedImageURL(
  filename: string
, metadata: IDerivedImageMetadata
): string 
```

#### createDerivedImageURL (browser)

```ts
StaticURLFactory#createDerivedImageURL(
  filename: string
, metadata: IDerivedImageMetadata
): Promise<string>
```
