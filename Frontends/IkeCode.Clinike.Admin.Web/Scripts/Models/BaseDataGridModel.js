var BaseDataGridModel = (function () {
    function BaseDataGridModel() {
        this.SelectedIndex = -1;
        ko.validation.init({ decorateInputElement: true, errorClass: 'has-error', insertMessages: false });
    }
    return BaseDataGridModel;
})();
