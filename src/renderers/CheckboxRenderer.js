import BaseRenderer from './BaseRenderer'

/**
 * Checkbox renderer
 */
export default class CheckboxRenderer extends BaseRenderer {
    // region Constructor

    /**
     * @inheritdoc
     */
    constructor (table, meta, value) {
        super(table, meta, value)

        this.init()

        this.bindInputClick()
    }

    // endregion Constructor

    // region Event binders

    /**
     * Bind functionality to input element click event
     */
    bindInputClick () {
        if (this.meta.editable) {
            this.input.addEventListener('click', this.handleInputClick.bind(this))
        }
    }

    // endregion Event binders

    // region Event handlers

    /**
     * Handle input element click event
     *
     * @param evt
     */
    handleInputClick (evt) {
        this.setValue(this.input.checked)
    }

    // endregion Event handlers

    // region Helpers

    /**
     * @inheritdoc
     */
    parseValue (value) {
        return (
            (value === 'true') ||
            (value === 1) ||
            (value === true)
        )
    }

    // endregion Helpers

    // region Actions

    /**
     * @inheritdoc
     */
    performRender () {
        super.performRender()

        this.container.classList.add('json-meta-table-renderer-checkbox')

        this.input.type  = 'checkbox'
        this.input.title = this.meta.label

        this.input.disabled = (!this.meta.editable)

        this.toggleEditor(true)
    }

    /**
     * @inheritdoc
     */
    performSetValue (value) {
        this.value             = this.parseValue(value)
        this.input.value       = new String(value)
        this.input.checked     = this.value
        this.display.innerHTML = this.formatValue(value)

        if (this.value !== this.initialValue) {
            this.hasChanged = true
        }
    }

    // endregion Actions
}