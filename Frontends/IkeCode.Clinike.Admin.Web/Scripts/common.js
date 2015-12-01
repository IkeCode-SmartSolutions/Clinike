///<reference path="typings/jquery/jquery.d.ts" />
///<reference path="typings/jquery.plugins/jquery.datebox.d.ts" />
///<reference path="typings/jquery.plugins/jquery.tabs.d.ts" />
///<reference path="typings/jquery.plugins/jquery.allgeneric.d.ts" />
///<reference path="typings/knockout/knockout.d.ts" />
///<reference path="typings/knockout.mapping/knockout.mapping.d.ts" />
///<reference path="typings/validator/validator.d.ts" />
///<reference path="typings/jquery.plugins/jquery.allgeneric.d.ts" />
"use strict";
var Common = (function () {
    function Common() {
        this._modelAssemblyName = '';
        this._enumNamespaceName = '';
        this.EnableLogGlobal = false;
        this.bindAboutEvents = function () {
            $('.about').on('click', function () {
                $('#about').toggleClass('about-h');
            });
            $('#about').on('mouseleave', function () {
                $('#about').removeClass('about-h');
            });
        };
        this.initDateTimePickers = function () {
            $('input[type=text][data-datetimepicker]').each(function () {
                var type = $(this).data('datetimepicker');
                var val = $(this).attr('value');
                var value = val === undefined || val === '' || val === null ? '' : val;
                if (type === "" || type === "datetime") {
                    $(this).datetimepicker({});
                }
                else if (type === "date") {
                    $(this).datepicker().datepicker('setDate', value);
                }
                else if (type === 'time') {
                    //$(this).timepicker($.timepicker.regional['pt-BR']);
                    $(this).timepicker();
                }
            });
        };
        this.initTabs = function () {
            $("div[data-tabs]").tabs();
        };
        this.initSideMenu = function () {
            $('body').on('click', '.show-sidebar', function (e) {
                e.preventDefault();
                $('div#main').toggleClass('sidebar-show');
            });
            $('.main-menu').on('click', 'a', function (e) {
                var parents = $(this).parents('li');
                var li = $(this).closest('li.dropdown');
                var another_items = $('.main-menu li').not(parents);
                another_items.find('a').removeClass('active');
                another_items.find('a').removeClass('active-parent');
                if ($(this).hasClass('dropdown-toggle') || $(this).closest('li').find('ul').length == 0) {
                    $(this).addClass('active-parent');
                    var current = $(this).next();
                    if (current.is(':visible')) {
                        li.find("ul.dropdown-menu").slideUp('fast');
                        li.find("ul.dropdown-menu a").removeClass('active');
                    }
                    else {
                        another_items.find("ul.dropdown-menu").slideUp('fast');
                        current.slideDown('fast');
                    }
                }
                else {
                    if (li.find('a.dropdown-toggle').hasClass('active-parent')) {
                        var pre = $(this).closest('ul.dropdown-menu');
                        pre.find("li.dropdown").not($(this).closest('li')).find('ul.dropdown-menu').slideUp('fast');
                    }
                }
                if ($(this).hasClass('active') == false) {
                    $(this).parents("ul.dropdown-menu").find('a').removeClass('active');
                    $(this).addClass('active');
                }
                if ($(this).attr('href') == '#') {
                    e.preventDefault();
                }
            });
        };
        this.AddNotification = function (notificationObj) {
            if (notificationObj !== undefined && ((notificationObj.title != null && notificationObj.title.length > 0) || (notificationObj.text != null && notificationObj.text.length > 0))) {
                Snarl.addNotification(notificationObj);
            }
        };
    }
    Common.prototype.init = function () {
        var _this = this;
        $(document).ready(function () {
            //fix to input file validation
            //$.validator.addMethod('accept', function () { return true; });
            $('input[type=file]').bootstrapFileInput();
            _this.initTabs();
            _this.initDateTimePickers();
            _this.initSideMenu();
            var height = window.innerHeight - 49;
            $('#main').css('min-height', height)
                .on('click', '.expand-link', function (e) {
                e.preventDefault();
                var body = $('body');
                var box = $(this).closest('div.box');
                var button = $(this).find('i');
                button.toggleClass('fa-expand').toggleClass('fa-compress');
                box.toggleClass('expanded');
                body.toggleClass('body-expanded');
                var timeout = 0;
                if (body.hasClass('body-expanded')) {
                    timeout = 100;
                }
                setTimeout(function () {
                    box.toggleClass('expanded-padding');
                }, timeout);
                setTimeout(function () {
                    box.resize();
                    box.find('[id^=map-]').resize();
                }, timeout + 50);
            })
                .on('click', '.collapse-link', function (e) {
                e.preventDefault();
                var box = $(this).closest('div.box');
                var button = $(this).find('i');
                var content = box.find('div.box-content');
                content.slideToggle('fast');
                button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                setTimeout(function () {
                    box.resize();
                    box.find('[id^=map-]').resize();
                }, 50);
            })
                .on('click', '.close-link', function (e) {
                e.preventDefault();
                var content = $(this).closest('div.box');
                content.remove();
            });
            //$('#search').on('keydown', function (e) {
            //    if (e.keyCode == 13) {
            //        e.preventDefault();
            //        $('#content').removeclass('full-content');
            //        //ajax_url = 'ajax/page_search.html';
            //        //window.location.hash = ajax_url;
            //        //LoadAjaxContent(ajax_url);
            //    }
            //});
            common.bindAboutEvents();
            ko.validation.init({ decorateInputElement: true, errorClass: 'has-error', insertMessages: false });
        });
    };
    Common.prototype.GetJsonEnum = function (enumName, modelAssemblyName, enumNamespaceName, callback) {
        if (!modelAssemblyName)
            modelAssemblyName = this._modelAssemblyName;
        if (!enumNamespaceName)
            enumNamespaceName = this._enumNamespaceName;
        if (this.EnableLogGlobal) {
            console.log('Common.GetJsonEnum -> params: enumName[' + enumName + '] | modelAssemblyName[' + modelAssemblyName + '] | enumNamespaceName[' + enumNamespaceName + ']');
        }
        if (!enumCache.Get(enumName)) {
            $.ajax({
                url: '/Helpers/GetJsonFromEnum',
                data: {
                    enumNamespace: this._enumNamespaceName,
                    assemblyName: this._modelAssemblyName,
                    enumName: enumName
                },
                type: 'GET',
                contentType: 'application/json',
                success: function (data, textStatus, jqXHR) {
                    if (this.EnableLogGlobal) {
                        console.log('textStatus', textStatus);
                        console.log('data', data);
                    }
                    enumCache.Add(enumName, data.Options);
                    if (callback) {
                        callback(data.Options);
                    }
                },
                error: function () {
                    if (this.EnableLogGlobal) {
                        console.log('error');
                    }
                }
            });
        }
        else {
            if (callback) {
                callback(enumCache.Get(enumName));
            }
        }
    };
    return Common;
})();
var common = new Common();
common.init();
