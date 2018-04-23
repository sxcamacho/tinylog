import { Injectable } from '@angular/core'
import { BaseService } from './base.service'
import { Observable } from 'rxjs/Rx'
import { Log } from '../models/log'

@Injectable()
export class LogService {
    constructor(private baseService: BaseService) {}

    getLogs(clientId) {
        return Observable.create(observer => {
            this.baseService
                .executeGet(`clients/${clientId}/logs`, null)
                .subscribe(
                    res => {
                        let result = res.map(item => {
                            return new Log(item)
                        })
                        observer.next(result)
                    },
                    err => {
                        observer.error(err)
                    },
                    () => {
                        observer.complete()
                    }
                )
        })
    }
}
