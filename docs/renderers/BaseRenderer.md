BaseRenderer
============
Abstract class for renderer type classes to extend.

Notes
-----
  - Renderer classes are used to render both the value display, as well as the editor used within the table.
  - It is recommended to override the methods in the 'actions' code region, rather than those
    in the 'controls' region, to avoid having to manually trigger the class events.

Parameters
----------
### `table`
Instance of `JSONMetaTable` class - can be used to call public controls on the table instance.

### `meta`
Metadata for column this renderer is attached to - pulled from objects in `JSONMetaTable.metadata`.

### `value`
Value for renderer's editor to parse.

### `displayValue`
Value for renderer's display to format. `value` is used if `displayValue` isn't provided.

Controls
--------
Public control methods to be accessed on an instance are as follows:

### init
Initialise renderer instance - executes `render`, `setValue`, and `bindDisplay` methods.

### render
Render renderer instance - used to apply classes and structure HTML.

### toggleEditor
Toggle visibility between editor and display, based on provided `isVisible` parameter.
If `true`, editor is visible, else display will be visible.

### setValue
Set new renderer value - updates rendered display with formatted value and input value with parsed value.

### focus
Toggle editor visibility and give focus to editor input element.
If input element supports text selection, all text will be selected.

### blur
Toggle display visibility, set `BaseRenderer.initialValue` to new value, and reset `BaseRenderer.hasChanged`
to `false` to ensure event handlers checking for `hasChanged` state don't trigger again.

Events
------
This class triggers the following events:

### init:pre
Triggered before renderer instance initialisation.

### init:post
Triggered after renderer instance initialisation.

### render:pre
Triggered before renderer has rendered.

### render:post
Triggered after renderer has rendered.

### toggleEditor:pre
Triggered before editor/display visibility is toggled.
#### Receives
```javascript
{
    isVisible: isVisible // Visibility: true if editor is to be visible, false if display
}
```

### toggleEditor:post
Triggered after editor/display visibility is toggled.
#### Receives
```javascript
{
    isVisible: isVisible // Visibility: true if editor is visible, false if display
}
```

### setValue:pre
Triggered before new renderer value is set.
#### Receives
```javascript
{
    value:        value, // New value to be set
    displayValue: displayValue // New display value to be set
}
```

### setValue:post
Triggered after new renderer value is set.
#### Receives
```javascript
{
    value:        value, // Value that was set
    displayValue: displayValue // Display value that was set
}
```

### focus:pre
Triggered before editor visibility is toggled and given focus.

### focus:post
Triggered after editor visibility is toggled and given focus.

### blur:pre
Triggered before editor loses focus and display visibility is toggled.

### blur:post
Triggered after editor loses focus and display visibility is toggled.