import EventAbstractClass from 'event-abstract-class'

import BaseFilter from './filters/BaseFilter'
import TextFilter from './filters/TextFilter'
import SelectFilter from './filters/SelectFilter'
import CheckboxFilter from './filters/CheckboxFilter'

import BaseRenderer from './renderers/BaseRenderer'
import TextRenderer from './renderers/TextRenderer'
import NumberRenderer from './renderers/NumberRenderer'
import SelectRenderer from './renderers/SelectRenderer'
import CheckboxRenderer from './renderers/CheckboxRenderer'
import DateTimeRenderer from './renderers/DateTimeRenderer'

import BaseAction from './actions/BaseAction'
import ButtonAction from './actions/ButtonAction'
import LinkAction from './actions/LinkAction'

export {
    BaseFilter,
    TextFilter,
    SelectFilter,
    CheckboxFilter,

    BaseRenderer,
    TextRenderer,
    NumberRenderer,
    SelectRenderer,
    CheckboxRenderer,
    DateTimeRenderer,

    BaseAction,
    ButtonAction,
    LinkAction
}

const
    OPTIONS = {
        tableClass:            'json-meta-table',
        thContainerClass:      'json-meta-table-header',
        hasInfoClass:          'json-meta-table-has-info',
        sortableClass:         'json-meta-table-sortable',
        sortAscClass:          'json-meta-table-sort-asc',
        sortDescClass:         'json-meta-table-sort-desc',
        filterableClass:       'json-meta-table-filterable',
        actionsContainerClass: 'json-meta-table-actions',
        deleteActionClass:     'json-meta-table-action-delete',

        inlineEditing:   true,
        inlineDeleting:  true,
        columnFiltering: true
    },

    METADATA = {
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
    },

    FILTERS = {
        text:     TextFilter,
        select:   SelectFilter,
        checkbox: CheckboxFilter
    },

    RENDERERS = {
        text:     TextRenderer,
        number:   NumberRenderer,
        select:   SelectRenderer,
        checkbox: CheckboxRenderer,
        datetime: DateTimeRenderer
    },

    ACTIONS = {
        button: ButtonAction,
        link:   LinkAction
    }

/**
 * JSON meta table class
 */
export default class JSONMetaTable extends EventAbstractClass {
    // region Constructor

    /**
     * Constructor
     *
     * @param {HTMLElement|String} container     Container to insert table into
     * @param {Object}             options       Table options
     * @param {Object}             filterOptions Filter options
     * @param {Array}              actions       Table row actions
     * @param {Object}             filterTypes   Custom filters
     * @param {Object}             rendererTypes Custom renderers
     * @param {Object}             actionTypes   Custom action types
     */
    constructor (
        container,
        options       = {},
        filterOptions = {},
        actions       = [],
        filterTypes   = {},
        rendererTypes = {},
        actionTypes   = {}
    ) {
        super()

        this.completeData = []
        this.data         = []
        this.metadata     = []

        this.sorting   = {
            column:    null,
            direction: null
        }
        this.filtering = {}

        this.options       = Object.assign({}, OPTIONS, options)
        this.filterOptions = filterOptions
        this.actions       = actions
        this.filters       = Object.assign({}, FILTERS, filterTypes)
        this.renderers     = Object.assign({}, RENDERERS, rendererTypes)
        this.actionTypes   = Object.assign({}, ACTIONS, actionTypes)

        this.container = (typeof container === 'string')
            ? document.querySelector(container)
            : container

        if (this.options.inlineDeleting) {
            this.actions.push({
                name:      'delete',
                type:      'button',
                text:      'Delete',
                title:     'Delete this row',
                className: this.options.deleteActionClass,
                event:     this.handleDeleteActionClick.bind(this)
            })
        }
    }

    // endregion Constructor

    // region Helpers

    /**
     * Get meta by column name
     *
     * @param {String} columnName
     * @returns {Object}
     */
    getMetaByColumnName (columnName) {
        return this.metadata.find((meta) => {
            return (meta.name === columnName)
        })
    }

