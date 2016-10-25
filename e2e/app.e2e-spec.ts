import { HomeJsPage } from './app.po';

describe('home-js App', function() {
  let page: HomeJsPage;

  beforeEach(() => {
    page = new HomeJsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
