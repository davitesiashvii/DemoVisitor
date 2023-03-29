import { DOCUMENT } from "@angular/common";
import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from "@angular/core";
import { MatDrawer } from "@angular/material/sidenav";
import { ActivatedRoute, Router } from "@angular/router";
import { DemoCommonData } from "app/demo/demo-common.data";
import { DateTime } from "luxon/src/datetime";


@Component({
    selector: 'prisoner-info',
    templateUrl: './prisoner-info.component.html',
   
})
export class PrisonerInfoComponent implements OnInit {

    @Input() prisoner: any;
    @Output() closeDrawer: EventEmitter<boolean> = new EventEmitter<boolean>();
    mein: string ='';

    constructor(
        private readonly _demoCommonDate: DemoCommonData,
        private readonly _activatedRoute:  ActivatedRoute,
        private _router: Router,

    ){}

    ngOnInit(): void {

        // this._activatedRoute.params.subscribe(params => {
        //     if(params['prisonerId']){
        //         let id = +params['prisonerId'];
        //         this.prisoner = this._demoCommonDate.prisoners.find(x=>x.Id === id);
        //     }  
        // })
        // //this.prisoner = this._demoCommonDate.prisoners[0];
        // debugger;
        // this.mein = this.prisoner.FirstName + ", " + this.prisoner.LastName + ", " + this.prisoner.MiddleName + ".";   
        // console.warn(this.prisoner);  
    }

    close(){
        this.closeDrawer.emit(true);
    }
}