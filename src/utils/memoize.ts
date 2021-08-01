import { memoize as extraMemoize, LRUCache } from 'extra-memoize'

const cache = new LRUCache(5)

export function memoize<
  Result
, Func extends (...args: any[]) => Result | PromiseLike<Result>
>(fn: Func): Func {
  return extraMemoize({ cache }, fn)
}
