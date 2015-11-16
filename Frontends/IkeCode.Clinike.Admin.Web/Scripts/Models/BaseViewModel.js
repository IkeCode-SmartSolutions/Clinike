var BaseViewModel = (function () {
    function BaseViewModel() {
        this.Id = ko.observable();
        this.DateIns = ko.observable();
        this.LastUpdate = ko.observable();
    }
    return BaseViewModel;
})();
