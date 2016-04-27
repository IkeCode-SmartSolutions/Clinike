var Clinike;
(function (Clinike) {
    class BaseKoViewModel {
        constructor(targetElement) {
            this.vmTargetElement = targetElement;
        }
        applyViewModel(data) {
            if (this.vmBinded) {
                $log.verbose('Ko :: Binding already applied to >', this.vmTargetElement);
            }
            else {
                $log.verbose('Ko :: Applying Binding to >', this.vmTargetElement);
                ko.applyBindings(data, this.vmTargetElement);
                this.vmBinded = true;
            }
        }
    }
    Clinike.BaseKoViewModel = BaseKoViewModel;
})(Clinike || (Clinike = {}));
//# sourceMappingURL=Clinike.Base.js.map