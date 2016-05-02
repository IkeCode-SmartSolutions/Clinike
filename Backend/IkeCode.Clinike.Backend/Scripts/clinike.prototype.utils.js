String.prototype.format = function () {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};

try {
    ko.validation.locale('pt-BR');
} catch (e) {

}

ko.bindingHandlers.switcher = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        //$log.verbose('ko.bindingHandlers.switcher :: init.value unwraped', value);
        //$log.verbose('ko.bindingHandlers.switcher :: init.element', element);
        //$log.verbose('ko.bindingHandlers.switcher :: init.valueAccessor', valueAccessor);
        //$log.verbose('ko.bindingHandlers.switcher :: init.allBindings', allBindings);
        //$log.verbose('ko.bindingHandlers.switcher :: init.viewModel', viewModel);
        //$log.verbose('ko.bindingHandlers.switcher :: init.bindingContext', bindingContext);

        $elem = $(element);
        $(element).bootstrapSwitch();
        $(element).bootstrapSwitch('state', value);
        $elem.on('switch-change', function (e, data) {
            valueAccessor()(data.value);
        });
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        //$log.verbose('ko.bindingHandlers.switcher :: update.element', element);
        //$log.verbose('ko.bindingHandlers.switcher :: update.valueAccessor', valueAccessor);
        //$log.verbose('ko.bindingHandlers.switcher :: update.allBindings', allBindings);
        //$log.verbose('ko.bindingHandlers.switcher :: update.viewModel', viewModel);
        //$log.verbose('ko.bindingHandlers.switcher :: update.bindingContext', bindingContext);

        var currentStatus = $(element).bootstrapSwitch('state');
        var newStatus = ko.utils.unwrapObservable(valueAccessor());
        if (currentStatus != newStatus) {
            $(element).bootstrapSwitch('state', newStatus);
        }
    }
};