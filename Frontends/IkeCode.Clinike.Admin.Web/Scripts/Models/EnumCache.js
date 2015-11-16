var EnumCache = (function () {
    function EnumCache() {
        this.List = [];
    }
    EnumCache.prototype.Add = function (enumName, enumData) {
        this.List[enumName] = enumData;
        return this.Get(enumName);
    };
    EnumCache.prototype.Get = function (enumName) {
        return this.List[enumName];
    };
    return EnumCache;
})();
var enumCache = new EnumCache();
