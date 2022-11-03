class Note {
    constructor(title, content = "", color = null, pin = false, tags = []){
        this.title = title;
        this.content = content;
        this.color = color;
        this.pin = pin;
        this.date = Date.now();
        this.tags = tags;
    }
}

const note = new Note("test","test z programowania w js","#F00", true, ["#test","#js","#smierc"]);

console.log(note);