
// my simple stupid get method
var get = function (id) {

    return document.getElementById(id);

};

// inject a parcel UI
var injectParcelUI = function (parcel) {

    var display = ['id', 'landType', 'size', 'landValue', 'perSize', 'perTick', 'ticks'],

    field,
    prop,
    button_sell = document.createElement('input'),
    container = document.createElement('div');

    container.id = 'parcel_' + parcel.id;
    container.className = 'parcel_container';

    for (prop in parcel) {

        if (display.indexOf(prop) != -1) {

            field = document.createElement('span');

            field.innerHTML = prop + ': ' + parcel[prop] + ' <br>';

            container.appendChild(field);

        }

    }

    button_sell.value = 'Sell';
    button_sell.type = 'button';
    button_sell.addEventListener('click', function (e) {

        console.log('yes this is dog');
        console.log();

        World.sellParcel(e.target.parentNode.id.split('_')[1]);
        e.target.parentNode.remove();

    });

    container.appendChild(button_sell);

    // append to container
    get('parcels_html').appendChild(container);

};

var updateUI = function () {

    console.log('update ui');

};

var displayParcels = function () {

    var parcels = World().parcels;

    var html = '';

    parcels.forEach(function (parcel) {

        html += JSON.stringify(parcel) + '<br>';

    });

    document.getElementById('parcels_raw').innerHTML = html;

};

World.addOnTick(function () {

    updateUI();

});

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
