import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GridOptions } from "ag-grid-community";
import { DemoCommonData } from "app/demo/demo-common.data";
import { VisitorVm } from "app/demo/models/visitor/visitor-vm";




@Component({
    selector: 'visit-list',
    templateUrl: './visit-list.component.html',

})
export class VisitListComponent implements OnInit {
    gridApi: any = {};
    gridOptions: GridOptions;
    columnDefs: any[] = [];
    rowData: VisitorVm[] = [];
    rowSelection: 'single' | 'multiple' = 'multiple';


    constructor(
        private readonly _demoCommonData: DemoCommonData,
        private readonly _router: Router,
        private readonly _activatedRoute: ActivatedRoute,
    ) {

    }

    ngOnInit(): void {
        this._initializeGrid();
        this.initData();
    }

    newVisit() {
        this._router.navigate(['demo/visit-edit/new']);
    }


    onGridReady(params) {
        this.gridApi = params.api;
        this.initData();
    }

    private _initializeGrid() {
        this._setGridOptions();
        this._setGridColumns();
    }

    private _setGridOptions() {
        this.gridOptions = {
            pagination: true,
            paginationPageSize: 100,
            cacheBlockSize: 100,
            maxBlocksInCache: 1,
            suppressContextMenu: true,

        };
    }

    onRowDoubleClick($event) {
        this._router.navigate([`demo/visit-edit/${$event.data.id}`]);
    }

    initData() {
        let visits = this._demoCommonData.visits;

        for (let i = 0; i < visits.length; i++) {
            let prisoner = this._demoCommonData.prisoners.find(x => x.Id === visits[i].prisonerId);
            if (prisoner) {
                visits[i].prisonerFirstName = prisoner.FirstName;
                visits[i].prisonerLastName = prisoner.LastName;
                visits[i].prisonerPrivateNumber = prisoner.privateNumber
            }

            let visitor = this._demoCommonData.visitors.find(x => x.id === visits[i].visitorId);
            if (visitor) {
                visits[i].visitorFirstName = visitor.firstName;
                visits[i].visitorLastName = visitor.lastName;
                visits[i].visitorPrivateNumber = visitor.privaterNumber;
            }

            visits[i].visitCreateDateToString = visits[i].visitCreateDate.toISOString().slice(0, 10);
            visits[i].visitDateToString = visits[i].visitDate.toISOString().slice(0, 10);

            visits[i].meettengTypeName = this._demoCommonData.meettengTypes.find(x=>x.id === visits[i].meettengTypeId).name;
            visits[i].visitTypeName = this._demoCommonData.visitTypes.find(x=>x.id === visits[i].visitTypeId).name;
            visits[i].visitStatusName = this._demoCommonData.visitStatuses.find(x=>x.id === visits[i].visitStatusId).name;
        }

        this.rowData = visits;
    }

    private _setGridColumns() {
        this.columnDefs = [
            {
                headerName: '',
                field: 'CheckAll',
                lockPosition: true,
                lockVisible: true,
                width: 20,
                resizable: false,
                suppressMenu: true,
                headerCheckboxSelection: false,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: 'ნომერი',
                field: 'visitNumber',
                sortable: true,
                resizable: true,
                filter: true,
                floatingFilter: true,
                rowDrag: true,

            },
            {
                headerName: 'მოთხოვნის თარიღი',
                field: 'visitCreateDateToString',
                sortable: true,
                resizable: true,
                filter: true,
                floatingFilter: true,
            },
            {
                headerName: 'დაგეგმილი თარიღი',
                field: 'visitDateToString',
                sortable: true,
                resizable: true,
                filter: true,
                floatingFilter: true,
            },
            {
                headerName: 'ტიპი',
                field: 'meettengTypeName',
                sortable: true,
                resizable: true,
                filter: true,
                floatingFilter: true,
            },
            {
                headerName: 'ქვე-ტიპი',
                field: 'visitTypeName',
                sortable: true,
                resizable: true,
                filter: true,
                floatingFilter: true,
            },
            {
                headerName: 'პატიმარის სახელი',
                field: 'prisonerFirstName',
                sortable: true,
                resizable: true,
                filter: true,
                floatingFilter: true,
            },
            {
                headerName: 'პატიმარის გვარი',
                field: 'prisonerLastName',
                sortable: true,
                resizable: true,
                filter: true,
                floatingFilter: true,
            },
            {
                headerName: 'პატიმარის პირადი ნომერი',
                field: 'prisonerPrivateNumber',
                sortable: true,
                resizable: true,
                filter: true,
                floatingFilter: true,
            },
            {
                headerName: 'ვიზიტორის სახელი',
                field: 'visitorFirstName',
                sortable: true,
                resizable: true,
                filter: true,
                floatingFilter: true,
            },
            {
                headerName: 'ვიზიტორის გვარი',
                field: 'visitorLastName',
                sortable: true,
                resizable: true,
                filter: true,
                floatingFilter: true,
            },
            {
                headerName: 'ვიზიტორის პირადი ნომერი',
                field: 'visitorPrivateNumber',
                sortable: true,
                resizable: true,
                filter: true,
                floatingFilter: true,
            },
            {
                headerName: 'სტატუსი',
                field: 'visitStatusName',
                sortable: true,
                resizable: true,
                filter: true,
                floatingFilter: true,
            },
        ];
    }

}