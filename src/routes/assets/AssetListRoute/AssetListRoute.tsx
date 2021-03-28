import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import {
  Button, Modal, Space, Table, Tooltip,
} from 'antd';
import * as React from 'react';
import { observer } from 'mobx-react';
import { generatePath, Link } from 'react-router-dom';

import { AssetItem } from '../../../api/assetApi';
import { RootStoreContext } from '../../../models/modelsContextProvider';
import { editAssetPath, newAssetPath } from '../../navigation';

import './AssetListRoute.css';

const { confirm } = Modal;

interface AssetListRouteProps {}

class AssetListRouteComponent extends React.Component<AssetListRouteProps> {
  static contextType = RootStoreContext;

  context!: React.ContextType<typeof RootStoreContext>;

  private tableColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '40%',
    }, {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    }, {
      title: 'Actions',
      key: 'actions',
      render: (text: string, asset: AssetItem) => {
        const { assets } = this.context!;
        const editLinkUrl = generatePath(editAssetPath, {
          id: asset.id,
        });

        return (
          <Space size="middle">
            <Tooltip title="Edit Asset">
              <Button><Link to={editLinkUrl}><EditOutlined /></Link></Button>
            </Tooltip>

            <Tooltip title="Delete Asset">
              <Button
                danger
                disabled={assets.isDeleting}
                onClick={() => this.showDeleteConfirm(asset.id)}
              >
                <DeleteOutlined />
              </Button>
            </Tooltip>
          </Space>
        );
      },
      width: '200px',
    },
  ];

  async componentDidMount() {
    const { assets } = this.context!;
    await assets.fetchItems();
  }

  private showDeleteConfirm = async (id: AssetItem['id']) => {
    confirm({
      title: 'Are you sure delete this asset?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        return this.handleAssetDelete(id);
      },
    });
  };

  private handleAssetDelete = async (id: AssetItem['id']) => {
    const { assets } = this.context!;
    await assets.deleteItem(id);
  };

  render() {
    const { assets } = this.context!;
    return (
      <>
        <Button className="AssetListPage_newButton" type="primary">
          <Link to={newAssetPath}>
            New Asset
          </Link>
        </Button>

        <Table
          columns={this.tableColumns}
          dataSource={assets.items.slice()}
          loading={!assets.isInitiated}
          rowKey="id"
        />
      </>
    );
  }
}

export const AssetListRoute = observer(AssetListRouteComponent);
