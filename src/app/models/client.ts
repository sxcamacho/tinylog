import { Log } from './log'

export class Client {
    id: string
    title: string

    constructor(clientData) {
        const { uid, title } = clientData

        this.id = uid
        this.title = title
    }
}
