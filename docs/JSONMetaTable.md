JSONMetaTable
=============
Primary component class - used to create table instances with an array of features.

Metadata format
---------------
Metadata is provided to JSONMetaTable instances as an array of associative objects,
each object gets merged with the core module defaults:
```javascript
{
    name:            '',
    label:           '',
    type:            'text',
    info:            null,
    options:         null,
    editable:        true,
    sortable:        true,
    filterable:      true,
    renderer:        undefined,
    filter:          undefined,
    rendererOptions: {}
}
```
  - `name`: Column name (unique identifier)
  - `label`: Column label - used to display in the <th> element
  - `type`: Type of data - used to determine the type of renderer to use for displaying/editing
  - `info`: Column info to display as <th> element's title attribute
  - `options`: Array of associative objects to use in combination with 'select' type - object format: { value: '', label: '' }
  - `editable`: Column is editable
  - `sortable`: Column is sortable
  - `filterable`: Column is filterable - if false, this column is skipped in all filter searches and will have no filter in its `<th>` element
  - `renderer`: Specific renderer to use for this column - overrides type-based renderer selection - must extend `BaseRenderer` abstract class
  - `filter`: Specific filter to use for this column - overrides type-based filter selection - must extend `BaseFilter` abstract class
  - `rendererOptions`: Options for renderer instance to use

Data format
-----------
Data is provided to JSONMetaTable instances as an array of associative objects
  - `id`: Unique identifier for row
  - `trClassName`: Class to add to row `<tr>` element
  - `values`: Associative object of row values - values are only rendered if included in the table's metadata, in the order defined by the metadata
  - `displayValues`: Associative object of row values specific to renderer display only

Parameters
----------
### `container`
Container to append JSON meta table instance's `<table>` element to - can provide an HTML node, or string to be used in `document.querySelector()`.

### `options`
Table-specific options.

  - `tableClass`: Class added to `<table>` element
  - `thContainerClass`: Class added to the text container inside `<th>` elements
  - `hasInfoClass`: Class added to `<th>` elements for columns that have info metadata
  - `sortableClass`: Class added to `<th>` elements for columns that are sortable
  - `sortAscClass`: Class added to `<th>` element for column currently being sorted in ascending order
  - `sortDescClass`: Class added to `<th>` element for column currently being sorted in descending order
  - `filterableClass`: Class added to `<th>` elements for columns that are filterable
  - `actionsContainerClass`: Class added to the container element the row actions are appended to
  - `deleteActionClass`: Class added to the delete action button
  - `inlineEditing`: Enable inline editing of row data
  - `inlineDeleting`: Enable inline deleting of rows
  - `columnFiltering`: Enable column filtering, using filter controls in the `<th>` elements

### `filterOptions`
Options that are passed to filter instances used for column-specific filtering.

  - `containerClass`: Class added to filter container element
  - `buttonClass`: Class added to `<button>` element
  - `inputContainerClass`: Class added to the `<input>` container element
  - `inputHasValueClass`: Class added to the container element when the filter has a value set
  - `emptyOptionText`: Text for empty option text for filters using the `<select>` element
  - `trueOptionText`: Text for `CheckboxFilter` filter type `true` option
  - `falseOptionText`: Text for `CheckboxFilter` filter type `false` option
  - `placeholderText`: Text to use for `<input>` `placeholder` attribute
  - `typingUpdateDelay`: Time in milliseconds to delay updating the filter value when typing
  
### `actions`
Array of associative objects to use for row action generation.

Available object properties:

  - `name`: Name of action - used as a unique identifier when defining action in row object
  - `type`: Action type - string value used to get an action type from the `actionTypes` object
  - `text`: Text to append to action `<button>` element
  - `title`: Text to use for action `<button>` `title` attribute
  - `className`: Class to add to action `<button>` element
  - `event`: Function to trigger when action is clicked
  - `url`: URL to navigate to for `LinkAction` instances - can reference the `row` object. eg: `'/post/${row.values.id}/${row.values.slug}/'`
  - `isNewWindow`: Open `LinkAction` URL in new window (default `false`)
  - `windowName`: Name for `LinkAction` new window
  - `windowFeatures`: Features passed to `LinkAction` new window's windowFeatures parameter
  
