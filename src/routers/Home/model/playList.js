class TopPlayList {
    constructor(props) {
        // 数据处理
        // 在构造函数里 定义本 class 的属性，
        this.id = props.id;
        this.name = props.name;
        this.coverImage = props.coverImgUrl;
        this.userName = props.creator.nickname;
        this.playCount = props.playCount;

    }

    // fromJS 是全局使用，所以写到原型链上面
    static fromJS = (value) => {
        // TODO
        // 处理原生数据，返回实例对象

        // 判断一个数组是否是数组的方法
        // 1. Array.isArray
        // 2. Object.prototype.toString.call(arr) === “[Object Array]”
        // 3. arr instanceOf Array
        // 4. arr.constructor === Array
        if (Array.isArray(value)) {
            return value.map((item) => new TopPlayList(item))
        } else {
            return new TopPlayList(value);
        }
    }

}

export default TopPlayList;