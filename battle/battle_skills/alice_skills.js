const _ = require("lodash");

module.exports = [
  {
    name: "火元素",
    prob: 0.15,
    cast: (attRef, defRef, hit) => {
      const h = hit(150, 400, defRef);
      const msg = `「Generate thermal element, arrow shape, discharge」${attRef.name}發射火元素攻擊${h.msg}`;
      defRef.hp = defRef.hp - h.damage;
      return msg;
    },
  },
  {
    name: "雨緣",
    prob: 0.15,
    cast: (attRef, defRef, hit) => {
      const success = Math.random();
      if (success < 0.01) {
        const h = _.random(400, 2000);
        const msg = `-${attRef.name}的飛龍雨緣從空中發射吐息攻擊但是炸膛了，對自己造成 ${h} 點傷害\n`;
        attRef.hp = attRef.hp - h;
        return msg;
      }
      if (success < 0.5) {
        const msg = `-${attRef.name}的飛龍雨緣在空中飛了一圈但是沒有吐息，哭啊\n`;
        return msg;
      }
      const h = hit(900, 3000, defRef);
      const msg = `-${attRef.name}的飛龍雨緣從空中發射吐息攻擊${h.msg}`;
      defRef.hp = defRef.hp - h.damage;
      return msg;
    },
  },
  {
    name: "神聖術",
    prob: 0.1,
    cast: (attRef, defRef, hit) => {
      if (attRef.hp >= 3250) return;
      const heal = Math.min(3250 - attRef.hp, _.random(100, 300));
      const msg = `「Generate luminous element」${attRef.name}用神聖術恢復了 ${heal} 點生命值\n`;
      attRef.hp = attRef.hp + heal;
      return msg;
    },
  },
  {
    name: "金木樨之劍",
    prob: 0.3,
    cast: (attRef, defRef, hit) => {
      if (attRef.g) return;
      const msg = `-「Enhance Armament」${attRef.name}解放了金木樨之劍，刀身化作無數的碎片\n`;
      attRef.g = 1;
      return msg;
    },
  },
];
