
export enum GENDER {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export type Subscription = {
  email: string,
  dateOfBirth: number,
  flagForConsent: boolean,
  newsletterId: string
  firstName: string,
  gender: GENDER
};