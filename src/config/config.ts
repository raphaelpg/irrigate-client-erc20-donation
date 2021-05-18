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
  sendMessage: '/api/message/add'
};

const WEB3 = {
	dai: "0x81bE9d52b6E106e5cba863Db3E4F09fF4BfB6362",
	irrigate: "0xcF004941384b565799E4542b50a85fD71134bDC7",
	type: "ws",
	rpc: "ws://127.0.0.1:7545"
}

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
