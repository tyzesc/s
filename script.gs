var app = SpreadsheetApp.getActiveSpreadsheet();
var sheet = app.getSheetByName("short");

function query(s) {
    var row_num = sheet.getLastRow();
    var col_num = sheet.getLastColumn();
    if (col_num <= 0) return undefined;
    var range = sheet.getRange(1, 1, row_num, col_num);
    var values = range.getValues();
    for (var i = 0; i < row_num; i++) {
        if (values[i][0] == s) {
            var tmp = sheet.getRange(i + 1, 3);
            tmp.setValue(tmp.getValue() + 1);
            return values[i][1];
        }
    }
    return undefined;
}

function asJSON(str) {
    return ContentService.createTextOutput('{"result":"' + str + '"}').setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
    var params = e.parameter;
    if (params.query != undefined) {
        var a = query(params.query);
        if (a == undefined)
            return asJSON("");
        return asJSON(a);
    } else {
        return asJSON('');
    }
}

function randomStr(m) {
    var m = m || 15; s = '', r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < m; i++) { s += r.charAt(Math.floor(Math.random() * r.length)); }
    return s;
};

function insert(url, alias) {
    if (alias == undefined)
        alias = randomStr(6);
    sheet.appendRow([alias, url, 0]);
    return alias;
}

function doPost(e) {
    var para = e.parameter;
    if (para.url != undefined) {
        var result = insert(para.url, para.alias);
        return asJSON(result);
    } else {
        return asJSON("wrong");
    }
}
