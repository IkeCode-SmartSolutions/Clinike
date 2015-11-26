class BaseDataGridModel {
    SelectedIndex = -1;
    SelectedRow: any;

    constructor() {
        ko.validation.init({ decorateInputElement: true, errorClass: 'has-error', insertMessages: false });
    }

    protected UpdateGrid(gridSelector: string, data: any, isUpdate: boolean) {
        if (isUpdate) {
            $(gridSelector).datagrid('updateRow', { index: this.SelectedIndex, row: data });
        } else {
            $(gridSelector).datagrid('appendRow', data);
        }
    }
}