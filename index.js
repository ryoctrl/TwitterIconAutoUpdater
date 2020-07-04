const Twitter = require('twitter');
const git = require('simple-git');
const fs = require('fs').promises;
const moment = require('moment');
const cron = require('node-cron');

const repo = process.env.ICON_REPOSITORY;
const repoDir = process.env.ICON_REPOSITORY_DIR;
const iconsDir = `${repoDir}/twitter/`;

const isExists = dir => fs.stat(dir).then(stats => stats.isDirectory()).catch(() => false);

const pullRepository = async () => {
    const isExist = await isExists(repoDir);
    if(!isExist) {
        await git().clone(repo, repoDir);
    } else {
        git(repoDir).pull();
    }
};

// アイコン選択ロジック
// 日付をアイコンの数で割って添え字にする
// 毎日アイコンが変わる
const getIconIdx = (icons) => {
    const date = moment().date();
    return date % icons.length;
}

// 次に設定するアイコンをBase64で返す
const getIconBase64 = async () => {
    const isExist = await isExists(iconsDir);
    if(!isExist) throw new Error('Twitter icons dir is not exists!');

    const files = await fs.readdir(iconsDir);
    const idx = getIconIdx(files);
    const filePath = `${iconsDir}${files[idx]}`;
    const result = await fs.readFile(filePath, 'base64');
    return result;
}

// Twitterアイコンを更新する
const updateIcon = async () => {
    const client = new Twitter({
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token_key: process.env.ACCESS_TOKEN,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    });

    const path = 'account/update_profile_image.json';
    const image = await getIconBase64();
    const params = {
        image,
    }

    client.post(path, params, (err, body) => {
        if(err) {
            console.error(err);
            return;
        }

        console.log(moment().format('YYYY/MM/DD HH:mm:ss'), 'icon updated');
    });
};

// 毎日0時5分にアイコン更新
cron.schedule('0 5 0 * * *', () => pullRepository().then(updateIcon));


