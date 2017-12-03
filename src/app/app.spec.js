import app from './app';

describe('app', () => {

  beforeEach(() => angular.mock.module(app));

  describe('appController', () => {
    let ctrl;

    beforeEach(() => {

      angular.mock.inject(($controller) => {
        ctrl = $controller('appController', {});
      });
    });

    it('should contain the starter url', () => {
      expect(ctrl.url).toBe('https://github.com/pedrokehl/angularjs-es6-starter');
    });
  });

  describe('App', () => {
    let $compile;
    let $rootScope;

    beforeEach(inject((_$compile_, _$rootScope_) => {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    }));

    it('should define the app directive', () => {
      const element = $compile("<app></app>")($rootScope);
      $rootScope.$digest();
      expect(element).toBeDefined();
    });
  });
});