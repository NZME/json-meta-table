DateTimeRenderer
================
Renderer type class for `datetime` type data values.
Renders an `<input type="text">` element as an editor.

See [BaseRenderer](BaseRenderer.md) for more details.

Notes
-----
  - Display value is formatted to relative time, using the `moment` dependency.
  - Editor value is parsed using the `moment` dependency, supports entering any valid datetime string.