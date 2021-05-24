import React, { useContext, useEffect, useState } from 'react';
import { Link, navigate } from 'gatsby';
import { IAppContext, AppContext } from '../../context/AppContext';
import FadeIn from '../../effects/FadeIn';
import { IAssociation } from '../../interfaces/Association';
import { IUser } from '../../interfaces/User';
import UserServices from '../../services/user.service';
import config from '../../config/config';
import { web3Services } from '../../services/web3.services';

interface IListProps {
	selectedCategory: string,
  selectedLocation: string
};

const List: React.FC<IListProps> = (props) => {
	const componentContext: IAppContext | null = useContext(AppContext);
	const associations: IAssociation[] | undefined = componentContext?.associations;
	const [user, setUser] = useState<IUser>();

	const addAssociation = (associationId: string) => {
		if (user) {
			const newUser = user;
			newUser.subscribedAssociations?.push(associationId);
			UserServices.update(newUser);
			localStorage.setItem("user", JSON.stringify(newUser));
			setUser(newUser);
			componentContext?.retrieveAssociationsList();
		} else {
			navigate("/login");
		}
	}

	const makeDonation = (name: string, address: string) => {
		if (localStorage.getItem("web3") == "connected") {
			console.log("sending tx to", name, address)
			const tx = {
				associationName: name,
				associationAddress: address,
				amount: config.web3.txAmount,
				currency: config.web3.erc20Name
			}
			web3Services.sendErc20Donation(tx, componentContext?.retrieveAssociationsList)
			// .then(() => {
			// 	componentContext?.retrieveAssociationsList();
			// })
		} else {
			alert("Connect Metamask first")
		}
	}
	
	useEffect(() => {
		componentContext?.retrieveAssociationsList();
		const user = UserServices.getCurrentUser();
		if (user) {
			setUser(user);
    } else {
			setUser(undefined);
		}
	}, []);

	if (associations != undefined) {
		return (
			<div className="causes-list-container">
				{associations
					.filter((association: any) => {
						if (props.selectedCategory === 'All' && props.selectedLocation !=='Anywhere') {
							return association.continent === props.selectedLocation;
						} else if (props.selectedCategory !== 'All' && props.selectedLocation ==='Anywhere') {
							return association.category === props.selectedCategory;
						} else if (props.selectedCategory !== 'All' && props.selectedLocation !=='Anywhere') {
							return (association.category === props.selectedCategory && association.continent === props.selectedLocation);
						} else {
							return association;
						};
					})
					.map((association, index) => {
						const { _id, name, description, link, category, continent, country, logo, address, totalDaiRaised } = association;
						const fundRaised = web3Services.convertFromWei(totalDaiRaised);
						return(
							<FadeIn className="cause-display" duration={1000} triggerOnce={true} key={index}>
									<div className="cause-logo-container">
										<img className="cause-logo" src={logo} alt={name} />
									</div>
									<h3 className="cause-text">{name}</h3>
									<p className="cause-text">{category}</p>
									<p className="cause-text">Activity's location: {continent}, {country}</p>
									<p className="cause-text">{description}</p>
									<a className="cause-text" href={link} target="_blank" rel="noopener noreferrer">{link}</a>
									{/* <p className="cause-number">Monthly donors: 2000 persons</p> */}
									{/* <p className="cause-number">Monthly donations: 1500 DAI</p> */}
									<p className="cause-number">Total funds raised: {fundRaised} {(config.web3.erc20Name).toUpperCase()}</p>
									{/* <p className="cause-number">Eth address: {address}</p> */}
									{ user?.subscribedAssociations?.includes(_id!) ? (
										<div className="manage-container">
											<Link className="manageAssociation-button" to="/account">Manage</Link>
										</div>
									) : (
										<button className="add-cause-to-your-list-button" name={_id} onClick={() => addAssociation(_id!)} >Add association to your donation stream</button>
									) }
									<button className="add-cause-to-your-list-button" name={_id} onClick={() => makeDonation(name!, address!)} >Make a donation in {(config.web3.erc20Name).toUpperCase()}</button>
							</FadeIn>
						);
					}
				)}
			</div>
		);
	} else {
		return (
			<div className="causes-list-container">Loading...</div>
		);
	};
};

export default List;