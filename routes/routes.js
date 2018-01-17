var https = require('https');
https.post = require('https-post');

var appRouter = function (app) {

    app.get("/", function (req, res) {
        res.send("Hello World");
    });

    app.post("/account", function (req, res) {
        if (!req.body.username || !req.body.password || !req.body.twitter) {
            return res.send({ "status": "error", "message": "missing a parameter" });
        } else {
            return res.send(req.body);
        }
    });



    app.post("/", function (req, res) {
        //res.send(req.body);
        https.post('https://us-central1-smart-comm.cloudfunctions.net/updateLocation',
            { "car": "001", "lat": req.body.lat, "long": req.body.long },
            function (res) {
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    console.log(chunk);

                });
            });
        res.send(req.body)
    })

}

module.exports = appRouter;