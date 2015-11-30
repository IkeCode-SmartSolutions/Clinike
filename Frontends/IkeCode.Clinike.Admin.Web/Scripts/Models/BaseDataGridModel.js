var BaseDataGridModel = (function () {
    function BaseDataGridModel() {
        this.SelectedIndex = -1;
        ko.validation.init({ decorateInputElement: true, errorClass: 'has-error', insertMessages: false });
    }
    BaseDataGridModel.prototype.UpdateGrid = function (gridSelector, data, isUpdate) {
        //    if (isUpdate) {
        //        $(gridSelector).datagrid('updateRow', { index: this.SelectedIndex, row: data });
        //    } else {
        //        $(gridSelector).datagrid('appendRow', data);
        //    }
    };
    return BaseDataGridModel;
})();
