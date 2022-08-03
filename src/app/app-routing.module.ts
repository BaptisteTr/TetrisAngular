import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TetrisComponent } from './tetris/tetris.component';


const routes: Routes = [
  { path: '', redirectTo: '/tetris', pathMatch: 'full' },
  { path: 'tetris', component: TetrisComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
