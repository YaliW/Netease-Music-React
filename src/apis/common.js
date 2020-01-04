const prefix = 'http://localhost:3000';
// const prefix = process.env.VUE_APP_TEMP
// console.log(prefix, process, process.env)

export default {
    getPlayList: {
        url: `${prefix}/top/playlist`,
        method: 'GET'
    }
};   