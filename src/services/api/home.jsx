import fetch from 'isomorphic-fetch';
import axios from 'axios';

// export const songsList = async (term = '', offset = 0, limit = 25) => {
//     try {
//         const search = term ? term : `""`;
//         const URL = `https://itunes.apple.com/search/?term=${ search }&offset=${ offset }&limit=${ limit }`;
//         const get = await fetch(`${ URL }`);
//         const result = await get.json();
//         console.log(result)
//         return result.results;
//     } catch (error) {
//         throw error;
//     }

// };
export const songsList = async (term = '', offset = 0, limit = 25) => {
    try {
        const search = term ? term : `""`;
        const URL = `https://itunes.apple.com/search/?term=${ search }&offset=${ offset }&limit=${ limit }`;
        const res = await axios.get(`${URL}`)
        return res.data.results;
    } catch (err) {
        return [];
    }
}


