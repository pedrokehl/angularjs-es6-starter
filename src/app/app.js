import angular from 'angular';
import appDirective from './app.directive';
import appController from './app.controller'
import './app.scss';

export default angular
  .module('app', [])
  .directive('app', appDirective)
  .controller('appController', appController)
  .name;