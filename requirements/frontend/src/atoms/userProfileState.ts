import { atom, selector } from 'recoil';
import { authState } from './authState';
import { UserDataType } from './userDataType';

interface ProfileType extends UserDataType {
  mfaNeed: boolean;
}

export const userProfileState = atom<ProfileType>({
  key: 'userProfile',
  default: selector({
    key: 'userProfile/default',
    get: ({ get }) => {
      const { token } = get(authState);
      if (token === null) throw new Error();

      return useRequestUserProfile(token);
    },
  }),
});

const useRequestUserProfile = async (token: string): Promise<ProfileType> => {
  console.log(token);
  const response = await fetch(`${import.meta.env.VITE_BACKEND_EP}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error();

  const data = await response.json();
  return data;
};
