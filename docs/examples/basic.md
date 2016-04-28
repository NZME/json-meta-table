Basic example
=============
This example shows how to create a basic `JSONMetaTable` instance with some static metadata/data.

JavaScript
----------
```javascript
import JSONMetaTable from 'json-meta-table'

let tableInstance = new JSONMetaTable('#basic-example-container')

tableInstance.setMetadata([
    {
        name:     'id',
        label:    'ID',
        type:     'number',
        editable: false
    },{
        name:     'name',
        label:    'Name',
        type:     'text'
    },{
        name:     'gender',
        label:    'Gender',
        type:     'select',
        options:  [
            {
                value: 'm',
                label: 'Male'
            },{
                value: 'f',
                label: 'Female'
            }
        ]
    },{
        name:       'age',
        label:      'Age',
        type:       'number'
    },{
        name:       'created_at',
        label:      'Created',
        type:       'datetime',
        info:       'Date created in the system'
        filterable: false
    },{
        name:       'is_active',
        label:      'Active',
        type:       'checkbox'
    }
])

tableInstance.setData([
    {
        id: 40531,
        values: {
            id:         40531,
            name:       'Jose Garcia',
            gender:     'm',
            age:        25,
            created_at: '2016-04-06T19:52:48.251676Z',
            is_active:  true
        }
    },{
        id: 40532,
        values: {
            id:         40532,
            name:       'Raymond Mitchell',
            gender:     'm',
            age:        34,
            created_at: '2016-04-06T20:52:48.251676Z',
            is_active:  true
        }
    },{
        id: 40533,
        values: {
            id:         40533,
            name:       'Jane Sloane',
            gender:     'f',
            age:        43,
            created_at: '2016-04-06T23:52:48.251676Z',
            is_active:  true
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
    <title>Basic example</title>
    <meta charset="utf-8" />
  </head>

  <body>
    <h1>Basic example</h1>

    <div id="basic-example-container"></div>
  </body>
</html>
```