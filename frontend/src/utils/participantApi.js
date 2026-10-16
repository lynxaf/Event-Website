import axios from 'axios';
import { config } from '../configs';

const participantClient = axios.create({
  baseURL: `${config.apiUrl}/api/v1`,
});

participantClient.interceptors.request.use((request) => {
  const auth = localStorage.getItem('auth');
  if (auth) {
    const { token } = JSON.parse(auth);
    if (token) request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

export const getPublicEvents = (params = {}) =>
  participantClient.get('/events', { params });

export const getPublicEvent = (id) => participantClient.get(`/events/${id}`);

export const getParticipantPayments = (organizerId) =>
  participantClient.get(`/payments/${organizerId}`);

export const createCheckout = (payload) =>
  participantClient.post('/checkout', payload);

export const getParticipantOrders = () => participantClient.get('/orders');
