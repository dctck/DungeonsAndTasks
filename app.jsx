import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, Sword, Zap, Book, Heart, Compass, 
  Award, Users, Settings, Plus, Check, 
  Flame, Wind, Droplets, Target, 
  X, ChevronRight, TrendingUp, Trophy, Trash2,
  Calendar, ZapOff, Sparkles, ScrollText, RotateCcw,
  ShoppingBag, Star, Crown, Ghost, Skull, Gem
} from 'lucide-react';

// --- Constants & Config ---
const CLASSES = {
  WARRIOR: { id: 'WARRIOR', name: 'Warrior', icon: Shield, color: 'text-red-500', baseStats: { hp: 150, mana: 50, str: 15, focus: 8, res: 15, luck: 5 } },
  ROGUE: { id: 'ROGUE', name: 'Rogue', icon: Zap, color: 'text-yellow-500', baseStats: { hp: 100, mana: 80, str: 10, focus: 10, res: 8, luck: 15 } },
  MAGE: { id: 'MAGE', name: 'Mage', icon: Book, color: 'text-blue-500', baseStats: { hp: 80, mana: 150, str: 5, focus: 18, res: 10, luck: 10 } },
};

const GUILD_ICONS = [
  { id: 'crown', icon: Crown, label: 'Royalty' },
  { id: 'star', icon: Star, label: 'Elite' },
  { id: 'ghost', icon: Ghost, label: 'Phantom' },
  { id: 'skull', icon: Skull, label: 'Slayers' },
  { id: 'gem', icon: Gem, label: 'Wealth' },
  { id: 'shield', icon: Shield, label: 'Guardians' },
];

const SHOP_ITEMS = [
  { id: 'str_up', name: 'Strength Training', cost: 100, stat: 'str', bonus: 2, icon: Sword, desc: 'Permanent +2 Strength' },
  { id: 'foc_up', name: 'Focus Tome', cost: 100, stat: 'focus', bonus: 2, icon: Target, desc: 'Permanent +2 Focus' },
  { id: 'hp_up', name: 'Vitality Ring', cost: 150, stat: 'maxHp', bonus: 25, icon: Heart, desc: 'Permanent +25 Max HP' },
  { id: 'mp_up', name: 'Mana Crystal', cost: 150, stat: 'maxMana', bonus: 20, icon: Zap, desc: 'Permanent +20 Max MP' },
];

const DUNGEONS = [
  { id: 'iron_depths', name: 'Iron Depths', category: 'Workouts', icon: Flame, color: 'bg-red-900' },
  { id: 'sanctum_focus', name: 'Sanctum of Focus', category: 'Deep Work', icon: Target, color: 'bg-blue-900' },
  { id: 'tide_renewal', name: 'Tide of Renewal', category: 'Self-Care', icon: Droplets, color: 'bg-teal-900' },
];

const DIFFICULTY_LEVELS = [
  { label: 'Easy', mins: 5, rewardMult: 1 },
  { label: 'Normal', mins: 25, rewardMult: 3 },
  { label: 'Hard', mins: 40, rewardMult: 5 },
  { label: 'Legend', mins: 60, rewardMult: 8 },
];

const MOCK_GUILDS = [
  { id: 'g1', name: 'Code Knights', iconId: 'crown', members: 12, desc: 'Focusing on daily coding streaks.' },
  { id: 'g2', name: 'Iron Lifters', iconId: 'skull', members: 45, desc: 'Gym rats only. No rest days.' },
  { id: 'g3', name: 'Zen Seekers', iconId: 'star', members: 8, desc: 'Meditation and mindfulness.' },
];

// --- Components ---

const ProgressBar = ({ value, max, color, label }) => (
  <div className="w-full mb-2">
    <div className="flex justify-between text-xs mb-1 uppercase tracking-tighter font-bold">
      <span>{label}</span>
      <span>{Math.round(value)} / {max}</span>
    </div>
    <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden border border-gray-700">
      <div className={`h-full transition-all duration-500 ${color}`} style={{ width: `${Math.min(100, (value / max) * 100)}%` }} />
    </div>
  </div>
);

