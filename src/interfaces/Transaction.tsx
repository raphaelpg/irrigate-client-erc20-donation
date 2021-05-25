export interface ITransaction {
  associationName: string,
  associationAddress: string,
  amount: string,
  donorName?: string,
  donorEmail?: string,
  donorAddress?: string,
  currency: string,
  fundsStatus?: string
};