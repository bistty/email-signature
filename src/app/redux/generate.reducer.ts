import { sendForm } from './generate.action';
import { GenerateEmailSignatureForm } from './generate.interface';
import { createReducer, on } from '@ngrx/store';

export interface GenerateEmailSignatureFormState {
  EmailSignatureFormData: GenerateEmailSignatureForm;
  display: string;
}

export const initGenerateEmailSignatureFormState: GenerateEmailSignatureFormState =
  {
    EmailSignatureFormData: null,
    display: '',
  };
export const generateEmailSignatureReducer =
  createReducer<GenerateEmailSignatureFormState>(
    initGenerateEmailSignatureFormState,
    on(sendForm, (state, action): GenerateEmailSignatureFormState => {
      if (action.payload === null) {
        return state;
      }
      return {
        ...state,
        EmailSignatureFormData: action.payload,
      };
    })
  );
