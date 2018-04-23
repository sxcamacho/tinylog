import { Component } from '@angular/core'
import { TranslateService } from 'ng2-translate/ng2-translate'
import * as moment from 'moment'

@Component({
    selector: 'app-root',
    template: '<router-outlet></router-outlet>',
})
export class AppComponent {
    lang: string
    constructor(private translateService: TranslateService) {
        this.lang = 'es'
        this.setApplicationLanguage(this.lang)
    }
    setApplicationLanguage(lang) {
        this.translateService.setDefaultLang(lang)
        moment.locale(lang)
    }
}
