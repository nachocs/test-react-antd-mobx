import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { AssetForm } from '../components/AssetForm';
import { RootStoreContext } from '../../../models/modelsContextProvider';
import { NewAssetItem } from '../../../api/assetApi';
import { assetListPath } from '../../navigation';

interface NewAssetRouteProps {
  history: RouteComponentProps['history'],
}

export class NewAssetRoute extends React.Component<NewAssetRouteProps> {
  static contextType = RootStoreContext;

  context!: React.ContextType<typeof RootStoreContext>;

  private handleSubmit = async (assetData: NewAssetItem) => {
    const { history } = this.props;
    const { assets } = this.context!;

    await assets.addItem(assetData);
    history.push(assetListPath);
  };

  render() {
    return (
      <AssetForm onSubmit={this.handleSubmit} submitButtonText="Add" title="Add New Asset" />
    );
  }
}
