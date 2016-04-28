Custom data types example
=========================
This example shows how to create a `JSONMetaTable` instance with a custom renderer for the `csvarray` data type.

This renderer displays and edits a simple array as a CSV. When the text value is updated, it is set in the table data as an array.

JavaScript
----------
```javascript
import JSONMetaTable, { BaseRenderer } from 'json-meta-table'

class CSVArrayRenderer extends BaseRenderer {
    constructor (table, meta, value) {
        super(table, meta, value)

        this.init()
    }

    formatValue (value) {
        return value.join(', ')
    }

    parseValue (value) {
        let result = (value.split)
            ? value.split(',')
            : value

        for (let index in result) {
            result[index] = result[index].trim()
        }

        return result
    }

    performSetValue (value) {
        this.value             = this.parseValue(value)
        this.input.value       = this.formatValue(this.value)
        this.display.innerHTML = this.formatValue(this.value)

        if (this.value !== this.initialValue) {
            this.hasChanged = true
        }
    }
}

let tableInstance = new JSONMetaTable('#basic-example-container', {}, {}, [], {}, {
    csvarray: CSVArrayRenderer
})

tableInstance.setMetadata([
    {
        name:  'csvarray',
        label: 'CSV array',
        type:  'csvarray'
    }
])

tableInstance.setData([
    {
        id: 1,
        values: {
            csvarray: ['value 1', 'value 2', 'value 3']
        }
    },{
        id: 2,
        values: {
            csvarray: ['value 2', 'value 3']
        }
    },{
        id: 3,
        values: {
            csvarray: ['value 1', 'value 2']
        }
    }
])
```

HTML
----
```html
<!doctype html>
<html>
  <head>
    <title>Custom data types example</title>
    <meta charset="utf-8" />
  </head>

  <body>
    <h1>Custom data types example</h1>

    <div id="custom-data-types-example-container"></div>
  </body>
</html>
```