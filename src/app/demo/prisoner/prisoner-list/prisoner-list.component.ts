import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {GridOptions} from "ag-grid-community";
import { DemoCommonData } from "app/demo/demo-common.data";
import { VisitorVm } from "app/demo/models/visitor/visitor-vm";




@Component({
    selector     : 'prisoner-list',
    templateUrl  : './prisoner-list.component.html',
    
})
export class PrisonerListComponent implements OnInit{
    drawerOpened: boolean = false;
    gridApi: any = {};
    gridOptions: GridOptions;
    columnDefs: any[] = [];
    rowData:VisitorVm[] = [];
    rowSelection: 'single' | 'multiple' = 'multiple';
    prisonerModel: any = {};


    constructor(
        private readonly _demoCommonData: DemoCommonData,
        private readonly _router: Router,
        private readonly _activatedRoute:  ActivatedRoute,
    ){
        
    }
    
    ngOnInit(): void {
       this._initializeGrid();
       
       this.rowData = this._demoCommonData.prisoners;
       
    }

    newVisitor(){
        this._router.navigate(['visitor/visitor-edit/new']);
        this.drawerOpened = true;
    }


    onGridReady(params) {
        this.gridApi = params.api;
        this.rowData = this._demoCommonData.prisoners;
        this.gridApi.sizeColumnsToFit();
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
        debugger;
        this.prisonerModel = this._demoCommonData.prisoners.find(x=>x.Id === $event.data.Id);
        this.drawerOpened = true;
    }

    drawerOpenedChanged(changedEvent: boolean){
        // debugger;
         this.drawerOpened = changedEvent;
        // if(!this.fuseDrawerOpened){
        //     debugger;
            
        //     this.rowData = this._demoCommonData.visitors;
        //     this._router.navigate(['../'], {relativeTo: this._activatedRoute});
        //     this.rowData = this._demoCommonData.visitors;
        //     this.gridApi.setData(this.rowData);
        // }
           
    }
    visitorUpdateed(event: boolean){
        this.drawerOpened = false;
        this.rowData = this._demoCommonData.visitors;
        this.gridApi.setRowData(this.rowData);
    }

    closeDrawer(){
        this.drawerOpened = false;
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
                headerName: 'სახელი',
                field: 'FirstName',
                sortable: true,
                resizable: true,
                filter: true,
                floatingFilter: true,
                rowDrag: true,
                
            },
            {
                headerName: 'გვარი',
                field: 'LastName',
                sortable: true,
                resizable: true,
                filter: true,
                floatingFilter: true,
            },
            {
                headerName: 'მამის სახელი',
                field: 'MiddleName',
                sortable: true,
                resizable: true,
                filter: true,
                floatingFilter: true,
            },
            {
                headerName: 'პირადი ნომერი',
                field: 'privateNumber',
                sortable: true,
                resizable: true,
                filter: true,
                floatingFilter: true,
            },           
            {
                headerName: 'სქესი',
                field: 'Gender',
                sortable: true,
                resizable: true,
                filter: true,
                floatingFilter: true,
            },
            {
                headerName: 'დაბადების თარიღი',
                field: 'Birthdate',
                sortable: true,
                resizable: true,
                filter: true,
                floatingFilter: true,
            },
        ];
    } 

}