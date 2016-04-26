BaseAction
==========
Abstract class for action type classes to extend.

Notes
-----
  - It is recommended to override the methods in the 'actions' code region, rather than those
    in the 'controls' region, to avoid having to manually trigger the class events.

Parameters
----------
### `row`
Object from `JSONMetaTable.data` for the row the actions are being rendered in.

### `options`
Options for instance of action. Merged with defaults:
```javascript
{
    name:           '',
    type:           '',
    text:           '',
    title:          '',
    className:      'json-meta-table-action',
    event:          (row) => {},
    url:            '',
    isNewWindow:    false,
    windowName:     undefined,
    windowFeatures: undefined
}
```
  - `name`: Name of action - used as a unique identifier when defining action in row object
  - `type`: Action type - string value used to get an action type from `JSONMetaTable.actionTypes` object
  - `text`: Text to append to action `<button>` element
  - `title`: Text to use for action `<button>` `title` attribute
  - `className`: Class to add to action `<button>` element
  - `event`: Function to trigger when action is clicked
  - `url`: URL to navigate to for `LinkAction` instances - can reference the `row` object. eg: `'/post/${row.values.id}/${row.values.slug}/'`
  - `isNewWindow`: Open `LinkAction` URL in new window (default `false`)
  - `windowName`: Name for `LinkAction` new window
  - `windowFeatures`: Features passed to `LinkAction` new window's windowFeatures parameter

Controls
--------
Public control methods to be accessed on an instance are as follows:

### init
Initialise filter instance - executes `render` and `bind` methods.

### render
Render filter instance - used to apply classes and structure HTML.

### click
Perform action 'click'. Called in action's button element `click` event, and can be called programmatically.

Events
------
This class triggers the following events:

### init:pre
Triggered before action instance initialisation.

### init:post
Triggered after action instance initialisation.

### render:pre
Triggered before action has rendered.

### render:post
Triggered after action has rendered.

## click:pre
Triggered before action has been clicked, either from clicking the button element or programmatically.

## click:post
Triggered after action has been clicked, either from clicking the button element or programmatically.