function NavBtn({ active, icon: Icon, label, onClick }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 p-2 transition-all ${active ? 'text-white' : 'text-gray-500'}`}>
      <Icon size={18} />
      <span className="text-[9px] uppercase font-black tracking-widest">{label}</span>
      {active && <div className="w-1 h-1 bg-white rounded-full mt-0.5" />}
    </button>
  );
}

function CreationView({ onStart }) {
  const [name, setName] = useState('');
  const [selectedClass, setSelectedClass] = useState('WARRIOR');
  return (
    <div className="min-h-screen bg-black text-white font-mono flex flex-col items-center justify-center p-6 max-w-2xl mx-auto">
      <div className="w-full space-y-8 animate-in fade-in duration-700 text-center">
        <header className="space-y-2">
          <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">Habit RPG</h1>
          <p className="text-gray-500 text-xs uppercase tracking-widest">Character Initiation Phase</p>
        </header>
        <input type="text" placeholder="ENTER NAME..." value={name} onChange={e => setName(e.target.value.toUpperCase())} className="w-full bg-gray-900 border-2 border-gray-800 p-4 text-xl focus:outline-none focus:border-red-500 transition-all uppercase placeholder-gray-700" />
        <div className="grid grid-cols-1 gap-3">
          {Object.values(CLASSES).map((cls) => (
            <button key={cls.id} onClick={() => setSelectedClass(cls.id)} className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${selectedClass === cls.id ? 'border-red-500 bg-red-900/10' : 'border-gray-800 bg-gray-900 opacity-60'}`}>
              <div className={`p-3 rounded-lg bg-gray-800 ${selectedClass === cls.id ? cls.color : ''}`}><cls.icon size={24} /></div>
              <h3 className="font-bold uppercase tracking-wide">{cls.name}</h3>
            </button>
          ))}
        </div>
        <button onClick={() => name && onStart(name, selectedClass)} disabled={!name} className="w-full py-5 bg-white text-black font-black uppercase text-xl hover:bg-gray-200 transition-all disabled:opacity-20 flex items-center justify-center gap-3">Begin Journey <Sword size={24} /></button>
      </div>
    </div>
  );
}

