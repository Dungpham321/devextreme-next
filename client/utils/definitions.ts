export function toFullTimeExport(d: Date) {
    return [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('') + "-"
    + [d.getHours(), d.getMinutes(), d.getSeconds()].join('');
}

export function formatString(str: string) {
    var args = arguments;
    return str.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[parseInt(number) + 1] != 'undefined' ? args[parseInt(number) + 1] : match;
    });
}