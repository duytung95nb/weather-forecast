export interface BaseStateError {
    [key: string]: boolean;
}
export interface BaseContainerModel {
    error: BaseStateError;
}
