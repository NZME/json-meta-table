![Travis Build](https://img.shields.io/travis/NZME/json-meta-table.svg)

JSON meta table
===============
A JSON-driven editable table component.

Components
----------
### Core
  - [JSONMetaTable](docs/JSONMetaTable.md)
  
### Filters
  - [BaseFilter](docs/filters/BaseFilter.md)
  - [TextFilter](docs/filters/TextFilter.md)
  - [SelectFilter](docs/filters/SelectFilter.md)
  - [CheckboxFilter](docs/filters/CheckboxFilter.md)

### Renderers
  - [BaseRenderer](docs/renderers/BaseRenderer.md)
  - [TextRenderer](docs/renderers/TextRenderer.md)
  - [NumberRenderer](docs/renderers/NumberRenderer.md)
  - [SelectRenderer](docs/renderers/SelectRenderer.md)
  - [CheckboxRenderer](docs/renderers/CheckboxRenderer.md)
  - [DateTimeRenderer](docs/renderers/DateTimeRenderer.md)

### Actions
  - [BaseAction](docs/actions/BaseAction.md)
  - [ButtonAction](docs/actions/ButtonAction.md)
  - [LinkAction](docs/actions/LinkAction.md)


Example
-------
```javascript
import JSONMetaTable from 'json-meta-table'

let tableInstance = new JSONMetaTable('#json-meta-table-container')

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
        name:     'age',
        label:    'Age',
        type:     'number'
    },{
        name:       'created_at',
        label:      'Created',
        type:       'datetime',
        info:       'Date created in the system'
        filterable: false
    },{
        name:     'is_active',
        label:    'Active',
        type:     'checkbox'
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