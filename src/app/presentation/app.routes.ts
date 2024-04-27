import { Routes } from '@angular/router';
import { AppLayoutComponent } from './commons/components/app-layout/app-layout.component';
import { PageErrorComponent } from './commons/components/page-error/page-error.component';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
	{
		path:`dashboard`,
		component:AppLayoutComponent,
		children:[
			{
				path: '',
				loadChildren: () =>
					import('./business/home-page-flow/home-flow.module').then(
						(m) => m.HomeFlowModule
					)
			}
		]
	},
	{
		path:'error', component:PageErrorComponent
	}
];
