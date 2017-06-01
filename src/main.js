
var loop = function () {

    setTimeout(loop);

    document.getElementById('disp').innerHTML = 'money: ' + World().money;

};

loop();

document.getElementById('button_buy_parcel').addEventListener('click', function () {

    console.log('buying parcel');

    World.buyParcel();

    var parcels = World().parcels;

    var html = '';

    parcels.forEach(function (parcel) {

        html += JSON.stringify(parcel) + '<br>';

    });

    document.getElementById('gamearea').innerHTML = html;

});
