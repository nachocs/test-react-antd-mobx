import axios from 'axios';

import { AssetLocalStorage } from './mock/assetLocalStorage';

export const RestClient = axios.create();

RestClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { method, url, data } = error.config;

    switch (method) {
      case 'delete': {
        const id = url.replace('/api/v1/assets/', '');
        return AssetLocalStorage.deleteAssetItem(id);
      }

      case 'get':
        return AssetLocalStorage.getAssetList();

      case 'post':
        return AssetLocalStorage.addAssetItem(JSON.parse(data));

      case 'put':
        return AssetLocalStorage.updateAssetItem(JSON.parse(data));

      default:
        throw new Error(`Method ${method} is not supported.`);
    }
  },
);
