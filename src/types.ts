export interface IStaticURLFactoryOptions {
  server: string
  secret: string
}

export interface IDerivedImageMetadata {
  format: 'jpeg' | 'webp'
  quality: number
  maxWidth?: number
  maxHeight?: number
  multiple?: number
}

export interface IDerivedFontMetadata {
  format: 'woff' | 'woff2'
  subset: string
}
