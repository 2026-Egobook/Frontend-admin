import { useEffect, useState } from 'react';
import {
  getContentStatistics,
  getCurrencyStatistics,
  getUserStatistics,
  getWithdrawalStatistics,
} from '../api/statisticsApi';

export function useUserStatistics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getUserStatistics().then(setData);
  }, []);

  return { data };
}

export function useContentStatistics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getContentStatistics().then(setData);
  }, []);

  return { data };
}

export function useCurrencyStatistics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getCurrencyStatistics().then(setData);
  }, []);

  return { data };
}

export function useWithdrawalStatistics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getWithdrawalStatistics().then(setData);
  }, []);

  return { data };
}