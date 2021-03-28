import { Layout } from 'antd';
import * as React from 'react';

import './ContentPageLayout.css';

const { Header, Content } = Layout;

export interface ContentPageLayoutProps {
  header: React.ReactElement;
}

export const ContentPageLayout: React.FC<ContentPageLayoutProps> = (
  { header, children },
) => {
  return (
    <Layout className="ContentPageLayout">
      <Header className="ContentPageLayout_Header">{header}</Header>
      <Content className="ContentPageLayout_Content">{children}</Content>
    </Layout>
  );
};
