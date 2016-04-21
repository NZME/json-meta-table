import BaseFilter from './BaseFilter'

/**
 * Select filter class
 */
export default class SelectFilter extends BaseFilter {
    // region Constructor

    /**
     * @inheritdoc
     */
    constructor (meta, options = {}) {
        super(meta, options)

        this.input = document.createElement('select')

        this.init()
    }

    // endregion Constructor

    // region Actions

    /**
     * @inheritdoc
     */
    performRender () {
        let emptyOption = document.createElement('option')

        super.performRender()

        emptyOption.value     = ''
        emptyOption.innerHTML = this.options.emptyOptionText
        this.input.appendChild(emptyOption)

        this.meta.options.map((option) => {
            let optionNode = document.createElement('option')

            optionNode.value     = option.value
            optionNode.innerHTML = option.label

            this.input.appendChild(optionNode)
        })
    }

    // endregion Actions
}