export default function App() {
  const [gameState, setGameState] = useState('CREATION'); 
  const [user, setUser] = useState({
    name: '',
    class: null,
    level: 1,
    xp: 0,
    dailyXpEarned: 0,
    hp: 100,
    maxHp: 100,
    mana: 50,
    maxMana: 50,
    stats: { str: 0, focus: 0, luck: 0 },
    habits: [
      { id: 1, text: 'Morning Meditation', type: 'daily', claimedToday: false, createdAt: Date.now() - 1000 },
      { id: 2, text: 'Finish Project Draft', type: 'one-time', claimedToday: false, createdAt: Date.now() - 2000 },
    ],
    gold: 50,
    dungeonRuns: 0,
    guildId: null,
  });

  const [activeDungeon, setActiveDungeon] = useState(null);
  const [timer, setTimer] = useState(0);
  const [difficulty, setDifficulty] = useState(DIFFICULTY_LEVELS[0]); 
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [dungeonResult, setDungeonResult] = useState(null);
  const [snackbar, setSnackbar] = useState(null);
  const [isAddingHabit, setIsAddingHabit] = useState(false);
  const [newHabit, setNewHabit] = useState({ text: '', type: 'daily' });
  
  // Guild State
  const [guilds, setGuilds] = useState(MOCK_GUILDS);
  const [isCreatingGuild, setIsCreatingGuild] = useState(false);
  const [newGuild, setNewGuild] = useState({ name: '', desc: '', iconId: 'crown' });
  const [viewingGuild, setViewingGuild] = useState(null);

  const timerRef = useRef(null);

  const sortedHabits = [...user.habits].sort((a, b) => {
    if (a.claimedToday !== b.claimedToday) return a.claimedToday ? 1 : -1;
    return b.createdAt - a.createdAt;
  });

  useEffect(() => {
    if (isTimerRunning && timer > 0) {
      timerRef.current = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0 && isTimerRunning) {
      handleDungeonComplete(1.0);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isTimerRunning, timer]);

  const showNotification = (message, type = 'info', onUndo = null) => {
    setSnackbar({ message, type, onUndo });
    setTimeout(() => setSnackbar(null), 5000);
  };

  const handleDungeonComplete = (multiplier = 1.0) => {
    setIsTimerRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
    const rewardXp = Math.floor(15 * difficulty.rewardMult * multiplier);
    const rewardGold = Math.floor(10 * difficulty.rewardMult * multiplier);
    setUser(prev => ({
      ...prev,
      xp: prev.xp + rewardXp,
      gold: prev.gold + rewardGold,
      mana: Math.min(prev.maxMana, prev.mana + 5),
      dungeonRuns: multiplier >= 1.0 ? prev.dungeonRuns + 1 : prev.dungeonRuns
    }));
    setDungeonResult({ xp: rewardXp, gold: rewardGold, dungeonName: activeDungeon.name, isPartial: multiplier < 1.0 });
    setGameState('DUNGEON_FINISH');
  };

  const handleClaimQuest = (id) => {
    const quest = user.habits.find(h => h.id === id);
    if (quest.claimedToday) return;
    let xpGain = user.dailyXpEarned >= 10 ? 0 : 2;
    if (user.dailyXpEarned >= 10) showNotification("Daily XP cap reached! +0 XP", "warning");
    const previousState = { ...user };
    setUser(prev => ({
      ...prev,
      habits: prev.habits.map(h => h.id === id ? { ...h, claimedToday: true } : h),
      xp: prev.xp + xpGain,
      dailyXpEarned: prev.dailyXpEarned + xpGain,
      gold: prev.gold + 2
    }));
    showNotification(`Quest Complete: +${xpGain}XP, +2G`, "success", () => setUser(previousState));
  };

  const buyUpgrade = (item) => {
    if (user.gold < item.cost) {
      showNotification("Not enough gold!", "warning");
      return;
    }
    setUser(prev => {
      const newStats = { ...prev.stats };
      let newMaxHp = prev.maxHp;
      let newMaxMana = prev.maxMana;
      
      if (item.stat === 'maxHp') newMaxHp += item.bonus;
      else if (item.stat === 'maxMana') newMaxMana += item.bonus;
      else newStats[item.stat] += item.bonus;

      return {
        ...prev,
        gold: prev.gold - item.cost,
        stats: newStats,
        maxHp: newMaxHp,
        maxMana: newMaxMana
      };
    });
    showNotification(`Purchased ${item.name}!`, "success");
  };

  const createGuild = () => {
    if (!newGuild.name) return;
    const guildObj = { ...newGuild, id: 'g-' + Date.now(), members: 1 };
    setGuilds([guildObj, ...guilds]);
    setUser(u => ({ ...u, guildId: guildObj.id }));
    setIsCreatingGuild(false);
    setNewGuild({ name: '', desc: '', iconId: 'crown' });
    showNotification("Guild Created!", "success");
  };

  const currentGuild = guilds.find(g => g.id === user.guildId);
  const GuildIcon = currentGuild ? (GUILD_ICONS.find(i => i.id === currentGuild.iconId)?.icon || Crown) : null;

  if (gameState === 'CREATION') return <CreationView onStart={(n, c) => {
    const classData = CLASSES[c];
    setUser(prev => ({ ...prev, name: n, class: classData, hp: classData.baseStats.hp, maxHp: classData.baseStats.hp, mana: classData.baseStats.mana, maxMana: classData.baseStats.mana, stats: { ...classData.baseStats } }));
    setGameState('DASHBOARD');
  }} />;

  return (
    <div className="min-h-screen bg-black text-slate-100 font-mono flex flex-col max-w-2xl mx-auto border-x border-gray-800 relative">
      
      {snackbar && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-[100] animate-in slide-in-from-top-4">
          <div className={`p-4 rounded-xl border flex items-center justify-between shadow-2xl backdrop-blur-md ${snackbar.type === 'warning' ? 'bg-orange-900/90 border-orange-500' : snackbar.type === 'success' ? 'bg-green-900/90 border-green-500' : 'bg-blue-900/90 border-blue-500'}`}>
            <span className="text-xs font-bold uppercase">{snackbar.message}</span>
            <div className="flex gap-3">
              {snackbar.onUndo && <button onClick={() => { snackbar.onUndo(); setSnackbar(null); }} className="text-[10px] font-black uppercase bg-white/10 px-2 py-1 rounded">Undo</button>}
              <button onClick={() => setSnackbar(null)}><X size={16}/></button>
            </div>
          </div>
        </div>
      )}

      {gameState !== 'DUNGEON' && gameState !== 'DUNGEON_FINISH' && (
        <header className="p-4 border-b border-gray-800 bg-gray-900/50 sticky top-0 z-10 backdrop-blur-md">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              {GuildIcon && (
                <div 
                  onClick={() => { setViewingGuild(currentGuild); setGameState('GUILD_DETAIL'); }}
                  className="p-2 bg-yellow-500/10 border border-yellow-500/50 rounded-lg text-yellow-500 cursor-pointer hover:bg-yellow-500/20"
                >
                  <GuildIcon size={18} />
                </div>
              )}
              <div>
                <h1 className="text-xl font-bold tracking-widest uppercase">{user.name}</h1>
                <p className={`text-[10px] uppercase flex items-center gap-1 ${user.class?.color}`}>{user.class?.name} • LVL {user.level}</p>
              </div>
            </div>
            <div className="text-right flex flex-col items-end">
              <span className="text-yellow-500 font-bold text-lg">{user.gold}G</span>
              <span className="text-[9px] text-gray-500 uppercase font-black">Daily XP: {user.dailyXpEarned}/10</span>
            </div>
          </div>
          <ProgressBar label="Health (HP)" value={user.hp} max={user.maxHp} color="bg-red-600" />
          <ProgressBar label="Focus (MP)" value={user.mana} max={user.maxMana} color="bg-blue-600" />
        </header>
      )}

      <main className="flex-1 p-4 overflow-y-auto pb-24">
        {gameState === 'DASHBOARD' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Active Objectives (Top 5)</h2>
                <button onClick={() => setIsAddingHabit(true)} className="p-1 text-gray-400 hover:text-white"><Plus size={18}/></button>
              </div>
              {isAddingHabit && (
                <div className="mb-4 p-4 bg-gray-900 border-2 border-red-500/30 rounded-xl space-y-4">
                  <input autoFocus className="w-full bg-black border border-gray-700 rounded p-3 text-sm outline-none" placeholder="New quest..." value={newHabit.text} onChange={e => setNewHabit({...newHabit, text: e.target.value})} />
                  <div className="flex gap-2">
                    <button onClick={() => setNewHabit({...newHabit, type: 'daily'})} className={`flex-1 py-2 text-[10px] font-bold rounded border ${newHabit.type === 'daily' ? 'bg-red-600 border-red-400' : 'bg-gray-800'}`}>Daily</button>
                    <button onClick={() => setNewHabit({...newHabit, type: 'one-time'})} className={`flex-1 py-2 text-[10px] font-bold rounded border ${newHabit.type === 'one-time' ? 'bg-red-600 border-red-400' : 'bg-gray-800'}`}>One-Time</button>
                  </div>
                  <div className="flex gap-2"><button onClick={() => { if(newHabit.text) { setUser(u => ({...u, habits: [{id: Date.now(), ...newHabit, claimedToday: false, createdAt: Date.now()}, ...u.habits]})); setIsAddingHabit(false); setNewHabit({text:'', type:'daily'}); } }} className="flex-1 bg-white text-black font-bold py-2 rounded text-xs">Add Quest</button></div>
                </div>
              )}
              <div className="space-y-2">
                {sortedHabits.filter(h => !h.claimedToday).slice(0, 5).map(habit => (
                  <div key={habit.id} onClick={() => handleClaimQuest(habit.id)} className="p-3 bg-gray-900 border border-gray-800 rounded-lg flex justify-between items-center group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="p-1 rounded bg-gray-800 group-hover:bg-green-600 transition-colors"><Check size={14} className="text-gray-500 group-hover:text-white" /></div>
                      <span className="text-sm font-bold">{habit.text}</span>
                    </div>
                    {habit.type === 'daily' ? <Calendar size={14} className="text-blue-400" /> : <ZapOff size={14} className="text-yellow-400" />}
                  </div>
                ))}
              </div>
            </section>
            <section>
              <div className="flex justify-between items-end mb-4">
                <h2 className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Available Dungeons</h2>
                <div className="flex gap-1">{DIFFICULTY_LEVELS.map(lvl => <button key={lvl.label} onClick={() => setDifficulty(lvl)} className={`text-[9px] px-2 py-1 rounded border uppercase font-bold ${difficulty.label === lvl.label ? 'bg-blue-600 border-blue-400' : 'bg-gray-900 border-gray-800'}`}>{lvl.label}</button>)}</div>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {DUNGEONS.map(d => (
                  <div key={d.id} onClick={() => { if(user.mana >= 10) { setActiveDungeon(d); setTimer(difficulty.mins * 60); setIsTimerRunning(true); setGameState('DUNGEON'); setUser(u => ({...u, mana: u.mana-10})); } }} className="bg-gray-900 border border-gray-700 rounded-lg p-4 flex items-center justify-between hover:bg-gray-800 cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${d.color}`}><d.icon size={20} className="text-white" /></div>
                      <div><h3 className="font-bold text-sm uppercase">{d.name}</h3><p className="text-xs text-gray-500">{difficulty.mins}m Focus</p></div>
                    </div>
                    <span className="text-[10px] text-blue-400 font-bold uppercase tracking-tighter">Enter -10MP</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {gameState === 'QUEST_LOG' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-black uppercase tracking-tighter italic underline decoration-red-500">Quest Log</h2>
            <div className="space-y-3">
              {sortedHabits.map(h => (
                <div key={h.id} className={`p-4 rounded-xl border flex justify-between items-center ${h.claimedToday ? 'bg-green-950/20 border-green-800/50 opacity-60' : 'bg-gray-900 border-gray-800'}`}>
                  <div className="flex items-center gap-3">
                    {h.type === 'daily' ? <Calendar size={16} className="text-blue-400" /> : <ZapOff size={16} className="text-yellow-400" />}
                    <div><h3 className={`text-sm font-bold ${h.claimedToday ? 'line-through text-gray-500' : ''}`}>{h.text}</h3></div>
                  </div>
                  <button onClick={() => setUser(u => ({...u, habits: u.habits.filter(qh => qh.id !== h.id)}))} className="p-2 text-gray-500 hover:text-red-500"><Trash2 size={14}/></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {gameState === 'GUILD' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-black uppercase tracking-tighter italic">Guild Registry</h2>
              {!user.guildId && <button onClick={() => setIsCreatingGuild(true)} className="bg-white text-black px-3 py-1 rounded text-[10px] font-black uppercase">Create Guild</button>}
            </div>

            {isCreatingGuild && (
              <div className="p-6 bg-gray-900 border-2 border-yellow-500/50 rounded-2xl space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black text-gray-500">Guild Name</label>
                  <input className="w-full bg-black border border-gray-700 rounded p-3 text-sm" value={newGuild.name} onChange={e => setNewGuild({...newGuild, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black text-gray-500">Select Unique Icon</label>
                  <div className="grid grid-cols-6 gap-2">
                    {GUILD_ICONS.map(i => (
                      <button key={i.id} onClick={() => setNewGuild({...newGuild, iconId: i.id})} className={`p-2 rounded border flex justify-center items-center ${newGuild.iconId === i.id ? 'bg-yellow-500 border-yellow-400 text-black' : 'bg-black border-gray-700 text-gray-500'}`}><i.icon size={18}/></button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2"><button onClick={createGuild} className="flex-1 bg-yellow-500 text-black font-black py-3 rounded uppercase">Establish Guild</button><button onClick={() => setIsCreatingGuild(false)} className="px-4 text-[10px] font-black uppercase text-gray-500">Cancel</button></div>
              </div>
            )}

            <div className="space-y-3">
              {guilds.map(g => {
                const Icon = GUILD_ICONS.find(i => i.id === g.iconId)?.icon || Crown;
                return (
                  <div key={g.id} onClick={() => { setViewingGuild(g); setGameState('GUILD_DETAIL'); }} className={`p-4 bg-gray-900 border border-gray-800 rounded-xl flex justify-between items-center hover:border-yellow-500/50 cursor-pointer transition-all ${user.guildId === g.id ? 'border-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.2)]' : ''}`}>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gray-800 rounded-lg text-yellow-500"><Icon size={20}/></div>
                      <div><h3 className="font-bold text-sm">{g.name}</h3><p className="text-[9px] text-gray-500 uppercase">{g.members} Members</p></div>
                    </div>
                    {user.guildId === g.id ? <span className="text-[9px] bg-yellow-500 text-black px-2 py-0.5 rounded font-black uppercase tracking-tighter">Your Guild</span> : <ChevronRight size={16} className="text-gray-700"/>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {gameState === 'GUILD_DETAIL' && viewingGuild && (
          <div className="space-y-8 animate-in zoom-in-95 duration-300">
            <button onClick={() => setGameState('GUILD')} className="text-[10px] text-gray-500 uppercase flex items-center gap-1"><X size={12}/> Back to Registry</button>
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-yellow-500/10 border-2 border-yellow-500 text-yellow-500 rounded-full mx-auto flex items-center justify-center">
                {React.createElement(GUILD_ICONS.find(i => i.id === viewingGuild.iconId)?.icon || Crown, { size: 40 })}
              </div>
              <div><h2 className="text-3xl font-black italic tracking-tighter uppercase">{viewingGuild.name}</h2><p className="text-gray-500 text-xs mt-2 uppercase tracking-widest">{viewingGuild.desc}</p></div>
            </div>
            {user.guildId !== viewingGuild.id ? (
              <button onClick={() => { setUser(u => ({...u, guildId: viewingGuild.id})); showNotification(`Joined ${viewingGuild.name}!`, "success"); }} className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase text-lg">Join this Guild</button>
            ) : (
              <button onClick={() => { setUser(u => ({...u, guildId: null})); showNotification("Left guild.", "info"); setGameState('GUILD'); }} className="w-full bg-red-900/20 border border-red-500 text-red-500 py-4 rounded-2xl font-black uppercase text-xs">Leave Guild</button>
            )}
          </div>
        )}

        {gameState === 'META' && (
          <div className="space-y-8 animate-in slide-in-from-left-4 duration-500">
            <h2 className="text-xl font-black uppercase italic underline decoration-purple-500">Hall of Progress</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-6 border border-gray-800 rounded-2xl">
                <p className="text-[10px] text-gray-500 uppercase font-black mb-1">Dungeon Conquests</p>
                <span className="text-4xl font-black text-white">{user.dungeonRuns}</span>
                <p className="text-[8px] text-gray-600 mt-2 uppercase tracking-tighter">Completed 100% Focus sessions</p>
              </div>
              <div className="bg-gray-900/50 p-6 border border-gray-800 rounded-2xl">
                <p className="text-[10px] text-gray-500 uppercase font-black mb-1">Current Gold</p>
                <span className="text-4xl font-black text-yellow-500">{user.gold}G</span>
              </div>
            </div>

            <section className="space-y-4">
              <h3 className="text-[10px] font-black uppercase text-gray-500 tracking-widest flex items-center gap-2"><ShoppingBag size={12}/> Permanent Upgrades</h3>
              <div className="grid grid-cols-1 gap-3">
                {SHOP_ITEMS.map(item => (
                  <div key={item.id} className="p-4 bg-gray-900 border border-gray-800 rounded-xl flex justify-between items-center group">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-purple-500/10 text-purple-400 rounded-lg"><item.icon size={20}/></div>
                      <div><h4 className="font-bold text-sm uppercase">{item.name}</h4><p className="text-[9px] text-gray-500">{item.desc}</p></div>
                    </div>
                    <button onClick={() => buyUpgrade(item)} className="bg-yellow-500 text-black px-4 py-2 rounded-lg text-[10px] font-black uppercase hover:scale-105 transition-transform">{item.cost}G</button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {gameState === 'DUNGEON' && (
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-in zoom-in-95 duration-700">
            <div className={`p-10 rounded-full mb-12 animate-pulse ${activeDungeon.color} shadow-[0_0_80px_rgba(0,0,0,0.6)] border-4 border-white/10`}><activeDungeon.icon size={80} className="text-white" /></div>
            <h2 className="text-3xl font-black uppercase tracking-[0.2em] italic mb-2">{activeDungeon.name}</h2>
            <div className="text-8xl font-mono font-black mb-12 tabular-nums tracking-tighter text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">{Math.floor(timer/60)}:{String(timer%60).padStart(2,'0')}</div>
            <div className="w-full max-w-xs space-y-3">
              <button onClick={() => handleDungeonComplete(0.4)} className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white py-4 rounded-xl font-black uppercase transition-all">Finish Early (40% Loot)</button>
              <button onClick={() => { setGameState('DASHBOARD'); setActiveDungeon(null); setIsTimerRunning(false); }} className="w-full py-2 text-red-500 text-[10px] font-black uppercase hover:underline">Exit Dungeon (No Reward)</button>
            </div>
          </div>
        )}

        {gameState === 'DUNGEON_FINISH' && dungeonResult && (
          <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-1000">
             <div className="relative mb-8 animate-in zoom-in-50 duration-700 delay-300">
               <Sparkles size={80} className="text-yellow-500 animate-bounce mb-4" />
               <h2 className="text-5xl font-black italic tracking-tighter uppercase leading-tight mb-2 drop-shadow-lg">{dungeonResult.isPartial ? "Retreated!" : "Clear!!"}</h2>
               <div className="h-1 w-24 bg-yellow-500 mx-auto rounded-full" />
             </div>
             <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-12 animate-in slide-in-from-bottom-12 duration-700 delay-700">
               <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm"><span className="block text-[10px] text-purple-400 uppercase font-black mb-1">XP Bonus</span><span className="text-3xl font-black text-white">+{dungeonResult.xp}</span></div>
               <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm"><span className="block text-[10px] text-yellow-500 uppercase font-black mb-1">Gold Reward</span><span className="text-3xl font-black text-white">+{dungeonResult.gold}G</span></div>
             </div>
             <button onClick={() => setGameState('DASHBOARD')} className="w-full max-w-xs bg-white text-black py-5 rounded-2xl font-black uppercase text-lg hover:scale-105 active:scale-95 transition-all animate-in fade-in slide-in-from-bottom-4 delay-1000">Return to Realm</button>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 max-w-2xl mx-auto bg-gray-950/80 backdrop-blur-lg border-t border-gray-800 p-2 flex justify-around items-center z-20">
        <NavBtn active={gameState === 'DASHBOARD'} icon={Sword} label="Battle" onClick={() => setGameState('DASHBOARD')} />
        <NavBtn active={gameState === 'QUEST_LOG'} icon={ScrollText} label="Quests" onClick={() => setGameState('QUEST_LOG')} />
        <NavBtn active={gameState === 'GUILD' || gameState === 'GUILD_DETAIL'} icon={Users} label="Guild" onClick={() => setGameState('GUILD')} />
        <NavBtn active={gameState === 'META'} icon={Settings} label="Meta" onClick={() => setGameState('META')} />
      </nav>
    </div>
  );
}
