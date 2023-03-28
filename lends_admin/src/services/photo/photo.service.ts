import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Photo } from 'src/models/photo.interface';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public photo: Photo = {

  }

  constructor(private http: HttpClient) { }

  getPhotos() {
    return this.http.get<Photo>(environment.photo_url)
  }

  deletePhoto(id: string) {
    return this.http.delete(`${environment.photo_url}/${id}`)
  }
}
