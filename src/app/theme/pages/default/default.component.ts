import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Helpers } from '../../../helpers';
import { ScriptLoaderService } from '../../../_services/script-loader.service';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-grid.m-grid--ver-desktop.m-grid--desktop.	m-container.m-container--responsive.m-container--xxl.m-page__container.m-body",
    templateUrl: "./default.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class DefaultComponent implements OnInit {


    constructor(private route: ActivatedRoute) {

    }
    ngOnInit() {
    }

}