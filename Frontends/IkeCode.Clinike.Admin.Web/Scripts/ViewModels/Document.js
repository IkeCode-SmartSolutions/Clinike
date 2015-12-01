///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="../typings/jquery.plugins/jquery.mask.d.ts" />
///<reference path="../typings/bootstrap/bootstrap.d.ts" />
///<reference path="../typings/knockout/knockout.d.ts" />
///<reference path="../typings/knockout.mapping/knockout.mapping.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DocumentModule;
(function (DocumentModule) {
    var KoViewModel = (function (_super) {
        __extends(KoViewModel, _super);
        function KoViewModel(targetSelector, saveCallback) {
            var _this = this;
            _super.call(this);
            this.DocumentTypes = ko.observable();
            this._validationGroup = ko.validatedObservable(this);
            this._validationErrors = ko.validation.group(this);
            this.Init = function () {
                if (_this._targetSelector) {
                    var vm = ko.mapping.fromJS(_this);
                    var target = $(_this._targetSelector).get(0);
                    ko.cleanNode(target);
                    ko.applyBindings(vm, target);
                }
            };
            this.Save = function () {
                var dataJS = _this.toJS();
                if (common.EnableLogGlobal) {
                    console.log('dataJS', dataJS);
                }
                if (!_this._validationGroup.isValid()) {
                    _this._validationErrors.showAllMessages();
                }
                else {
                    $.ajax({
                        url: '/Document/Post',
                        data: dataJS,
                        type: 'POST',
                        dataType: 'json',
                        success: function (data, textStatus, jqXHR) {
                            var oldId = _this.Id;
                            if (common.EnableLogGlobal) {
                                console.log('textStatus', textStatus);
                                console.log('data', data);
                            }
                            _this.Update(data.Record);
                            if (common.EnableLogGlobal) {
                                console.log('this.Id', _this.Id);
                            }
                            _this._saveCallback(oldId, data);
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    });
                }
            };
            if (common.EnableLogGlobal) {
                console.log('Document ctor');
            }
            this._saveCallback = saveCallback;
            if (targetSelector) {
                this._targetSelector = targetSelector;
                $.getJSON('/Document/GetDocumentTypes', function (data, textStatus) {
                    if (common.EnableLogGlobal) {
                        console.log('GetDocumentTypes data', data);
                    }
                    if (data) {
                        _this.DocumentTypes(data.Options);
                    }
                });
                this.DocumentTypeId.extend({ required: { params: true, message: '* obrigatório' }, min: { params: -1, message: '* obrigatório' } });
            }
        }
        return KoViewModel;
    })(KoDocument);
    DocumentModule.KoViewModel = KoViewModel;
    var GridViewModel = (function (_super) {
        __extends(GridViewModel, _super);
        function GridViewModel(_parentId) {
            var _this = this;
            _super.call(this);
            this._gridSelector = '#documentsGrid';
            this._modalSelector = '#documentEditorModal';
            this._parentId = 0;
            this.LoadDataGrid = function (selector) {
                if (selector === void 0) { selector = _this._gridSelector; }
                $(_this._gridSelector).bootgrid(_this.GetBootgridOptions({
                    url: "/Document/GetList",
                    post: function () {
                        return {
                            personId: _this._parentId
                        };
                    },
                    formatters: {
                        "DocumentType": function (column, row) {
                            return row.DocumentType.Name;
                        },
                        "commands": _this.GetDefaultCommands
                    }
                }))
                    .on("loaded.rs.jquery.bootgrid", function (e) {
                    if (common.EnableLogGlobal) {
                        console.log('Document (loaded.rs.jquery.bootgrid) -> e', e);
                    }
                    _this.documentViewModel.Init();
                    $(_this._gridSelector).find(".command-edit")
                        .on("click", function (e) {
                        var row = _this.GetCurrentRow(_this._gridSelector, e);
                        _this.ShowModal(_this.SelectedRow);
                    })
                        .end().find(".command-delete").on("click", function (e) {
                        var row = _this.GetCurrentRow(_this._gridSelector, e);
                        _this.documentViewModel.Update(row);
                        _this.Delete();
                    })
                        .end().parent().find(".bootgrid-header .command-add").on("click", function () {
                        var newPoco = new PhonePoco();
                        newPoco.PersonId = _this._parentId;
                        _this.ShowModal(newPoco);
                    });
                });
            };
            this._parentId = _parentId;
            this.documentViewModel = new DocumentModule.KoViewModel('#documentEditorModal div[data-type="kobind"]', function (oldId, parsedData) {
                $(_this._modalSelector).modal('hide');
                $(_this._gridSelector).bootgrid('reload');
            });
        }
        GridViewModel.prototype.Delete = function () {
            var _this = this;
            if (common.EnableLogGlobal) {
                console.log('Document Delete');
            }
            confirmModal.Show({
                Title: 'Confirmação',
                Message: 'Deseja realmente excluir o registro selecionado?',
                ConfirmCallback: function () {
                    $.ajax({
                        url: '/Document/Delete',
                        data: { id: _this.SelectedRow.Id },
                        type: 'POST',
                        dataType: 'json',
                        success: function (data, textStatus, jqXHR) {
                            if (common.EnableLogGlobal) {
                                console.log('Delete Success');
                                console.log('data', data);
                                console.log('textStatus', textStatus);
                            }
                            var newPoco = new DocumentPoco();
                            newPoco.PersonId = _this.SelectedRow.PersonId;
                            _this.documentViewModel.Update(newPoco);
                            if (common.EnableLogGlobal) {
                                console.log('this.Id', _this.SelectedRow.Id);
                            }
                            $(_this._gridSelector).bootgrid('reload');
                        },
                        error: function (err) {
                            if (common.EnableLogGlobal) {
                                console.log('Delete Error!', err);
                            }
                        }
                    });
                }
            });
        };
        GridViewModel.prototype.ShowModal = function (objToUpdate) {
            if (common.EnableLogGlobal) {
                console.log('objToUpdate', objToUpdate);
            }
            this.documentViewModel.Update(objToUpdate);
            $(this._modalSelector).modal('show');
        };
        return GridViewModel;
    })(BaseDataGridModel);
    DocumentModule.GridViewModel = GridViewModel;
})(DocumentModule || (DocumentModule = {}));
