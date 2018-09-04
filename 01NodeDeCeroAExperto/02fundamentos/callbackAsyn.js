function asyncSqrt(value, callback) {
    console.log('START execution with value =', value);
    setTimeout(function() {
        callback(value, value * value);
    }, 0 | Math.random() * 100);
}

function forEachAll(data, each, finish, sync) {
    var n = -1, result = [];
    var next = sync ?
        function () {
            if (++n < data.length) { each(data[n], result, next); }
            else if (finish)       { finish(result); }
        } :
        (function () {
            function completed() {
                if (++n >= data.length && finish) { finish(result); }
            }
            for (var i = 0; i < data.length; i++) { each(data[i], result, completed); }
            return completed;
        }());
    next();
}

// for (let n = 0; n < 10; n++) {    
//     asyncSqrt(n, function(value, result) {
//         console.log('END execution with value =', value, 'and result =', result);
//     });
// }


// console.log('COMPLETED ?');


// forEachAll([0,1,2,3,4,5,6,7,8,9],
//     function(value, allresult, next) {
//         asyncSqrt(value, function(value, result) {
//             console.log('END execution with value =', value, 'and result =', result);
//             allresult.push({value: value, result: result});
//             next();
//         });

//     },
//     function(allresult) {
//         console.log('COMPLETED');
//         console.log(allresult);
//     },
//     false
// );

function fCallback(val){
    console.log(`ejecutando callback - ${val}`);
}


function funPpal(num, callback){
    console.log(`ejecutando funPal - ${num}`);
    callback(num);
    setTimeout(()=>{console.log('esperando ...')}, 2000);
}

funPpal(5, fCallback);