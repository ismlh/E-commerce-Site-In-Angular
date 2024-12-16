export interface IUserMessage {
  id: string;
  Name: string;
  Email: string;
  Addrees: {
    City: string;
    Street: string;
  };
  Notes: string;
  Phones: [];
}
