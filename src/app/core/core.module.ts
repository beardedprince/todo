import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './component/list/list.component';
import { EditListComponent } from './component/edit-list/edit-list.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';



@NgModule({
  declarations: [ListComponent, EditListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'list', component: ListComponent, canActivate: [AuthGuard]},
      {path: 'edit-list', component: EditListComponent},
    ])
  ],
  exports: [
    ListComponent,
    EditListComponent
  ],
  providers: [AuthGuard]
})
export class CoreModule { }
