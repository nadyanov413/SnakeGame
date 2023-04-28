class SnakeHead{
    constructor(cname,top,left, height, width, color){
        this.cname = cname;
        this.top = top;
        this.left = left;
        this.height= height;
        this.width = width; 
        this.color = color;

       this.headDiv =  $("<div>", {
            class: cname
        }).css("top", this.top).css("left", this.left).css("height", this.height)
        .css("width", this.width).css("position", "fixed")
        .css("background-color",this.color);

        $(document.body).append(this.headDiv);

    }
    move(direction){
        console.log("SnakeHead:moved");

        if(direction == "ArrowRight"){
            this.left = this.left + 40;
        } else if(direction == "ArrowLeft"){
            this.left = this.left - 40;
        }else if(direction == "ArrowUp"){
            this.top = this.top - 40;
        }else if (direction == "ArrowDown"){
            this.top = this.top + 40
        };

        this.headDiv.css("top", this.top).css("left", this.left);

    }
}
    


class SnakeBlock{
    constructor(cname, top, left, height, width, color, prev_block){
        this.cname = cname;
        this.top = top;
        this.left = left;
        this.height= height;
        this.width = width; 
        this.color = color;
        this.prev_block = prev_block;

       this.snakeBlockDiv =  $("<div>", {
            class: cname
        }).css("top", this.top).css("left", this.left).css("height", this.height)
        .css("width", this.width).css("position", "fixed")
        .css("background-color",this.color);

        $(document.body).append(this.snakeBlockDiv);


    }

    move_to_prev (){
        this.top = this.prev_block.top;
        this.left = this.prev_block.left;
        this.snakeBlockDiv.css("top", this.top).css("left", this.left);
    }

    move(direction){

        if(direction == "ArrowRight"){
            this.left = this.left + 10;
        } else if(direction == "ArrowLeft"){
            this.left = this.left - 10;
        }else if(direction == "ArrowUp"){
            this.top = this.top - 10;
        }else if (direction == "ArrowDown"){
            this.top = this.top + 10
        };

        this.snakeBlockDiv.css("top", this.top).css("left", this.left);

    }
}


class Snake{ 
    constructor(){
        this.head = new SnakeHead("h1", 40, 160, 40, 40, "red");
        this.body = [];


        var block1  = new SnakeBlock("b1", 40, 120, 40,40,"blue",this.head);
        this.body.push(block1);

        var block2 = new SnakeBlock("b1", 40, 80, 40,40,"blue",block1);
        this.body.push(block2);

        var block3 = new SnakeBlock("b1", 40, 40, 40,40,"blue",block2);
        this.body.push(block3);
    }
    move(direction){
        console.log("Snake:moved");
        // this.head.move(direction);
        // for(var block of this.body) {
        //     block.move(direction);
        // };

        // this.body[2].move_to_prev();
        // this.body[1].move_to_prev();
        // this.body[0].move_to_prev();

        for(var i = this.body.length - 1; i >= 0; i--){
            this.body[i].move_to_prev();
        }

        this.head.move(direction);
    }

}

class Snakegame{
    constructor(top,left,cell_count,cell_size){
        this.top = top;
        this.left = left;
        this.cell_count = cell_count;
        this.cell_size = cell_size;
        this.boardDiv = $("<div>",{
            id:"gameboard"})
            .css("top",this.top)
            .css("left",this.left)
            .css("width", this.cell_size * this.cell_count)
            .css("height", this.cell_size * this.cell_count)
            // .css("background-color", "green")
            .css("position", "fixed")
            .css("border","solid");

        $(document.body).append(this.boardDiv);
    }
    createFood(){
        for( var i = 0; i <10;i++){
            var left = Math.floor(Math.random()*this.cell_count)*this.cell_size + this.left;
            var top = Math.floor(Math.random()*this.cell_count)*this.cell_size + this.top;
            var foodDiv = $("<div>",{
                class :"food"})
                .css("top",top)
                .css("left",left)
                .css("width",this.cell_size)
                .css("height",this.cell_size)
                .css("position", "fixed")
                .css("background-color", "green");

            $(document.body).append(foodDiv);   
        }
    }

    cleanFood(){
        $(".food").remove();        
    }


}

var snake = new Snake();


document.addEventListener('keydown', function(event){
    var code = event.code;
    $("#h1").text(code);
    console.log($("#h1"));
    console.log(code);


    if(code == "ArrowRight" ) {
        $("#qq").text(1);
        snake.move(code);
    } else if(code == "ArrowLeft") {
        $("#qq").text(2)
        snake.move(code);
    }else if (code == "ArrowUp"){
        $("#qq").text(3)
        snake.move(code);
    }else if (code == "ArrowDown"){
        $("#qq").text(4)
        snake.move(code);
    }


});


