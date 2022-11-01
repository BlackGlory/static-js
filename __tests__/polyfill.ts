import { TextEncoder } from 'util'
import { Crypto } from '@peculiar/webcrypto'

globalThis.crypto = new Crypto() as globalThis.Crypto
globalThis.TextEncoder = TextEncoder
