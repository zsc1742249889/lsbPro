
let a = [10, 40, 5, 280];
let b = [234, 5, 2, 148, 23];
let v = 42;

function diaQuestion(){
    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < b.length; j++) {
            if (a[i] + b[j] == v) {
                return true;
            }
        }
    }
    return false;
}

// 最优时间复杂度O(1)  最坏时间复杂度O(a*b)