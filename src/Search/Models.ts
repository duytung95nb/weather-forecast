import { BaseContainerModel } from '../BaseModels/BaseContainerModel';

export interface Location {}
export interface SearchState extends BaseContainerModel {
    searchText: string;
    locations: Location[];
}
