import OpenAI from "openai";
import 'dotenv/config';

const openai = new OpenAI({
    baseURL: process.env.MODEL_URL,
    apiKey:  process.env.MODEL_KEY,
    temprature: 2.0,
});

function genSelfStatementMsgs(userInfo) {
    return [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user",   content: 
`I am a recent graduate, currently seeking job opportunities in the e-commerce field in Hong Kong.\n
This is my personal info:\n${userInfo}.\n
Can you summarize a short self-statement for me in 2~3 sentences?\n
Please don't output message that is not required, just show me the result.` },
    ];
}

function genJobRecMsgs(userInfo, jobReqs) {
    return [
        { role: "system", content: "You are an experienced HR." },
        { role: "user",   content: 
`I am a recent graduate, currently seeking job opportunities in the e-commerce field in Hong Kong.\n
This is my personal info:\n ${userInfo}.\n
And here it's the requirements of a job: \n${jobReqs}\n\n
For each requirement, check if my background matches:\n
\t - Return in this format: \`- [Only True / False] [Original Requirement] ([Brief Reason])\`\n
Please don't output message that is not required, just show me the result.` },
    ];
}

async function getCompletion(msgs) {
  return new Promise((resolve, reject) => {
    openai.chat.completions.create({
      messages: msgs,
      model:    process.env.MODEL_NAME,
    }).then((completion) => {
      resolve(completion.choices[0].message.content);
    }).catch((err) => {
      console.error(err);
      reject(err);
    });
  });
}

async function genSelfStatement(userInfo) {
  return new Promise((resolve) => {
    getCompletion(genSelfStatementMsgs(userInfo))
    .then((res) => {
      resolve(res);
    })
  })
};

export {
  genSelfStatement,
  getCompletion,
  genJobRecMsgs
}