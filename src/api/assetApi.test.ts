import { AssetAPI } from './assetApi';
import { RestClient } from './restClient';

jest.mock('./restClient');
const mockedRestClient = (
  RestClient as jest.Mocked<typeof RestClient> & jest.Mock<typeof RestClient>
);

beforeEach(() => {
  mockedRestClient.mockClear();
});

it('AssetAPI should be defined', () => {
  expect(AssetAPI).toBeDefined();
});

it('AssetAPI.addItem should make a rest call through RestClient', async () => {
  mockedRestClient.post.mockResolvedValueOnce(true);

  const newAssetItem = Object.freeze({
    name: 'asset name',
    description: 'asset description',
  });

  const result = AssetAPI.addItem(newAssetItem);

  expect(result).toBeTruthy();
  expect(mockedRestClient.post).toBeCalledWith('/api/v1/assets', newAssetItem);
});
