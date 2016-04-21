import BaseRenderer from './BaseRenderer'
import moment from 'moment'

/**
 * DateTime renderer
 */
export default class DateTimeRenderer extends BaseRenderer {
    // region Constructor

    /**
     * @inheritdoc
     */
    constructor (table, meta, value) {
        super(table, meta, value)

        this.init()
    }

    // endregion Constructor

    // region Helpers

    /**
     * @inheritdoc
     */
    parseValue (value) {
        let date = moment(new Date(value))

        return (date.isValid())
            ? date.format()
            : this.initialValue
    }

    /**
     * @inheritdoc
     */
    formatValue (value) {
        let date = moment(new Date(value))

        return `<time datetime="${date.format()}" title="${date.format('DD/MM/YYYY [at] h:mm a')}">${date.fromNow()}</time>`
    }

    // endregion Helpers

    // region Actions

    /**
     * @inheritdoc
     */
    performRender () {
        super.performRender()

        this.container.classList.add('json-meta-table-renderer-datetime')

        this.input.type  = 'text'
        this.input.title = this.meta.label
    }

    // endregion Actions
}