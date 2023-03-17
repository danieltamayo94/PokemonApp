import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router';
import { PokeTableInfoComponent } from './components/poke-table-info/poke-table-info.component';



const routes: Routes = [
    {path:'home', component: PokeTableInfoComponent},
    {path:'', pathMatch: 'full', redirectTo: 'home'},
    {path:'**', pathMatch: 'full', redirectTo: 'home'}
];


@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{}