    // endregion Helpers

    // region Event handlers

    /**
     * Handle sortable table header element click event
     *
     * @param {Object}     meta Column meta
     * @param {MouseEvent} evt  Event object
     */
    handleSortableHeadClick (meta, evt) {
        let direction = (
            (this.sorting.column === meta.name) &&
            (this.sorting.direction === 'asc')
        )
            ? 'desc'
            : 'asc'

        this.sortBy(meta.name, direction)
    }

    /**
     * Handle BaseFilter setValue:post event
     *
     * @param {Object} meta Header meta
     */
    handleFilterPostSetValue (meta) {
        this.filterBy(meta.name, meta.filter.value)
    }

    /**
     * Handle renderer setValue:post event
     *
     * @param {Object}       row      Row data
     * @param {Object}       meta     Column meta
     * @param {BaseRenderer} renderer Renderer instance
     * @fires JSONMetaTable#updateRow:pre
     * @fires JSONMetaTable#updateRow:post
     */
    handleRendererPostSetValue (row, meta, renderer) {
        if (renderer.hasChanged) {
            this.trigger('updateRow:pre', {
                row:             row,
                meta:            meta,
                newValue:        renderer.value,
                newDisplayValue: renderer.displayValue
            })

            if (!row.displayValues) {
                row.displayValues = {}
            }

            row.values[renderer.meta.name]        = renderer.value
            row.displayValues[renderer.meta.name] = renderer.displayValue

            this.trigger('updateRow:post', {
                row:  row,
                meta: meta
            })
        }
    }

    /**
     * Handle delete action click event
     *
     * @param {Object} row Row object to delete
     */
    handleDeleteActionClick (row) {
        this.deleteRow(row)
    }

    // endregion Event handlers

    // region Renderers

    /**
     * Render table headers
     *
     * @fires JSONMetaTable#renderHead:pre
     * @fires JSONMetaTable#renderHead:post
     */
    renderHead () {
        this.trigger('renderHead:pre')

        this.theadRow.innerHTML = ''

        this.metadata.map((meta) => {
            meta.th          = document.createElement('th')
            meta.thContainer = document.createElement('div')

            meta.thContainer.className = this.options.thContainerClass
            meta.thContainer.innerHTML = `<span>${meta.label}</span>`

            meta.th.appendChild(meta.thContainer)

            if (meta.info) {
                meta.th.classList.add(this.options.hasInfoClass)
                meta.th.title = meta.info
            }

            if (meta.sortable) {
                meta.th.classList.add(this.options.sortableClass)
                meta.thContainer.addEventListener('click', this.handleSortableHeadClick.bind(this, meta))
            }

            if (meta.filterable && this.options.columnFiltering) {
                meta.th.classList.add(this.options.filterableClass)

                meta.th.appendChild(meta.filter.container)
            }

            this.theadRow.appendChild(meta.th)
        })

        if (this.actions.length > 0) {
            this.theadRow.appendChild(document.createElement('th'))
        }

        this.trigger('renderHead:post')
    }

    /**
     * Render table body
     *
     * @fires JSONMetaTable#renderBody:pre
     * @fires JSONMetaTable#renderBody:post
     */
    renderBody () {
        this.trigger('renderBody:pre')

        this.tbody.innerHTML = ''

        this.data.map((row) => {
            row.tr        = document.createElement('tr')
            row.cells     = {}
            row.renderers = {}

            if (row.trClassName) {
                row.tr.className = row.trClassName
            }

            this.metadata.map((meta) => {
                let displayValue = (row.displayValues && row.displayValues[meta.name])
                    ? row.displayValues[meta.name]
                    : undefined

                row.cells[meta.name]     = document.createElement('td')
                row.renderers[meta.name] = new meta.renderer(this, meta, row.values[meta.name], displayValue)

                row.renderers[meta.name].on('setValue:post', this.handleRendererPostSetValue.bind(this, row, meta, row.renderers[meta.name]))

                row.cells[meta.name].appendChild(row.renderers[meta.name].container)
                row.tr.appendChild(row.cells[meta.name])
            })

            if (this.actions.length > 0) {
                let actionsContainer = document.createElement('div')

                row.actions = {}
                row.cells.actions = document.createElement('td')

                actionsContainer.className = this.options.actionsContainerClass

                this.actions.map((action) => {
                    row.actions[action.name] = new this.actionTypes[action.type](row, action)
                    actionsContainer.appendChild(row.actions[action.name].button)
                })

                row.cells.actions.appendChild(actionsContainer)
                row.tr.appendChild(row.cells.actions)
            }

            this.tbody.appendChild(row.tr)
        })

        this.trigger('renderBody:post')
    }

