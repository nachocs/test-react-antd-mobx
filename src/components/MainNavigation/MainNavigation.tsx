import { Menu } from 'antd';
import * as React from 'react';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';
import { assetListPath } from '../../routes/navigation';
import './MainNavigation.css';

const MainNavigationComponent: React.FC<RouteComponentProps> = (props) => {
  const { location: { pathname } } = props;

  return (
    <Menu className="MainNavigation" mode="horizontal" defaultSelectedKeys={[pathname]}>
      <Menu.Item key={assetListPath}><Route to={assetListPath}>Assets</Route></Menu.Item>
    </Menu>
  );
};

export const MainNavigation = withRouter(MainNavigationComponent);
