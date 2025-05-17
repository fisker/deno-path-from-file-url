/**
Converts a file URL to a path string.

@example Usage
```ts
import assert from "node:assert";
import fromFileUrl from "deno-path-from-file-url";

assert.equal(fromFileUrl("file:///home/foo"), "\\home\\foo");
assert.equal(fromFileUrl("file:///C:/Users/foo"), "C:\\Users\\foo");
assert.equal(fromFileUrl("file://localhost/home/foo"), "\\home\\foo");
assert.equal(fromFileUrl("file:///home/foo"), "/home/foo");
```

@param url The file URL to convert to a path.
@returns The path string.
*/
declare const fromFileUrl: (url: string | URL) => string

export default fromFileUrl
