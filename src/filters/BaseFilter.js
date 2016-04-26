import EventAbstractClass from 'event-abstract-class'

const OPTIONS = {
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

/**
 * Base filter abstract class
 */
export default class BaseFilter extends EventAbstractClass {
    // region Constructor

    /**
     * Constructor
     * 
     * @param {Object} meta    Column meta
     * @param {Object} options Filter options
     */
    constructor (meta, options = {}) {
        super()

        this.meta    = meta
        this.options = Object.assign({}, OPTIONS, options)

        this.value = ''

        this.container      = document.createElement('div')
        this.button         = document.createElement('button')
        this.inputContainer = document.createElement('div')
        this.input          = document.createElement('input')
    }

    // endregion Constructor

    // region Helpers

    /**
     * Bind functionality to element events
     */
    bind () {
        this.button.addEventListener('click', this.handleButtonClick.bind(this))
        this.input.addEventListener('blur', this.handleInputBlur.bind(this))

        if (this.input.localName === 'select') {
            this.input.addEventListener('change', this.handleInputChange.bind(this))
        } else {
            this.input.addEventListener('keyup', this.handleInputKeyup.bind(this))
        }
    }

    // endregion Helpers

    // region Event handlers

    /**
     * Handle button element click event
     *
     * @param {MouseEvent} evt
     */
    handleButtonClick (evt) {
        this.toggleInput(true)
    }

    /**
     * Handle input element blur event
     *
     * @param {FocusEvent} evt
     */
    handleInputBlur (evt) {
        this.toggleInput(false)
    }

    /**
     * Handle input element keyup event
     *
     * @param {KeyboardEvent} evt
     */
    handleInputKeyup (evt) {
        if (this.typingUpdateTimeout) {
            window.clearTimeout(this.typingUpdateTimeout)
        }

        this.typingUpdateTimeout = window.setTimeout(() => {
            this.setValue(this.input.value)
        }, this.options.typingUpdateDelay)
    }

    /**
     * Handle input element change event
     *
     * @param {Event} evt
     */
    handleInputChange (evt) {
        this.setValue(this.input.value)
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
        this.container.className      = this.options.containerClass
        this.button.className         = this.options.buttonClass
        this.inputContainer.className = this.options.inputContainerClass

        this.button.innerHTML = '<span>Filter</span>'
        this.button.type      = 'button'

        this.inputContainer.appendChild(this.input)
        this.container.appendChild(this.button)
    }

    /**
     * Perform toggleInput action
     *
     * @param {boolean} isVisible If true, input is visible else button is visible
     */
    performToggleInput (isVisible) {
        if (isVisible) {
            this.container.removeChild(this.button)
            this.container.appendChild(this.inputContainer)

            this.input.focus()

            if (this.input.setSelectionRange) {
                this.input.setSelectionRange(0, this.value.length)
            }
        } else {
            this.container.removeChild(this.inputContainer)
            this.container.appendChild(this.button)
        }
    }

    /**
     * Perform setValue action
     *
     * @param {*} value New value to set
     */
    performSetValue (value) {
        this.value       = value
        this.input.value = value

        this.container.classList.toggle(this.options.inputHasValueClass, (this.value !== ''))
    }

    // endregion Actions

    // region Controls

    /**
     * Initialise filter
     *
     * @fires BaseFilter#init:pre
     * @fires BaseFilter#init:post
     */
    init () {
        this.trigger('init:pre')

        this.performInit()

        this.trigger('init:post')
    }

    /**
     * Render filter
     *
     * @fires BaseFilter#render:pre
     * @fires BaseFilter#render:post
     */
    render () {
        this.trigger('render:pre')

        this.performRender()

        this.trigger('render:post')
    }

    /**
     * Toggle input visibility
     *
     * @param {boolean} isVisible If true, input is visible else button is visible
     * @fires BaseFilter#toggleInput:pre
     * @fires BaseFilter#toggleInput:post
     */
    toggleInput (isVisible) {
        this.trigger('toggleInput:pre', {
            isVisible: isVisible
        })

        this.performToggleInput(isVisible)

        this.trigger('toggleInput:post', {
            isVisible: isVisible
        })
    }

    /**
     * Set new value
     *
     * @param {*} value New value to set
     * @fires BaseFilter#setValue:pre
     * @fires BaseFilter#setValue:post
     */
    setValue (value) {
        this.trigger('setValue:pre', {
            newValue: value
        })

        this.performSetValue(value)

        this.trigger('setValue:post', {
            value: value
        })
    }

    // endregion Controls
}