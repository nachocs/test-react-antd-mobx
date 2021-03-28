import { types } from 'mobx-state-tree';

export const AssetItemModel = types.model(
  'AssetItemModel',
  {
    id: types.string,
    name: types.string,
    description: types.optional(types.string, ''),
  },
);
