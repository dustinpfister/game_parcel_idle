var World = (function () {

    // the current state pf the world
    var state = {

	    money : 1000,
	
        maxParcel : 10,

        // all land parcel instances
        parcels : []

    };

    // the parcle class
    var Parcel = function (options) {

        var owner = options.owner || {

            name : 'player',
            typePoints : [{
                    landType : 'desart',
                    points : 90
                }, {
                    landType : 'rural',
                    points : 9
                }, {
                    landType : 'urban',
                    points : 1
                }

            ]

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

        var totalPoints = 0,
        roll;

        // sort typePoints with lowest first
        owner.typePoints = owner.typePoints.sort(function (a, b) {

                return a.points > b.points;

            });

        console.log(owner.typePoints);

        // find total points
        owner.typePoints.forEach(function (ltp) {

            totalPoints += ltp.points;

        });

        // make a roll between 0 and total points
        roll = Math.floor(Math.random() * totalPoints);

        var i = 0,
        len = owner.typePoints.length;

        // default to the last type in the list
        this.landType = owner.typePoints[owner.typePoints.length - 1].landType;

        // find the type.
        while (i < len) {

            if (roll < owner.typePoints[i].points) {

                this.landType = owner.typePoints[i].landType;

                break;
            }

            i += 1;

        }

        console.log('total points: ' + totalPoints);
        console.log('roll: ' + roll);
        console.log(this.landType);

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
