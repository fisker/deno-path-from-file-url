// https://github.com/denoland/std/blob/main/path/from_file_url_test.ts
import assert from 'node:assert/strict'
import process from 'node:process'
import test from 'node:test'
import fromFileUrl from './index.js'
import posixFromFileUrl from './posix.js'
import windowsFromFileUrl from './windows.js'

test('fromFileUrl()', () => {
  if (process.platform === 'win32') {
    assert.equal(fromFileUrl('file:///C:'), 'C:\\')
    assert.equal(
      fromFileUrl('file://127.0.0.1/foo'),
      String.raw`\\127.0.0.1\foo`,
    )
  } else {
    assert.equal(fromFileUrl(new URL('file:///home/foo')), '/home/foo')
  }
  assert.throws(
    () => fromFileUrl('http://localhost/foo'),
    TypeError,
    'URL must be a file URL: received "http:"',
  )
})

test('posixFromFileUrl()', () => {
  assert.equal(posixFromFileUrl(new URL('file:///home/foo')), '/home/foo')
  assert.equal(posixFromFileUrl('file:///'), '/')
  assert.equal(posixFromFileUrl('file:///home/foo'), '/home/foo')
  assert.equal(posixFromFileUrl('file:///home/foo%20bar'), '/home/foo bar')
  assert.equal(posixFromFileUrl('file:///%'), '/%')
  assert.equal(posixFromFileUrl('file://localhost/foo'), '/foo')
  assert.equal(posixFromFileUrl('file:///C:'), '/C:')
  assert.equal(posixFromFileUrl('file:///C:/'), '/C:/')
  assert.equal(posixFromFileUrl('file:///C:/Users/'), '/C:/Users/')
  assert.equal(posixFromFileUrl('file:///C:foo/bar'), '/C:foo/bar')
  assert.throws(
    () => posixFromFileUrl('http://localhost/foo'),
    TypeError,
    'URL must be a file URL: received "http:"',
  )
  assert.throws(
    () => posixFromFileUrl('abcd://localhost/foo'),
    TypeError,
    'URL must be a file URL: received "abcd:"',
  )
})

test('windowsFromFileUrl()', () => {
  assert.equal(
    windowsFromFileUrl(new URL('file:///home/foo')),
    String.raw`\home\foo`,
  )
  assert.equal(windowsFromFileUrl('file:///'), '\\')
  assert.equal(windowsFromFileUrl('file:///home/foo'), String.raw`\home\foo`)
  assert.equal(
    windowsFromFileUrl('file:///home/foo%20bar'),
    String.raw`\home\foo bar`,
  )
  assert.equal(windowsFromFileUrl('file:///%'), String.raw`\%`)
  assert.equal(
    windowsFromFileUrl('file://127.0.0.1/foo'),
    String.raw`\\127.0.0.1\foo`,
  )
  assert.equal(windowsFromFileUrl('file://localhost/foo'), String.raw`\foo`)
  assert.equal(windowsFromFileUrl('file:///C:'), 'C:\\')
  assert.equal(windowsFromFileUrl('file:///C:/'), 'C:\\')
  // Drop the hostname if a drive letter is parsed.
  assert.equal(windowsFromFileUrl('file://localhost/C:/'), 'C:\\')
  assert.equal(windowsFromFileUrl('file:///C:/Users/'), 'C:\\Users\\')
  assert.equal(windowsFromFileUrl('file:///C:foo/bar'), String.raw`\C:foo\bar`)
  assert.throws(
    () => windowsFromFileUrl('http://localhost/foo'),
    TypeError,
    'URL must be a file URL: received "http:"',
  )
  assert.throws(
    () => windowsFromFileUrl('abcd://localhost/foo'),
    TypeError,
    'URL must be a file URL: received "abcd:"',
  )
})
