/**
 * 敌对生物登记（显示名 + 立绘 + 运动帧 + 碰撞尺寸）。
 * WORLD_ASSETS 为加载/绘制句柄；本表为真源命名与路径。
 * hitW/hitH：怪物碰撞盒宽/高（px）。blob/巨人沿用原引擎硬编码值，仅收敛到本表。
 */
export const MONSTERS = {
  bat: {
    id: 'bat',
    name: '蝙蝠',
    portrait: 'assets/enemies/bat.png',
    motion: { src: 'assets/enemies/bat-sheet.png', cols: 2, rows: 2, refH: 316 },
    worldKey: 'batSheet',
  },
  flyer: {
    id: 'flyer',
    name: '魔眼',
    portrait: 'assets/enemies/flyer.png',
    motion: { src: 'assets/enemies/flyer-sheet.png', cols: 2, rows: 2, refH: 264 },
    worldKey: 'flyerSheet',
  },
  giant: {
    id: 'giant',
    name: '巨人',
    portrait: 'assets/enemies/monster-big.png',
    motion: { src: 'assets/enemies/giant-sheet.png', cols: 2, rows: 2, refH: 406 },
    worldKey: 'giantSheet',
    hit: { w: 46, h: 80 },
  },
  blob: {
    id: 'blob',
    name: '蓝团',
    portrait: 'assets/enemies/monster.png',
    motion: {
      src: 'assets/enemies/monster-idle-sheet.png',
      cols: 2,
      rows: 2,
      refH: 280,
    },
    worldKey: 'monsterWalk',
    hit: { w: 28, h: 40 },
  },
};

export function monsterName(id) {
  return MONSTERS[id]?.name || id || '?';
}

/**
 * 怪物碰撞盒尺寸真源（px）。优先按 kind（或兼容旧 big 布尔）取注册表。
 * 尺寸为历史平衡值，勿随意改。
 */
export function monsterHit(idOrMo) {
  const id = typeof idOrMo === 'object' ? (idOrMo.kind || (idOrMo.big ? 'giant' : 'blob')) : idOrMo;
  const m = MONSTERS[id];
  if (m?.hit) return m.hit;
  // 兜底：无登记信息时按 big 相容
  if (typeof idOrMo === 'object' && (idOrMo.big || idOrMo.kind === 'giant')) return { w: 46, h: 80 };
  return { w: 28, h: 40 };
}

export function listMonsterIds() {
  return Object.keys(MONSTERS);
}

export function registerMonster(id, def) {
  if (!id || typeof id !== 'string') throw new Error('registerMonster: id required');
  if (MONSTERS[id]) throw new Error(`registerMonster: duplicate id ${id}`);
  MONSTERS[id] = {
    id,
    name: def.name || id,
    portrait: def.portrait,
    motion: def.motion ?? null,
    worldKey: def.worldKey || null,
    hit: def.hit || null,
  };
  return id;
}