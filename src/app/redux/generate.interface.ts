export interface GenerateEmailSignatureForm {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  mobileNumber: string;
  imageUrl: string;
}

export interface Navigator {
  msSaveOrOpenBlob: (blobOrBase64: Blob | string, filename: string) => void;
}
