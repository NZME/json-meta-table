import BaseRenderer from './BaseRenderer'

/**
 * Select renderer
 */
export default class SelectRenderer extends BaseRenderer {
    // region Constructor

    /**
     * @inheritdoc
     */
    constructor (table, meta, value, displayValue) {
        super(table, meta, value, displayValue)

        this.input = document.createElement('select')

        this.init()
    }

    // endregion Constructor

    // region Helpers

    /**
     * @inheritdoc
     */
    formatValue (value) {
        if (!this.meta.options.find) {
            return value
        }

        return this.meta.options.find((option) => {
            return (option.value == value)
        }).label
    }

    // endregion Helpers

    // region Actions

    /**
     * @inheritdoc
     */
    performRender () {
        super.performRender()

        this.container.classList.add('json-meta-table-renderer-select')
        this.input.title = this.meta.label

        this.meta.options.map((option) => {
            let optionNode = document.createElement('option')

            optionNode.value     = option.value
            optionNode.innerHTML = option.label

            this.input.appendChild(optionNode)
        })
    }

    // endregion Actions
}