    /**
     * Render table
     *
     * @fires JSONMetaTable#render:pre
     * @fires JSONMetaTable#render:post
     */
    render () {
        this.trigger('render:pre')

        if (!this.table) {
            this.table    = document.createElement('table')
            this.thead    = document.createElement('thead')
            this.tbody    = document.createElement('tbody')
            this.theadRow = document.createElement('tr')

            this.table.className = this.options.tableClass

            this.thead.appendChild(this.theadRow)
            this.table.appendChild(this.thead)
            this.table.appendChild(this.tbody)
            this.container.appendChild(this.table)
        }

        this.renderHead()
        this.renderBody()

        this.trigger('render:post')
    }

    // endregion Renderers

    // region Controls

    /**
     * Set table metadata
     *
     * @param {Object} metadata
     * @fires JSONMetaTable#setMetadata:pre
     * @fires JSONMetaTable#setMetadata:post
     */
    setMetadata (metadata) {
        this.trigger('setMetadata:pre', {
            newMetadata: metadata
        })

        this.metadata = metadata

        this.metadata.map((meta, index) => {
            this.metadata[index] = Object.assign({}, METADATA, meta)

            if (!this.metadata[index].renderer) {
                this.metadata[index].renderer = (this.renderers[this.metadata[index].type])
                    ? this.renderers[this.metadata[index].type]
                    : this.renderers.text
            }

            if (
                (this.options.columnFiltering) &&
                (this.metadata[index].filterable) &&
                (!this.metadata[index].filter)
            ) {
                this.metadata[index].filter = (this.filters[this.metadata[index].type])
                    ? new this.filters[this.metadata[index].type](meta, this.filterOptions)
                    : new this.filters.text(meta, this.filterOptions)

                if (this.filtering[meta.name]) {
                    this.metadata[index].filter.setValue(this.filtering[meta.name])
                }

                this.metadata[index].filter.on('setValue:post', this.handleFilterPostSetValue.bind(this, this.metadata[index]))
            }
        })

        if (this.table) {
            this.render()
        }

        this.trigger('setMetadata:post')
    }

    /**
     * Set table data
     *
     * @param {Object} data
     * @fires JSONMetaTable#setData:pre
     * @fires JSONMetaTable#setData:post
     */
    setData (data) {
        this.trigger('setData:pre', {
            newData: data
        })

        this.completeData = data
        this.data         = data

        if (!this.table) {
            this.render()
        } else {
            this.renderBody()
        }

        this.trigger('setData:post')
    }

    /**
     * Sort data by column
     *
     * @param {String} column    Column to sort by
     * @param {String} direction Direction to sort by
     * @fires JSONMetaTable#sortBy:pre
     * @fires JSONMetaTable#sortBy:post
     */
    sortBy (column, direction = 'asc') {
        this.trigger('sortBy:pre', {
            column:    column,
            direction: direction
        })

        let newData = this.data.slice(),
            order = (direction === 'asc')
                ? 1
                : -1

        newData.sort((a, b) => {
            let result = (a.values[column] < b.values[column])
                ? -1
                : (a.values[column] > b.values[column])
                    ? 1
                    : 0

            return (result * order)
        })

        this.sorting = {
            column:    column,
            direction: direction
        }

        this.data = newData
        this.renderBody()

        for (let meta of this.metadata) {
            meta.th.classList.remove(this.options.sortAscClass, this.options.sortDescClass)

            if (meta.name === column) {
                if (direction === 'asc') {
                    meta.th.classList.add(this.options.sortAscClass)
                } else {
                    meta.th.classList.add(this.options.sortDescClass)
                }
            }
        }

        this.trigger('sortBy:post', {
            column:    column,
            direction: direction
        })
    }

