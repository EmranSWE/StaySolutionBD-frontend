export interface IMeta {
  limit: number;
  page: number;
  size: number;
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessage: IGenericErrorMessage[];
};
export type IGenericErrorMessage = {
  path: number | number;
  message?: string;
};
