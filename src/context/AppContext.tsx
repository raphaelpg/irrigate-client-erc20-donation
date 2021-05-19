import { createContext } from 'react';
import { IAssociation } from '../interfaces/Association';
import { IFilter } from '../interfaces/Filter';

export interface IAppContext {
  filters: IFilter[],
  categories: string[],
  locations: string[],
  associations: IAssociation[],
  retrieveAssociationsList: () => void
};

export const AppContext = createContext<IAppContext>(undefined!);