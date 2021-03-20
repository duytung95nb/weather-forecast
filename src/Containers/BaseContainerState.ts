export interface BaseStateError {
  [key: string]: boolean;
}
export interface BaseContainerState {
  error: BaseStateError;
  loadingData: boolean;
  errorMessage: string;
}
