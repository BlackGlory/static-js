import { TextEncoder } from 'util'
import { Crypto } from '@peculiar/webcrypto'

globalThis.crypto = new Crypto()
globalThis.TextEncoder = TextEncoder 
