import { Spin } from 'antd';
import React, { Suspense } from 'react';
import {
  BrowserRouter, Redirect, Route, RouteComponentProps, Switch,
} from 'react-router-dom';

import { ContentPageLayout } from '../components/ContentPageLayout';
import { MainNavigation } from '../components/MainNavigation';
import { ScrollToTop } from '../components/ScrollToTop';
import { rootStore } from '../models/rootModel';
import { Provider } from '../models/modelsContextProvider';
import { AssetListRoute } from '../routes/assets/AssetListRoute';
import { EditAssetRoute, EditAssetRouteMatchParams } from '../routes/assets/EditAssetPage';
import { NewAssetRoute } from '../routes/assets/NewAssetPage';
import { assetListPath, editAssetPath, newAssetPath } from '../routes/navigation';

import './App.css';

export const App: React.FC = () => {
  return (
    <Provider value={rootStore}>
      <BrowserRouter>
        <ScrollToTop />
        <ContentPageLayout
          header={<MainNavigation />}
        >
          <Suspense fallback={<Spin />}>
            <Switch>
              <Route exact path={assetListPath} component={() => <AssetListRoute />} />
              <Route
                exact
                path={newAssetPath}
                component={({ history }: RouteComponentProps) => (
                  <NewAssetRoute history={history} />
                )}
              />
              <Route
                exact
                path={editAssetPath}
                component={({ match, history }: RouteComponentProps<EditAssetRouteMatchParams>) => (
                  <EditAssetRoute history={history} id={match.params.id} />
                )}
              />
              <Redirect to={assetListPath} />
            </Switch>
          </Suspense>
        </ContentPageLayout>
      </BrowserRouter>
    </Provider>
  );
};
