import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataViewerComponent } from './components/data-viewer/data-viewer.component';
import { Route } from './shared/route';

const routes: Routes = [
  { path: Route.HOME, component: DataViewerComponent },
  { path: Route.AGGREGATE, component: DataViewerComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
