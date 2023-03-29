import { DOCUMENT } from "@angular/common";
import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatDrawer } from "@angular/material/sidenav";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseMediaWatcherService } from "@fuse/services/media-watcher";
import { DemoCommonData } from "app/demo/demo-common.data";
import { PrisonerSearch } from "app/demo/sheard/prisoner-search/prisoner-search.component";
import { VisitorSearch } from "app/demo/sheard/visitor-search/visitor-search.component";
import { VisitorService } from "app/demo/visitor/visitor.service";
import { DateTime } from "luxon/src/datetime";
import { Subject, takeUntil } from "rxjs";


@Component({
    selector: 'visit-edit',
    templateUrl: './visit-edit.component.html',

})
export class VisitEditComponent implements OnInit {

    @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;

    model: any = {};
    editMode: boolean = false;
    visitTypes: any = {};
    visitorAndPrisonerConnectionTypes: any[] = [];
    visitLocations: any[] = [];
    visitTimes: any[] = [];
    visitStatuses: any[] = [];

    drawerMode: string = 'over';
    opened: boolean = false;
    prisoner: any = {};
    visitors: any[] = [];
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    prisonerButtonText: string = "პატიმრის დამატება";
    visitoresButtonText: string = "ვიზიტორის დამატება";
    visitButtonText: string = "ვიზიტის დამატება";
    //prisonerButtonText: string = "პატიმრის დამატება";
    prisonerAdded: boolean = false;
    sidebarOpened: boolean = false;

    constructor(
        private readonly _demoCommonDate: DemoCommonData,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _matDialog: MatDialog,
    ) {
        _router.events.subscribe((val) => {
            console.warn("musghaobvs");
        });
    }

    ngOnInit(): void {

        this._activatedRoute.params.subscribe(params => {
            if (params['visitId'] !== 'new') {
                let id = +params['visitId'];
                this.model = this._demoCommonDate.visits.find(x => x.id === id);
                this.visitButtonText = "ვიზიტორის განახლება";
                this.editMode = true;
                this.model.visitNumber = '21456';
                this.model.visitCreator = 'დავით ესიაშვილი';
                this.model.visitCreateDate = new Date().toDateString();
            }
        });

        this.visitTypes = this._demoCommonDate.visitTypes;
        this.visitorAndPrisonerConnectionTypes = this._demoCommonDate.visitorAndPrisonerConnectionTypes;
        this.visitLocations = this._demoCommonDate.visitLocations;
        this.visitTimes = this._demoCommonDate.visitTimes;
        this.visitStatuses = this._demoCommonDate.visitStatuses;
        this.model.freeSpace = 3;
    }

    onBackdropClicked() {
        // Go back to the list
        this._router.navigate(['./'], { relativeTo: this._activatedRoute });

        this._changeDetectorRef.markForCheck();
    }

    open() {
        if (!this.sidebarOpened) {
            this.drawerMode = 'ower';
            this.opened = true;
            this.sidebarOpened = true;
        }
        else {
            this.sidebarOpened = false;
            this.opened = false;
        }
    }

    openVisitor() {

    }

    serchPrisoner() {
        this._matDialog.open(PrisonerSearch, { autoFocus: false })
            .afterClosed()
            .subscribe((result: any | undefined) => {
                debugger;
                if (result) {
                    this.prisoner = this._demoCommonDate.prisoners.find(x => x.Id === result);
                    this.prisonerButtonText = "პატიმრის შეცვლა";
                    this._router.navigate(['./'], { relativeTo: this._activatedRoute });
                    this.matDrawer.close();
                }
                this.sidebarOpened = false;
            });
    }


    serchVisitor() {
        this._matDialog.open(VisitorSearch, { autoFocus: false })
            .afterClosed()
            .subscribe((result: any | undefined) => {
                debugger;
                if (result) {
                    this.visitors.push(this._demoCommonDate.visitors.find(x => x.id === result));
                    this.visitoresButtonText = "ვიზიტორის შეცვლა";
                    this._router.navigate(['./'], { relativeTo: this._activatedRoute });
                    this.matDrawer.close();

                }
            });
    }

    deleteVisitor(id) {
        debugger;
        this.visitors = this.visitors.filter(x => x.id !== id);
    }

    save() {
        if (this.editMode) {
            let index = this._demoCommonDate.visits.findIndex(x => x.id === this.model.id);
            this.model.visitCreateDate = new Date(this.model.visitCreateDate);
            this.model.visitDate = new Date(this.model.visitDate);
            this._demoCommonDate.visits[index] = this.model;
        } else {
            this.model.id = 1;
            let items = this._demoCommonDate.visits;
            for (let item of items) {
                if (item.id > this.model.id) {
                    this.model.id = item.id;
                }
            }
            if(this.model.id !== 1){
                this.model.id++;
            }
            
            this.model.visitCreateDate = new Date(this.model.visitCreateDate);
            this.model.visitDate = new Date(this.model.visitDate);

            this._demoCommonDate.visits.push(this.model);
        }
        this._router.navigate(['demo/visits']);
    }

    remove() {
        let index = this._demoCommonDate.visits.findIndex(x => x.id === this.model.id);
        this._demoCommonDate.visits.splice(index, 1);
        this._router.navigate(['demo/visits']);
    }
}
