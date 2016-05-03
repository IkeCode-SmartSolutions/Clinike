var ViewModels;
(function (ViewModels) {
    class BaseKoViewModel {
        constructor(vmTargetElementSelector) {
            this.vmTargetElementSelector = vmTargetElementSelector;
            this.vmTargetElement = $(vmTargetElementSelector)[0];
        }
        applyViewModel(data) {
            if (this.vmBinded) {
                $log.verbose('Ko :: Binding already applied to >', this.vmTargetElement);
            }
            else {
                $log.verbose('Ko :: Applying Binding to >', this.vmTargetElement);
                $log.verbose('Ko :: Aplied data', data);
                ko.applyBindings(data, this.vmTargetElement);
                this.vmBinded = true;
            }
        }
    }
    ViewModels.BaseKoViewModel = BaseKoViewModel;
})(ViewModels || (ViewModels = {}));
//# sourceMappingURL=ViewModels.Base.js.map