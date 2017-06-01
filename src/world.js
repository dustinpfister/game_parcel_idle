var World = (function () {

    // the current state pf the world
    var state = {

        money : 1,
        parcelCost : 1,

        lastTick : new Date(),
        tickTime : 1000,

        maxParcel : 3,

        // all land parcel instances
        parcels : [],

        buyerObj : {

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

            ],

            landTypes : {

                desart : {

                    size : 90,
                    perSize : .1

                },
                rural : {

                    size : 20,
                    perSize : .25

                },
                urban : {

                    size : 3,
                    perSize : 1

                }

            }

        },

        setParcelCost : function () {

            this.parcelCost = Math.pow(16, this.parcels.length);

        }

    };

    state.setParcelCost();

    // the parcle class
    var Parcel = function () {

        this.id = new Date().getTime() + '';
        this.landType = 'none';
        this.landValue = 0;
        this.size = 1000;
        this.perTick = 1;

        // find the land type
        this.findLandType();

        // set the size
        this.setSize();

        // update the land value
        this.updateValue();

    };

    Parcel.prototype.setSize = function (buyerObj) {

        buyerObj = buyerObj || state.buyerObj;

        // set size by land type
        this.size = buyerObj.landTypes[this.landType].size;

        this.perSize = buyerObj.landTypes[this.landType].perSize;

    }

    Parcel.prototype.updateValue = function () {

        // land value
        this.landValue = this.size * this.perSize;

        // just 10% of land value for now
        this.perTick = Number((this.landValue * .1).toFixed(2));

    };

    // set the land type depending on a buyer object
    Parcel.prototype.findLandType = function (buyerObj) {

        var totalPoints = 0,
        roll;

        // use the hard hoded buyerOBJ by default
        buyerObj = buyerObj || state.buyerObj;

        // sort typePoints with lowest first
        buyerObj.typePoints = buyerObj.typePoints.sort(function (a, b) {

                return a.points > b.points;

            });

        console.log(buyerObj.typePoints);

        // find total points
        buyerObj.typePoints.forEach(function (ltp) {

            totalPoints += ltp.points;

        });

        // make a roll between 0 and total points
        roll = Math.floor(Math.random() * totalPoints);

        var i = 0,
        len = buyerObj.typePoints.length;

        // default to the last type in the list
        this.landType = buyerObj.typePoints[buyerObj.typePoints.length - 1].landType;

        // find the type.
        while (i < len) {

            if (roll < buyerObj.typePoints[i].points) {

                this.landType = buyerObj.typePoints[i].landType;

                break;
            }

            i += 1;

        }

        console.log(this.landType);

    }

    var api = function () {

        return state;

    };

    api.addParcel = function (buyerObj) {

        var parcel;

        buyerObj = buyerObj || {};

        // if we have not reached max parcels, we can make a new one
        if (state.parcels.length < state.maxParcel) {

            // make the parcel
            parcel = new Parcel(buyerObj);

            state.parcels.push(parcel);

        }

    };

    //
    api.buyParcel = function (buyerObj) {

        if (state.money >= state.parcelCost && state.parcels.length < state.maxParcel) {

            state.money -= state.parcelCost;
            api.addParcel();

            state.setParcelCost();

        }

    };

    api.update = function () {

        var now = new Date();

        if (now - state.lastTick >= state.tickTime) {

            state.parcels.forEach(function (parcel) {

                state.money += parcel.perTick;

            });

            // cut to cents
            state.money = Number(state.money.toFixed(2));

            state.setParcelCost();

            state.lastTick = new Date();

        }

    };

    api.sellParcel = function (id) {

        var i = state.parcels.length;
        while (i--) {

            if (state.parcels[i].id === id){
				
			    state.money += state.parcels[i].landValue;
				
				state.parcels.splice(i,1);

                return state.parcels[i];

            }

        }

        return {};

    }

    return api;

}
    ());
