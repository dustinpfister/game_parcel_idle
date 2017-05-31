var World = (function () {

    // the current state pf the world
    var state = {

        maxParcel : 10,

        // all land parcel instances
        parcels : []

    };

    // the parcle class
    var Parcel = function (options) {

        this.owner = options.owner || 'player';
        this.landValue = 0;
        this.size = 1000;
        this.perTick = 0;

    };

    var api = function () {

        return state;

    };

    api.addParcel = function (options) {

        var parcel;

        // if we have not reached max parcels, we can make a new one
        if (state.parcels.length < state.maxParcel) {

            // make the parcel
            parcel = new Parcel(options);

            state.parcels.push(parcel);

        }

    };

    return api;

}
    ());

World.addParcel({

    owner : 'player'

});
