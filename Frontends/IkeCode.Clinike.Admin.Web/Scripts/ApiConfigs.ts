class ApiConfigs {
    public _baseUrlPersonApi: string;
    public _baseUrlScheduleApi: string;

    constructor() {
        this._baseUrlPersonApi = 'http://local.personapi.clinike.com.br/api/';
        this._baseUrlScheduleApi = 'http://local.schedulepi.clinike.com.br/api/';
    }
}
var apiConfigs = new ApiConfigs();