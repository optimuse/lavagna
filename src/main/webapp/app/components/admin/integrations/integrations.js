(function() {
    'use strict';

    var components = angular.module('lavagna.components');

    components.component('lvgAdminIntegrations', {
    	templateUrl: 'app/components/admin/integrations/integrations.html',
        controller: ['$mdDialog', '$translate', 'Notification', 'Integrations', AdminIntegrationsController]
    });


    function AdminIntegrationsController($mdDialog, $translate, Notification, Integrations) {

        var ctrl = this;

        ctrl.addNewIntegrationDialog = addNewIntegrationDialog;
        ctrl.deleteDialog = deleteDialog;

        ctrl.$onInit = function() {
            loadAll();
        };

        function loadAll() {
            Integrations.getAll().then(function(res) {ctrl.integrations = res;});
        }

        function addNewIntegrationDialog() {
            $mdDialog.show({
                templateUrl: 'app/components/admin/integrations/add-new-integration-dialog.html',
                controller: function() {
                },
                controllerAs: 'addNewIntegrationCtrl',
                bindToController: true
            });
        }


        function deleteDialog(integration, event) {
            var translationKeys = {name: integration.name};
            var confirm = $mdDialog.confirm()
                .title($translate.instant('admin.integrations.delete.title'))
                .textContent($translate.instant('admin.integrations.delete.message', translationKeys))
                .targetEvent(event)
                .ok($translate.instant('button.yes'))
                .cancel($translate.instant('button.no'));

            $mdDialog.show(confirm).then(function() {
                return Integrations.remove(integration.name);
            }).then(function() {
                Notification.addAutoAckNotification('success', {key: 'notification.admin-integrations.remove.success', parameters: translationKeys}, false);
                loadAll();
            }, function(error) {
                loadAll();
                if(error) {
                    Notification.addAutoAckNotification('error', {key: 'notification.admin-integrations.remove.error', parameters: translationKeys}, false);
                }
            })
        }
    }

})()
