import { TimeUtil } from '../utils'

class Track {
    constructor(props) {
        // 数据处理
        // 在构造函数里 定义本 class 的属性
        this.id = props.id;
        this.name = props.name;
        this.author = props.ar;
        this.collection = props.al.name;
        this.durationTime = TimeUtil.formateTime(props.dt);
        this.blurPicUrl = props.al.picUrl;
    }

    static fromJS = (value) => {
        if (Array.isArray(value)) {
            return value.map((item) => new Track(item))
        } else {
            return new Track(value);
        }
    }
    
}

export default Track;