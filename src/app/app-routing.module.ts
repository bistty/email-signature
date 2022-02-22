import { EmailSignatureComponent } from './email-signature/email-signature.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailFormComponent } from './generate-email-form/emailform.component';

const routes: Routes = [
  { path: '', component: EmailFormComponent, pathMatch: 'full' },
  { path: 'generate', component: EmailFormComponent },
  { path: 'email-signature', component: EmailSignatureComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
