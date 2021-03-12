import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';


export const HomeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
];

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
    ],
    declarations: [
        HomeComponent,
    ],
    providers: [],
})

export class HomeModule {

}
