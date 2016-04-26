BaseFilter
==========
Abstract class for filter type classes to extend.

Notes
-----
  - It is recommended to override the methods in the 'actions' code region, rather than those
    in the 'controls' region, to avoid having to manually trigger the class events.

Parameters
----------
### `meta`
Metadata for column this filter is attached to - pulled from objects in `JSONMetaTable.metadata`.

### `options`
Options for instance of filter. Merged with defaults:
```javascript
{
    containerClass:      'json-meta-table-filter',
    buttonClass:         'json-meta-table-filter-button',
    inputContainerClass: 'json-meta-table-filter-input',
    inputHasValueClass:  'json-meta-table-filter-has-value',
    emptyOptionText:     'Select one',
    trueOptionText:      'True',
    falseOptionText:     'False',
    placeholderText:     'Search',
    typingUpdateDelay:   500
}
```
  - `containerClass`: Class added to filter container element
  - `buttonClass`: Class added to `<button>` element
  - `inputContainerClass`: Class added to the `<input>` container element
  - `inputHasValueClass`: Class added to the container element when the filter has a value set
  - `emptyOptionText`: Text for empty option text for filters using the `<select>` element
  - `trueOptionText`: Text for `CheckboxFilter` filter type `true` option
  - `falseOptionText`: Text for `CheckboxFilter` filter type `false` option
  - `placeholderText`: Text to use for `<input>` `placeholder` attribute
  - `typingUpdateDelay`: Time in milliseconds to delay updating the filter value when typing

Controls
--------
Public control methods to be accessed on an instance are as follows:

### init
Initialise filter instance - executes `render` and `bind` methods.

### render
Render filter instance - used to apply classes and structure HTML.

### toggleInput
Toggle visibility between input and button display, based on provided `isVisible` parameter.
If `true`, input is visible, else button will be visible.

### setValue
Set new filter value and toggle `options.inputHasValueClass` class on container element if a value is set.

Events
------
This class triggers the following events:

### init:pre
Triggered before filter instance initialisation.

### init:post
Triggered after filter instance initialisation.

### render:pre
Triggered before filter has rendered.

### render:post
Triggered after filter has rendered.

### toggleInput:pre
Triggered before input/button visibility is toggled.
#### Receives
```javascript
{
    isVisible: isVisible // Visibility: true if input is to be visible, false if button
}
```

### toggleInput:post
Triggered after input/button visibility is toggled.
#### Receives
```javascript
{
    isVisible: isVisible // Visibility: true if input is visible, false if button
}
```

### setValue:pre
Triggered before new filter value is set.
### Receives
```javascript
{
    value: value // New value to be set
}
```

### setValue:post
Triggered after new filter value is set.
### Receives
```javascript
{
    value: value // New value that was set
}
```