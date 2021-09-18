import {
  memoize as extraMemoize
, memoizeAsync as extraMemoizeAsync
, LRUCache
} from 'extra-memoize'

const cache = new LRUCache<any>(5)

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
