import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Section } from 'src/models/section.interface';

@Injectable({
  providedIn: 'root'
})
export class SectionsService {

  public sections ?: Section  

  constructor(private http: HttpClient) { }

  getSections(page:number = 0) {
    return this.http.get<Section[]>(`${environment.section_url}/?$skip=${page}`)
  }

  createSection(formulario: any) {
    return this.http.post(environment.section_url, formulario)
  }

  deleteSection(id: string) {
    return this.http.delete(`${environment.section_url}/${id}`)
  }
}
