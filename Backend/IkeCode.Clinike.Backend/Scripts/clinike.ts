///<reference path="typings/jquery/jquery.d.ts" />
///<reference path="typings/bootstrap/bootstrap.d.ts" />
///<reference path="typings/knockout/knockout.d.ts" />
///<reference path="typings/knockout.mapping/knockout.mapping.d.ts" />
///<reference path="typings/moment/moment.d.ts" />
///<reference path="typings/requirejs/require.d.ts" />
///<reference path="typings/custom/custom.d.ts" />
module Clinike {
    export class ApiBaseUrls {
        public person: string = 'http://localhost:11666/api/Person';
        public phone: string = 'http://localhost:11666/api/Phone';
        public document: string = 'http://localhost:11666/api/Document';
        public address: string = 'http://localhost:11666/api/Address';
        public calendar: string = 'http://localhost:11666/api/Calendar';
    }

    export interface IBootstrapTableOptions { }
    export interface IBootstrapTableModel {
        total: number;
        rows: any;
    }

    export class BootstrapTable {
        private _parsedOpt: any = {};
        private _defaultOptions: any = {
            locale: 'pt-BR'
            , striped: true
            , pagination: true
            , sidePagination: 'server'
            , pageSize: 10
            , showRefresh: true
            , showToggle: true
            , showColumns: true
            , showHeader: true
            , trimOnSearch: true
            //, searchOnEnterKey: true
            , search: true
            , idField: 'Id'
            , clickToSelect: true
            , checkboxHeader: true
            , singleSelect: true
        };

        public defaultParser = (result: any): IBootstrapTableModel => {
            var data = {
                total: result.Content.TotalCount,
                rows: result.Content.Items
            };
            $log.verbose('BootstrapTable {0} :: ResponseHandler > [Using Default Parser Handler]'.format(this._parsedOpt.selector), data);
            return data;
        }

        private parseSelectCallback = (data: any, e): any => {
            $log.verbose('BootstrapTable {0} :: onClickRow > data'.format(this._parsedOpt.selector), data);
            //$log.verbose('BootstrapTable :: onClickRow > e', e);
            var selected = $(e).hasClass('selected');
            $(e).siblings('tr').removeClass('selected');
            if (!selected) {
                $(e).addClass('selected');
            }

            if ($.isFunction(this._parsedOpt.selectCallback)) {
                this._parsedOpt.selectCallback(data, e);
            }
        }

        private parseResponseHandler = (result) => {
            var isDefaultParser = $.type(this._parsedOpt.defaultParser) == 'boolean' ? this._parsedOpt.defaultParser : false;

            $log.verbose('BootstrapTable {0} :: ResponseHandler > Ajax Result'.format(this._parsedOpt.selector), result);
            if ($.isFunction(this._parsedOpt.responseHandler)) {
                var parsed = this._parsedOpt.responseHandler(result);
                $log.verbose('BootstrapTable {0} :: ResponseHandler > [Using Custom Handler] -> responseHandler(result)'.format(this._parsedOpt.selector), parsed);
                return parsed;
            } else if (isDefaultParser) {
                var data = this.defaultParser(result);
                return data;
            } else {
                $log.verbose('BootstrapTable {0} :: ResponseHandler > [bypass result]'.format(this._parsedOpt.selector), result);
                return result;
            }
        }

        private parseQueryParams = (params) => {
            var parsedParams = {
                name: params.search
                , sort: params.sort
                , order: params.order
                , limit: params.limit
                , offset: params.offset
            }

            if (this._parsedOpt.customQueryParams !== undefined
                && this._parsedOpt.customQueryParams != null
                && $.isPlainObject(this._parsedOpt.customQueryParams)
                && !$.isEmptyObject(this._parsedOpt.customQueryParams)) {
                parsedParams = $.extend(true, {}, parsedParams, this._parsedOpt.customQueryParams);
            }

            return parsedParams;
        }

        public load = (options) => {
            var isValid = false;

            if ($.isPlainObject(options) && !$.isEmptyObject(options)) {
                this._parsedOpt = options;
                if (this._parsedOpt.selector !== undefined && this._parsedOpt.selector.length > 0) {
                    isValid = true;
                }
            }
            else if ($.type(options) == 'string') {
                this._parsedOpt = { selector: options, defaultParser: true }
                isValid = true;
            }

            if (!isValid) {
                $log.error('BootstrapTable :: Options parameter is invalid, the \'selector\' (string or object property) must to be setted. [Sent Options] >', this._parsedOpt);
            } else {
                var handlerOptions = {
                    responseHandler: this.parseResponseHandler
                    , onClickRow: this.parseSelectCallback
                    , queryParams: this.parseQueryParams
                }

                var mergedOptions = $.extend(true, {}, this._defaultOptions, this._parsedOpt, handlerOptions);
                $log.verbose('BootstrapTable {0} :: Plugin Sent Options'.format(this._parsedOpt.selector), mergedOptions);
                $(this._parsedOpt.selector).bootstrapTable(mergedOptions);
            }
        }
    }

    export interface ILog {
        write(type: string, message: string, data?: any): void;

        globalEnabled: boolean;

        checkpoint(message: string, data?: any): void;
        checkpointEnabled: boolean;

        verbose(message: string, data?: any): void;
        verboseEnabled: boolean;

        info(message: string, data?: any): void;
        infoEnabled: boolean;

        warning(message: string, data?: any): void;
        warningEnabled: boolean;

        error(message: string, data?: any): void;
        errorEnabled: boolean;
    }

    export class Log implements ILog {
        globalEnabled: boolean = true;

        write = (identifier: string, message: string, data?: any): void => {
            try {
                if (this.globalEnabled && console !== undefined && console != null
                    && console.log !== undefined && console.log != null) {
                    var parsedData = data !== undefined && data != null ? data : '';
                    console.log('[{0}] {1}'.format(identifier, message), parsedData);
                }
            }
            catch (ex) { }
        };

        checkpointEnabled: boolean = true;
        checkpoint = (message: string, data?: any): void => {
            this.write('CHECKPOINT', message, data);
        };

        verboseEnabled: boolean = true;
        verbose = (message: string, data?: any): void => {
            this.write('VERBOSE', message, data);
        };

        infoEnabled: boolean = false;
        info = (message: string, data?: any): void => {
            this.write('INFO', message, data);
        };

        warningEnabled: boolean = true;
        warning = (message: string, data?: any): void => {
            this.write('WARNING', message, data);
        };

        errorEnabled: boolean = true;
        error = (message: string, data?: any): void => {
            this.write('ERROR', message, data);
        }
    }
}

var $apis = new Clinike.ApiBaseUrls();
var $log = new Clinike.Log();
var $bst, $bsTable, $bootstrapTable = new Clinike.BootstrapTable();

