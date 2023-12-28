import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ReportComponent } from './Components/report/report.component';
import { AdminComponent } from './Components/admin/admin.component';
import {RouterModule, Routes} from "@angular/router";
import {APP_BASE_HREF, HashLocationStrategy, LocationStrategy} from "@angular/common";
import { AuthComponent } from './Components/auth/auth.component';
import { CardComponent } from './Components/dashboard/Components/card/card.component';
import {NgxGaugeModule} from "ngx-gauge";
import {CanvasJSAngularChartsModule} from "@canvasjs/angular-charts";
import { NotFoundComponent } from './Components/not-found/not-found.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { StationControlComponent } from './Components/station-control/station-control.component';

const appRoutes: Routes =[
  {path: '', component: DashboardComponent},
  {path: 'control', component: StationControlComponent},
  {path: 'report', component: ReportComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'auth', component: AuthComponent},
  {path: '**', component: NotFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ReportComponent,
    AdminComponent,
    AuthComponent,
    CardComponent,
    NotFoundComponent,
    StationControlComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    NgxGaugeModule,
    CanvasJSAngularChartsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ { provide: APP_BASE_HREF, useValue: '/' },{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
