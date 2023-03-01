
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    Q1Node: cc.Node = null;

    @property(cc.Node)
    Q3Node: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    onbtn(v, data){
        this.Q1Node.active = data == '1';
        this.Q3Node.active = data == '3';
    }

    // update (dt) {}
}
