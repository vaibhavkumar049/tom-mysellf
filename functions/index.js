const functions = require('firebase-functions');
const {dialogflow,BasicCard,Image,Button, Suggestions,LinkOutSuggestion}=require("actions-on-google");
const app = dialogflow({debug:true});
const t= require('./tom');

app.intent("Default Welcome Intent",(conv)=>{
    conv.ask("hey I am Tom , welcome to my actions on google");
    conv.ask("What do you wamt to know more ?");
    conv.ask(new Suggestions(['Tell me about Tom'],['about Harry'],['about Luke']));
})
app.intent("about-tom",(conv)=>{
    t.aboutTom(conv);
});

app.intent('friends',(conv,{tom_friends})=>{
    conv.ask(`Hey this is Tom Friend's ${tom_friends}`);
    if(tom_friends==="Peter"){
        conv.ask(`Peter is not a nice Guy`);
    }
    else if(tom_friends==="Harry"){
        conv.ask(`Harry is a good guy`)
        
    }
    else{
        conv.ask(`All of his frinds is a good person`);
    }
    conv.ask(new Suggestions(['Tell me about Tom'],['about Harry'],['about Luke']));

})
exports.dialogflowFirebaseFulfillment=functions.https.onRequest(app);
