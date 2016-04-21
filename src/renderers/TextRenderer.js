import BaseRenderer from './BaseRenderer'

/**
 * Text renderer
 */
export default class TextRenderer extends BaseRenderer {
    // region Constructor

    /**
     * @inheritdoc
     */
    constructor (table, meta, value) {
        super(table, meta, value)

        this.init()
    }

    // endregion Constructor

    // region Actions

    /**
     * @inheritdoc
     */
    performRender () {
        super.performRender()

        this.container.classList.add('json-meta-table-renderer-text')

        this.input.type  = 'text'
        this.input.title = this.meta.label
    }

    // endregion Actions
}