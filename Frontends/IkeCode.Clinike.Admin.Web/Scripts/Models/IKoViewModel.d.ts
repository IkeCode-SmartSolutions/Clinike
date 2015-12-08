interface IKoViewModel {
    Init(): void;
    _targetSelector: string;
    _validationGroup: KnockoutValidationGroup;
    _validationErrors: KnockoutValidationErrors;
}