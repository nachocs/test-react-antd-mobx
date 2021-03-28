import type { AssetItem, NewAssetItem } from '../assetApi';
import assetListMock from './assetListMock.json';

const assetLocalStorage = window.localStorage;
const assetItemsKey = 'assets';

export class AssetLocalStorage {
  static addAssetItem(assetData: NewAssetItem): void {
    const assets = this.getAssetList() || [];
    const newIndex = parseInt(assets[assets.length - 1]?.id, 10) || 0;

    if (!assetData.name) {
      throw new Error('Name should be specified.');
    }

    assets.push({
      ...assetData,
      id: String(newIndex + 1),
    });

    this.saveAssetList(assets);
  }

  static deleteAssetItem(id: string): void {
    const assets = this.getAssetList();
    if (!assets) {
      return;
    }

    const newAssets = assets.filter((asset) => asset.id !== id);
    if (newAssets.length !== assets.length) {
      this.saveAssetList(newAssets);
    }
  }

  private static hasItem(key: string): boolean {
    return assetLocalStorage.getItem(key) !== null;
  }

  static getAssetList(): AssetItem[] | null {
    if (!this.hasItem(assetItemsKey)) {
      return assetListMock;
    }

    return JSON.parse(assetLocalStorage.getItem(assetItemsKey) as string);
  }

  private static saveAssetList(assets: AssetItem[]): void {
    assetLocalStorage.setItem(assetItemsKey, JSON.stringify(assets));
  }

  static updateAssetItem(assetData: AssetItem): void {
    const assets = this.getAssetList() || [];

    if (!assetData.id || !assetData.name) {
      throw new Error('Required asset properties id and name should be present.');
    }

    const foundId = assets.findIndex((asset) => asset.id === assetData.id);
    if (foundId === -1) {
      this.addAssetItem(assetData);
      return;
    }

    assets.splice(foundId, 1, assetData);
    this.saveAssetList(assets);
  }
}
