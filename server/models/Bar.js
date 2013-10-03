module.exports = function(){
    var barSchema = mongoose.Schema({
        name: String,
        beers: [
        	name: String,
        	price: Number,
    		active: Boolean,
        ],
        specials: [
        	title: String,
        	description: String
        ]
    });
    var Bar = mongoose.model("Bar", barSchema);
    return Bar;
}