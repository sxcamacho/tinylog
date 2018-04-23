import { Component, OnInit, Input } from '@angular/core'
import { Client } from '../../models/client'
import { ClientService } from '../../services/client.service'
import { Router } from '@angular/router'

@Component({
    selector: 'app-clients-page',
    templateUrl: './clients-page.component.html',
    styleUrls: ['./clients-page.component.css'],
})
export class ClientsPageComponent implements OnInit {
    loading: boolean
    clients: Array<Client>
    newClientName: string

    constructor(private clientService: ClientService, private router: Router) {
        this.clients = new Array<Client>()
        this.newClientName = ''
    }

    ngOnInit() {
        this.loadClients()
    }

    loadClients() {
        this.loading = true

        this.clientService.getClients().subscribe(
            res => {
                this.clients = res
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

    generateClient() {
        let body = {
            client: {
                title: this.newClientName,
            },
        }
        this.clientService.createClient(body).subscribe(
            res => {
                // this.clients.push(res)
                this.router.navigate(['clients', res.id])
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
