import { flow, types } from 'mobx-state-tree';
import { AssetItemModel } from './assetItemModel';
import { AssetAPI, AssetItem, NewAssetItem } from '../../api/assetApi';

/* eslint-disable no-param-reassign */
export const AssetListModel = types.model(
  'AssetListModel',
  {
    items: types.optional(types.array(AssetItemModel), []),
    isCreating: types.optional(types.boolean, false),
    isDeleting: types.optional(types.boolean, false),
    isLoading: types.optional(types.boolean, false),
    isInitiated: types.optional(types.boolean, false),
  },
)
  .actions((self) => ({
    fetchItems: flow(function* fetchItems() {
      self.isLoading = true;
      try {
        self.items = yield AssetAPI.getItemsList();
      } finally {
        self.isLoading = false;
        self.isInitiated = true;
      }
    }),
  }))
  .actions((self) => ({
    addItem: flow(function* addItem(asset: NewAssetItem) {
      self.isCreating = true;
      try {
        yield AssetAPI.addItem(asset);
      } finally {
        self.isCreating = true;
      }
      yield self.fetchItems();
    }),
  }))
  .actions((self) => ({
    deleteItem: flow(function* deleteItem(id: AssetItem['id']) {
      self.isDeleting = true;
      try {
        yield AssetAPI.deleteItem(id);
      } finally {
        self.isDeleting = false;
      }
      yield self.fetchItems();
    }),
  }))
  .actions((self) => ({
    updateItem: flow(function* deleteItem(asset: AssetItem) {
      self.isDeleting = true;
      try {
        yield AssetAPI.updateItem(asset);
      } finally {
        self.isDeleting = false;
      }
      yield self.fetchItems();
    }),
  }));
/* eslint-enable no-param-reassign */
