BaseFilter
==========
Abstract class for filter type classes to extend.

Parameters
----------
### `meta`
Metadata for column this filter is attached to.

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