### `filterTypes`
Associative object of filter types, referenced . Merged with core module defaults:
```javascript
{
    text:     TextFilter,
    select:   SelectFilter,
    checkbox: CheckboxFilter
}
```

### `rendererTypes`
Associative object of renderer types. Merged with core module defaults:
```javascript
{
    text:     TextRenderer,
    number:   NumberRenderer,
    select:   SelectRenderer,
    checkbox: CheckboxRenderer,
    datetime: DateTimeRenderer
}
```

### `actionTypes`
Associative object of action types. Merged with core module defaults:
```javascript
{
    button: ButtonAction,
    link:   LinkAction
}
```

Controls
--------
Public control methods to be accessed on an instance are as follows:

### setMetadata
Set table metadata and re-render table.

### setData
Set table data and re-render table.

### sortBy
Sort by provided `column` and `direction` parameters.

### filterByColumns
Filter data by provided associative object.

### filterBy
Filter data by provided `column` and `search` parameters.

### filter
Filter data by general text search, searching filterable columns.

### deleteRow
Delete row using provided `row` parameter. This can be the row id or row object.

Events
------
The class triggers the following events:

### updateRow:pre
Triggered before a row is updated when editing using the table's inline editing functionality.
#### Receives
```javascript
{
    row:             row,     // Row being edited
    meta:            meta,    // Row column metadata
    newValue:        newValue // New value to update to
    newDisplayValue: newDisplayValue // New display value to update to
}
```

### updateRow:post
Triggered after a row is updated when editing using the table's inline editing functionality.
#### Receives
```javascript
{
    row:  row,  // Row that was edited
    meta: meta, // Row column metadata
}
```

### renderBody:pre
Triggered before table body is rendered.

### renderBody:post
Triggered after table body is rendered.

### render:pre
Triggered before table is rendered.

### render:post
Triggered after table is rendered.

### setMetadata:pre
Triggered before new metadata is set.
#### Receives
```javascript
{
    newMetadata: newMetadata // New metadata to be set
}
```

### setMetadata:post
Triggered after new metadata is set.

### setData:pre
Triggered before new data is set.
#### Receives
```javascript
{
    newData: newData // New data to be set
}
```

### setData:post
Triggered after new data is set.

### sortBy:pre
Triggered before table is sorted by column.
#### Receives
```javascript
{
    column: column,      // Column to sort by
    direction: direction // Direction to sort column
}
```

### sortBy:post
Triggered after table is sorted by column.
#### Receives
```javascript
{
    column: column,      // Column sorted by
    direction: direction // Direction column was sorted
}
```

### filterByColumns:pre
Triggered before table data is filtered by multiple columns.
#### Receives
```javascript
{
    values: values // New values to filter data by
}
```

### filterByColumns:post
Triggered after table data is filtered by multiple columns.
#### Receives
```javascript
{
    values: values // Values data was filtered by
}
```

### filterBy:pre
Triggered before table data is filtered by column.
#### Receives
```javascript
{
    column: column, // Column to filter data by
    search: search  // Search value to filter data by
}
```

### filterBy:post
Triggered after table data is filtered by column.
#### Receives
```javascript
{
    column: column, // Column data was filtered by
    search: search  // Search value data was filtered by
}
```

### filter:pre
Triggered before table data is filtered by general search string.
#### Receives
```javascript
{
    search: search // Search value to filter data by
}
```

### filter:post
Triggered after table data is filtered by general search string.
#### Receives
```javascript
{
    search: search // Search value data was filtered by
}
```

### deleteRow:pre
Triggered before a row is deleted from table data.
#### Receives
```javascript
{
    id: id // Row id
}
```

### deleteRow:post
Triggered after a row is deleted from table data.
#### Receives
```javascript
{
    id: id // Row id
}
```