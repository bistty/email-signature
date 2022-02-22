import { EmailFormComponent } from './generate-email-form/emailform.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmailSignatureComponent } from './email-signature/email-signature.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { generateEmailSignatureReducer } from './redux/generate.reducer';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxCopyPasteModule } from 'ngx-copypaste';

@NgModule({
  declarations: [AppComponent, EmailSignatureComponent, EmailFormComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ImageCropperModule,
    NgxCopyPasteModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('generateEmail', generateEmailSignatureReducer),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
