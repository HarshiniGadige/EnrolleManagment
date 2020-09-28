import { Routes, RouterModule } from '@angular/router';

import { EnroleesComponent } from "@app/enrollees/enrollees.component";

const appRoutes: Routes = [
    { path: '', redirectTo: 'enrollees', pathMatch: 'full' },
    { path: 'enrollees', component: EnroleesComponent },
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);