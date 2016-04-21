import BaseFilter from './BaseFilter'

/**
 * Text filter class
 */
export default class TextFilter extends BaseFilter {
    // region Constructor

    /**
     * @inheritdoc
     */
    constructor (meta, options = {}) {
        super(meta, options)

        this.init()
    }

    // endregion Constructor

    // region Actions

    /**
     * @inheritdoc
     */
    performRender () {
        super.performRender()

        this.input.type        = 'text'
        this.input.placeholder = this.options.placeholderText
    }

    // endregion Actions
}