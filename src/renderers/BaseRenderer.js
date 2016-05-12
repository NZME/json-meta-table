import EventAbstractClass from 'event-abstract-class'

/**
 * Base renderer abstract class
 */
export default class BaseRenderer extends EventAbstractClass {
    // region Constructor

    /**
     * Constructor
     *
     * @param {JSONMetaTable} table        Table instance
     * @param {Object}        meta         Column metadata
     * @param {*}             value        Value to set on editor
     * @param {*}             displayValue Value to display
     */
    constructor (table, meta, value, displayValue) {
        super()

        displayValue = (displayValue !== undefined)
            ? displayValue
            : value

        this.table               = table
        this.meta                = meta
        this.value               = null
        this.displayValue        = null
        this.initialValue        = value
        this.initialDisplayValue = displayValue
        this.hasChanged          = false

        this.container = document.createElement('div')
        this.editor    = document.createElement('div')
        this.display   = document.createElement('div')
        this.input     = document.createElement('input')

        this.inputBlurHandler = this.handleInputBlur.bind(this)
    }

    // endregion Constructor

    // region Helpers

    /**
     * Parse value for saving
     *
     * @param value
     * @returns {*}
     */
    parseValue (value) {
        return value
    }

    /**
     * Format value for display
     *
     * @param value
     * @returns {*}
     */
    formatValue (value) {
        return new String(value)
    }

    // endregion Helpers

    // region Event binders

    /**
     * Bind functionality to display element events
     */
    bindDisplay () {
        if (this.meta.editable) {
            this.display.addEventListener('click', this.handleDisplayClick.bind(this))
        }
    }

    /**
     * Bind functionality to input blur event
     */
    bindInputBlur () {
        this.input.addEventListener('blur', this.inputBlurHandler)
    }

    /**
     * Unbind functionality from input blur event
     */
    unbindInputBlur () {
        this.input.removeEventListener('blur', this.inputBlurHandler)
    }

    // endregion Event binders

    // region Event handlers

    /**
     * Handle display element click event
     *
     * @param evt
     */
    handleDisplayClick (evt) {
        this.focus()
    }

    /**
     * Handle input element blur event
     *
     * @param evt
     */
    handleInputBlur (evt) {
        if (this.input.checkValidity()) {
            this.setValue(this.input.value)
        } else {
            this.setValue(this.initialValue, this.initialDisplayValue)
        }

        this.blur()
    }

    // endregion Event handlers

    // region Actions

    /**
     * Perform init action
     */
    performInit () {
        this.render()
        this.setValue(this.initialValue, this.initialDisplayValue)
        this.bindDisplay()
    }

    /**
     * Perform render action
     */
    performRender () {
        this.container.classList.add('json-meta-table-renderer')
        this.editor.classList.add('json-meta-table-editor')
        this.display.classList.add('json-meta-table-display')

        this.editor.appendChild(this.input)
        this.container.appendChild(this.display)
    }

    /**
     * Perform toggleEditor action
     *
     * @param {boolean} isEditing If true, editor will be toggled, otherwise display will be toggled
     */
    performToggleEditor (isEditing) {
        if (isEditing) {
            this.display = this.container.removeChild(this.display)
            this.container.appendChild(this.editor)
        } else {
            this.editor = this.container.removeChild(this.editor)
            this.container.appendChild(this.display)
        }
    }

    /**
     * Perform setValue action
     *
     * @param {*} value        New value to set
     * @param {*} displayValue New display value to set
     */
    performSetValue (value, displayValue = null) {
        displayValue = (displayValue)
            ? displayValue
            : value

        this.value             = this.parseValue(value)
        this.displayValue      = this.formatValue(displayValue)
        this.input.value       = new String(this.value)
        this.display.innerHTML = this.displayValue

        if (this.value !== this.initialValue) {
            this.hasChanged = true
        }
    }

    /**
     * Perform focus action
     */
    performFocus () {
        if (!this.meta.editable) {
            return
        }

        this.toggleEditor(true)

        this.input.focus()

        if (this.input.setSelectionRange) {
            this.input.setSelectionRange(0, this.input.value.length)
        }

        this.bindInputBlur()
    }

    /**
     * Perform blur action
     */
    performBlur () {
        this.toggleEditor(false)
        this.unbindInputBlur()

        this.initialValue        = this.value
        this.initialDisplayValue = this.displayValue
        this.hasChanged          = false
    }

    // endregion Actions

    // region Controls

    /**
     * Initialise renderer
     *
     * @fires BaseRenderer#init:pre
     * @fires BaseRenderer#init:post
     */
    init () {
        this.trigger('init:pre')

        this.performInit()

        this.trigger('init:post')
    }

    /**
     * Render HTML elements
     *
     * @fires BaseRenderer#render:pre
     * @fires BaseRenderer#render:post
     */
    render () {
        this.trigger('render:pre')

        this.performRender()

        this.trigger('render:post')
    }

    /**
     * Toggle editor/display
     *
     * @param {boolean} isVisible If true, editor will be toggled, otherwise display will be toggled
     * @fires BaseRenderer#toggleEditor:pre
     * @fires BaseRenderer#toggleEditor:post
     */
    toggleEditor (isVisible) {
        this.trigger('toggleEditor:pre', {
            isVisible: isVisible
        })

        this.performToggleEditor(isVisible)

        this.trigger('toggleEditor:post', {
            isVisible: isVisible
        })
    }

    /**
     * Set new value
     *
     * @param {*} value        New value to set
     * @param {*} displayValue New display value to set
     * @fires BaseRenderer#setValue:pre
     * @fires BaseRenderer#setValue:post
     */
    setValue (value, displayValue = null) {
        this.trigger('setValue:pre', {
            newValue:        this.parseValue(value),
            newDisplayValue: displayValue
        })

        this.performSetValue(value, displayValue)

        this.trigger('setValue:post', {
            value:        this.value,
            displayValue: this.displayValue
        })
    }

    /**
     * Set focus to editor input and remove display
     *
     * @fires BaseRenderer#focus:pre
     * @fires BaseRenderer#focus:post
     */
    focus () {
        this.trigger('focus:pre')

        this.performFocus()

        this.trigger('focus:post')
    }

    /**
     * Blur input and return to display
     *
     * @fires BaseRenderer#blur:pre
     * @fires BaseRenderer#blur:post
     */
    blur () {
        this.trigger('blur:pre')

        this.performBlur()

        this.trigger('blur:post')
    }

    // endregion Controls
}