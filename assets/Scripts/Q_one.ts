

const { ccclass, property } = cc._decorator;

let Define_ColorData = [
    { color: cc.color(255, 0, 0, 255), name: 'red', weight: 20, isAdd: false },
    { color: cc.color(255, 0, 255, 255), name: 'pink', weight: 20, isAdd: false },
    { color: cc.color(0, 255, 255, 255), name: 'blue', weight: 20, isAdd: false },
    { color: cc.color(0, 255, 0, 255), name: 'green', weight: 20, isAdd: false },
    { color: cc.color(255, 255, 0, 255), name: 'yellow', weight: 20, isAdd: false },
]

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    gridNode: cc.Node = null;

    @property(cc.Node)
    rectNode: cc.Node = null;

    @property(cc.EditBox)
    perXEidt: cc.EditBox = null;

    @property(cc.EditBox)
    perYEdit: cc.EditBox = null;

    usedWeight = 0;
    totalWight = 0;

    // onLoad () {}

    start() {
    }


    onBbuildRectNode() {
        this.rectNode.removeAllChildren();
        for (let i = 0; i < 100; i++) {
            let node = cc.instantiate(this.gridNode);
            node.opacity = 255;
            node.parent = this.rectNode;
        }
        
        this.loopCall();
    }

    async loopCall() {

        let len = 10;
        let perX = parseInt(this.perXEidt.string);
        let perY = parseInt(this.perYEdit.string);

        let grids = [];
        for (let m = 0; m < len; m++) {
            grids[m] = [];
            for (let n = 0; n < len; n++) {
                if (m == 0 && n == 0) {

                } else if (m != 0 && n != 0) {
                    grids[m][n - 1].clorN == grids[m - 1][n].clorN ? async() => {
                        await this.reviveDivision(grids[m][n - 1].clorN, perY);
                    } : async() => {
                        await this.reviveDivision(grids[m - 1][n].clorN, perX);
                        await this.reviveDivision(grids[m][n - 1].clorN, perX);
                    }
                } else if (m == 0 && n != 0) {
                    await this.reviveDivision(grids[m][n - 1].clorN, perX);
                } else if (m != 0 && n == 0) {
                    await this.reviveDivision(grids[m - 1][n].clorN, perX);
                }

                let gridData = await this.getGridColor();
                grids[m][n] = { clorN: gridData.name };
                this.rectNode.children[m * len + n].color = gridData.color;

                this.totalWight = 0;
                cc.log(Define_ColorData.map((item) => {
                    return item.weight;
                }))
            }
            // grids.push(gridMatrix);
        }
    }

    reviveDivision(clorN, per) {
        for (let item of Define_ColorData) {
            if (item.name == clorN) {
                if (this.totalWight >= 100) {
                    item.weight = 0;
                } else {
                    item.weight = this.totalWight + item.weight + per > 100 ? 100 - this.totalWight : item.weight + per;
                    this.totalWight = this.totalWight + item.weight > 100 ? 100 : this.totalWight + item.weight;
                }
                item.isAdd = true;
                break;
            }
        }
    }


    //获取随机值颜色
    async getGridColor() {
        let sum = 100;
        let spareSum = sum - this.totalWight;
        let spareNum = Define_ColorData.length;
        for (let i = 0; i < Define_ColorData.length; i++) {
            Define_ColorData[i].isAdd ? spareNum-- : spareNum;
        }

        let random = Math.floor(Math.random() * sum);

        let taget =NaN;
        let index = 4;
        while (index >= 0) {
            if (!Define_ColorData[index].isAdd) {
                Define_ColorData[index].weight = spareSum <= 0 ? 0 : Math.floor(spareSum / spareNum);
                spareSum -= Math.floor(spareSum / spareNum);
                spareNum--;
            }
            Define_ColorData[index].isAdd = false;
            sum -= Define_ColorData[index].weight;
            if (sum <= random && !taget) {
                taget = index;
            }
            index--;
        }
        return Define_ColorData[taget];
    }

    // update (dt) {}
}
