import { Component, OnInit } from '@angular/core';
import { User } from "../../../../../../auth/_models";
import {Project} from "../../../../../../models/project";
import {ActivatedRoute} from "@angular/router";
import {Process} from "../../../../../../models/process";

@Component({
    selector: 'app-documents',
    templateUrl: './documents.component.html',
    styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

    project: Project;
    process: Process;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.project = this.route.snapshot.data.project[0];
        const id = this.route.snapshot.params.idprocess;
        this.project.processes.forEach(p=> {
            if (p._id === id){
                this.process = p;
            }
        });

    }

}
