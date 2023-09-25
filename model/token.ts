export default interface Token {
  email: string;
  userToken: string | number;
  userTokenExpiration: number;
}
