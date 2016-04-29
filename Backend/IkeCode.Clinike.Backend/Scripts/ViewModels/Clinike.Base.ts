module ViewModels {
    export class BaseKoViewModel {
        protected vmBinded: boolean;
        protected vmTargetElementSelector: string;
        protected vmTargetElement: HTMLElement;

        constructor(vmTargetElementSelector: string) {
            this.vmTargetElementSelector = vmTargetElementSelector;
            this.vmTargetElement = $(vmTargetElementSelector)[0];
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