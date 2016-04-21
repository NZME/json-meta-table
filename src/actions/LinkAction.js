import BaseAction from './BaseAction'

/**
 * Link action class
 */
export default class LinkAction extends BaseAction {
    // region Constructor

    /**
     * @inheritdoc
     */
    constructor (row, options) {
        super(row, options)

        this.url = this.parseUrl()
        this.init()
    }

    // endregion Constructor

    // region Helpers

    /**
     * Parse URL string and replace row vars with values
     *
     * @returns {String}
     */
    parseUrl () {
        let row        = this.row,
            url        = this.options.url,
            expression = /\${([^{}]*)}/gi

        this.options.url.match(expression).map((match) => {
            url = this.options.url.replace(match, eval(match.replace(/([\${}]*)/g, '')))
        })

        return url
    }

    // endregion Helpers

    // region Actions

    /**
     * @inheritdoc
     */
    performClick () {
        if (this.options.isNewWindow) {
            window.open(this.url, this.options.windowName, this.options.windowFeatures)
        } else {
            window.location.href = this.url
        }
    }

    // endregion Actions
}