import { RestClient } from './restClient';

interface NewAssetItem {
  name: string;
  description: string;
}

interface AssetItem extends NewAssetItem {
  id: string;
}

export type { NewAssetItem, AssetItem };

const basePath = '/api/v1/assets';

export class AssetAPI {
  static async addItem(asset: NewAssetItem): Promise<boolean> {
    await RestClient.post(basePath, asset);
    return true;
  }

  static async deleteItem(id: AssetItem['id']): Promise<boolean> {
    await RestClient.delete(`${basePath}/${id}`);
    return true;
  }

  static async getItemsList(): Promise<AssetItem[]> {
    return RestClient.get(basePath);
  }

  static async updateItem(asset: AssetItem): Promise<AssetItem> {
    return RestClient.put(`${basePath}/${asset.id}`, asset);
  }
}
