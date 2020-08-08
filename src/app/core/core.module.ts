import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './component/list/list.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { BoardComponent } from './component/board/board.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewTaskComponent } from './component/new-task/new-task.component';



@NgModule({
  declarations: [ListComponent, BoardComponent, NewTaskComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: 'board', component: BoardComponent, canActivate: [AuthGuard]},
      {path: 'board/:title/:id', component: NewTaskComponent},
    ])
  ],
  exports: [
    ListComponent,
  ],
  providers: [AuthGuard]
})
export class CoreModule { }
