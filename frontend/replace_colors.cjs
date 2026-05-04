const fs = require('fs');
const path = require('path');

const dir = 'd:/sujal/dev/Projects final/ADIA/frontend/src';

function walk(directory) {
  let results = [];
  const list = fs.readdirSync(directory);
  list.forEach(file => {
    file = path.join(directory, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.jsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(dir);

const replacements = {
  // Backgrounds
  'bg-[#020617]': 'bg-[var(--bg)]',
  'bg-[#050912]': 'bg-[var(--bg-elevated)]',
  'bg-[#040813]': 'bg-[var(--bg-elevated)]',
  'bg-[#010309]': 'bg-[var(--bg-elevated)]',
  'bg-[rgba(15,23,42,0.82)]': 'bg-[var(--bg-panel)]',
  'bg-slate-950/60': 'bg-[var(--bg-panel-strong)]',
  'bg-slate-900/40': 'bg-[var(--bg-panel)]',
  
  // Font
  'font-sans': '',

  // Accents (text)
  'text-cyan-300': 'text-[var(--accent)]',
  'text-cyan-400': 'text-[var(--accent)]',
  'text-cyan-500': 'text-[var(--accent)]',
  'text-indigo-400': 'text-[var(--accent)]',
  'text-indigo-500': 'text-[var(--accent)]',
  'text-indigo-600': 'text-[var(--accent)]',

  // Accents (bg)
  'bg-cyan-300': 'bg-[var(--accent)]',
  'bg-cyan-400': 'bg-[var(--accent)]',
  'bg-cyan-500': 'bg-[var(--accent)]',
  'bg-cyan-600': 'bg-[var(--accent)]',
  'bg-indigo-400': 'bg-[var(--accent)]',
  'bg-indigo-500': 'bg-[var(--accent)]',
  'bg-indigo-600': 'bg-[var(--accent)]',

  // Accents (border)
  'border-cyan-400': 'border-[var(--accent)]',
  'border-cyan-500': 'border-[var(--accent)]',
  'border-indigo-400': 'border-[var(--accent)]',
  'border-indigo-500': 'border-[var(--accent)]',
  'border-indigo-600': 'border-[var(--accent)]',

  // Accents (shadow)
  'shadow-cyan-500': 'shadow-[var(--accent-glow)]',
  'shadow-indigo-500': 'shadow-[var(--accent-glow)]',
  'shadow-indigo-600': 'shadow-[var(--accent-glow)]',
  'shadow-[0_0_8px_#22d3ee]': 'shadow-[0_0_8px_var(--accent)]',
  'shadow-[0_0_8px_rgba(34,211,238,0.5)]': 'shadow-[0_0_8px_var(--accent-glow)]',
  'shadow-[0_0_20px_rgba(6,182,212,0.1)]': 'shadow-[0_0_20px_var(--accent-glow)]',
  'shadow-[0_0_60px_rgba(6,182,212,0.3)]': 'shadow-[0_0_60px_var(--accent-glow)]',

  // Accents (gradient)
  'from-cyan-400': 'from-[var(--accent)]',
  'from-cyan-500': 'from-[var(--accent)]',
  'from-cyan-600': 'from-[var(--accent)]',
  'from-indigo-400': 'from-[var(--accent)]',
  'from-indigo-500': 'from-[var(--accent)]',
  'from-indigo-600': 'from-[var(--accent)]',
  'via-cyan-500': 'via-[var(--accent)]',
  'to-cyan-400': 'to-[var(--accent)]',
  'to-cyan-500': 'to-[var(--accent)]',
  'to-cyan-600': 'to-[var(--accent)]',
  'to-indigo-400': 'to-[var(--accent)]',
  'to-indigo-500': 'to-[var(--accent)]',
  'to-indigo-600': 'to-[var(--accent)]',

  // Rings & Others
  'ring-cyan-500': 'ring-[var(--accent)]',
  'border-white/5': 'border-[var(--border)]',
  'border-white/10': 'border-[var(--border)]',
  'border-white/20': 'border-[var(--border)]',
};

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;
  
  for (const [key, value] of Object.entries(replacements)) {
    newContent = newContent.split(key).join(value);
  }
  
  // Clean up double spaces caused by removing font-sans
  newContent = newContent.replace(/  +/g, ' ');
  
  // Ensure classNames with trailing spaces are fixed
  newContent = newContent.replace(/ className=" /g, ' className="');
  newContent = newContent.replace(/ "\>/g, '">');
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Updated ' + file);
  }
});
