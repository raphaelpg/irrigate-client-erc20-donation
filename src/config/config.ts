const SERVER = {
  environment: "prod",
  serverUrl: `https://www.future-space.org`,
  getAssociations: '/api/associations',
  addAssociation: '/api/association/add',
  deleteAssociation: '/api/association/delete',
  updateAssociation: '/api/association/update',
  getUser: '/api/user',
  signUp: '/api/user/add',
	logIn: '/api/user/login',
  deleteUser: '/api/user/delete',
	updateUser: '/api/user/updateSubscriptions',
  sendMessage: '/api/message/add',
	sendDonation: '/api/donation/add',
	deleteDonation: '/api/donation/delete'
};

// const SERVER = {
//   environment: "test",
//   serverUrl: `http://localhost:8080`,
//   getAssociations: '/api/associations',
//   addAssociation: '/api/association/add',
//   deleteAssociation: '/api/association/delete',
//   updateAssociation: '/api/association/update',
//   getUser: '/api/user',
//   signUp: '/api/user/add',
// 	logIn: '/api/user/login',
//   deleteUser: '/api/user/delete',
// 	updateUser: '/api/user/updateSubscriptions',
//   sendMessage: '/api/message/add',
// 	sendDonation: '/api/donation/add',
// 	deleteDonation: '/api/donation/delete'
// };

const WEB3 = {
	erc20Name: "dai",
	erc20Address: "0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F", // Mumbai DAI ERC20 address
	irrigateAddress: "0x24e8bC880dAca5828572Ec9dB122Bd9966FE63be", // Mumbai Irrigate deployed address
	// networkId: 137 //Matic
	// networkId: 5777, //Ganache 7545
	networkId: 80001, //Mumbai
};

const CATEGORIES = [
	'All', 
	'Animal Protection', 
	'Development', 
	'Education', 
	'Environment', 
	'Health', 
	'Human Rights'
];

const LOCATIONS = [
	'Anywhere', 
	'Africa', 
	'America', 
	'Asia', 
	'Europe', 
	'Oceania', 
	'Poles'
];

const FILTERS = [
	{
		name: "Categories",
		keys: CATEGORIES
	},
	{
		name: "Locations",
		keys: LOCATIONS
	}
]

const config = {
  server: SERVER,
	filters: FILTERS,
	web3: WEB3
};

export default config;
