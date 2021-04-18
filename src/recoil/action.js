import { selector } from 'recoil';
import { loginState } from './atoms';

export const loginSelector = selector({
    key : 'loginSelector',
    get: ({ get }) => {
        const token = get(loginState);
        return token;
    }
})