async function loadProjects(){
  const res = await fetch('./assets/projects.json');
  const projects = await res.json();
  return projects;
}
function el(tag, attrs={}, children=[]){
  const n = document.createElement(tag);
  Object.entries(attrs).forEach(([k,v])=>{
    if(k==='class') n.className=v;
    else if(k==='html') n.innerHTML=v;
    else n.setAttribute(k,v);
  });
  children.forEach(c=> n.appendChild(c));
  return n;
}
function projectCard(p){
  const href = `./projects/${p.slug}.html`;
  const card = el('a', {class:'card', href});
  const thumb = el('div', {class:'thumb'});
  const meta = el('div', {class:'meta'}, [
    el('b', {html: `${p.id} — ${p.title !== 'INFORMATION NON PRÉSENTE' ? p.title : p.name}`}),
    el('span', {html: p.category})
  ]);
  card.appendChild(thumb);
  card.appendChild(meta);
  return card;
}
async function renderWork(){
  const grid = document.querySelector('[data-project-grid]');
  if(!grid) return;
  const projects = await loadProjects();
  const layout = [
    'col-6','col-6','col-4','col-4','col-4','col-6','col-6','col-8','col-4','col-6','col-6','col-4','col-4','col-4'
  ];
  projects.forEach((p,i)=>{
    const wrap = el('div', {class: layout[i] || 'col-4'});
    wrap.appendChild(projectCard(p));
    grid.appendChild(wrap);
  });
}
document.addEventListener('DOMContentLoaded', renderWork);
