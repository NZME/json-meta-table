import BaseRenderer from './BaseRenderer'

/**
 * Number renderer
 */
export default class NumberRenderer extends BaseRenderer {
    // region Constructor

    /**
     * @inheritdoc
     */
    constructor (table, meta, value, displayValue) {
        super(table, meta, value, displayValue)

        this.init()
    }

    // endregion Constructor

    // region Helpers

    /**
     * @inheritdoc
     */
    parseValue (value) {
        return parseInt(value)
    }

    // endregion Helpers

    // region Actions

    /**
     * @inheritdoc
     */
    performRender () {
        super.performRender()

        this.container.classList.add('json-meta-table-renderer-number')

        this.input.type  = 'number'
        this.input.title = this.meta.label
    }

    // endregion Actions
}