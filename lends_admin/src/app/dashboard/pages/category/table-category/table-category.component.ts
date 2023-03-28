import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, AlertInput } from '@ionic/angular';
import { take } from 'rxjs';
import { Categories } from 'src/models/categories.interface';
import { AlertsService } from 'src/services/alerts/alerts.service';
import { CategoriesService } from 'src/services/categories/categories.service';
import { isUndefined } from 'util';

@Component({
  selector: 'app-table-category',
  templateUrl: './table-category.component.html',
  styleUrls: ['./table-category.component.scss'],
})
export class TableCategoryComponent  implements OnInit {

  page:number = 0
  max = 0
  isAddActivate: boolean = false
  isMinusActivate: boolean = true
  isHidden: boolean = false
  isRefresh: boolean = false

  @Input() created?: number

  constructor(public categoryService: CategoriesService, private categoryAlerts: AlertsService, private alertController: AlertController) { }

  ngOnInit() {
    this.getCategories()
    this.showRefresh()
  }

  category: Categories = {
    _id: '',
    name: '',
    description: ''
  }

  categories: Categories[] = []

  numPage(page: number){
    let num = this.page += page

    if(num < 0){
      console.log('minus');
      
      this.page = 0
      this.getCategories(num)
      this.isMinusActivate = true
    }

    if(num >= this.max) {
      // console.log('max');
      
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
      // console.log(res);
      const {data, total, limit} = res

      this.categories = [...data]

      // console.log(total);

      if(total > 10){
        this.max = total - 10
      }

      // console.log(this.max);

      this.isHidden = false
      
      
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
            this.categoryService.deleteCategory(id).subscribe(
              (res) => {
                this.getCategories()
              },
              (err) => {
                console.log(`error: ${err}`);
              }
            )
            this.getCategories()
          },
        },
      ],
    });

    await alert.present();

    this.isHidden = false
  }

  async editCategory(id: any, name: string, description: string){
    this.isHidden = true

    this.category = {
      _id: id,
      name,
      description
    }
  }

  updateCategory(form: NgForm) {
    this.categoryService.patchCategory(form.value).subscribe(
      res => {
        // console.log(res);
        
        this.getCategories()
        this.isHidden = false
        this.categoryAlerts.updateCategory()
      },
      err => {
        console.log('error')
      }
    )
  }

  closeUpdate() {
    this.isHidden = false

    this.category = {
      _id: '',
      name: '',
      description: ''
    }
  }

  showRefresh(): void {
    if(!this.created === undefined){
      if(this.created == 0){
        this.isRefresh = true
      } else{
        this.isRefresh = true
      }
    }
  }

  updateTable() {
    this.getCategories()
  }
}
