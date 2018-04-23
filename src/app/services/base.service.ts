import { Injectable } from '@angular/core'
import { Headers, Response, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Rx'
import { API_URL } from '../config'
import { AuthService } from './auth.service'
import { Router } from '@angular/router'
import { AuthHttp, tokenNotExpired } from 'angular2-jwt'

@Injectable()
export class BaseService {
    requestOptions: any

    constructor(
        private authHttp: AuthHttp,
        private authService: AuthService,
        private router: Router
    ) {
        let headers = new Headers({
            'Content-Type': 'application/json',
        })
        this.requestOptions = new RequestOptions({ headers: headers })
    }

    executeGet(url: string, params: string) {
        return Observable.create(observer => {
            let url_request: string = `${API_URL}/${url}`
            if (params != null) {
                url_request = `${url_request}?${params}`
            }

            this.authHttp.get(url_request, this.requestOptions).subscribe(
                (res: Response) => {
                    observer.next(res.json())
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

    executePost(url: string, body: string) {
        return Observable.create(observer => {
            let url_request: string = `${API_URL}/${url}`

            this.authHttp
                .post(url_request, body, this.requestOptions)
                .subscribe(
                    (res: Response) => {
                        observer.next(res.json())
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

    handleError(error: any) {
        console.log('handleError', error)

        let messageResult: string

        messageResult = error.message
            ? error.message
            : 'Lo sentimos, ha habido un error, intente nuevamente.'

        return Observable.throw(messageResult)
    }
}
