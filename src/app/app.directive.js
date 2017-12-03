export default function appDirective() {
  return {
    template: require('./app.html'),
    controller: 'appController',
    controllerAs: 'vm'
  }
};