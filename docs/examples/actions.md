Actions example
===============
This example shows how to create a `JSONMetaTable` instance with some actions to display in the actions column per row.

JavaScript
----------
```javascript
import JSONMetaTable from 'json-meta-table'

let tableInstance = new JSONMetaTable('#actions-example-container', {}, {}, [
    {
        name:  'view',
        type:  'link',
        text:  'View',
        title: 'View this row',
        url:   '/view/${row.values.id}/'
    },{
        name:  'open',
        type:  'button',
        text:  'Open',
        title: 'Open this row'
        event: (row) => {
            // Perform open functionality
        }
    }
])

tableInstance.setMetadata([...])
tableInstance.setData([...])
```

HTML
----
```html
<!doctype html>
<html>
  <head>
    <title>Actions example</title>
    <meta charset="utf-8" />
  </head>

  <body>
    <h1>Actions example</h1>

    <div id="actions-example-container"></div>
  </body>
</html>
```