import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  //almacenar nuestros gifs de la respuesta
  public gifList: Gif[] = [];
  //propiedades para guardar todo lo que se busca
  private _tagsHistory: string[] = [];
  //variable de entorno
  private apiKey: string = 'UHNG3oVHjBrY3MGwqpWdwHHEQKFGm3CN';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(
    //inyectar http client api gifs
    private http: HttpClient
  ) {
    this.loadLocalStorage();

  }

  //spred para crear una copia de los tags, por que se pasan por transferencia
  get tagsHistory() {
    return [...this._tagsHistory];
  }

  //otro metodo para validaciones aparte
  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    //validar que los tags en el menu no sean repetidos
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagsHistory.unshift(tag);
    //limitar solo a 10 busquedas
    this._tagsHistory = this.tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

//guardar en local storage
  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));

  }

  //cargar datos del local storage
  private loadLocalStorage(){
    if(!localStorage.getItem('history') ) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    //verifica si no estan vacios los datos en local storage
    if (this._tagsHistory.length === 0) return;
    //muestra el primer valor en local storage
    this.searchTag( this._tagsHistory[0]);
  }


  // searchTag(tag: string):void{
  //si el tag esta vacio no hacer nada
  // if(tag.length === 0) return;
  // this.organizeHistory(tag);

  //promesa usa await, observable no
  searchTag(tag: string): void {
    //si el tag esta vacio no hacer nada
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    //parametros que enviare a la url
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag);

    this.http
      .get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((resp) => {

        this.gifList = resp.data;
        console.log({gifs: this.gifList});
      });

    // manera vieja de hacerlo con promesas
    // fetch('https://api.giphy.com/v1/gifs/search?api_key=UHNG3oVHjBrY3MGwqpWdwHHEQKFGm3CN&q=valorant&limit=10')
    // .then( resp => resp.json())
    // .then( data => console.log(data));

    //unshift añadirlo al inicio
    //   this._tagsHistory.unshift(tag);

    console.log(this.tagsHistory);
  }
}
