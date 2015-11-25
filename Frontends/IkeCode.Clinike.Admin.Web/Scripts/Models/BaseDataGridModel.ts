class BaseDataGridModel {
    SelectedIndex = -1;
    SelectedRow: any;

    constructor() {
        ko.validation.init({ decorateInputElement: true, errorClass: 'has-error', insertMessages: false });
    }
}