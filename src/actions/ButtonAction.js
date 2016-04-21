import BaseAction from './BaseAction'

/**
 * Button action class
 */
export default class ButtonAction extends BaseAction {
    // region Constructor

    /**
     * @inheritdoc
     */
    constructor (row, options) {
        super(row, options)

        this.init()
    }

    // endregion Constructor
}