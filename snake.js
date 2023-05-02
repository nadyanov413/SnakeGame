    class SnakeHead{
    constructor(snake,cname,top,left, height, width, color){
        this.snake = snake;
        this.cname = cname;
        this.top = top;
        this.left = left;
        this.height= height;
        this.width = width; 
        this.color = color;

       this.headDiv =  $("<div>", {
            class: cname
        }).css("top", this.top)
        .css("left", this.left)
        .css("height", this.height)
        .css("width", this.width)
        .css("position", "fixed")
        .css("background-color",this.color)
        .css("z-index", 1);

        $(document.body).append(this.headDiv);

    }
    move(direction){
        var cell_size = this.snake.game.cell_size;
        

        if(direction == "ArrowRight"){
            this.left = this.left + cell_size;
        } else if(direction == "ArrowLeft"){
            this.left = this.left - cell_size;
        }else if(direction == "ArrowUp"){
            this.top = this.top - cell_size;
        }else if (direction == "ArrowDown"){
            this.top = this.top + cell_size
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
}


class Snake{ 
    constructor(game){
        this.game = game;
        var cell_size = this.game.cell_size;
        var top = this.game.top;
        var left = this.game.left;

        this.head = new SnakeHead(this, "h1", top, left + cell_size *3, cell_size, cell_size, "red");
        this.body = [];


        var block1  = new SnakeBlock( "b1", top, left + cell_size *2, cell_size, cell_size,"blue",this.head);
        this.body.push(block1);

        var block2 = new SnakeBlock( "b1", top, left + cell_size , cell_size, cell_size,"blue",block1); 
        this.body.push(block2);

        var block3 = new SnakeBlock( "b1", top, left, cell_size, cell_size,"blue",block2);
        this.body.push(block3);
    }


    move(direction){
        console.log("Snake:moved");

       

        var prevBlockIndex = this.body.length - 1;
        var prevBlock = this.body[prevBlockIndex];
        var bTop = prevBlock.top;
        var bLeft =  prevBlock.left;
        var bColor = prevBlock.color;
        var bWidth = prevBlock.width;
        var bHeight = prevBlock.height;
        
       if( $("#addBlock").is(":checked") ){
            var block = new SnakeBlock("b1", bTop, bLeft, bWidth, bHeight, bColor, prevBlock);
            this.body.push(block);
        }

        for(var i = this.body.length - 1; i >= 0; i--){
            this.body[i].move_to_prev();
        }
        


        this.head.move(direction);
    }

}

class SnakeGame{
    constructor(top,left,cell_count,cell_size){
        this.top = top;
        this.left = left;
        this.cell_count = cell_count;
        this.cell_size = cell_size;

        this.createBoard();
        this.snake = new Snake(this);
    }

    boardWidth(){
        return this.cell_size * this.cell_count;
    }
    
    boardHeight(){
        return this.cell_size * this.cell_count;
    }

    
    createBoard(){
        this.boardDiv = $("<div>",{
            id:"gameboard"})
            .css("position","fixed")
            .css("top",this.top)
            .css("left",this.left)
            .css("width", this.boardWidth())
            .css("height", this.boardHeight())
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

//----------------------------------------

var game = null;

function createGame(){
    game = new SnakeGame(40,20,20,20);    
}


document.addEventListener('keydown', function(event){
    var code = event.code;
    $("#h1").text(code);
    console.log($("#h1"));
    console.log(code);


    if(code == "ArrowRight" ) {
        game.snake.move(code);
    } else if(code == "ArrowLeft") {
        game.snake.move(code);
    }else if (code == "ArrowUp"){
        game.snake.move(code);
    }else if (code == "ArrowDown"){
        game.snake.move(code);
    }


});

function checkFoodPosition(i, foodDiv) {

    if (  $(foodDiv).offset().top != game.snake.head.top ) {
        return false;
    }

    if (  $(foodDiv).offset().left != game.snake.head.left ) {
        return false;

    }

    return true;

}
