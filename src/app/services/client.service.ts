import { Injectable } from '@angular/core'
import { BaseService } from './base.service'
import { Client } from '../models/client'
import { Observable } from 'rxjs/Rx'

@Injectable()
export class ClientService {
    constructor(private baseService: BaseService) {}

    getClients() {
        return Observable.create(observer => {
            this.baseService.executeGet('clients', null).subscribe(
                res => {
                    let result = res.map(item => {
                        return new Client(item)
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

    createClient(body) {
        return Observable.create(observer => {
            this.baseService.executePost('clients', body).subscribe(
                (res: Response) => {
                    observer.next(new Client(res))
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
