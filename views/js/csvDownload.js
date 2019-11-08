
var regimeData = [
    {
        Title: "Workout Regime",
        Category: "Fitness",
        Description: "Become the strongest",
        Goals: "Eat better",
        Tags: "Exercise",
        Price: "$2.00"
    },
    {
        Title: "Ghost Hunting",
        Category: "Spiritual",
        Description: "Hunt the spectres",
        Goals: "Track ghosties",
        Tags: "Paranormal",
        Price: "$5.00"
    },
    {
        Title: "Cook Better",
        Category: "Cooking",
        Description: "Cook some tasties",
        Goals: "Eat better",
        Tags: "Foods",
        Price: "$1.00"
    },
];

function convertArrayOfObjectsToCSV(args) {
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;

    data = args.data || null;
    if (data == null || !data.length) {
        return null;
    }

    columnDelimiter = args.columnDelimiter || ',';
    lineDelimiter = args.lineDelimiter || '\n';

    keys = Object.keys(data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(function(item) {
        ctr = 0;
        keys.forEach(function(key) {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];
            ctr++;
        });
        result += lineDelimiter;
    });

    return result;
}

function downloadCSV(args) {
    var data, filename, link;

    var csv = convertArrayOfObjectsToCSV({
        data: regimeData
    });
    if (csv == null) return;

    filename = args.filename || 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    data = encodeURI(csv);

    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
}

