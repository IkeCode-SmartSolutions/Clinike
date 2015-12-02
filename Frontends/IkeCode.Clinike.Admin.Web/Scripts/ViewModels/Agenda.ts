///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="../typings/jqueryui/jqueryui.d.ts" />
///<reference path="../typings/jquery.plugins/jquery.mask.d.ts" />
///<reference path="../typings/bootstrap/bootstrap.d.ts" />
///<reference path="../typings/knockout/knockout.d.ts" />
///<reference path="../typings/knockout.mapping/knockout.mapping.d.ts" />
///<reference path="../typings/fullCalendar/fullCalendar.d.ts" />
///<reference path="../typings/moment/moment.d.ts" />

module AgendaModule {
    export class AgendaViewModel extends KoSchedule {
    }

    export class CalendarViewModel {
        Schedules = ko.observable();
        Doctors = ko.observable();

        constructor() {
            this.Schedules = ko.observable();
            this.Doctors = ko.observable();
        }

        public Init() {
            this.FetchDoctors();

            var vm = ko.mapping.fromJS(this);

            var target = $('.full-calendar').get(0);
            ko.cleanNode(target);
            ko.applyBindings(vm, target);
        }

        public FetchDoctors(offset: number = 0, limit: number = 100) {
            console.log(apiConfigs._baseUrlPersonApi + 'Doctor/Get');
            $.ajax({
                url: apiConfigs._baseUrlPersonApi + 'Doctor/Get',
                data: { children: 'Person', offset: offset, limit: limit },
                dataType: 'json',
                success: (data, textStatus, jqXHR) => {
                    console.log('FetchDoctors data', data);
                    this.Doctors(data.Items);

                    $('#external-events .external-event').each(function () {
                        console.log('this', this);
                        console.log('$(this)', $(this));
                        var text = $.trim($(this).data('name'));
                        console.log('text', text);

                        $(this).data('eventObject', {
                            title: text,
                            stick: true
                        });

                        $(this).draggable({
                            zIndex: 999999,
                            revert: true,
                            revertDuration: 0
                        });
                    });
                    
                    this.FetchSchedules();
                },
                error: (err) => {
                    console.log('FetchDoctors error', err);
                }
            });
        }

        public FetchSchedules(doctorId?: number, patientId?: number) {
            $('#calendar').fullCalendar({
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                editable: true,
                droppable: true,
                drop: function (date, allDay) {
                    if (common.EnableLogGlobal) {
                        console.log('drop');
                        console.log('date', date);
                        console.log('allDay', allDay);
                    }

                    var name = $(this).data('name');
                    var color = $(this).data('color');
                    var dateEnd = moment(date).add('minutes', 60);

                    var newEvent = {
                        start: date,
                        end: dateEnd,
                        allDay: false,
                        title: name,
                        backgroundColor: color
                    };
                    // render the event on the calendar
                    // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
                    $('#calendar').fullCalendar('renderEvent', $.extend({}, newEvent), true);
                }
            });
        }
    }
}