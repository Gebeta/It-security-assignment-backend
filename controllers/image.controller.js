const fs = require("fs");

exports.getImage = async (req,res) => {
    try {
        res.sendFile('/public/images/' + req.params.name, { root: '.' })
    } catch (error) {
        
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}


exports.uploadImage = async (req, res) => {
    try {
        var folder = './public/images/' + req.body.reportid;
        fs.mkdir(folder, function (err) {
            if (err) {
                console.log(err)
                return res.status(400).json({ error: true, message: err.message })
            }
        })

        // wait 1s till create folder for the image
        suspend(1000).then(() => {
            var file = req.files[0];
            var target_path = folder + '/' + req.body.fileLocation;

            fs.rename(file.path, target_path, err => {
                if (err) {
                    suspend(3000).then(() => {
                        fs.rename(file.path, target_path, err => {
                            res.status(400).json({ error: true, message: err.message })
                        })
                    })
                    return
                }
            })
            res.status(200).json({ message: " image uploaded successfully" })
        });

    } catch (error) {
        console.log(error)
        res.status(400).json({
            error: true,
            message: error.message
        })
    }

}


function suspend(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}