module.exports = function (mongoose){
    var Bar = require('./Bar')(mongoose);

    return  {
        Bar: Bar
    }
}