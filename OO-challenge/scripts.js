class Vechicle {
    constructor (make, model, year) {
        this.make = make; 
        this.model = model; 
        this.year = year; 
    }
    honk(){
        return "Beep."; 
    }
    toString(){
        return `The vehicle is a ${this.make} ${this.model} from ${this.year}.`;
    }
}

class Car extends Vechicle {
    constructor (make, model, year) {
        super(make, model, year); 
        this.numWheels = 4; 
    }
}

class Motorcycle extends Vechicle {
    constructor (make, model, year) {
        super(make, model, year);
        this.numWheels = 2;
    }
    revEngine() {
        return "VROOM!!!";
    }
}

class Garage {
    constructor (capacity) {
        this.vehicles = [];
        this.capacity = capacity; 
    }
    add (vechicle) {
        if (!(vechicle instanceof Vechicle)) {
            return "Only vehicles are allowed in here!";
        }
        if (this.vehicles.length >= this.capacity) {
            return "Sorry, we're full."; 
        }
        this.vehicles.push(vechicle);
        return "Vehicle added!"; 
    }
}