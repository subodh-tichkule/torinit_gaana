import fetch from 'isomorphic-fetch';

const loginParams = (email, password) => (
  {
    email: email.toLowerCase(),
    password
  }
);

export const loginService = async (email, password) => {
  try {
    const URL = 'https://reqres.in/api/login';
    const post = await fetch(`${ URL }`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginParams(email, password)),
    });
    return await post.json();
  } catch (error) {
    throw error;
  }
};
