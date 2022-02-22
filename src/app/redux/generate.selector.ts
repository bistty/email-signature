import {
  GenerateEmailSignatureFormState,
  generateEmailSignatureReducer,
} from './generate.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getState =
  createFeatureSelector<GenerateEmailSignatureFormState>('generateEmail');

export const getGenerateEmailSignatureForm = createSelector(
  getState,
  (state) => state.EmailSignatureFormData
);

export const getGenerate = createSelector(getState, (state) => state.display);
