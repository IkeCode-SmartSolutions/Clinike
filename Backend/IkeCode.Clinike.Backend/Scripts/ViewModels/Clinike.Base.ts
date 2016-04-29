module ViewModels {
    export class BaseKoViewModel {
        protected vmBinded: boolean;
        protected vmTargetElement: any;

        constructor(targetElement: any) {
            this.vmTargetElement = targetElement;
        }

        protected applyViewModel(data: any) {
            if (this.vmBinded) {
                $log.verbose('Ko :: Binding already applied to >', this.vmTargetElement);
            } else {
                $log.verbose('Ko :: Applying Binding to >', this.vmTargetElement);
                $log.verbose('Ko :: Aplied data', data);
                ko.applyBindings(data, this.vmTargetElement);
                this.vmBinded = true;
            }
        }
    }
}