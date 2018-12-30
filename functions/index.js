const functions = require('firebase-functions');
const {dialogflow,BasicCard,Image,Button, Suggestions,LinkOutSuggestion}=require("actions-on-google");
const app = dialogflow({debug:true});
const t= require('./tom');
const rp=('request-promise')

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

app.intent('pnr_status',(conv)=>{
    conv.ask("Please help me with your PNR no.");
    conv.ask(new Suggestions(['Cancel']));
})

app.intent('input',(conv)=>{
    x=`${conv.input.raw}`;
    console.log(x);
    const options = {
        method:'GET',
        url:`https://api.railwayapi.com/v2/pnr-status/pnr/${x}/apikey/3kof767gct/`,
        json:true
    }
    var data=[];
    return rp(options)
        .then(function(parseBody){
            var y= parseBody.passengers.length;
            console.log(y)
            for (var i=0;i<y;i++){
                data.push(parseBody.passengers[i].current_status);
            }
            var booking=[]
            for(i=0;i<y;i++){
                booking.push(parseBody.passengers[i].booking_status)
            }
            var str='here';
            for(i=0;i<y;i++){
                var z=i+1;
                str=str+'Passenger'+z+'Booking status was'+booking[i]+' and currnet status is '+data[i]+' ,';
            }
            console.log(data);
            console.log(booking);
            console.log(str);
            return conv.ask(str);
        })
        .catch(err=>{
            console.log(err);
            conv.ask(`error`);
        })
})
exports.dialogflowFirebaseFulfillment=functions.https.onRequest(app);
