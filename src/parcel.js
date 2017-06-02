var Parcels = (function () {

    var state = {

        // the parcels that the player owns
        parcles : [],
        forSale : []// parcels that are available to buy

    };

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

    }

    var api = {}

    return api;

}
    ());
