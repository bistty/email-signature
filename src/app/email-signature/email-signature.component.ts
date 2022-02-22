import {
  getGenerate,
  getGenerateEmailSignatureForm,
} from './../redux/generate.selector';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GenerateEmailSignatureFormState } from '../redux/generate.reducer';
import { GenerateEmailSignatureForm } from '../redux/generate.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-email-signature',
  templateUrl: './email-signature.component.html',
  styleUrls: ['./email-signature.component.scss'],
})
export class EmailSignatureComponent implements OnInit {
  constructor(private store: Store<any>) {}
  displayData$: Observable<GenerateEmailSignatureForm>;
  displayData: GenerateEmailSignatureForm;
  ngOnInit(): void {
    this.displayData$ = this.store.select(getGenerateEmailSignatureForm);
    this.displayData$.subscribe((data) => {
      this.displayData = data;
    });
  }
}
