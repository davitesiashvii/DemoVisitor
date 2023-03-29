import { Route } from "@angular/router";
import { DemoRootComponent } from "./demo-root.component";
import { PrisonerListComponent } from "./prisoner/prisoner-list/prisoner-list.component";
import { PrisonerInfoSidebarEditEditComponent } from "./visit/prisoner-sidebar/prisoner-info-sidebar.component";
import { VisitEditComponent } from "./visit/visit-edit/visit-edit.component";
import { VisitListComponent } from "./visit/visit-list/visit-list.component";
import { VisitorSidebarEditEditComponent } from "./visit/visitor-sidebar/visitor-sidebar-edit.component";
import { VisitorListComponent } from "./visitor/visitor-list/visitor-list.component";


export const DemoRoutes: Route[] = [

    {
        path     : '',
        component: DemoRootComponent,
        children:[
            {
                path     : 'visitors',
                component: VisitorListComponent
            },
            {
                path     : 'visits',
                component: VisitListComponent
            },
            {
                path     : 'prisoners',
                component: PrisonerListComponent
            },
            {
                path     : 'visit-edit/:visitId',
                component: VisitEditComponent,
                children : [
                    {
                        path         : 'side/:prisonerId',
                        component    : PrisonerInfoSidebarEditEditComponent,
                    },
                    {
                        path         : 'visitor-side/:visitorId',
                        component    : VisitorSidebarEditEditComponent,
                    }
                ]
            },
        ]
    },
];