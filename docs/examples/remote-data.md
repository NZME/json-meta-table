Remote data example
===================
This example shows how to create a `JSONMetaTable` instance that loads data from a remote
API source and persists row changes/deletes using event handlers.

You could also optionally listen to `JSONMetaTable` filter/sort events and trigger a new
fetch with extra query parameters.

JavaScript
----------
```javascript
import JSONMetaTable from 'json-meta-table'

let tableInstance = new JSONMetaTable('#remote-data-example-container')

/**
 * Handle table updateRow:post event - persist row changes using API
 */
tableInstance.on('updateRow:post', (args) => {
    fetch(`/api/put/url/${args.row.id}/`, {
        method: 'PUT',
        body:   JSON.stringify(args.row)
    })
        .then((response) => {
            return response.json()
        })
        .then((response) => {
            // Success
        })
        .catch((error) => {
            console.error(error)
        })
})

/**
 * Handle table deleteRow:post event - persist row delete using API
 */
tableInstance.on('deleteRow:post', (args) => {
    fetch(`/api/delete/url/${args.row.id}/`, {
        method: 'DELETE'
    })
        .then((response) => {
            return response.json()
        })
        .then((response) => {
            // Success
        })
        .catch((error) => {
            console.error(error)
        })
})

/**
 * Fetch remote data and add to table
 */
fetch('/api/get/url/')
    .then((response) => {
        return response.json()
    })
    .then((response) => {
        tableInstance.setMetadata(response.metadata)
        tableInstance.setData(response.data)
    })
    .catch((error) => {
        console.error(error)
    })
```

HTML
----
```html
<!doctype html>
<html>
  <head>
    <title>Remote data example</title>
    <meta charset="utf-8" />
  </head>

  <body>
    <h1>Remote data example</h1>

    <div id="remote-data-example-container"></div>
  </body>
</html>
```