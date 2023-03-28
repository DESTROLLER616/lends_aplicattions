import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Categories } from 'src/models/categories.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  public categories ?: Categories[]

  constructor(private http:HttpClient) { }

  getCategories(page:number = 0){
    return this.http.get<Categories[]>(`${environment.category_url}/?$skip=${page}`)
  }

  createCategory(category: Categories){
    return this.http.post(environment.category_url, category)
  }

  deleteCategory(id: String){
    // console.log(`${this.URL_BASE}/${id}`);
    
    return this.http.delete(`${environment.category_url}/${id}`)
    
  }

  patchCategory(category: Categories){
    let cat = {
      name: category.name,
      description: category.description
    }

    // console.log(cat.description);
    

    return this.http.patch(`${environment.category_url}/${category._id}`, cat)
  }

  pagination(page:number){
    return this.http.get<Categories[]>(`${environment.category_url}/?$skip=${page}`)
  }
}
