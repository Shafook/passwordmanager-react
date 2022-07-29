import axios from 'axios';
import defaultUser from '../utils/default-user';
import LocalStorageService from '../localstorage/LocalStorageService';

const AUTH_URL = 'https://localhost:44311/api/Account';
const localStorageService = LocalStorageService.getService();

export async function signIn(email, password) {
  try {
    // Send request
    const { data } = await axios.post(
      `${AUTH_URL}/login`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    const tokenObj = {
      accessToken: data['token'],
      refreshToken: data.refreshToken['token'],
    };
    axios.defaults.headers.common['Authorization'] = `Bearer ${data['token']}`;

    localStorageService.setToken(tokenObj);

    return {
      isOk: data.response.status === 'Success',
      status: data.response.status,
      data: data.profile,
      message: data.response.message,
    };
  } catch (err) {
    return {
      isOk: false,
      message: err?.response?.data?.message
        ? err?.response?.data?.message
        : 'Authentication failed',
    };
  }
}

export async function signOut() {
  try {
    // Send request
    const response = await axios.delete(`${AUTH_URL}/logout`);
    localStorageService.clearToken();
    return {
      isOk: true,
    };
  } catch {
    return {
      isOk: false,
    };
  }
}

export async function getUser() {
  try {
    // Send request
    const response = await axios.get(`${AUTH_URL}/Get`);
    return {
      isOk: true,
      data: response.data,
      // data: defaultUser,
    };
  } catch {
    return {
      isOk: false,
    };
  }
}

export async function createAccount(
  email,
  password,
  firstName,
  lastName,
  phoneNumber,
  roles
) {
  try {
    // Send request
    const result = await axios.post(`${AUTH_URL}/register`, {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      roles,
    });

    return {
      isOk: true,
      message: result.message,
      status: result.status,
    };
  } catch {
    return {
      isOk: false,
      message: 'Failed to create account',
    };
  }
}

export async function verifyEmail(userid, token) {
  try {
    const { data } = await axios.post(`${AUTH_URL}/verify`, {
      userid,
      token,
    });

    return {
      isOk: true,
      message: data.response.message,
      status: data.response.status,
    };
  } catch {
    return {
      isOk: false,
      message: 'Failed to verify email',
    };
  }
}

export async function changePassword(userId, token, password, confirmPassword) {
  try {
    // Send request
    console.log(userId, password, token);
    const response = await axios.post(`${AUTH_URL}/reset-password`, {
      userId,
      token,
      password,
      confirmPassword,
    });

    console.log(response);

    return {
      isOk: true,
    };
  } catch (err) {
    console.log(err);
    return {
      isOk: false,
      message: 'Failed to change password',
    };
  }
}

export async function resetPassword(email) {
  try {
    // Send request
    console.log(email);
    const response = await axios.post(`${AUTH_URL}/forgot-password`, {
      email,
    });

    console.log(response);

    return {
      isOk: true,
    };
  } catch {
    return {
      isOk: false,
      message: 'Failed to reset password',
    };
  }
}
