var express = require('express');
var foursquare = (require('foursquarevenues'))('LM1YL50MWBGS2KA5ZN5HLT2EXJTIL1ISW0UDKZWUIWCI0GVR', 'U3KOV1TGXXSYNBVOAYDXD3R4B0JUDKTF403NX1RQZ23GZ4JJ');
var router = express.Router();

/* GET venues listing. */
router.post('/venues', function(req, res, next) {
    var params = {
		'll': req.body.params.lat+','+req.body.params.lon
	};

    foursquare.getVenues(params, function(error, ret) {
		if (!error) {
            if (ret.meta.code == 200) {
    			res.json(ret.response.venues);
            }
		}
        else {
            console.error(error);
        }
	});
});

module.exports = router;
