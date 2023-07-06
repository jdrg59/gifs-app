import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
  <h5>Buscar:</h5>
  <input type="text"
  class="form-control"
  placeholder="Buscar gifs..."
  (keyup.enter)="searchTag()"
  #txtTagInput
  >
  `
})

export class SearchBoxComponet {
  //manipular un elemento html
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  //para inyectar el servicio que creamos
  constructor( private gifService: GifsService) { }


  searchTag(){
    const newTag = this.tagInput.nativeElement.value;
    //le mandamos el valor capturado a nuestro servicio
    this.gifService.searchTag(newTag);

    //limpiar caja de texto
    this.tagInput.nativeElement.value = '';


  }

}
