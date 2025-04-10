import moreDB from "../db/MoreDB.js";

const { mores } = moreDB.data;

function moreExist(phone) {
    return (mores.find((more) => more.phone === phone) !== undefined)
}

// 返回 str
function getAward(phone) {
    if(!moreExist(phone)) {
        return ""
    } else {
        return mores.find((more) => more.phone === phone).award
    }
}

function updateAward(phone, data) {
    moreDB.update(
        ({ mores }) => mores.find((more) => more.phone === phone).award = data
    )
}

export {
    getAward,
    updateAward
}