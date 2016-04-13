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

	self.dataTable = function (selector, dataTableOptions, language, selectCallback) {
		language = language === undefined || language == null || language.length <= 0 ? 'pt-br' : language;
		var languageUrl = ('/Scripts/datatable.i18n/{0}.json').format(language);

		var options = $.extend({}, { language: { url: languageUrl } }, dataTableOptions);

		/*
		{
            language: {
                url: "/Scripts/datatable.i18n/pt-br.json"
            },
            columns: [
                { data: "Id", title: "Id", width: "30" },
                {
                    data: "DateIns",
                    title: "Data de Criação",
                    render: function (data) {
                        var date = new moment(data);
                        return date.format("DD/MM/YYYY HH:mm:ss");
                    }
                },
                { data: "Name", title: "Nome" }
            ],
            ajax: {
                url: 'http://localhost:11666/api/Person',
                dataSrc: 'Content.Items'
            }
        }
		*/

		var dataTable = $(selector)
            .on('init.dt', function () {
            	//console.log('init this', this);
            	var tableHeader = $(this).siblings('div.table-header');
            	var width = $(tableHeader).outerWidth();
            	//console.log('init width', width);
            	//console.log('init this width', $(this).width());
            	$(this).css({ width: width });
            	//console.log('init this width after', $(this).width());
            	$(tableHeader).find('.dataTables_filter input').attr('placeholder', 'Pesquisar...');
            })
			.DataTable(options);

		if (selectCallback !== undefined && selectCallback != null) {
			$(selector + ' tbody').on('click', 'tr', function () {
				var hasClass = $(this).hasClass('selected');
				
				if (hasClass) {
					$(this).removeClass('selected');
				} else {
					$(this).addClass('selected');
				}

				var table = $(selector).DataTable();
				selectCallback({ Data: table.row().data(), Selected: !hasClass });
			});
		}
	}
}

var clinikeUtils = new ClinikeUtils();