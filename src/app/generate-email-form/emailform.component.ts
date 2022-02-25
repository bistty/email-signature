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
    // this.store.dispatch(
    //   sendForm({
    //     payload: {
    //       firstName: generateFormValue.firstName,
    //       lastName: generateFormValue.lastName,
    //       email: generateFormValue.email,
    //       mobileNumber: generateFormValue.mobileNumber,
    //       jobTitle: generateFormValue.jobTitle,
    //       imageUrl: this.dataUrl,
    //     },
    //   })
    // );
    this.displayData = {
      firstName: generateFormValue.firstName,
      lastName: generateFormValue.lastName,
      email: generateFormValue.email,
      mobileNumber: generateFormValue.mobileNumber,
      jobTitle: generateFormValue.jobTitle,
      imageUrl: this.dataUrl,
    };
    if (this.dataUrl) {
      this.downloadCsv();
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

  downloadCsv() {
    const htmlData = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Email Signature</title>
      </head>
      <body>
        <table
          cellpadding="0"
          cellspacing="0"
          style="width: 100%; max-width: 560px; margin-top: 50px"
        >
          <tr>
            <td width="20%" valign="top" style="padding-left: 50px">
              <div
                style="
                  background-image: url('https://res.cloudinary.com/email-signature/image/upload/v1645198924/email-signature-images/container_bwjyio.png');
                  background-size: cover;
                  height: 155px;
                  width: 100px;
                  min-width: 140px;
                  object-fit: cover;
                  padding-top: 30px;
                "
              >
                <span style="padding-left: 88px">
                  <img
                    src="${this.displayData.imageUrl}"
                    alt=""
                    width="110"
                    height="110"
                    style="border-radius: 50%"
                  />
                </span>
              </div>
            </td>
            <td width="50%" valign="top" style="padding-left: 90px">
              <h3
                style="
                  font-size: 20px;
                  font-family: Arial, Helvetica, sans-serif;
                  line-height: 0.5;
                  padding-top: 0;
                "
              >
              ${this.displayData.firstName}
              ${this.displayData.lastName.toUpperCase()}
              </h3>
              <p
                style="
                  font-size: 13px;
                  padding-left: -10px;
                  font-family: Arial, Helvetica, sans-serif;
                "
              >
                ${this.displayData.jobTitle}
              </p>
              <div style="display: flex; padding-top: 10px">
                <div
                  style="
                    display: flex;
                    font-family: Arial, Helvetica, sans-serif;
                    margin-left: -15px;
                    padding-top: 10px;
                  "
                >
                  <img
                    src="https://res.cloudinary.com/email-signature/image/upload/v1645199128/email-signature-images/phone_location_m9t02i.png"
                    alt=""
                    width="70"
                    height="85"
                    style="padding-right: 4px"
                  />
                  <div>
                    <p style="font-size: 13px">
                      ${this.displayData.mobileNumber}
                    </p>
                    <p style="font-size: 13px; padding-top: 5px">
                      22 Idowu Taylor St, Victoria Island, Lagos.
                    </p>
                  </div>
                </div>
                <div
                  style="
                    display: flex;
                    font-family: Arial, Helvetica, sans-serif;
                    margin-left: 20px;
                    padding-top: 10px;
                  "
                >
                  <img
                    src="https://res.cloudinary.com/email-signature/image/upload/v1645199126/email-signature-images/email-address_jpkpha.png"
                    alt=""
                    width="40"
                    height="85"
                    style="padding-right: 4px"
                  />
                  <div>
                    <p style="font-size: 13px">https://www.oryx-wa.com</p>
                    <p style="font-size: 13px; padding-top: 15px">
                      ${this.displayData.email}
                    </p>
                  </div>
                </div>
              </div>
            </td>
            <td width="25%" valign="top" style="padding-left: 100px">
              <img
                src="https://res.cloudinary.com/email-signature/image/upload/v1645199304/email-signature-images/oryx-logo_xhq8b7.png"
                alt=""
                width="150px"
                height="100px"
                style="object-fit: contain"
              />
              <p
                style="
                  font-size: 12px;
                  font-family: Arial, Helvetica, sans-serif;
                  line-height: 0.5;
                "
              >
                Innovative Business Solutions
              </p>
              <div
                style="
                  padding-top: 4px;
                  display: flex;
                  background-image: url('https://res.cloudinary.com/email-signature/image/upload/v1645199128/email-signature-images/lowerbackgroud_cmaet7.png');
                  background-size: contain;
                  background-repeat: no-repeat;
                "
              >
                <a
                  href="https://www.facebook.com/OryxafricaIT?ref=bookmarks"
                  style="padding: 3px 25px 0px 25px"
                >
                  <img
                    src="https://res.cloudinary.com/email-signature/image/upload/v1645199128/email-signature-images/facebook1_wh4px2.png"
                    width="25"
                    height="25"
                    alt=""
                    style="display: inline-block"
                  />
                </a>
                <a
                  href="https://www.instagram.com/oryxafricait/"
                  style="padding-right: 25px; padding-top: 3px"
                >
                  <img
                    src="https://res.cloudinary.com/email-signature/image/upload/v1645199128/email-signature-images/instagram1_tkls6t.png"
                    width="28"
                    height="28"
                    alt=""
                    style="display: inline-block"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/company/oryx-computer-system-w-a-/mycompany/"
                  style="padding-right: 25px; padding-top: 3px"
                >
                  <img
                    src="https://res.cloudinary.com/email-signature/image/upload/v1645199128/email-signature-images/linkedin1_il0pdq.png"
                    width="25"
                    height="25"
                    alt=""
                    style="display: inline-block"
                  />
                </a>
              </div>
            </td>
          </tr>
        </table>
      </body>
    </html>
    `;
    const csvfile = new Blob([htmlData], { type: 'text/html' });
    let a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    let blob = new Blob([htmlData], { type: 'text/html' });
    let url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = `${this.displayData.firstName}emailSignature.html`;
    a.click();
  }
}
