/**
Converts a file URL to a path string.

@example Usage
```ts
import process from 'node:process'
import assert from "node:assert/strict"
import fromFileUrl from "deno-path-from-file-url"

if (process.platform === 'win32'){
  assert.equal(fromFileUrl('file:///home/foo'), String.raw`\home\foo`)
  assert.equal(fromFileUrl('file:///C:/Users/foo'), String.raw`C:\Users\foo`)
  assert.equal(fromFileUrl('file://localhost/home/foo'), String.raw`\home\foo`)
} else {
  assert.equal(fromFileUrl('file:///home/foo'), '/home/foo')
}
```

@param url The file URL to convert to a path.
@returns The path string.
*/
declare const fromFileUrl: (url: string | URL) => string

export default fromFileUrl
