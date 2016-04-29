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
        $log.verbose('ko.bindingHandlers.switcher :: init.element', element);
        $log.verbose('ko.bindingHandlers.switcher :: init.valueAccessor', valueAccessor);
        //$log.verbose('ko.bindingHandlers.switcher :: init.allBindings', allBindings);
        //$log.verbose('ko.bindingHandlers.switcher :: init.viewModel', viewModel);
        //$log.verbose('ko.bindingHandlers.switcher :: init.bindingContext', bindingContext);

        $elem = $(element);
        $(element).bootstrapSwitch();
        $log.verbose('ko.bindingHandlers.switcher :: init.plugin');
        $log.verbose('ko.bindingHandlers.switcher :: init.ko.utils.unwrapObservable(valueAccessor())', ko.utils.unwrapObservable(valueAccessor()));
        $(element).bootstrapSwitch('setState', ko.utils.unwrapObservable(valueAccessor()));
        $elem.on('switch-change', function (e, data) {
            valueAccessor()(data.value);
        });
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        $log.verbose('ko.bindingHandlers.switcher :: update.element', element);
        $log.verbose('ko.bindingHandlers.switcher :: update.valueAccessor', valueAccessor);
        //$log.verbose('ko.bindingHandlers.switcher :: update.allBindings', allBindings);
        //$log.verbose('ko.bindingHandlers.switcher :: update.viewModel', viewModel);
        //$log.verbose('ko.bindingHandlers.switcher :: update.bindingContext', bindingContext);

        var vStatus = $(element).bootstrapSwitch('state');
        var vmStatus = ko.utils.unwrapObservable(valueAccessor());
        if (vStatus != vmStatus) {
            $(element).bootstrapSwitch('setState', vmStatus);
        }
    }
};