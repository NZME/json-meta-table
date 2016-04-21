import EventAbstractClass from 'event-abstract-class'

const OPTIONS = {
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

/**
 * Base action abstract class
 */
export default class BaseAction extends EventAbstractClass {
    // region Constructor

    /**
     * Constructor
     *
     * @param {Object} row     Table row object
     * @param {Object} options Action options
     */
    constructor (row, options = {}) {
        super()

        this.row     = row
        this.options = Object.assign({}, OPTIONS, options)

        this.button = document.createElement('button')
    }

    // endregion Constructor
    
    // region Helpers

    /**
     * Bind functionality to elements
     */
    bind () {
        this.button.addEventListener('click', this.handleButtonClick.bind(this))
    }
    
    // endregion Helpers
    
    // region Event handlers

    /**
     * Handle button element click event
     *
     * @param {MouseEvent} evt
     */
    handleButtonClick (evt) {
        this.click()
    }
    
    // endregion Event handlers

    // region Actions

    /**
     * Perform init action
     */
    performInit () {
        this.render()
        this.bind()
    }

    /**
     * Perform render action
     */
    performRender () {
        this.button.type      = 'button'
        this.button.title     = this.options.title
        this.button.className = this.options.className
        this.button.innerHTML = `<span>${this.options.text}</span>`
    }

    /**
     * Perform click action
     */
    performClick () {
        if (this.options.event) {
            this.options.event(this.row)
        }
    }

    // endregion Actions

    // region Controls

    /**
     * Initialise action
     *
     * @fires BaseAction#init:pre
     * @fires BaseAction#init:post
     */
    init () {
        this.trigger('init:pre')

        this.performInit()

        this.trigger('init:post')
    }

    /**
     * Render action
     *
     * @fires BaseAction#render:pre
     * @fires BaseAction#render:post
     */
    render () {
        this.trigger('render:pre')

        this.performRender()

        this.trigger('render:post')
    }

    /**
     * Click the action button
     *
     * @fires BaseAction#click:pre
     * @fires BaseAction#click:post
     */
    click () {
        this.trigger('click:pre')

        this.performClick()

        this.trigger('click:post')
    }

    // endregion Controls
}