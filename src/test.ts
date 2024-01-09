import AsaQuery from './main';

describe('AsaQuery', () => {
  let asaQuery: AsaQuery;

  beforeEach(() => {
    asaQuery = new AsaQuery();
  });

  test('No Critera Specified', async () => {
    expect(async () => await asaQuery.exec()).rejects.toThrow(
      'Criteria object is empty',
    );
  });

  test('Server Name Contains', async () => {
    asaQuery.serverNameContains('2142');
    const result = await asaQuery.exec();
    expect(result).toBeDefined();
  });
});
