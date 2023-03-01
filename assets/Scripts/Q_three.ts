
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    butnode: cc.Node = null;
    @property(cc.Node)
    spriteNode: cc.Node = null;

    // onLoad () {}

    start () {
        // this.play();
        this.butnode.on(cc.Node.EventType.TOUCH_START, this.touchstart, this)
        this.butnode.on(cc.Node.EventType.TOUCH_MOVE, this.touchmove, this)
        this.butnode.on(cc.Node.EventType.TOUCH_END, this.touchend, this)
        this.init();
    }

    again(){
        cc.Tween.stopAllByTarget(this.butnode);
        cc.Tween.stopAllByTarget(this.spriteNode);
        this.init();
    }

    init(){
        this.butnode.scale = 0;
        cc.tween(this.butnode)
            .to(0.1, {scaleX: 0.1, scaleY: 0.3, rotation: -5})
            .to(0.25, {scale: 1.2, scaleY: 0.85, rotation: 5})
            .to(0.05, {scaleX: 0.85, scaleY: 1.2, rotation:-1})
            .to(0.05, {scaleX: 1.1, scaleY: 0.9, rotation:-5})
            .to(0.05, {scaleX: 0.95, scaleY: 1.15, rotation: 2})
            .to(0.05, {scaleX: 1, scaleY: 1, rotation: 0})
            .repeatForever(
                cc.tween()
                    .to(0.4,{scaleX:0.97,scaleY: 1.02})
                    .to(0.4,{scaleX:1.02, scaleY:0.97})
            )
            .start()
    }

    isHit: boolean = false
    touchstart(){
        this.isHit = true;
        this.playDown();
    }

    touchmove(v){
        let pos = v.getLocation();
        let rect = this.spriteNode.getBoundingBoxToWorld();
        let hit = rect.contains(pos);
        if (!hit && this.isHit) {
            this.playUp();
            this.isHit = false;
        }
        if (hit && !this.isHit) {
            this.playDown();
            this.isHit = true;
        }
    }

    touchend(){
        if (!this.isHit) {
            this.playUp()
        }
        this.isHit = false;
    }

    playDown(){
        cc.Tween.stopAllByTarget(this.spriteNode);
        let t = 0.08;
        let fun = ()=>{
            return t - 0.01;
        }
        cc.tween(this.spriteNode)
            .to(fun(),{scale:0.7})
            .to(fun(),{scale:0.85})
            .to(fun(),{scale:0.7})
            .to(fun(),{scale:0.8})
            .to(fun(),{scale:0.7})
            .to(fun(),{scale:0.75})
            .to(fun(),{scale:0.7})
            .start()
        fun = null;
    }

    playUp(){
        cc.Tween.stopAllByTarget(this.spriteNode);
        let t = 0.08;
        let fun = ()=>{
            return t - 0.01;
        }
        cc.tween(this.spriteNode)
            .to(fun(),{scale:1.3})
            .to(fun(),{scale:1})
            .to(fun(),{scale:1.15})
            .to(fun(),{scale:1})
            .to(fun(),{scale:1.08})
            .to(fun(),{scale:1})
            .start()
        fun = null;
    }

    // update (dt) {}
}
