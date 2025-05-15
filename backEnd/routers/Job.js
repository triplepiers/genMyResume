import Router from "koa-router";
import { headExist } from "../Controller/Head.js";
import { isVIP } from "../Controller/User.js";
import { genJobRec } from "../Controller/Job.js";

const jobRouter = new Router({
    prefix: '/job'
});

/* 拦截，统一 check user是否存在
   201 { 没带 }
   204 { 没写过简历 }
*/
jobRouter.use(async (ctx, nxt) => {
    if (ctx.method == 'GET') {
        var { phone }  = ctx.query;
    } else {
        var { phone }  = ctx.request.body;
    }
    if (!phone) {
        return ctx.status = 201;
    } else {
        ctx.phone = phone;
        if (!headExist(phone)) { return ctx.status = 204; } 
    }
    await nxt();
})

jobRouter.get('/', async (ctx, nxt) => {
    ctx.status = 200;
    let phone = ctx.phone;
    let n = isVIP(phone)?30:10; // VIP:30, 普:10
    n = 2;
    return ctx.response.body = {"details":[{"jid":"84115974","title":"Senior Marketing Officer","company":"Town Health Medical & Dental Services Limited","location":"Sha Tin District","classification":"Marketing Communications (Marketing & Communications)","desc":"<li>Bachelor Degree / Diploma / Certificate / Associate Degree in Media, Marketing, Advertising, Communications, Public Relations, or related disciplines <span style=\"color: red;\">(Your degree is in Marketing, but the timeline shows it ends in 2027, which is inconsistent with being a recent graduate.)  </span></li><li>Minimum 2-3 years’ relevant experience <span style=\"color: red;\">(Your work experience at ByteDance is unclear in duration, and the internship is only 1 year.)  </span></li><li>Preferably in the medical / healthcare industry experience <span style=\"color: red;\">(No healthcare industry experience mentioned.)  </span></li><li>In-depth knowledge in various marketing platforms, channels, SEO and CRM including social, digital, and email marketing <span style=\"color: red;\">(No specific mention of these skills.)  </span></li><li>Creative, presentable, multi-tasking and independent <span style=\"color: green;\">(Assumed soft skills, but not explicitly stated.)  </span></li><li>A self-initiative team player with strong sense of responsibility, well-organised skills and attend to details <span style=\"color: green;\">(Assumed soft skills, but not explicitly stated.)  </span></li><li>Good command of interpersonal and communication skills <span style=\"color: green;\">(Language proficiency suggests strong communication.)  </span></li><li>Passionate about Healthcare industry <span style=\"color: red;\">(No mention of healthcare interest.)  </span></li><li>Excellent in Cantonese, Mandarin and English, outstanding verbal and written communication skills <span style=\"color: green;\">(You listed Chinese and English at professional levels, but Cantonese is not specified.)  </span></li><li>Proficiency in MS Office application <span style=\"color: green;\">(Words, Excel and Powerpoint) (You listed Word, PowerPoint, and Excel as skills.)</span></li>"},{"jid":"84116266","title":"Sales Executive – Children’s Book Printing","company":"Cheong Ming Press Factory Limited","location":"Kwai Tsing District","classification":"Printing & Publishing Services (Trades & Services)","desc":"<li>3-5 years of experience in sales, ideally in printing, publishing, or packaging. <span style=\"color: red;\">(No relevant sales experience in specified industries.)  </span></li><li>Strong understanding of book printing, production, and finishing techniques. <span style=\"color: red;\">(No mentioned experience or knowledge in this field.)  </span></li><li>Excellent communication and client relationship skills. <span style=\"color: green;\">(Leadership role at ByteDance suggests relevant skills.)  </span></li><li>Fluent in English and Chinese <span style=\"color: green;\">(Cantonese & Mandarin). (Languages listed include Chinese and English at professional levels.)  </span></li><li>Advantageous: Existing network in the publishing industry. <span style=\"color: red;\">(No mentioned connections in publishing.)</span></li>"}]}
    return new Promise((resolve) => {
        genJobRec(n, phone).then(
            res => {
                ctx.response.body = JSON.stringify({ details: res });
                resolve()
            }
        )
    })    
})

export default jobRouter;