    /**
     * Filter data by column filter values
     *
     * @param {Object} values Associative object of column => value pairs
     * @fires JSONMetaTable#filterByColumns:pre
     * @fires JSONMetaTable#filterByColumns:post
     */
    filterByColumns (values) {
        let columns = Object.keys(values)

        for (let column of columns) {
            if (new String(values[column]) === '') {
                delete values[column]
            }
        }

        this.trigger('filterByColumns:pre', {
            values: values
        })

        columns = Object.keys(values)

        this.filtering = values

        this.data = this.completeData.filter((row) => {
            let matches = 0

            for (let column of columns) {
                let textSearch = new String(this.filtering[column]).toLowerCase(),
                    meta       = this.getMetaByColumnName(column)

                if (textSearch === '') {
                    matches += 1
                    continue
                }

                if (
                    (meta.options) &&
                    (row.values[column] === this.filtering[column])
                ) {
                    matches += 1
                } else if (new String(row.values[column]).toLowerCase().indexOf(textSearch) >= 0) {
                    matches += 1
                }
            }

            return (matches >= columns.length)
        })

        if (this.sorting.column) {
            this.sortBy(this.sorting.column, this.sorting.direction)
        } else {
            this.renderBody()
        }

        this.trigger('filterByColumns:post', {
            values: values
        })
    }

    /**
     * Filter data by column search terms
     *
     * @param column
     * @param search
     * @fires JSONMetaTable#filterBy:pre
     * @fires JSONMetaTable#filterBy:post
     */
    filterBy (column, search) {
        this.trigger('filterBy:pre', {
            column: column,
            search: search
        })

        this.filtering[column] = search

        this.filterByColumns(this.filtering)

        this.trigger('filterBy:post', {
            column: column,
            search: search
        })
    }

    /**
     * Filter data by general row search terms
     *
     * @param search
     * @fires JSONMetaTable#filter:pre
     * @fires JSONMetaTable#filter:post
     */
    filter (search) {
        this.trigger('filter:pre', {
            search: search
        })

        let textSearch = new String(search).toLowerCase()

        this.data = this.completeData.filter((row) => {
            if (textSearch === '') {
                return true
            }

            let isMatching = false

            for (let meta of this.metadata) {
                if (!meta.filterable) {
                    continue
                }

                let isOptionMatching = false,
                    isValueMatching  = (new String(row.values[meta.name]).toLowerCase().indexOf(textSearch) >= 0)

                if (meta.options) {
                    isOptionMatching = (meta.options.find((option) => {
                        return (
                            (option.value === row.values[meta.name]) &&
                            (option.label.toLowerCase().indexOf(textSearch) >= 0)
                        )
                    }) !== undefined)
                }

                if (isOptionMatching || isValueMatching) {
                    isMatching = true
                    break
                }
            }

            return isMatching
        })

        if (this.sorting.column) {
            this.sortBy(this.sorting.column, this.sorting.direction)
        } else {
            this.renderBody()
        }

        this.trigger('filter:post', {
            search: search
        })
    }

    /**
     * Delete row
     *
     * @param {*} row Row object or row id
     * @fires JSONMetaTable#deleteRow:pre
     * @fires JSONMetaTable#deleteRow:post
     */
    deleteRow (row) {
        let id = (row.id)
            ? row.id
            : row

        this.trigger('deleteRow:pre', {
            id: id
        })

        let data = this.completeData.filter((item) => {
            return (item.id !== id)
        })

        this.setData(data)

        this.trigger('deleteRow:post', {
            id: id
        })
    }

    // endregion Controls
}