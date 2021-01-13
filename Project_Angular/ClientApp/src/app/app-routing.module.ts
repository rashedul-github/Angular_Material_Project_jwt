import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { VehicleViewComponent } from './components/vehicles/vehicle-view/vehicle-view.component';
import { ServiceViewComponent } from './components/service-records/service-view/service-view.component';
import { ServiceAddComponent } from './components/service-records/service-add/service-add.component';
import { ServiceEditComponent } from './components/service-records/service-edit/service-edit.component';
import { VehicleAddComponent } from './components/vehicles/vehicle-add/vehicle-add.component';
import { VehicleEditComponent } from './components/vehicles/vehicle-edit/vehicle-edit.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './providers/guards/auth-guard';
import { Role } from './models/constant';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'vehicle', component: VehicleViewComponent, canActivate: [AuthGuard], data: { AllowedRoles: [Role.Admin, Role.Staff] } },
  { path: 'vehicle-add', component: VehicleAddComponent, canActivate: [AuthGuard], data: { AllowedRoles: [Role.Admin] }  },
  { path: 'vehicle-edit/:id', component: VehicleEditComponent, canActivate: [AuthGuard], data: { AllowedRoles: [Role.Admin] }  },
  { path: 'service', component: ServiceViewComponent, canActivate: [AuthGuard], data: { AllowedRoles: [Role.Admin, Role.Staff] }  },
  { path: 'service-add', component: ServiceAddComponent, canActivate: [AuthGuard], data: { AllowedRoles: [Role.Admin] }  },
  { path: 'service-edit/:id', component: ServiceEditComponent, canActivate: [AuthGuard], data: { AllowedRoles: [Role.Admin] }  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
