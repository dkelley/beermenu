module.exports = function (mongoose){
    var barSchema = mongoose.Schema({
        name: String,
        beers: [{
            name: String,
            price: Number,
            active: Boolean,
        }],
        specials: [{
            title: String,
            description: String
        }]
    });

    return  mongoose.model("Bar", barSchema)
}