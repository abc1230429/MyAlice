const _ = require("lodash");

module.exports = [
  {
    name: "普攻",
    prob: 1,
    cast: (attRef, defRef, hit) => {
      let msg;
      if (attRef.g) {
        msg = `${attRef.name}用解放的無數的刀身碎片攻擊`;
        let h = hit(400, 600, defRef);
        defRef.hp = defRef.hp - h.damage;
        msg += h.msg;
        let counter = 2;
        while (Math.random() < 0.5) {
          h = hit(150, 350, defRef);
          msg += `${attRef.name}繼續追加第 ${counter} 擊${h.msg}`;
          defRef.hp = defRef.hp - h.damage;
          counter += 1;
        }
      } else {
        msg = `${attRef.name}攻擊`;
        let h = hit(400, 600, defRef);
        defRef.hp = defRef.hp - h.damage;
        msg += h.msg;
        let counter = 2;
        while (Math.random() < 0.1) {
          h = hit(400, 600, defRef);
          msg += `${attRef.name}繼續追加第 ${counter} 擊${h.msg}`;
          defRef.hp = defRef.hp - h.damage;
          counter += 1;
        }
      }
      return msg;
    },
  },
  {
    name: "旋風",
    prob: 1,
    cast: (attRef, defRef, hit) => {
      const h = hit(700, 2300, defRef);
      defRef.hp = defRef.hp - h.damage;
      const msg = `${attRef.name}使出了劍技「旋風」${h.msg}`;
      return msg;
    },
  },
  {
    name: "魔人的一擊",
    prob: 1,
    cast: (attRef, defRef, hit) => {
      const miss = Math.random() < 0.8;
      let msg = `${attRef.name}以惡魔的左臂使出了「魔人的一擊」`;
      if (miss) {
        msg += `，但因為無法控制過於強大的力量而打偏了\n`;
        return msg;
      }
      h = hit(10000, 20000, defRef);
      defRef.hp = defRef.hp - h.damage;
      msg += h.msg;
      return msg;
    },
  },
  {
    name: "隕石衝擊",
    prob: 1,
    cast: (attRef, defRef, hit) => {
      const h = hit(1000, 2000, defRef);
      defRef.hp = defRef.hp - h.damage;
      const msg = `${attRef.name}使出了隕石衝擊${h.msg}`;
      return msg;
    },
  },
  {
    name: "雪崩",
    prob: 1,
    cast: (attRef, defRef, hit) => {
      const h = hit(1200, 1500, defRef);
      defRef.hp = defRef.hp - h.damage;
      const msg = `${attRef.name}使出了雙手劍技「雪崩」${h.msg}`;
      return msg;
    },
  },
  {
    name: "爆裂拳",
    prob: 1,
    cast: (attRef, defRef, hit) => {
      const h = hit(1000, 2000, defRef);
      defRef.hp = defRef.hp - h.damage;
      const msg = `${attRef.name}使出了爆裂拳${h.msg}`;
      return msg;
    },
  },
  {
    name: "星爆氣流斬",
    prob: 1,
    cast: (attRef, defRef, hit) => {
      let msg = `-${attRef.name}拔出了第二把刀\n${attRef.name}：「星爆...氣流斬」\n`;
      for (var i = 1; i < 17; i++) {
        const h = hit(0, 250, defRef);
        defRef.hp = defRef.hp - h.damage;
        msg += `${attRef.name}的第 ${i} 擊${h.msg}`;
      }
      return msg;
    },
  },
  {
    name: "聖母聖詠",
    prob: 1,
    cast: (attRef, defRef, hit) => {
      let msg = `-${attRef.name}使出了聖母聖詠\n`;
      for (var i = 1; i < 12; i++) {
        const h = hit(100, 250, defRef);
        defRef.hp = defRef.hp - h.damage;
        msg += `${attRef.name}的第 ${i} 擊${h.msg}`;
      }
      return msg;
    },
  },
  {
    name: "黑卡蒂",
    prob: 1,
    cast: (attRef, defRef, hit) => {
      rand = Math.random();
      const miss = rand < 0.7 && rand > 0.05;
      const shut = rand < 0.05;
      let msg = `${attRef.name}掏出黑卡蒂開槍射擊`;
      if (miss) {
        msg += `，但因為不熟練而沒有打中\n`;
        return msg;
      }
      if (shut) {
        const h = hit(10000, 15000, defRef);
        defRef.hp = defRef.hp - h.damage;
        msg += `成功爆頭${h.msg}`;
        return msg;
      }
      const h = hit(1000, 2000, defRef);
      defRef.hp = defRef.hp - h.damage;
      msg += h.msg;
      return msg;
    },
  },
  {
    name: "超越系統的一擊",
    prob: 1,
    cast: (attRef, defRef, hit) => {
      miss = Math.random() < 0.9;
      if (miss && attRef.name !== "FTS152") {
        const msg = `-${attRef.name}嘗試使出超越系統的一擊，但被GM發現而被無效化了\n`;
        return msg;
      }
      const d = _.random(1000000, 2000000);
      defRef.hp = defRef.hp - d;
      const msg = `-${attRef.name}使出超越系統的一擊，${defRef.name}倒下了\n`;
      return msg;
    },
  },
];
