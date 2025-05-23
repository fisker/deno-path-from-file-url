/**
Converts a file URL to a path string.

@example Usage
```ts
import assert from "node:assert/strict"
import fromFileUrl from "deno-path-from-file-url/posix"

assert.equal(fromFileUrl("file:///home/foo"), "/home/foo")
```

@param url The file URL to convert.
@returns The path string.
*/
declare const fromFileUrl: (url: string | URL) => string

export default fromFileUrl
