import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { take } from 'rxjs';
import { Categories } from 'src/models/categories.interface';
import { CategoriesService } from 'src/services/categories/categories.service';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  constructor(public categoryService: CategoriesService, private fb: FormBuilder, private alertController: AlertController) { }

  categories: Categories[] = []

  page:number = 0
  max = 0
  isAddActivate: boolean = false
  isMinusActivate: boolean = true

  created: number = 0

  ngOnInit() {
    this.getCategories()
    this.created = 5
  }

  category: Categories = {
    _id: '',
    name: '',
    description: '',
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Category',
      subHeader: 'Added',
      message: 'Category added succesfuly',
      buttons: ['OK'],
    });

    await alert.present();
  }

  cleanForm(form: NgForm){
    return form.reset()
  }

  addCategory(form: NgForm){
      this.categoryService.createCategory(form.value).subscribe(
        res => {
          this.getCategories()
          this.cleanForm(form)
          this.presentAlert()
          this.created++
        },
        err => console.log(this.category._id)
      )
  }

  numPage(page: number){
    let num = this.page += page

    if(num < 0){
      console.log('minus');
      
      this.page = 0
      this.getCategories(num)
      this.isMinusActivate = true
    }

    if(num >= this.max) {
      console.log('max');
      
      this.page = this.max
      this.isAddActivate = true
      this.getCategories(this.page)
    }

    this.isAddActivate = false

    this.isMinusActivate = false

    return this.getCategories(num)
  }

  getCategories(page:number = 0) {
    this.categoryService.getCategories(page)
    .pipe(
      take(1)
    ).subscribe( (res:any) => {
      console.log(res);
      const {data, total, limit} = res

      this.categories = [...data]

      console.log(total);

      if(total > 10){
        this.max = total - 10
      }

      console.log(this.max);
      
      
    }, 
    (err) => console.log('error')
     )
  }

  async deleteCategory(id: any, name: string) {
    const alert = await this.alertController.create({
      header: `Are you sure want to delete ${name} category`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.categoryService.deleteCategory(id)
            this.getCategories()
          },
        },
      ],
    });

    await alert.present();
  }

  editCategory(id: any, name: string, description: string){
    
  }

}
