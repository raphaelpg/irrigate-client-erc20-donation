import React, { useEffect, useState, useContext } from 'react';
import { IAppContext, AppContext } from '../../context/AppContext';
import { IUser } from '../../interfaces/User';
import { IAssociation } from '../../interfaces/Association';
import UserServices from '../../services/user.service';

const UserAssociations: React.FC = () => {
  const componentContext: IAppContext | null = useContext(AppContext);
  const associations: IAssociation[] | undefined = componentContext?.associations;
  const [currentUser, setCurrentUser] = useState<IUser>();

  const removeItem: <T>(arr: Array<T>, value: T) => Array<T> = (arr ,val) => { 
    const index = arr.indexOf(val);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  const removeUserAssociation = (associationId: string) => {
    if (currentUser?.subscribedAssociations) {
      removeItem(currentUser?.subscribedAssociations, associationId);
			UserServices.update(currentUser);
			localStorage.setItem("user", JSON.stringify(currentUser));
      setCurrentUser(currentUser);
      componentContext?.retrieveAssociationsList();
		} else {
			return;
		}
  }

  useEffect(() => {
    const user = UserServices.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(undefined);
    }
    componentContext?.retrieveAssociationsList();
  }, []);

  return (
    <div className="user-causes-list-container">
      <h2 className="delete-label">Associations you are giving to:</h2>
      {associations.filter(asso => {
          if (currentUser?.subscribedAssociations?.includes(asso._id!)) return asso
        }).map((association: any) => {
          const {_id, name, description, link, category, continent, country, logo, address } = association;
          return(
            <div className="user-cause-display" key={_id}>
              <div className="user-cause-logo-container">
                <img className="cause-logo" src={logo} alt={name} />
              </div>
              <div>
                <h3 className="user-cause-text">{name}</h3>
                <p className="user-cause-text">{category}</p>
                <p className="user-cause-text">Activity's location: {continent}, {country}</p>
                <a className="user-cause-text" href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                <p className="cause-number">Eth address: {address}</p>
              </div>
              <div className="user-cause-right-container">
                <p className="user-cause-text">{description}</p>
                <button className="user-cause-delete-button" onClick={() => removeUserAssociation(_id)}>Remove</button>
              </div>
            </div>
          );
        })
      }
    </div>
  );
};

export default UserAssociations;