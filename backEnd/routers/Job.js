import Router from "koa-router";
import { headExist } from "../Controller/Head.js";
import { isVIP } from "../Controller/User.js";
import { genJobRec } from "../Controller/Job.js";
import lzStr from 'lz-string'; // 删掉

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
    return ctx.response.body = JSON.stringify({
        details: [
            {"jid":"84128485","title":"Operations Clerk","company":"Tradeport Hong Kong Limited","location":"Kwun Tong","classification":"Import/Export & Customs (Manufacturing, Transport & Logistics)","desc":"༁낖߀戏恎ְā墟␐쁆〛肦䬀㎀ຘݤ褀렉˰рㆌ⏀ᜒΙ쀠劀湖က倆퀄⦝耋˜ℤ耉腁슲勔耠褒㇙蓋䢎봄˨Ҧ\u001e鲕࡯셹䰖酉\u0011耖耉褞肓ณ䀝\ude00ᫌኟ褀考첀踌ѝ袔芚躑薃讗聈䑜䩚䀆嘧下ᚉᙞ蛀ъ袦贰樀鬎\u0015츾褂 舢㧍쏒试쟔ሀ⠩ᎁಂ曝뤲蘁⦋往耆錠ຟ黩\u0016䰝踆᳀೓ꀔ䬤儁\udcfcॊ荀愰\ud89c唟Ệₐ저ટ澻삩䓩꒐ꂸᚎ㧥襩娝쪄怅Ζ뫓濤଄ݗ,蒀̈䳨〄⚗ꁇ悀「᪍闋䐰⚌萦理灌截쨑喇哠簡ᚁꌠǈ삐ࠑⴊ奀ℙ敹Ⱡ휞쟦턅騝ᢢ卮闓嚌젖숀褘鉰咺䤀̢䀤쀠瀬揘饋ꄈ瀛喫婑퓂꫰\udab0褘픰逦嚣㘓ɇ랡ꡌ䰛䒈ꌃ猾髫ᝇꁇ訁虷頼췙홈ꂡĴꎽ◒騪䔸饥↾᠟赃琊귱糤㲤宄픑⛩ᨦګ㋛〠␮⿮霃똌䘨ႈ碡ᴼ㇂Ȁ"},
            {"jid":"84120081","title":"Customer service","company":"Seiyo Global Logistics (Asia) Limited","location":"Sheung Wan","classification":"Customer Service - Call Centre (Call Centre & Customer Service)","desc":"༁낖߀∌ꂢ 㶀鰐䌁ᤠ清じƜw䀻҈׀伐耢ƌ鄕¸ᅏLͳむʀ㚀㤤ࣃ逆檀ⶺ橠鉒쒀⮵ұአ䞀⎶뀹퀷➬햰땞늉ᒸ쏰ဗ䀥ȡ=⤅аၸ㡔䀬鲘኶銲㲂\u0013ȭḺ਑ㆀމḊ᠞㤫Ĝ锱专鸞䔿ȧ9頍᎞岿㚍ਭℨ攍㴓ᬇ㜯°颔貟̥趁光奅䈒饚蚯聰僸摤⠤ఞࠪ缻欘स㤀蘹ፋ划ፚ雦씺୞ᛙ汃⌌ᘻᎂ臠듸攙蒀̭雲ᙷ帇ꁀ棔㰔ʁ눣桚：Ṛ蚏ꠑ꠨琘᪄䟲Т蜈鑔Ȋ뇘\uda1bᘁ賲槱䠚∘ጆⱨ ဃ얠蚠줕ꠀ㖂ᡚ衃맪⃄ᕃ֍↓塞Ḓ≄ꎊ䐌䤋ᘨ䯝䨍䅎葙腔눆ૣ儔큃䘴헬莈⣣쪈섙᩵䱆Ɓ⍻鰻爞堑䒶谡፨䈎탭頀ᐼ蹛뛖䥀Ϊꇸ\u001aЕ椈긩盤퐎슮ྐꢁ掜ⓥဃ讼髬┊藨\ud841쇈⵰⮼傀̈儵輢Ḉ⌔棤ꨅ큱籥অ쏈ࣱ൩༡㚸겫\uddc6⣳襟꼷皍᜜䉉\ud8e6裎ᓃ瑬褔ᕢ‴俑瑉젧׀킨ᵅ儁쵂쑧կ孁酴ᔕ由Ո靀鑭䔃퓰䊘ꔩ쨂Ეꗪ㴏ꕌၤ㡓䍳ါ霃礦\udb0b釕䵙ꛈ偍ճ砾╗傒なെꆴ漗ຼ࢛䲰괟䝜䀁⑬抏㍴眆ಉ甬輁苨币₁ₐ᥍䟁哵㍋삄뀱㒁䲖䰁燰໘Z┉ó吿헧鰵沙➹퀬贂벋崴랽㙥⏈쬡埭첊㷗돪Л솊帨퓩揁α쀵ả⧂຀ᦑ썐ᘨ靬锋萄譐ᚂ茀/➋⿃굜벶⊌돞迪哯ʲ뎝瑓ኪꠊ䪓톦\ud9ae潃졏좂썕㙏삝뫰⠀"}
        ]
    })
    
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

