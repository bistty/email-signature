import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';
import { credentials } from 'src/environments/environment';
import { sendForm } from '../redux/generate.action';
import { GenerateEmailSignatureForm } from '../redux/generate.interface';

@Component({
  selector: 'app-emailform',
  templateUrl: 'emailform.component.html',
  styleUrls: ['emailform.component.scss'],
})
export class EmailFormComponent implements OnInit, OnChanges {
  generateForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  mobileNumber: FormControl;
  jobTitle: FormControl;
  imageUrl: FormControl;
  croppedImage: any;
  fileToReturn: any;
  imgChangeEvt: any = '';
  copyCode = false;
  dataUrl: string;
  generateData = false;
  displayData: GenerateEmailSignatureForm;
  constructor(private store: Store<any>, private router: Router) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dataUrl) {
      this.generateData = true;
      console.log(this.dataUrl);
    }
  }
  ngOnInit() {
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.email = new FormControl('', Validators.required);
    this.mobileNumber = new FormControl('', Validators.required);
    this.jobTitle = new FormControl('', Validators.required);
    this.imageUrl = new FormControl('', Validators.required);

    this.generateForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      mobileNumber: this.mobileNumber,
      jobTitle: this.jobTitle,
      imageUrl: this.imageUrl,
    });
  }

  generateSignature(generateFormValue: any) {
    this.store.dispatch(
      sendForm({
        payload: {
          firstName: generateFormValue.firstName,
          lastName: generateFormValue.lastName,
          email: generateFormValue.email,
          mobileNumber: generateFormValue.mobileNumber,
          jobTitle: generateFormValue.jobTitle,
          imageUrl: this.dataUrl,
        },
      })
    );
    if (this.dataUrl) {
      this.router.navigate(['/email-signature']);
    }
  }

  onFileSelected(event) {
    //event.target.files[0].name = this.firstName;
    this.imgChangeEvt = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.fileToReturn = base64ToFile(this.croppedImage);
    return this.fileToReturn;
  }

  save() {
    const file: File = this.fileToReturn;
    const data = new FormData();
    data.append('file', file);
    data.append('file', file);
    data.append('upload_preset', credentials.cloudinary_preset_name);
    data.append('cloud_name', credentials.cloudinary_cloud_name);
    data.append('api_key', credentials.cloudinary_api_key);
    data.append('api_secret', credentials.cloudinary_secret_key);
    fetch(
      `https://api.cloudinary.com/v1_1/${credentials.cloudinary_cloud_name}/image/upload`,
      {
        method: 'POST',
        body: data,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        data.url; //url to your image
        this.dataUrl = data.url;
      })
      .catch((e) => {
        console.log(e);
      });
  }
  copy() {
    this.copyCode = true;
  }
}
