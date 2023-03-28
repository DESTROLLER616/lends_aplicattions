import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { LOADIPHLPAPI } from 'dns';
import { Section } from 'src/models/section.interface';
import { AlertsService } from 'src/services/alerts/alerts.service';
import { LogService } from 'src/services/log.service';
import { SectionsService } from 'src/services/sections/sections.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.page.html',
  styleUrls: ['./sections.page.scss'],
})
export class SectionsPage implements OnInit {

  public archive: any = []
  public preview: string = ''
  public photo: any = []

  constructor(private sectionService: SectionsService, private alert: AlertsService, private sanitizer: DomSanitizer) { }

  image: string = ''

  section: Section = {
    title: '',
    image: []
  }

  sec = {
    title: '',
    image: []
  }

  ngOnInit() {
  }

  cleanForm(form: NgForm) {
    return form.reset()
  }

  addSection(form: NgForm) {
    console.log(this.archive)

    const formulario = new FormData()

    formulario.append('title', this.section.title)
    formulario.append('image', this.archive[0])

    this.sectionService.createSection(formulario).subscribe(
      res => {
        console.log(res);
        this.cleanForm(form)
        this.alert.createSection()
      }, err => {
        console.log(this.sec);
        console.error(err);
      }
    )
  }

  updateSection() {

  }

  showImage(event: any) {
    console.log(event.target.files);

    this.photo = event.target.files[0]

    this.archive.push(event.target.files[0])

    console.log(this.archive[0]);
    
    this.photoToBase64(this.photo).then((image: any) => {
      this.preview = image.base
      console.log(image);
    })

    console.log(this.preview);

    // this.archive.push(photo)

    // console.log(photo);
  }

  photoToBase64 = async ($event: any) => new Promise( (resolve) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event)
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg)
      const reader = new FileReader()
      reader.readAsDataURL($event)
      reader.onload = () => {
        resolve({
          blob: $event,
          image,
          base: reader.result
        })
      }

      reader.onerror = error => {
        resolve({
          base:null
        })
      }

    } catch(e) {
      null
    }
  })
}