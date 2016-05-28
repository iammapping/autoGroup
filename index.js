var _ = require('lodash');

module.exports = AutoGroup;

/**
 * 自动分组
 * @param {[type]} players    待分组的选手
 * @param {[type]} groupCount 需分组数
 */
function AutoGroup(players, groupCount) {
    this.groups = [];
    this.groupCount = groupCount || 2;
    var minScore = _.min(_.pluck(players, 'score'));
    // 将每个人的实力值补到大于等于0
    this.players = _.sortBy(_.map(players, function(p) {
        if (minScore < 0) {
            p.value = parseInt(p.score) - minScore;
        } else {
            p.value = parseInt(p.score);
        }
        return p;
    }), 'value').reverse();
}

AutoGroup.prototype.divide = function() {
    this._divide(this.players, this.groupCount);
    return this.groups;
};

AutoGroup.prototype._divide = function(items, groupCount) {
    // 找出最适合的分组，按所有人的平均分和平均人数
    var group = this.firstFit(items, _.sum(items, 'value') / groupCount, items.length / groupCount);
    this.groups.push(group);
    var otherItems = [];
    // 获得剩下的所有人
    _.each(items, function(item) {
        if (_.findIndex(group, {player: item.player}) < 0) {
            otherItems.push(item);
        }
    });
    groupCount--;
    if (groupCount > 1) {
        // 将剩下的人再分组
        this._divide(otherItems, groupCount);
    } else {
        // 将剩下的人放入另一分组
        this.groups.push(otherItems);
    }
};

/**
 * 找出最适合的分组
 * @param  {[type]} items 待分组的项
 * @param  {[type]} max   分组总分上限，即平均分
 * @param  {[type]} count 分组人数
 * @return {[type]}       分组
 */
AutoGroup.prototype.firstFit = function(items, max, count) {
    // 待分组项少于或等于分组人数，则直接返回所有项
    if (items.length <= count) {
        return items;
    }

    for (var i = 0; i < items.length; i++) {
        var otherItems = items.slice(1);
        var box = [items[i]];
        // 装箱
        for (var j = 0; j < otherItems.length; j++) {
            var item = otherItems[j];
            // 判断容量是否溢出
            if (_.sum(box.concat(item), 'value') <= Math.ceil(max)) {
                box.push(item);
            }
        }

        // 判断箱子已装入的数量
        if (box.length < Math.floor(count)) {
            // 小于人数下限则重新分组
            return this.firstFit(otherItems, max, count);
        } else if (box.length > Math.ceil(count)) {
            // 大于人数上限，把后装箱的排除
            while (box.length > Math.ceil(count)) {
                box.pop();
            }
            return box;
        } else {
            return box;
        }
    }
};