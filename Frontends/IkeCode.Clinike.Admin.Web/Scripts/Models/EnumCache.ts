class EnumCache {
    private List = [];

    constructor() {
    }

    public Add(enumName: string, enumData: Object): any {
        this.List[enumName] = enumData;
        return this.Get(enumName);
    }

    public Get(enumName: string) {
        return this.List[enumName];
    }
}

var enumCache = new EnumCache();