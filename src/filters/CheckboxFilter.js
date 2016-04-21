import BaseFilter from './BaseFilter'

/**
 * Checkbox filter class
 */
export default class CheckboxFilter extends BaseFilter {
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
        let options = [
            {
                value: '',
                label: this.options.emptyOptionText
            },{
                value: true,
                label: this.options.trueOptionText
            },{
                value: false,
                label: this.options.falseOptionText
            }
        ]

        super.performRender()

        options.map((option) => {
            let optionNode = document.createElement('option')

            optionNode.value     = option.value
            optionNode.innerHTML = option.label

            this.input.appendChild(optionNode)
        })
    }

    // endregion Actions
}