exports.handler = function (event, context) {

    try {

        var req = event.request;
       
        if (req.type === "LaunchRequest") {

            let options = {};
            options.speechText = "Welcome to Greetings skill. Using our skill you can greet yuor guests. Whom you want to greet?",
                options.repromptText = " You can say for example, say hello to Jair",
                options.endSession = false

            context.succeed(buildResponse(options));

        } else if (req.type === "IntentRequest") {

            let options = {}; console.log(req.intent.name)
            if (req.intent.name === "HelloIntent") {
                console.log(req.intent)
                let name = req.intent.slots.FistName.value;
                options.speechText = "Hello " + name + ".";
                options.speechText += getWish();
                options.endSession = true;

                context.succeed(buildResponse(options));
            } else {
                throw "Unknown intent";
            }

            options.speechText = "Welcome to Greetings skill. Using our skill you can greet yuor guests. Whom you want to greet?",
                options.repromptText = " You can say for example, say hello to Jair",
                options.ndSession = false

            context.succeed(buildResponse(options));

        } else if (req.type === "SessionEndedRequest") {} else {
            throw ("Unknown intent type");
        }

    } catch (error) {
        console.log(error);
        context.fail("Exception:" + error);
    }
}

function getWish() {
    var myDate = new Date();
    var hours = myDate.getUTCHours() - 8;
    if (hours < 0) {
        hours = hours + 24;
    }

    if (hours < 12) {
        return " Good Morning. ";
    } else if (hours < 18) {
        return " Good afternoon. "
    } else {
        return " Good evening. "
    }

}

function buildResponse(options) {
    var resp = {
        version: "1.0",
        response: {
            outputSpeech: {
                type: "PlainText",
                text: options.speechText
            },
            shouldEndSession: options.endSession
        }

    };
    if (options.repromptText) {
        resp.response.reprompt = {
            outputSpeech: {
                type: "PlainText",
                text: options.repromptText
            }
        }
    }
    
    return resp;
}