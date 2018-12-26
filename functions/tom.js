const {BasicCard,Image,Button,Suggestions} = require('actions-on-google')

module.exports = {
    aboutTom : function(conv){
        conv.ask("Hey This the info about Tom");
    conv.ask(new BasicCard({
        title: "About Tom",
        subtitle : "tom is a good boy",
        text:" hey this about tom , he is a **subscriber** of _Boring Codes_ , if you like it you should also subscribe to boring codes",

        image : new Image({
            alt : "Some title",
            url : "https://i.ibb.co/hZMhjdg/DP823192.jpg",
        }),
        buttons: new Button ({
            url : "https://imgbb.com/",
            title:"Image BB"
        }),
        display : "DEFAULT"
    }))
    conv.ask(new Suggestions(['Tell me about Tom'],['about Harry'],['about Luke']));
    
    }
}