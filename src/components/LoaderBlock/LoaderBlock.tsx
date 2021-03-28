import { Spin } from 'antd';
import * as React from 'react';

import './LoaderBlock.css';

export const LoaderBlock: React.FC = () => {
  return (
    <div className="LoaderBlock">
      <Spin />
    </div>
  );
};
