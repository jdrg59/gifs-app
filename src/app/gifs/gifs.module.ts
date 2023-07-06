import { NgModule } from '@angular/core';

import { HomePageComponent } from './pages/homepage/home-page.component';

import { CommonModule } from '@angular/common';
import { SearchBoxComponet } from './components/search-box/search-box.component';
import { CardListComponent } from './components/card-list/card-list/card-list.component';



@NgModule({
  declarations: [
    HomePageComponent,
    SearchBoxComponet,
    CardListComponent,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HomePageComponent
  ]
})
export class GifsModule { }
