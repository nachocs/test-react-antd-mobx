import { shallow } from 'enzyme';
import * as React from 'react';

import { LoaderBlock } from './LoaderBlock';

it('LoaderBlock should be defined', () => {
  expect(LoaderBlock).toBeDefined();
});

it('LoaderBlock should render spinner', () => {
  const wrapper = shallow(<LoaderBlock />);
  expect(wrapper).toMatchSnapshot();
});
