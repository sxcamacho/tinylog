import * as moment from 'moment'

export class Log {
    id: string
    text: string
    type: string
    date: any

    constructor(logData) {
        const { uid, text, type, date } = logData

        this.id = uid
        this.text = text
        this.type = type
        this.date = moment(date)
    }
}
