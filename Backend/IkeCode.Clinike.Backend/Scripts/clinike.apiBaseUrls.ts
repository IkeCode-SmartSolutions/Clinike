///<reference path="typings/jquery/jquery.d.ts" />
///<reference path="typings/bootstrap/bootstrap.d.ts" />
///<reference path="typings/knockout/knockout.d.ts" />
///<reference path="typings/knockout.mapping/knockout.mapping.d.ts" />
///<reference path="typings/moment/moment.d.ts" />
///<reference path="typings/requirejs/require.d.ts" />
///<reference path="typings/custom/custom.d.ts" />
module Clinike {
    export class ApiBaseUrls {
        person: string = 'http://localhost:11666/api/Person';
        phone: string = 'http://localhost:11666/api/Phone';
        document: string = 'http://localhost:11666/api/Document';
        address: string = 'http://localhost:11666/api/Address';
        calendar: string = 'http://localhost:11666/api/Calendar';
    }
}

var $apis = new Clinike.ApiBaseUrls();
