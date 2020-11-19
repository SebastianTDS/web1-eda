$(document).ready(function () {

    $('#calendar').fullCalendar({
        locale: 'es',
        events: [
            {
                title: 'Vacuna 1',
                start: '2020-11-11',
                end: '2020-11-12'

            },
            {
                title: 'Vacuna 2',
                start: '2020-12-04',
                end: '2020-12-05'

            },
            {
                title: 'Vacuna 3',
                start: '2021-01-07',
                end: '2021-01-08'

            },
            {
                title: 'Vacuna 4',
                start: '2021-01-21',
                end: '2021-01-22'

            },            
            {
                title: 'Vacuna 5',
                start: '2021-02-15',
                end: '2021-02-16'

            },
            {
                title: 'Vacuna 6',
                start: '2021-03-17',
                end: '2021-03-18'

            },
            {
                title: 'Vacuna 7',
                start: '2021-03-29',
                end: '2021-03-30'

            }
        ]
    });
});