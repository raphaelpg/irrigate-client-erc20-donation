import React, { useState, useEffect } from 'react';
const images = require.context('../../images', true);

interface IFilterProps {
	filterName: string,
	filterKeys: string[],
	setFilter: (filter: string) => void
};

const Filter: React.FC<IFilterProps> = (props) => {
	const [ selectedFilter, setSelectedFilter ] = useState<string>('');

	useEffect(() => {
		setSelectedFilter(props.filterKeys[0])
	}, [props.filterKeys[0]]);

	const handleFilterClick = ({ target }: any) => {
		if (target.title) {
      setSelectedFilter(target.title);
      props.setFilter(target.title);
    } else if (target.innerHTML) {
      setSelectedFilter(target.innerHTML);
      props.setFilter(target.innerHTML);
    } else {
      setSelectedFilter(target.name);
      props.setFilter(target.name);
    };
	};

	return (
		<div className="irrigate-filter">
			<div className="filter-title-container">
        <div className="causes-list-filter-title">{props.filterName}</div>
      </div>
			{props.filterKeys?.map((key: string) => {
				return (
					<div 
						key={key} 
						className={selectedFilter === key ? 'filter-and-logo-container-active' : 'filter-and-logo-container'}
						title={key} 
						onClick={handleFilterClick} 
						onKeyDown={handleFilterClick}
						role="button" 
						tabIndex={0}
					>
						<img className="cause-filter-logo" alt={key} src={images(`./${key}.jpg`)} name={key} />
						<div className="causes-list-filter-name">{key}</div>
					</div>
				)
			})}
	  </div>
	);
};

export default Filter;