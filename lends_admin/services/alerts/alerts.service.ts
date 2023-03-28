import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { take } from 'rxjs';
import { CategoriesService } from '../categories/categories.service';
import { SectionsService } from '../sections/sections.service';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  create(arg0: { header: string; buttons: { text: string; role: string; handler: () => void; }[]; }) {
    throw new Error('Method not implemented.');
  }

  constructor(private alertController: AlertController, private categoriesService: CategoriesService, private sectionCategory: SectionsService) { }

  async deleteCategory(name: string, id:string){
    const alert = await this.alertController.create({
      cssClass: 'alert-prompt',
      header: 'Prompt!',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Placeholder 1'
        },
        {
          name: 'name2',
          type: 'text',
          id: 'name2-id',
          value: 'hello',
          placeholder: 'Placeholder 2'
        },
        // multiline input.
        {
          name: 'paragraph',
          id: 'paragraph',
          type: 'textarea',
          placeholder: 'Placeholder 3'
        },
        {
          name: 'name3',
          value: 'http://ionicframework.com',
          type: 'url',
          placeholder: 'Favorite site ever'
        },
        // input date with min & max
        {
          name: 'name4',
          type: 'date',
          min: '2017-03-01',
          max: '2018-01-12'
        },
        // input date without min nor max
        {
          name: 'name5',
          type: 'date'
        },
        {
          name: 'name6',
          type: 'number',
          min: -5,
          max: 10
        },
        {
          name: 'name7',
          type: 'number'
        },
        {
          name: 'name8',
          type: 'password',
          placeholder: 'Advanced Attributes',
          cssClass: 'specialClass',
          attributes: {
            maxlength: 4,
            inputmode: 'decimal'
          }
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });
    await alert.present();
  }

  async updateCategory() {
    const alert = await this.alertController.create({
      header: 'Updated',
      subHeader: 'Updated Category',
      message: 'Category has been updated successfully!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async createSection() {
    const alert = await this.alertController.create({
      header: 'Created',
      subHeader: 'Section created',
      message: 'Section has been created, please refresh this page',
      buttons: ['OK']
    })

    await alert.present();
  }

  async deleteSection(id: any, title: string, url: string) {
    const alert = await this.alertController.create({
      header: `Are you want to delete ${title}`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('cancel');
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.sectionCategory.deleteSection(id)
              .pipe(
                take(1)
              ).subscribe( (res: any) => {
                console.log('borrado');
              } )
          },
        },
      ],
    });

    await alert.present();
  }
}
