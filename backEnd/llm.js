import OpenAI from "openai";
import 'dotenv/config';

const openai = new OpenAI({
    baseURL: process.env.MODEL_URL,
    apiKey:  process.env.MODEL_KEY,
    temprature: 1.0,
});

function genMsgs(userInfo) {
    return [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user",   content: 
            `I am a recent graduate, currently seeking job opportunities in the e-commerce field in Hong Kong.<br>

            This is my personal info ${userInfo}.<br>
            
            Can you summarize a short self-statement for me in 2~3 sentences? Please don't output message that is not required.` },
    ];
}

async function getCompletion(msgs) {
  const completion = await openai.chat.completions.create({
    messages: msgs,
    model:    process.env.MODEL_NAME,
  });

  return completion.choices[0].message.content;
}

async function genSelfStatement(userInfo) {
    let res = await getCompletion(genMsgs(userInfo));
    // let res = await getCompletion([
    //     {role:"user", content:"hello"}
    // ]);
    return res;
}

let res = await genSelfStatement("");
console.log(res);