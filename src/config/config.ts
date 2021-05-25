// const SERVER = {
//   environment: "prod",
//   serverUrl: `https://www.future-space.org`,
//   getAssociations: '/api/associations',
//   addAssociation: '/api/association/add',
//   deleteAssociation: '/api/association/delete',
//   updateAssociation: '/api/association/update',
//   getUser: '/api/user',
//   signUp: '/api/user/add',
// 	 logIn: '/api/user/login',
//   updateUser: '/api/user/updateSubscriptions',
//   deleteUser: '/api/user/delete',
//   sendMessage: '/api/message/add'
// };

const SERVER = {
  environment: "test",
  serverUrl: `http://localhost:8080`,
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

const WEB3 = {
	erc20Name: "dai",
	erc20Address: "0x4E34127A67577327B87CD13623aB53FCC0d54a08",
	irrigateAddress: "0xBDCb6839245f007FF62485eCd4935E17167a2A0B",
	// networkId: 137 //Matic
	networkId: 5777, //Ganache 7545
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
