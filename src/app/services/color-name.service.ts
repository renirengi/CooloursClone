import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IColorApi } from '../interfaces/colorObject';

@Injectable({
  providedIn: 'root'
})
export class ColorNameService {

  constructor(
    private http: HttpClient,
  ) { }

  public getColorObject(color: string){
    let colorWithoutHash=color.toString().substring(1);
  return this.http.get<IColorApi>(`https://www.thecolorapi.com/id?hex=${colorWithoutHash}`);
}
}
