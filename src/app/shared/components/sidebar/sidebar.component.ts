import { Component, ViewChild, ElementRef} from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {


  constructor(private gifService: GifsService){}

  //obtengo lo que escribo en el
  get tags(): string[] {
    return this.gifService.tagsHistory;
  }

  searchTag(tag: string ):void{
    //const newTag = this.tagButton.nativeElement.innerHTML
    //le mandamos el valor capturado a nuestro servicio
    this.gifService.searchTag(tag);

  }

}
