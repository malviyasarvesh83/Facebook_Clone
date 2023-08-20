import axios from 'axios';

const URL = 'http://localhost:8000';

export const getProducts = async () => {
    try {
        return await axios.get(`${URL}/getProducts`);
    } catch (error) {
        console.log('Error while calling Get Products Api', error.message);
    }
}

export const getProductById = async (id) => {
    try {
        return await axios.get(`${URL}/getProducts/${id}`);
    } catch (error) {
        console.log('Error while calling Get Product Details Api', error.message);
    }
}

export const sendUserNumber = async (data) => {
    try {
        return await axios.post(`${URL}/user/signup`, data);
    } catch (error) {
        console.log('Error while Sending Number Api', error.message);
    }
}

export const requestLoginOtp = async (data) => {
    try {
        return await axios.post(`${URL}/user/login`, data);
    } catch (error) {
        console.log('Error while calling Request Login Otp Api', error.message);
    }
}