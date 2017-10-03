$(document).ready(function () {
    $('.dataTables_main').DataTable({
        scrollY: '100%',
        scrollX: true,
        scrollCollapse: true,
        paging: false,
        searching: false,
        bInfo: false,
        bSort: false,
        columnDefs: [{
                width: 200,
                targets: 0
            },
            {
                width: 200,
                targets: 1
            },
            {
                width: 100,
                targets: 2
            },
            {
                width: 80,
                targets: 3
            },
            {
                width: 80,
                targets: 4
            },
            {
                width: 80,
                targets: 5
            },
        ],
        fixedColumns: true
    });
});

$(document).ready(function () {
    $('.dataTables_sub').DataTable({
        scrollY: '100%',
        scrollX: true,
        scrollCollapse: true,
        paging: false,
        searching: false,
        bInfo: false,
        bSort: false,
        columnDefs: [{
                width: 80,
                targets: 0
            },
            {
                width: 300,
                targets: 1
            }
        ],
        fixedColumns: true
    });
});