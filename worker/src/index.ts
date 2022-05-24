import { handleRequest } from './handler'

declare global {
  const CHESSPLAYERS: KVNamespace
}

addEventListener('fetch', (event: FetchEvent) =>
  event.respondWith(handleRequest(event.request))
)
