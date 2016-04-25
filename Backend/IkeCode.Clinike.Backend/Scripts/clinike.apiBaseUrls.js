///<reference path="typings/jquery/jquery.d.ts" />
///<reference path="typings/bootstrap/bootstrap.d.ts" />
///<reference path="typings/knockout/knockout.d.ts" />
///<reference path="typings/knockout.mapping/knockout.mapping.d.ts" />
///<reference path="typings/moment/moment.d.ts" />
///<reference path="typings/requirejs/require.d.ts" />
///<reference path="typings/custom/custom.d.ts" />
var Clinike;
(function (Clinike) {
    class ApiBaseUrls {
        constructor() {
            this.person = 'http://localhost:11666/api/Person';
            this.phone = 'http://localhost:11666/api/Phone';
            this.document = 'http://localhost:11666/api/Document';
            this.address = 'http://localhost:11666/api/Address';
            this.calendar = 'http://localhost:11666/api/Calendar';
        }
    }
    Clinike.ApiBaseUrls = ApiBaseUrls;
})(Clinike || (Clinike = {}));
var $apis = new Clinike.ApiBaseUrls();
//# sourceMappingURL=clinike.apiBaseUrls.js.map