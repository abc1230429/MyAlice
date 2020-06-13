const _ = require("lodash");
const info = require("../info.js");
const { type, MAX_SKILL, KEEP_ROWS } = require("./params");
const {
  alice_skills: alice_skills_origin,
  magic_skills: magic_skills_origin,
  defense_skills: defense_skills_origin,
  sword_skills: sword_skills_origin,
} = require("./battle_skills");

// set env params, 技能發動率可能被 magic skills 改變
let alice_skills = _.cloneDeep(alice_skills_origin);
let magic_skills = _.cloneDeep(magic_skills_origin);
let defense_skills = _.cloneDeep(defense_skills_origin);
let sword_skills = _.cloneDeep(sword_skills_origin);
let env = { alice_skills, magic_skills, defense_skills, sword_skills };

exports.fight = function (user_name, opp_name, mode, shout, sendMessage) {
  if (!type[mode]) {
    sendMessage("沒有這個對戰模式！");
    return;
  }
  const death = type[mode];
  const m = new Date();
  const { canBattle, cool } = info.battle_cooldown(user_name);
  if (!canBattle) {
    const msg = `${user_name} 的戰鬥CD還在冷卻中，還有 ${cool} 秒才能再次發起戰鬥 \n`;
    sendMessage(msg);
    return;
  }

  let msg = `\`\`\`diff\n${user_name} 向 ${opp_name} 發起 ${mode} ${m.toLocaleString()} \n`;
  if (shout) {
    msg += `${user_name} 向 ${opp_name} 喊道：「${shout}」\n`;
  }
  let user_skill = info.get_battle_skill(user_name);
  if (!user_skill.length) {
    user_skill = info.get_skill(user_name).slice(0, MAX_SKILL);
  }
  let opp_skill = info.get_battle_skill(opp_name);
  if (!opp_skill.length) {
    opp_skill = info.get_skill(opp_name).slice(0, MAX_SKILL);
  }

  let user = {
    name: user_name,
    hp: 3250,
    g: 0,
    skill: user_skill,
  };
  let opp = {
    name: opp_name,
    hp: 3250,
    g: 0,
    skill: opp_skill,
  };

  let round = 0;
  while (user.hp > 0 && opp.hp > 0) {
    // round start
    const order = !(round % 2);
    let attRef = order ? user : opp;
    let defRef = !order ? user : opp;

    // alice skills
    alice_skills.forEach((skill) => {
      if (Math.random() > skill.prob) return;
      const skill_msg = skill.cast(attRef, defRef, hit);
      if (!skill_msg) return;
      msg += skill_msg;
    });

    // magic skills
    let round_magic_damage = 0; // 桐生ココ的技能會用到
    magic_skills.forEach((skill) => {
      if (!attRef.skill.includes(skill.name)) return;
      if (Math.random() > skill.prob) return;
      const def_start_hp = defRef.hp;
      const skill_msg = skill.cast(attRef, defRef, hit, {
        ...env,
        round_magic_damage,
      });
      if (!skill_msg) return;
      round_magic_damage += def_start_hp - defRef.hp;
      msg += skill_msg;
    });

    // sword skills
    const sword_skills_name = sword_skills.map((skill) => skill.name);
    const base_sword_skills = ["普攻", "普攻", "普攻", "普攻", "普攻", "普攻"];
    const user_sword_skills = attRef.skill
      .filter((skill) => sword_skills_name.includes(skill))
      .concat(base_sword_skills);
    const chosen_skill_name = _.sample(user_sword_skills);
    const chosen_skill = sword_skills.find(
      (skill) => skill.name === chosen_skill_name
    );
    if (chosen_skill) {
      const skill_msg = chosen_skill.cast(attRef, defRef, hit);
      if (skill_msg) msg += skill_msg;
    }

    // round end
    user = order % 2 ? attRef : defRef;
    opp = !order % 2 ? attRef : defRef;
    round += 1;
  }

  // battle result
  const isWin = user.hp > 0;
  const isDeath = Math.random() < death;
  msg += isWin
    ? `${opp.name}倒下了， ${user.name}剩餘 ${user.hp} 點血量\n`
    : `${user.name}倒下了， ${opp.name}剩餘 ${opp.hp} 點血量\n`;
  if (isDeath) {
    msg += isWin ? `${opp.name}被擊殺身亡了\n` : `${user.name}被擊殺身亡了\n`;
  }
  info.record_battle(user.name, opp.name, isWin ? 1 : 0, isDeath ? 1 : 0);
  msg += "```";

  if (msg.length > 2000) {
    const note = `\n\n-因戰鬥過程漫長，中間的紀錄被省略了\n\n`;
    let msgRow = msg.split("\n");
    msgRow.splice(KEEP_ROWS, msgRow.length - KEEP_ROWS * 2, note);
    msg = msgRow.join("\n");
  }

  // reset env params
  alice_skills = _.cloneDeep(alice_skills_origin);
  magic_skills = _.cloneDeep(magic_skills_origin);
  defense_skills = _.cloneDeep(defense_skills_origin);
  sword_skills = _.cloneDeep(sword_skills_origin);
  env = { alice_skills, magic_skills, defense_skills, sword_skills };

  sendMessage(msg);
};

function defense(defName, skills) {
  let de = false;
  let msg = "";
  skills.forEach((skillName) => {
    const skill = defense_skills.find((skill) => skill.name === skillName);
    if (!skill) return;
    if (Math.random() > skill.prob) return;
    msg = skill.cast(defName);
    de = true;
  });
  return { msg, defense: de };
}

function dodge_output(def) {
  return `，但是被${def}閃過了\n`;
}

function block_output(def) {
  return `，但是${def}用解放的刀身擋下了攻擊\n`;
}

function hit(low, high, def) {
  const { name, g, skill } = def;
  const dodge = Math.random() < 0.05;
  const block = Math.random() < 0.25;
  const critical = Math.random() < 0.2;
  const d = defense(name, skill);
  if (dodge) {
    const msg = dodge_output(name);
    const damage = 0;
    return { msg, damage };
  }
  if (g && block) {
    const msg = block_output(name);
    const damage = 0;
    return { msg, damage };
  }
  if (d.defense) {
    const msg = d.msg;
    const damage = 0;
    return { msg, damage };
  }
  if (critical) {
    const damage = _.random(low, high) * 2;
    const msg = `命中要害，對${name}造成 ${damage} 點傷害\n`;
    return { msg, damage };
  }
  const damage = _.random(low, high);
  const msg = `，對${name}造成 ${damage} 點傷害\n`;
  return { msg, damage };
}
