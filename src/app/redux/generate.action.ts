import { GenerateEmailSignatureForm } from './generate.interface';
import { createAction, props } from '@ngrx/store';

export const sendForm = createAction(
  'send email signature form[Generate]',
  props<{ payload: GenerateEmailSignatureForm }>()
);
