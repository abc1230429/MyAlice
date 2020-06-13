const _ = require("lodash");

module.exports = [
  {
    name: "立體機動裝置",
    prob: 0.125,
    cast: (defName) => `，但是${defName}使用立體機動裝置閃開了\n`,
  },
  {
    name: "雜燴兔",
    prob: 0.125,
    cast: (defName) => `，但是${defName}一跳躲開了\n`,
  },
  {
    name: "宝鐘マリン",
    prob: 0.08,
    cast: (defName) => `，但是${defName}大喊一聲「Ahoy!」後閃過了\n`,
  },
  {
    name: "大總統",
    prob: 0.125,
    cast: (defName) => `，但是${defName}用最強之眼看穿攻擊輕鬆閃過了\n`,
  },
  {
    name: "白銀ノエル",
    prob: 0.08,
    cast: (defName) => `，但是${defName}的夥伴白銀ノエル跳出來抵擋了攻擊\n`,
  },
  {
    name: "希茲克利夫",
    prob: 0.125,
    cast: (defName) => `，但是茅場晶彥化身希茲克利夫用盾牌抵擋了攻擊\n`,
  },
  {
    name: "極限輔助系統",
    prob: 0.75,
    cast: (defName) => `，但是${defName}開啟極限輔助系統輕鬆迴避了\n`,
  },
];
