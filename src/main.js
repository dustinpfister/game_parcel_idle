
// my simple stupid get method
var get = function (id) {

    return document.getElementById(id);

};

var injectParcelUI = function (parcel) {

    var display = ['id','landType','size','landValue','perSize','perTick'];

    var container = document.createElement('div');
    container.id = 'parcel_' + parcel.id;
    container.className = 'parcel_container';

    var field;
    for (var prop in parcel) {

        if (display.indexOf(prop) != -1) {

            field = document.createElement('span');

            field.innerHTML = prop + ': ' + parcel[prop] + ' <br>';

            container.appendChild(field);

        }

    }

    // append to container
    get('parcels_html').appendChild(container);

};

var displayParcels = function () {

    var parcels = World().parcels;

    var html = '';

    parcels.forEach(function (parcel) {

        html += JSON.stringify(parcel) + '<br>';

    });

    document.getElementById('parcels_raw').innerHTML = html;

};

var loop = function () {

    setTimeout(loop);

    get('disp').innerHTML = 'money: ' + World().money;

    get('button_buy_parcel').value = 'Buy Parcel ( ' + World().parcelCost + ' ) ';

    World.update();

};

loop();

document.getElementById('button_buy_parcel').addEventListener('click', function () {

    console.log('buying parcel');

    World.buyParcel(function (success, parcel) {

        console.log(success);

        if (success) {

            injectParcelUI(parcel);

        }

    });

    //displayParcels();

});
