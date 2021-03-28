import { Button, Result } from 'antd';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { AssetForm } from '../components/AssetForm';
import { assetListPath } from '../../navigation';
import { RootStoreContext } from '../../../models/modelsContextProvider';
import { AssetItem } from '../../../api/assetApi';
import { LoaderBlock } from '../../../components/LoaderBlock';

export interface EditAssetRouteMatchParams {
  id: string;
}

export interface EditAssetRouteProps extends EditAssetRouteMatchParams {
  history: RouteComponentProps['history'],
}

class EditAssetRouteComponent extends React.Component<EditAssetRouteProps> {
  static contextType = RootStoreContext;

  context!: React.ContextType<typeof RootStoreContext>;

  async componentDidMount() {
    const { assets } = this.context!;
    if (!assets.items.length) {
      await assets.fetchItems();
    }
  }

  private handleSubmit = async (assetData: AssetItem) => {
    const { history } = this.props;
    const { assets } = this.context!;

    await assets.updateItem(assetData);
    history.push(assetListPath);
  };

  render() {
    const { assets } = this.context!;
    const { id } = this.props;

    if (!assets.isInitiated) {
      return (
        <LoaderBlock />
      );
    }

    const foundAsset = assets.items.find((asset) => asset.id === id);
    if (!foundAsset) {
      return (
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={<Button type="primary"><Link to={assetListPath}>Back to Assets</Link></Button>}
        />
      );
    }

    return (
      <AssetForm data={foundAsset} onSubmit={this.handleSubmit} submitButtonText="Update" title="Edit Asset Page" />
    );
  }
}

export const EditAssetRoute = observer(EditAssetRouteComponent);
