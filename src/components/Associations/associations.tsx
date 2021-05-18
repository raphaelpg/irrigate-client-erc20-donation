import React, { useState, useEffect, useContext } from 'react';
import { IAppContext, AppContext } from '../../context/AppContext';
import { IFilter } from '../../interfaces/Filter';
import Filter from '../Filters/filter'; 
import List from './list';

const Associations: React.FC = () => {
	const componentContext: IAppContext | null = useContext(AppContext);
	const contextFilters = componentContext.filters;
	const CATEGORIES = componentContext.categories;
	const LOCATIONS = componentContext.locations;
	const [ filters, setFilters ] = useState<IFilter[]>([]);
	const [ selectedCategory, setSelectedCategory ] = useState<string>('');
	const [ selectedLocation, setSelectedLocation ] = useState<string>('');

	useEffect(() => {
		setFilters(contextFilters);
		setSelectedCategory(CATEGORIES[0]);
		setSelectedLocation(LOCATIONS[0]);
	}, [CATEGORIES[0], LOCATIONS[0]]);

	const setCategory = (cat: string) => {
		setSelectedCategory(cat);
	};

	const setLocation = (location: string) => {
		setSelectedLocation(location);
	};

	if (filters.length > 0) {
		return (
			<div className="projects-container">
				<Filter filterName={ filters[0].name + ":" } filterKeys={ filters[0].keys! } setFilter={ setCategory } />
				<Filter filterName={ filters[1].name + ":" } filterKeys={ filters[1].keys! } setFilter={ setLocation } />
				<List 
					selectedCategory={ selectedCategory }
					selectedLocation={ selectedLocation }
				/>
			</div>
		);
	} else {
		return (
			<div className="projects-container">
				<List 
					selectedCategory={ selectedCategory }
					selectedLocation={ selectedLocation }
				/>
			</div>
		);
	}
};


export default Associations;