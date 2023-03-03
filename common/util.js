// 判断是否为空
var isNullVal = function (val) {
    var isnull = false;
    if (val == undefined || val == null) {
        isnull = true;
    }else {
        if (typeof(val) == 'string' ) { // 判断是否是字符串
            if (val === '' || val.replace(/\s/ig,'') === '') {
                isnull = true;
            }
        }else if (val instanceof Array) { // 判断是否是数组
            if (val.length == 0) {
                isnull = true;
            }
        }else if (val instanceof Object) { // 判断是否是字典
            if (JSON.stringify(val) == '{}') {
                isnull = true;
            }
        }else {} // 判断其它的 boolean number symbol date function 
    }
    return isnull;
}

// 判断字符串是否为空，为空返回''，否则返回自己
var nullStr = function (str) {
    if (this.isNullVal(str)) {
        return '';
    }else {
        return str;
    }
}

module.exports = {
	isNullVal,
	nullStr
}