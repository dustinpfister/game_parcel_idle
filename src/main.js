
// my simple stupid get method
var get = function(id){
	
	return document.getElementById(id);
	
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

    World.buyParcel();

    var parcels = World().parcels;

    var html = '';

    parcels.forEach(function (parcel) {

        html += JSON.stringify(parcel) + '<br>';

    });

    document.getElementById('gamearea').innerHTML = html;

});
