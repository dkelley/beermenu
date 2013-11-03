module.exports = function (mongoose){
    var barSchema = mongoose.Schema({
        name: String,
        onTap: [],
        specials: [{
            title: String,
            description: String
        }]
    });

    return  mongoose.model("Bar", barSchema)
}