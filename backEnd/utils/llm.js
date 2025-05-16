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

function genCareerPathMsgs(userInfo, compInfo) {
  return [
    { role: "system", content: "You are an experienced HR." },
    { role: "user",   content: 
`I am a recent graduate, currently seeking job opportunities in the e-commerce field in Hong Kong.\n
This is my personal info:\n ${userInfo}.\n
And this is the company that I'm plan to work in: ${compInfo}\n
Help me to predict my salary and job grade for the first 3 years:
- [Salary] should be a number (in Hong Kong Dollar).
- [Job Grade] belongs to 4 classes:
\t 0 - 'Entry-Level': Example roles: E-commerce Assistant, Marketing Assistant
\t 1 - 'Mid-Level': Example roles: E-commerce Executive, Online Marketing Manager
\t 2 - 'Senior-Level': Example roles: Senior E-commerce Manager, Digital Marketing Lead
\t 3 - 'Management-Level': Example roles: E-commerce Director, Head of Digital Strategy\n
- Answer in the following JSON format, without any other reason.
- Job Grade: return the index, which belongs to \`[0, 1, 2, 3]\`\n
EXAMPLE JSON OUTPUT:
{
\tsalary: [first_year_salary, second_year_salary, third_year_salary],
\tjobGrad: [first_year_jobGrade, second_year_jobGrade, third_year_jobGrade]
}
` },
  ];
}

async function getCompletion(msgs) {
  return new Promise((resolve, reject) => {
    openai.chat.completions.create({
      messages: msgs,
      model:    process.env.MODEL_NAME,
      response_format: { type: 'json_object' } // return in JSON
    }).then((completion) => {
      resolve(completion.choices[0].message.content);
    }).catch((err) => {
      console.error(err);
      reject(err);
    });
  });
}

async function getJSONCompletion(msgs) {
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
  genJobRecMsgs,
  genCareerPathMsgs,
  getCompletion,
  getJSONCompletion
}