(function() {
    var components = angular.module('lavagna.components');

    components.component('lvgNavbarBoard', {
        templateUrl: 'app/components/navbar/board/navbar-board.html',
        bindings: {
            board: '=',
            project: '='
        },
        controller: function($window, User, Sidebar) {
             var ctrl = this;

             User.currentCachedUser().then(function (u) {
                 ctrl.navbarUser = u;
             });

             ctrl.toggleSidebar = function() {
                Sidebar.toggle();
             }

             ctrl.login = function () {
                 var reqUrlWithoutContextPath = $window.location.pathname.substr($("base").attr('href').length - 1);
                 $window.location.href = 'login?reqUrl=' + encodeURIComponent(reqUrlWithoutContextPath);
             }
        }
    });
})();
