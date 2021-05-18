import config from '../config/config';
import { IAssociation } from '../interfaces/Association';

const getAssociationsList = async () => {
  return fetch(config.server.serverUrl + config.server.getAssociations)
  .then(response => response.json())
};

const addAssociation = async (newAssociation: IAssociation) => {
  return fetch(config.server.serverUrl + config.server.addAssociation, {
    method: 'POST',
    body: JSON.stringify(newAssociation),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  .then(res => res.json())
} 

export default {
  getAssociationsList,
  addAssociation
}