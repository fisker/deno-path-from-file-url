/**
Converts a file URL to a path string.

@example Usage
```ts
import assert from "node:assert"
import fromFileUrl from "deno-path-from-file-url/windows"

assert.equal(fromFileUrl('file:///home/foo'), String.raw`\home\foo`)
assert.equal(fromFileUrl('file:///C:/Users/foo'), String.raw`C:\Users\foo`)
assert.equal(fromFileUrl('file://localhost/home/foo'), String.raw`\home\foo`)
```

@param url The file URL to convert.
@returns The path string.
*/
declare const fromFileUrl: (url: string | URL) => string

export default fromFileUrl
