var World = (function () {

    // the current state pf the world
    var state = {

        maxParcel : 10,

        // all land parcel instances
        parcels : []

    };

    // the parcle class
    var Parcel = function (options) {

        var owner = options.owner || {

            name : 'player',
            typePoints : {

                desart : 100,
                rural : 9,
                urban : 1

            }

        };

        options = options || {};

        this.landType = 'none';
        this.landValue = 0;
        this.size = 1000;
        this.perTick = 0;

        this.setWithOwnerObj(owner);

    };

    // set the parcels values with the given owner object
    Parcel.prototype.setWithOwnerObj = function (owner) {

        var totalPoints = 0;
        Object.keys(owner.typePoints).forEach(function (landTypeName) {

            console.log(landTypeName);

        })

    }

    var api = function () {

        return state;

    };

    api.addParcel = function (options) {

        var parcel;

        options = options || {};

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

World.addParcel();
