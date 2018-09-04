function fCallback(val){
    console.log(`ejecutando callback - ${val}`);
}


function funPpal(num, callback){
    console.log(`ejecutando funPal - ${num}`);
    callback(num);
    setTimeout(()=>{console.log('esperando ...')}, 2000);
}

funPpal(5, fCallback);