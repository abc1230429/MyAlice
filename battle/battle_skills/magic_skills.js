const _ = require("lodash");

module.exports = [
  {
    name: "天野陽菜",
    prob: 0.05,
    cast: (attRef, defRef, hit) => {
      const d = _.random(1600, 2600);
      const msg = `-${attRef.name}嚇得蹲下閉眼祈禱，突然打雷擊中${defRef.name}造成 ${d} 點傷害\n`;
      defRef.hp = defRef.hp - d;
      return msg;
    },
  },
  {
    name: "兔田ぺこら",
    prob: 0.6,
    cast: (attRef, defRef, hit, envRef) => {
      const buff = {
        立體機動裝置: 0.08,
        雜燴兔: 0.08,
        宝鐘マリン: 0.125,
        大總統: 0.08,
        白銀ノエル: 0.125,
        希茲克利夫: 0.08,
        極限輔助系統: 0.75,
      };
      envRef.defense_skills.forEach((skill) => {
        skill.prob = buff[skill.name];
      });
      envRef.magic_skills.find((skill) => skill.name === "兔田ぺこら").prob = 0;
      const msg = `-「哈↑哈↑哈↑哈↑哈↑」兔田ぺこら發出嘲笑，強化Hololive系列防禦技能，並削弱了其他的防禦技能\n`;
      return msg;
    },
  },
  {
    name: "努西",
    prob: 0.15,
    cast: (attRef, defRef, hit) => {
      const h = hit(400, 1400, defRef);
      const msg = `${attRef.name}的寵物努西使出咬碎${h.msg}`;
      defRef.hp = defRef.hp - h.damage;
      return msg;
    },
  },
  {
    name: "記憶解放",
    prob: 0.1,
    cast: (attRef, defRef, hit) => {
      const miss = 0.8;
      if (Math.random() < miss) {
        const msg = `-「Release Recollection」${attRef.name}聚集了附近的神聖力，但因為周遭神聖力不足沒有成功\n`;
        return msg;
      }
      d = _.random(100000, 200000);
      defRef.hp = defRef.hp - d;
      const msg = `-「Release Recollection」${attRef.name}聚集了附近的神聖力，使用金木樨射出毀滅光線，對${defRef.name}造成 ${d} 點傷害\n`;
      return msg;
    },
  },
  {
    name: "噴火龍",
    prob: 0.25,
    cast: (attRef, defRef, hit) => {
      const miss = 0.25;
      if (Math.random() < miss) {
        const msg = `-${attRef.name}的噴火龍從空中發射火球，但打中了雨緣所以沒有命中敵人\n`;
        return msg;
      }
      h = hit(500, 1000, defRef);
      defRef.hp = defRef.hp - h.damage;
      const msg = `-${attRef.name}的噴火龍從空中發射火球${h.msg}`;
      return msg;
    },
  },
  {
    name: "白上フブキ",
    prob: 0.8,
    cast: (attRef, defRef, hit, envRef) => {
      const sword_skill_names = envRef.sword_skills.map((skill) => skill.name);
      const has_skill = defRef.skill.filter((skill) =>
        sword_skill_names.includes(skill)
      );
      if (_.isEmpty(has_skill)) {
        const msg = `-「I'm Scatman」白上フブキ開始唱歌，不過 ${defRef.name} 已經沒有劍技可以封印了\n`;
        return msg;
      }
      const removed_skill = _.sample(has_skill);
      _.remove(envRef.sword_skills, (skill) => skill.name === removed_skill);
      envRef.magic_skills.find((skill) => skill.name === "白上フブキ").prob = 0;
      const msg = `-「I'm Scatman」白上フブキ開始唱歌，技能 ${removed_skill} 被封印了\n`;
      return msg;
    },
  },
  {
    name: "桐生ココ",
    prob: 0.75,
    cast: (attRef, defRef, hit, envRef) => {
      // TODO: 這樣寫其實只能吃到陽菜、努西、跟噴火龍的
      const { round_magic_damage } = envRef;
      defRef.hp = defRef.hp - round_magic_damage;
      const msg = `「FUCK YOU!」桐生ココ剝奪了${defRef.name}的收益化，${defRef.name}本回合受到的魔法傷害增加了\n`;
      return msg;
    },
  },
  {
    name: "直葉",
    prob: 0.2,
    cast: (attRef, defRef, hit) => {
      let msg = `-「接近哥哥的狐狸精...一個都不能放過」${attRef.name}的直葉拿起小刀刺向${defRef.name}`;
      const firstHit = hit(100, 300, defRef);
      defRef.hp = defRef.hp - firstHit.damage;
      msg += firstHit.msg;
      counter = 2;
      while (Math.random() < 0.7) {
        msg += `「殺了你殺了你殺了你」直葉拿小刀瘋狂攻擊，第 ${counter} 擊`;
        const h = hit(50, 100, defRef);
        defRef.hp = defRef.hp - h.damage;
        msg += h.msg;
        counter += 1;
      }
      return msg;
    },
  },
  {
    name: "潤羽るしあ",
    prob: 0.6,
    cast: (attRef, defRef, hit) => {
      const colamiss = Math.random() < 0.5;
      if (colamiss) {
        const msg = `潤羽るしあ詠唱死靈法術，但被噴出的可樂強制中斷了\n`;
        return msg;
      }
      const h = hit(100, 700, defRef);
      defRef.hp = defRef.hp - h.damage;
      const msg = `潤羽るしあ詠唱死靈法術${h.msg}`;
      return msg;
    },
  },
  {
    name: "夏色まつり",
    prob: 0.25,
    cast: (attRef, defRef, hit) => {
      let msg = `「FBK！FBK！FBK！」${attRef.name}的夏色まつり朝${defRef.name}胡亂攻擊\n`;
      for (let i = 1; i < 5; i++) {
        const h = hit(100, 150, defRef);
        defRef.hp = defRef.hp - h.damage;
        msg += `夏色まつり的第 ${i} 擊${h.msg}`;
      }
      return msg;
    },
  },
];
