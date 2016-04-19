String.prototype.format = function () {
	var s = this,
        i = arguments.length;

	while (i--) {
		s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
	}
	return s;
};

function ClinikeUtils() {
	var self = this;

	self.baseApiUrls = {
		person: 'http://localhost:11666/api/Person',
		calendar: 'http://localhost:11666/api/Calendar'
	};

	self.bootstrapTable = {
		load: function (options) {
			var parsedOpt = {};

			var isValid = false;

			if ($.isPlainObject(options) && !$.isEmptyObject(options)) {
				parsedOpt = options;
				if (parsedOpt.selector !== undefined && parsedOpt.selector.length > 0) {
					isValid = true;
				}
			}
			else if ($.type(options) == 'string') {
				parsedOpt = { selector: options, defaultParser: true }
				isValid = true;
			}

			if (!isValid) {
				$utils.log.error('BootstrapTable :: Options parameter is invalid, the \'selector\' (string or object property) must to be setted. [Sent Options] >', parsedOpt);
			} else {
				var defaultParser = $.type(parsedOpt.defaultParser) == 'boolean' ? parsedOpt.defaultParser : false;

				//$utils.log.info('BootstrapTable :: parsedOpt', parsedOpt);

				var parsedResponseHandler = function (result) {
					$utils.log.verbose('BootstrapTable :: ResponseHandler > Ajax Result', result);
					if ($.isFunction(parsedOpt.responseHandler)) {
						var parsed = parsedOpt.responseHandler(result);
						$utils.log.verbose('BootstrapTable :: ResponseHandler > [Using Custom Handler] -> responseHandler(result)', parsed);
						return parsed;
					} else if (defaultParser) {
						var data = {
							total: result.Content.TotalCount,
							rows: result.Content.Items
						};

						$utils.log.verbose('BootstrapTable :: ResponseHandler > [Using Default Parser Handler]', data);

						return data;
					} else {
						$utils.log.verbose('BootstrapTable :: ResponseHandler > [bypass result]', result);
						return result;
					}
				};

				var parsedSelectCallback = function (data, e) {
					$utils.log.verbose('BootstrapTable :: onClickRow > data', data);
					//$utils.log.verbose('BootstrapTable :: onClickRow > e', e);
					var selected = $(e).hasClass('selected');
					$(e).siblings('tr').removeClass('selected');
					if (!selected) {
						$(e).addClass('selected');
					}

					if ($.isFunction(parsedOpt.selectCallback)) {
						parsedOpt.selectCallback(data, e);
					}
				};

				var parsedQueryParams = function (params) {
					var parsedParams = {
						name: params.search
						, sort: params.sort
						, order: params.order
						, limit: params.limit
						, offset: params.offset
					}
					return parsedParams;
				}

				var defaultOptions = {
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

				var handlerOptions = {
					responseHandler: parsedResponseHandler
					, onClickRow: parsedSelectCallback
					, queryParams: parsedQueryParams
				}

				var mergedOptions = $.extend(true, {}, defaultOptions, parsedOpt, handlerOptions);
				$utils.log.verbose('BootstrapTable :: Plugin Sent Options', mergedOptions);
				//$utils.log.verbose('BootstrapTable :: responseHandler', mergedOptions.responseHandler);
				$(parsedOpt.selector).bootstrapTable(mergedOptions);
			}
		}
	};

	self.log = {
		globalEnabled: true,
		write: function (type, message, data) {
			try {
				if (self.log.globalEnabled && console !== undefined && console != null
					&& console.log !== undefined && console.log != null) {
					var parsedData = data !== undefined && data != null ? data : '';
					console.log('[{0}] {1}'.format(type, message), parsedData);
				}
			}
			catch (ex) { }
		},
		checkpointEnabled: true,
		checkpoint: function (message, data) {
			self.log.write('CHECKPOINT', message, data);
		},
		verboseEnabled: true,
		verbose: function (message, data) {
			self.log.write('VERBOSE', message, data);
		},
		infoEnabled: false,
		info: function (message, data) {
			self.log.write('INFO', message, data);
		},
		warningEnabled: true,
		warning: function (message, data) {
			self.log.write('WARNING', message, data);
		},
		errorEnabled: true,
		error: function (message, data) {
			self.log.write('ERROR', message, data);
		}
	};
}

var clinikeUtils = $utils = new ClinikeUtils();