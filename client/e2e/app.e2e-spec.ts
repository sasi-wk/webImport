import { PHIEPage } from './app.po';

describe('phie App', () => {
  let page: PHIEPage;

  beforeEach(() => {
    page = new PHIEPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
