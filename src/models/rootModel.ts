import { types } from 'mobx-state-tree';
import { AssetListModel } from './assets/assetListModel';

const RootModel = types.model('RootModel', {
  assets: types.optional(AssetListModel, {}),
});

export type RootModelType = typeof RootModel;
export const rootStore = RootModel.create();
