import { Component, OnInit, Input, OnChanges } from '@angular/core'
import {
    trigger,
    style,
    transition,
    animate,
    keyframes,
    query,
    stagger,
} from '@angular/animations'
import { Log } from '../../models/log'

@Component({
    selector: 'app-log-list',
    templateUrl: './log-list.component.html',
    styleUrls: ['./log-list.component.css'],
    animations: [
        trigger('listAnimation', [
            transition('* => *', [
                query(':enter', style({ opacity: 0 }), { optional: true }),

                query(
                    ':enter',
                    stagger('300ms', [
                        animate(
                            '.5s ease-in',
                            keyframes([
                                style({
                                    opacity: 0,
                                    transform: 'translateY(-75%)',
                                    offset: 0,
                                }),
                                style({
                                    opacity: 0.5,
                                    transform: 'translateY(15px)',
                                    offset: 0.3,
                                }),
                                style({
                                    opacity: 1,
                                    transform: 'translateY(0)',
                                    offset: 1.0,
                                }),
                            ])
                        ),
                    ]),
                    { optional: true }
                ),
            ]),
        ]),
    ],
})
export class LogListComponent implements OnInit {
    @Input() logs: Array<Log>
    @Input() loading: boolean
    // items = []
    constructor() {
        // this.items = [
        //     'Hey this is an item',
        //     'Here is another one',
        //     'This is awesome',
        // ]
    }

    // pushItem() {
    //     this.items.push('Oh yeah that is awesome')
    // }
    // removeItem() {
    //     this.items.pop()
    // }

    ngOnInit() {}

    //don't remove it
    ngOnChanges(changes: any): void {}
}
