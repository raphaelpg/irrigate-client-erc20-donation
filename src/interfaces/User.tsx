export interface IUser {
	date?: string,
	email: string, 
	password: string,
	passwordConfirmation?: string,
	token?: string,
	subscribedAssociations?: string[]
};