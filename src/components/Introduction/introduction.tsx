import React, { useState } from 'react';
import FadeIn from '../../effects/FadeIn';
import AddAssociationForm from "../../components/Forms/addAssociationForm";

const Introduction: React.FC = () => {

	const [displayForm, setDisplayForm] = useState<boolean>(false);

	const handleAssociation = (status: boolean) => {
		setDisplayForm(status);
	};

	return (
		<div className="introduction">
			<FadeIn className="introduction-container" yDistance={-30} triggerOnce={true}>
				<div className="introduction-left" >
					<h2 className="introduction-left-title">Associations: register and receive donations from all over the world</h2>
					<button 
						className="display-form-add-cause-button"
						onClick={() => handleAssociation(true)}	
					>
					Register your association
					</button>
				</div>
				<div className="introduction-right" >
					<h2 className="introduction-right-title">Donors: give directly or subscribe to monthly donations</h2>
					<div className="introduction-right-button-container">
						<button className="introduction-button" >One time donation</button>
						<button className="introduction-button" >Monthly subscription</button>
					</div>
				</div>
			</FadeIn>
			<AddAssociationForm 
				handleAssociation={handleAssociation}
				displayForm={displayForm}
			/>
		</div>
	);
};

export default Introduction;