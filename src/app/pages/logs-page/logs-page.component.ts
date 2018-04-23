import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Log } from '../../models/log'
import { LogService } from '../../services/log.service'

declare var Pusher: any
@Component({
    selector: 'app-logs-page',
    templateUrl: './logs-page.component.html',
    styleUrls: ['./logs-page.component.css'],
})
export class LogsPageComponent implements OnInit {
    private sub: any
    private clientId: any
    loading: boolean
    logs: Array<Log>

    constructor(
        private logService: LogService,
        private routeParam: ActivatedRoute
    ) {
        this.logs = new Array<Log>()
    }

    ngOnInit() {
        let self = this
        this.sub = this.routeParam.params.subscribe(params => {
            if (params['id']) {
                this.clientId = params['id']

                // Enable pusher logging - don't include this in production
                // Pusher.logToConsole = true

                var pusher = new Pusher('98618edc5506eaf159c0', {
                    cluster: 'us2',
                    encrypted: true,
                })

                var channel = pusher.subscribe('my-channel')
                channel.bind(this.clientId, function(data) {
                    let log = new Log(data.log)
                    self.logs.push(log)
                })

                this.loadLogs(this.clientId)
            }
        })
    }

    ngOnDestroy() {
        this.sub.unsubscribe()
    }

    loadLogs(clientId) {
        this.loading = true

        this.logService.getLogs(clientId).subscribe(
            res => {
                this.logs = res
            },
            error => {
                console.error(error)
                //error action
            },
            () => {
                //common end action
                this.loading = false
            }
        )
    }
}
