///<reference path="typings/jquery/jquery.d.ts" />
///<reference path="typings/bootstrap/bootstrap.d.ts" />
///<reference path="typings/knockout/knockout.d.ts" />
///<reference path="typings/knockout.mapping/knockout.mapping.d.ts" />
///<reference path="typings/moment/moment.d.ts" />
///<reference path="typings/requirejs/require.d.ts" />
///<reference path="typings/custom/custom.d.ts" />
///<reference path="clinike.log.ts" />
module Clinike {
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

        public defaultActionFormatter = () => {
            var result = '<div id="defaultRowActions" style="display: none">\
                            <a class="edit" href="javascript:void(0)" title="Editação Compacta">\
                                <i class="fa fa-pencil"></i>\
                            </a>\
                            <a class="delete" href="javascript:void(0)" title="Apagar">\
                                <i class="fa fa-trash-o"></i>\
                            </a>\
                        </div>';
            return $(result).html();
        }
        
        public defaultDateFormatter = (value, row, index) => {
            //$log.verbose('Bootstrap Table dateFormatter :: value', value);
            //$log.verbose('Bootstrap Table dateFormatter :: row', row);
            //$log.verbose('Bootstrap Table dateFormatter :: index', index);
            return moment(value).format('DD/MM/YYYY HH:mm:ss');
        };

        public defaultActionsEventsBuilder = (modalTarget: any
            , editModalShownElement?: (shownElement, row) => any
            , editModalHideCallback?: (hideElement, row) => any
            , deleteCallback?: (row) => any) => {
            var result = {
                'click .edit': (e, value, row, index): any => {
                    $(modalTarget)
                        .modal()
                        .on('shown.bs.modal', (shownElement): any => {
                            if (editModalShownElement)
                                editModalShownElement(shownElement, row);
                        })
                        .on('hide.bs.modal', (hideElement): any => {
                            if (editModalHideCallback)
                                editModalHideCallback(hideElement, row);
                        });
                },
                'click .delete': (e, value, row, index): any => {
                    //$log.verbose('PeopleViewModel personDelete e', e);
                    //$log.verbose('PeopleViewModel personDelete row', row);
                    //$log.verbose('PeopleViewModel personDelete index', index);
                    if (deleteCallback)
                        deleteCallback(row);
                }
            };

            return result;
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
}
var $bst, $bsTable, $bootstrapTable = new Clinike.BootstrapTable();

