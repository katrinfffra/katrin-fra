function Car(model, color, year, type) {
    this.model = model;
    this.color = color;
    this.year = year;
    this.type = type;
    this.start = function () {
        console.log("car is run");

    }
}

var bmv = new Car(320, "red", 2020, "cuzov");
var mercedes = new Car("glk", "blue", 2015, "cupe");
var a = "hello";

function changeColor() {
    var EL = document.getElementById('app');
    console.log(EL)
}

