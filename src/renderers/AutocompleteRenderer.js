import { BaseRenderer } from 'json-meta-table'
import Fetch from 'fetch-class'

const
    OPTIONS = {
        resultListClass:       'json-meta-table-autocomplete-results',
        typingUpdateDelay:     500,
        maxResults:            10,
        limitResults:          true,
        remoteData:            false,
        remoteDataUrl:         '',
        remoteDataParser:      undefined,
        remoteDataSearchParam: 'search'
    },
    remote = new Fetch('', { credentials: 'same-origin' })

export default class AutocompleteRenderer extends BaseRenderer {
    // region Constructor

    /**
     * @inheritdoc
     */
    constructor (table, meta, value, displayValue, options = {}) {
        super(table, meta, value, displayValue)

        this.options     = Object.assign({}, OPTIONS, this.options, options)
        this.results     = []
        this.resultsList = document.createElement('ul')

        this.init()

        this.input.addEventListener('keyup', this.handleInputKeyup.bind(this))
    }

    // endregion Constructor

    // region Helpers

    /**
     * Parse response data and return parsed array
     *
     * @param response
     * @returns {Array}
     */
    parseResponse (response) {
        let results = []

        for (let option of response.results) {
            results.push(option)
        }

        return results
    }

    // endregion Helpers

    // region Event handlers

    /**
     * Handle input element keyup event
     *
     * @param evt
     */
    handleInputKeyup (evt) {
        if (this.typingUpdateTimeout) {
            window.clearTimeout(this.typingUpdateTimeout)
        }

        this.typingUpdateTimeout = window.setTimeout(() => {
            if (this.options.remoteData) {
                this.performRemoteResultSearch(this.input.value)
            } else {
                this.performOptionsResultSearch(this.input.value)
            }
        }, this.options.typingUpdateDelay)
    }

    /**
     * @inheritdoc
     */
    handleInputBlur (evt) {
        this.blur()
    }

    /**
     * Handle result item element mousedown event
     *
     * @param {Object}     result Result item object
     * @param {MouseEvent} evt    Event
     */
    handleResultMousedown (result, evt) {
        this.setValue(result.value, result.label)
    }

    /**
     * Handle remote result search request success event
     *
     * @param {Object} response Response object
     */
    handleRemoteResultSearchSuccess (response) {
        let results  = []
        this.results = []

        if (response.response) {
            results = (this.options.remoteDataParser)
                ? this.options.remoteDataParser(response.response)
                : this.parseResponse(response.response)
        }

        for (let result of results) {
            this.results.push(result)

            if (
                this.options.limitResults &&
                (this.results.length === this.options.maxResults)
            ) {
                break
            }
        }

        this.renderResultsList()
    }

    // endregion Event handlers

    // region Renderers

    /**
     * Render results list
     */
    renderResultsList () {
        let noResultsLi

        this.resultsList.innerHTML = ''

        this.results.map((result) => {
            let li = document.createElement('li')

            li.innerHTML     = `<span>${result.label}</span>`
            li.dataset.value = result.value

            li.addEventListener('mousedown', this.handleResultMousedown.bind(this, result))

            this.resultsList.appendChild(li)
        })

        if (this.results.length < 1) {
            noResultsLi           = document.createElement('li')
            noResultsLi.innerHTML = 'No results found.'

            this.resultsList.appendChild(noResultsLi)
        }
    }

    // endregion Renderers

    // region Actions

    /**
     * @inheritdoc
     */
    performRender () {
        super.performRender()

        this.resultsList.className = this.options.resultListClass

        this.editor.appendChild(this.resultsList)
    }

    /**
     * Perform simple text search on options
     *
     * @param {String} search Search query
     */
    performOptionsResultSearch (search) {
        this.results = []

        for (let option of this.meta.options) {
            if (
                (new String(option.value).toLowerCase().indexOf(search.toLowerCase()) >= 0) ||
                (option.label.toLowerCase().indexOf(search.toLowerCase()) >= 0)
            ) {
                this.results.push(option)
            }

            if (
                this.options.limitResults &&
                (this.results.length === this.options.maxResults)
            ) {
                break
            }
        }

        this.renderResultsList()
    }

    /**
     * Perform remote result search
     *
     * @param {String} search Search query
     */
    performRemoteResultSearch (search) {
        let data = {}

        data[this.options.remoteDataSearchParam] = search

        remote.get(this.options.remoteDataUrl, this.handleRemoteResultSearchSuccess.bind(this), {
            data: data
        })
    }

    // endregion Actions
}