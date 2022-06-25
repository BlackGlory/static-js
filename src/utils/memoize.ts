import {
  memoize as extraMemoize
, memoizeAsync as extraMemoizeAsync
} from 'extra-memoize'
import { TLRUCache } from '@extra-memoize/memory-cache'
import ms from 'ms'

const cache = new TLRUCache<any>(50, ms('1s'))

export function memoize<Result>(
  fn: (...args: any[]) => Result
): (...args: any[]) => Result {
  return extraMemoize({ cache }, fn)
}

export function memoizeAsync<Result>(
  fn: (...args: any[]) => PromiseLike<Result>
): (...args: any[]) => Promise<Result> {
  return extraMemoizeAsync({ cache }, fn)
}
