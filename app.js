/* StudyFlow – Trợ lý quản lý học tập
 * Local-first SPA. Plain HTML/CSS/JS; no server, libraries, or external data.
 * Data is intentionally kept on the current browser/device only.
 */
(() => {
  'use strict';

  const STORAGE_KEY = 'studyflow-data-v1';
  const TIMER_KEY = 'studyflow-timer-v1';
  const DAY_NAMES = ['Thứ Hai','Thứ Ba','Thứ Tư','Thứ Năm','Thứ Sáu','Thứ Bảy','Chủ Nhật'];
  const DAY_SHORT = ['T2','T3','T4','T5','T6','T7','CN'];
  const COLORS = ['#6e60eb','#4796ec','#23aa91','#f0a354','#e97896','#9b79e7','#5586bf','#d98961'];
  const NAV = [
    ['overview','Tổng quan','layout-dashboard'],['courses','Môn học','book-open'],
    ['tasks','Nhiệm vụ','list-checks'],['schedule','Thời khóa biểu','calendar-days'],
    ['focus','Tập trung','timer'],['reports','Thống kê','chart-no-axes-column'],
    ['settings','Cài đặt','settings']
  ];
  const PATHS = {
    'layout-dashboard':'<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
    'book-open':'<path d="M12 7v14M3 18V5a2 2 0 0 1 2-2h3a4 4 0 0 1 4 4 4 4 0 0 1 4-4h3a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2h-3a4 4 0 0 0-4 4 4 4 0 0 0-4-4H5a2 2 0 0 0-2 2Z"/>',
    'list-checks':'<path d="m3 7 2 2 4-4M13 7h8M3 17l2 2 4-4m4 2h8"/>',
    'calendar-days':'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>',
    'timer':'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6M12 2v3"/>',
    'chart-no-axes-column':'<path d="M3 3v18h18M7 16v-4M12 16V7M17 16V9"/>',
    'settings':'<path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l-1.5 1.5a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21h-2.6v-1.4a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-1.5-1.5a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H4v-2.6h1.4a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9L8.1 7a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V4h2.6v1.8a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3L18 8.5a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1H21V14h-1.6a1.7 1.7 0 0 0-1.5 1Z" transform="translate(0 -1) scale(.95)"/>',
    'plus':'<path d="M12 5v14M5 12h14"/>',
    'arrow-right':'<path d="M5 12h14m-6-6 6 6-6 6"/>',
    'check':'<path d="m4 12 5 5L20 6"/>',
    'clock':'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    'alert-circle':'<circle cx="12" cy="12" r="9"/><path d="M12 8v5m0 4h.01"/>',
    'graduation-cap':'<path d="m2 10 10-5 10 5-10 5-10-5ZM6 12v5c4 3 8 3 12 0v-5M22 10v6"/>',
    'search':'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    'pencil':'<path d="m16 5 3 3M4 20l4-1 11-11a2.1 2.1 0 0 0-3-3L5 16l-1 4Z"/>',
    'trash-2':'<path d="M4 7h16M10 3h4M6 7l1 14h10l1-14M10 11v6M14 11v6"/>',
    'download':'<path d="M12 3v12m-4-4 4 4 4-4M4 17v4h16v-4"/>',
    'upload':'<path d="M12 16V4m-4 4 4-4 4 4M4 17v4h16v-4"/>',
    'pause':'<path d="M8 5v14M16 5v14"/>',
    'play':'<path d="m7 4 13 8-13 8V4Z"/>',
    'rotate-ccw':'<path d="M3 12a9 9 0 1 0 3-7L3 8M3 3v5h5"/>',
    'flame':'<path d="M12 22a7 7 0 0 0 7-7c0-4-3-6-4-8-.5 3-2 3-2 3 0-5-3-7-5-8 1 6-3 8-3 13a7 7 0 0 0 7 7Z"/>',
    'target':'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    'sparkles':'<path d="m12 3 1.8 6.2L20 11l-6.2 1.8L12 19l-1.8-6.2L4 11l6.2-1.8L12 3ZM19 18l.7 2.3L22 21l-2.3.7L19 24l-.7-2.3L16 21l2.3-.7L19 18Z"/>',
    'moon':'<path d="M20 15a8 8 0 0 1-11-11A8 8 0 1 0 20 15Z"/>',
    'sun':'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    'file-json':'<path d="M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8l-5-5H8ZM16 3v5h5M9 13l-2 2 2 2m6-4 2 2-2 2"/>',
    'coffee':'<path d="M4 8h13v6a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6V8ZM17 10h2a3 3 0 0 1 0 6h-2M3 22h16M8 2v3m5-3v3"/>',
    'chevron-right':'<path d="m9 18 6-6-6-6"/>',
    'info':'<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/>'
  };
  const icon = (name) => `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${PATHS[name] || PATHS.info}</svg>`;
  const $ = (selector, root = document) => root.querySelector(selector);
  const esc = (val) => String(val ?? '').replace(/[&<>"']/g, (ch) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const uid = () => typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `id_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  const freshData = () => ({ version:1, profile:{name:'BÁ TRÍ',goalHours:12,theme:'light'}, courses:[], tasks:[], schedule:[], sessions:[], demo:false });
  const freshTimer = () => ({mode:'focus',remaining:25*60,running:false,endAt:null,segmentStart:null,startedRemaining:null});
  const safeParse = (value) => { try { return JSON.parse(value); } catch { return null; } };
  const isHex = (s) => /^#[0-9a-f]{6}$/i.test(s || '');
  const truncate = (v, size) => String(v ?? '').trim().slice(0,size);
  const validDate = (d) => typeof d === 'string' && !Number.isNaN(new Date(d).getTime());
  const toIso = (d) => new Date(d).toISOString();
  const localInput = (date) => {const d=new Date(date);if(Number.isNaN(+d))return '';const n=x=>String(x).padStart(2,'0');return `${d.getFullYear()}-${n(d.getMonth()+1)}-${n(d.getDate())}T${n(d.getHours())}:${n(d.getMinutes())}`;};
  const fdate = (d, withTime=false) => !Number.isNaN(new Date(d).getTime()) ? new Intl.DateTimeFormat('vi-VN',withTime?{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'}:{day:'2-digit',month:'2-digit',year:'numeric'}).format(new Date(d)) : '—';
  const fHours = (mins) => mins >= 60 ? `${(mins/60).toLocaleString('vi-VN',{maximumFractionDigits:1})} giờ` : `${Math.round(mins)} phút`;
  const percent = (n,d) => d ? Math.round(n/d*100) : 0;
  const mondayIndex = (date=new Date()) => (date.getDay()+6)%7;
  const mondayOf = (date=new Date()) => {const d=new Date(date);d.setHours(0,0,0,0);d.setDate(d.getDate()-mondayIndex(d));return d;};
  const currentWeek = () => {let start=mondayOf();let end=new Date(start);end.setDate(end.getDate()+7);return {start,end};};
  const courseOf = id => data.courses.find(c=>c.id===id);
  const timerDuration = mode => (mode==='focus' ? 25 : 5)*60;
  const inCurrentWeek = date => {const {start,end}=currentWeek();return +new Date(date)>=+start && +new Date(date)<+end;};

  function sanitize(raw) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw Error('Tệp không chứa dữ liệu StudyFlow hợp lệ.');
    if (raw.version !== 1 || !raw.profile || !Array.isArray(raw.courses) || !Array.isArray(raw.tasks) || !Array.isArray(raw.schedule) || !Array.isArray(raw.sessions)) throw Error('Sai định dạng hoặc phiên bản dữ liệu.');
    if (raw.courses.length>500 || raw.tasks.length>10000 || raw.schedule.length>3000 || raw.sessions.length>30000) throw Error('Tệp chứa quá nhiều mục.');
    const clean = freshData();
    clean.profile.name=truncate(raw.profile.name || 'Sinh viên',60)||'Sinh viên';
    clean.profile.goalHours=Math.min(168,Math.max(1,Number(raw.profile.goalHours)||12));
    clean.profile.theme=raw.profile.theme==='dark'?'dark':'light';
    clean.demo=raw.demo===true;
    const seen = new Set();
    const ID = value => String(value ?? '').slice(0,100);
    for(const c of raw.courses){if(!c || typeof c!=='object')continue;const id=ID(c.id);if(!id||seen.has(id))continue;seen.add(id);clean.courses.push({id,name:truncate(c.name,100)||'Môn học',code:truncate(c.code,30),teacher:truncate(c.teacher,80),color:isHex(c.color)?c.color:COLORS[0]});}
    const courseIds = new Set(clean.courses.map(c=>c.id));
    seen.clear();
    for(const t of raw.tasks){if(!t||typeof t!=='object')continue;const id=ID(t.id);if(!id||seen.has(id)||!courseIds.has(ID(t.courseId))||!validDate(t.dueAt))continue;seen.add(id);clean.tasks.push({id,courseId:ID(t.courseId),title:truncate(t.title,140)||'Nhiệm vụ',description:truncate(t.description,1000),dueAt:toIso(t.dueAt),priority:['high','medium','low'].includes(t.priority)?t.priority:'medium',completed:t.completed===true,createdAt:validDate(t.createdAt)?toIso(t.createdAt):new Date().toISOString()});}
    seen.clear();
    for(const s of raw.schedule){if(!s||typeof s!=='object')continue;const id=ID(s.id);const day=Number(s.day);const timePattern=/^([01]\d|2[0-3]):[0-5]\d$/;if(!id||seen.has(id)||!courseIds.has(ID(s.courseId))||!Number.isInteger(day)||day<0||day>6||!timePattern.test(s.start)||!timePattern.test(s.end)||s.start>=s.end)continue;seen.add(id);clean.schedule.push({id,courseId:ID(s.courseId),day,start:s.start,end:s.end,location:truncate(s.location,100)});}
    for(const s of raw.sessions){if(!s||typeof s!=='object'||!validDate(s.at))continue;const mins=Number(s.minutes);if(!Number.isFinite(mins)||mins<=0||mins>1440)continue;clean.sessions.push({id:ID(s.id)||uid(),at:toIso(s.at),minutes:Math.round(mins*100)/100,completed:s.completed===true});}
    return clean;
  }

  let data;
  let storedValue;
  try {storedValue=localStorage.getItem(STORAGE_KEY);const stored=safeParse(storedValue);data=stored?sanitize(stored):freshData();}
  catch(e){console.warn('StudyFlow: dữ liệu cũ không hợp lệ',e);data=freshData();}
  let focusTimer = Object.assign(freshTimer(),safeParse(localStorage.getItem(TIMER_KEY))||{});
  if (!['focus','break'].includes(focusTimer.mode)||!Number.isFinite(focusTimer.remaining)||focusTimer.remaining<0||focusTimer.remaining>1500)focusTimer=freshTimer();
  if (focusTimer.running && (!Number.isFinite(focusTimer.endAt)||!Number.isFinite(focusTimer.segmentStart)||!Number.isFinite(focusTimer.startedRemaining))) focusTimer=freshTimer();
  const ui={page:'overview',courseSearch:'',taskSearch:'',courseFilter:'all',priorityFilter:'all',taskTab:'all',taskSort:'due',modal:null,pickerColor:COLORS[0]};
  let memoryWarningShown=false;
  function persist(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(data));}catch(e){console.error(e);if(!memoryWarningShown){toast('Bộ nhớ trình duyệt đã đầy. Hãy xuất JSON để sao lưu.','error');memoryWarningShown=true;}}}
  if(storedValue===null)persist();
  function persistTimer(){try{localStorage.setItem(TIMER_KEY,JSON.stringify(focusTimer));}catch(e){console.warn('Không thể lưu đồng hồ',e);}}
  const timeOfDay = () => {let h=new Date().getHours();return h<11?'Chào buổi sáng':h<14?'Chào buổi trưa':h<18?'Chào buổi chiều':'Chào buổi tối';};
  const firstName = name => (name.trim().toLowerCase()==='sinh viên'?'bạn':(name.trim().split(/\s+/).at(-1)||'bạn')).slice(0,35);
  function stats() {
    const now=Date.now(),total=data.tasks.length,done=data.tasks.filter(t=>t.completed).length;
    const open=data.tasks.filter(t=>!t.completed).length;
    const overdue=data.tasks.filter(t=>!t.completed&&new Date(t.dueAt).getTime()<now).length;
    const soon=data.tasks.filter(t=>!t.completed&&new Date(t.dueAt).getTime()>=now&&new Date(t.dueAt).getTime()<=now+48*3600000).length;
    const minutes=data.sessions.reduce((n,s)=>n+s.minutes,0);
    const weeklyMinutes=data.sessions.filter(s=>inCurrentWeek(s.at)).reduce((n,s)=>n+s.minutes,0);
    const completedFocus=data.sessions.filter(s=>s.completed).length;
    return {total,done,open,overdue,soon,completion:percent(done,total),minutes,weeklyMinutes,completedFocus};
  }
  function courseProgress(id){const tasks=data.tasks.filter(t=>t.courseId===id),done=tasks.filter(t=>t.completed).length;return {total:tasks.length,done,pct:percent(done,tasks.length)};}
  function statusPill(task) {if(task.completed)return '<span class="pill green">Hoàn thành</span>';if(+new Date(task.dueAt)<Date.now())return '<span class="pill red">Quá hạn</span>';const diff=+new Date(task.dueAt)-Date.now();if(diff<48*3600000)return '<span class="pill orange">Sắp đến hạn</span>';return ''}
  function priorityPill(p){return p==='high'?'<span class="pill red">Ưu tiên cao</span>':p==='low'?'<span class="pill gray">Ưu tiên thấp</span>':'<span class="pill orange">Trung bình</span>';}
  function emptyState(title,subtitle,button='',action='',extra=''){return `<div class="empty-state"><div class="empty-state-icon">${icon('book-open')}</div><h3>${esc(title)}</h3><p>${esc(subtitle)}</p>${button?`<button class="btn btn-primary btn-sm" data-action="${action}" ${extra}>${icon('plus')}${esc(button)}</button>`:''}</div>`;}
  function showToastNode(el){const root=$('#toastRoot');root.appendChild(el);setTimeout(()=>el.remove(),3700);}
  function toast(message,kind='success'){const el=document.createElement('div');el.className=`toast ${kind}`;el.textContent=message;showToastNode(el);}
  function applyTheme(){document.documentElement.dataset.theme=data.profile.theme;$('#themeIcon').innerHTML=icon(data.profile.theme==='dark'?'sun':'moon');$('meta[name="theme-color"]').content=data.profile.theme==='dark'?'#111421':'#f7f8fc';}
  function renderShell(){
    $('#nav').innerHTML=NAV.map(([key,label,glyph])=>`<button class="nav-item ${ui.page===key?'active':''}" data-action="navigate" data-page="${key}">${icon(glyph)}<span>${label}</span>${ui.page===key?'<span class="nav-indicator"></span>':''}</button>`).join('');
    const quick=['overview','courses','tasks','schedule','focus'];
    $('#bottomNav').innerHTML=quick.map(key=>{const nav=NAV.find(n=>n[0]===key);return `<button class="bottom-item ${ui.page===key?'active':''}" data-action="navigate" data-page="${key}">${icon(nav[2])}<span>${key==='overview'?'Tổng quan':key==='courses'?'Môn học':key==='tasks'?'Nhiệm vụ':key==='schedule'?'Lịch học':'Tập trung'}</span></button>`;}).join('');
    $('#breadcrumbCurrent').textContent=NAV.find(n=>n[0]===ui.page)?.[1]||'Tổng quan';
    const name=data.profile.name||'BÁ TRÍ';const avatarInitial=Array.from(name.trim())[0]?.toLocaleUpperCase('vi-VN')||'B';$('#sidebarName').textContent=name;$('#sidebarAvatar').textContent=avatarInitial;$('#headerAvatar').textContent=avatarInitial;
    $('#headerDate').textContent=new Intl.DateTimeFormat('vi-VN',{weekday:'long',day:'2-digit',month:'long',year:'numeric'}).format(new Date());
    applyTheme();
  }
  const header = (kicker,title,subtitle,actions='') => `<div class="page-title-row"><div><div class="eyebrow">${kicker}</div><h1 class="page-title">${title}</h1><p class="subheading">${subtitle}</p></div>${actions?`<div class="page-actions">${actions}</div>`:''}</div>`;
  function render(){document.title='StudyFlow • Sổ tay học tập dành cho sinh viên';renderShell();const pages={overview:renderOverview,courses:renderCourses,tasks:renderTasks,schedule:renderSchedule,focus:renderFocus,reports:renderReports,settings:renderSettings};$('#content').innerHTML=(pages[ui.page]||renderOverview)();if(ui.page==='focus')updateTimerUI();}
  function setPage(page){if(!NAV.some(n=>n[0]===page))return;ui.page=page;closeSidebar();render();window.scrollTo({top:0,behavior:'instant'});}
  function closeSidebar(){$('#sidebar').classList.remove('open');$('#overlay').classList.remove('open');}
  function openSidebar(){$('#sidebar').classList.add('open');$('#overlay').classList.add('open');}
  const demoBanner = () => data.demo?`<div class="demo-ribbon">${icon('info')} Chế độ trải nghiệm – Số liệu đang hiển thị là dữ liệu mẫu, không phải kết quả học tập của bạn. <button class="text-link" data-action="clear-all">Bắt đầu lại</button></div>`:'';
  const taskItem = (t,compact=false) => {const c=courseOf(t.courseId);return `<div class="${compact?'task-line':'task-full-row'}"><input class="check" type="checkbox" aria-label="Đánh dấu ${esc(t.title)} hoàn thành" data-action="toggle-task" data-id="${esc(t.id)}" ${t.completed?'checked':''}><div class="task-line-main"><div class="task-line-title ${t.completed?'done':''}">${esc(t.title)}</div><div class="task-meta"><span class="dot-pair"><span class="course-dot" style="background:${c?.color||COLORS[0]}"></span>${esc(c?.name||'Môn học')}</span><span>•</span><span>${icon('clock')} ${fdate(t.dueAt,true)}</span></div></div>${compact?statusPill(t):`${priorityPill(t.priority)} <div class="actions-cell"><button class="icon-action" title="Sửa nhiệm vụ" aria-label="Sửa ${esc(t.title)}" data-action="edit" data-entity="task" data-id="${esc(t.id)}">${icon('pencil')}</button><button class="icon-action" title="Xóa nhiệm vụ" aria-label="Xóa ${esc(t.title)}" data-action="delete" data-entity="task" data-id="${esc(t.id)}">${icon('trash-2')}</button></div>`}</div>`};
  function miniAgenda(){const today=mondayIndex();return data.schedule.filter(s=>s.day===today).sort((a,b)=>a.start.localeCompare(b.start));}
  function weeklyMinutesByDay(){const monday=mondayOf();const res=Array(7).fill(0);for(const s of data.sessions){const d=new Date(s.at);if(d>=monday&&d<new Date(+monday+7*86400000)){res[mondayIndex(d)]+=s.minutes;}}return res;}
  function barsHtml(values){const max=Math.max(...values,30);return `<div class="weekly-bars">${values.map((n,i)=>`<div class="bar-col" title="${DAY_NAMES[i]}: ${fHours(n)}"><div class="bar-track"><div class="bar-value" style="height:${n?Math.max(5,n/max*100):0}%"></div></div><div class="bar-day">${DAY_SHORT[i]}</div></div>`).join('')}</div>`;}
  function renderOverview(){
    const s=stats();
    const nextTasks=data.tasks.filter(t=>!t.completed).sort((a,b)=>+new Date(a.dueAt)-+new Date(b.dueAt)).slice(0,5);
    const goals=Math.min(100,Math.round(s.weeklyMinutes/60/data.profile.goalHours*100));
    const today=miniAgenda();
    return `${header('KHÔNG GIAN CỦA BẠN','Tổng quan học tập','Một nơi cho mọi kế hoạch, từng ngày một tiến bộ.')}
    ${demoBanner()}
    ${(!data.courses.length&&!data.tasks.length)?`<div class="welcome-card"><div><h3>👋 Chào mừng bạn đến với StudyFlow!</h3><p>Thêm môn học đầu tiên hoặc dùng dữ liệu minh họa để khám phá các chức năng.</p></div><div class="welcome-cta"><button class="btn btn-soft" data-action="load-demo">${icon('sparkles')} Xem dữ liệu mẫu</button><button class="btn btn-primary" data-action="add" data-entity="course">${icon('plus')} Thêm môn học</button></div></div>`:''}
    <section class="hero"><div class="hero-content"><p class="hero-kicker">✦ HỌC THÔNG MINH, TIẾN BỘ MỖI NGÀY</p><h2>${timeOfDay()}, ${esc(firstName(data.profile.name))}! 👋</h2><p>${s.open?`Bạn có ${s.open} công việc đang chờ. Hãy chọn một việc quan trọng và bắt đầu nhé!`:'Một ngày mới để học điều hay. Lập kế hoạch đầu tiên và duy trì nhịp học của bạn.'}</p><button class="hero-action" data-action="navigate" data-page="tasks">Xem kế hoạch hôm nay &nbsp; ↗</button></div><div class="hero-decor"><svg viewBox="0 0 120 120" fill="none"><rect x="19" y="16" width="81" height="94" rx="11" fill="#F8F6FF" transform="rotate(-12 19 16)"/><path d="m34 40 36-7m-38 21 43-8m-40 23 39-7" stroke="#C5BDFC" stroke-width="6" stroke-linecap="round"/><rect x="38" y="16" width="65" height="89" rx="9" fill="#ffffff" transform="rotate(7 38 16)"/><rect x="48" y="32" width="40" height="6" rx="3" fill="#b6adff"/><rect x="48" y="48" width="26" height="6" rx="3" fill="#e0dcff"/><path d="m48 74 9 9 20-24" stroke="#6a5be6" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg></div></section>
    <div class="kpi-grid">
      ${kpi('Môn học',data.courses.length,'graduation-cap','purple','Đang theo dõi')}
      ${kpi('Chưa hoàn thành',s.open,'list-checks','orange',`${s.soon} nhiệm vụ sắp đến hạn`)}
      ${kpi('Quá hạn',s.overdue,'alert-circle','red',s.overdue?'Cần xử lý sớm':'Không có nhiệm vụ quá hạn')}
      ${kpi('Đã hoàn thành',`${s.completion}%`,'check','green',`${s.done}/${s.total} nhiệm vụ`)}
    </div>
    <div class="section-grid"><section class="card panel"><div class="panel-head"><div><h2 class="panel-title">Công việc cần ưu tiên</h2><p class="panel-subtitle">Sắp xếp theo thời hạn gần nhất</p></div><button class="text-link" data-action="navigate" data-page="tasks">Xem tất cả ${icon('chevron-right')}</button></div>${nextTasks.length?`<div class="task-list">${nextTasks.map(t=>taskItem(t,true)).join('')}</div>`:emptyState('Bạn đã xử lý hết công việc!','Nhiệm vụ mới sẽ xuất hiện tại đây khi bạn thêm vào.','Thêm nhiệm vụ','add','data-entity="task"')}</section>
    <section class="card panel"><div class="panel-head"><div><h2 class="panel-title">Tiến độ hoàn thành</h2><p class="panel-subtitle">Tổng quan toàn bộ nhiệm vụ</p></div>${icon('target')}</div><div class="circle-progress" style="--pct:${s.completion}"><div class="circle-center"><strong>${s.completion}%</strong><span>hoàn thành</span></div></div><div class="progress-caption"><span>Đã hoàn thành</span><b>${s.done}/${s.total} nhiệm vụ</b></div><div class="progress-track"><div class="progress-fill" style="width:${s.completion}%"></div></div><p class="tiny-note">Mỗi nhiệm vụ hoàn thành đều là một bước tiến.</p></section></div>
    <div class="section-grid equal"><section class="card panel"><div class="panel-head"><div><h2 class="panel-title">Thời gian tự học tuần này</h2><p class="panel-subtitle">Tính từ các phiên học tập đã ghi nhận</p></div><button class="text-link" data-action="navigate" data-page="reports">Chi tiết ${icon('chevron-right')}</button></div>${barsHtml(weeklyMinutesByDay())}<div class="progress-caption"><span>Đã học <b>${fHours(s.weeklyMinutes)}</b></span><span>Mục tiêu <b>${data.profile.goalHours} giờ</b></span></div><div class="progress-track"><div class="progress-fill" style="width:${goals}%"></div></div></section>
    <section class="card panel"><div class="panel-head"><div><h2 class="panel-title">Lịch học hôm nay</h2><p class="panel-subtitle">${DAY_NAMES[mondayIndex()]}, ${fdate(new Date())}</p></div><button class="text-link" data-action="navigate" data-page="schedule">Thời khóa biểu ${icon('chevron-right')}</button></div>${today.length?`<div class="list-mini">${today.slice(0,4).map(t=>{const c=courseOf(t.courseId);return `<div class="today-session"><span class="time-tag">${t.start}</span><span class="session-stripe" style="background:${c?.color||COLORS[0]}"></span><div class="session-details"><b>${esc(c?.name||'Môn học')}</b><span>${t.start}–${t.end} ${t.location?`• ${esc(t.location)}`:''}</span></div></div>`}).join('')}</div>`:emptyState('Hôm nay chưa có lịch học','Bạn có thể thêm buổi học ở trang Thời khóa biểu.')}</section></div>`;
  }
  function kpi(label,value,glyph,color,foot){return `<div class="card kpi"><div class="kpi-top"><span class="kpi-label">${label}</span><span class="kpi-icon i-${color}">${icon(glyph)}</span></div><div class="kpi-value">${value}</div><p class="kpi-foot">${foot}</p></div>`;}
  function renderCourses(){
    const list=data.courses.filter(c=>`${c.name} ${c.code} ${c.teacher}`.toLowerCase().includes(ui.courseSearch.toLowerCase())).sort((a,b)=>a.name.localeCompare(b.name,'vi'));
    return `${header('TỔ CHỨC KIẾN THỨC','Môn học của bạn','Quản lý thông tin và tiến độ theo từng học phần.',`<button class="btn btn-primary" data-action="add" data-entity="course">${icon('plus')} Thêm môn học</button>`)}${demoBanner()}
    <div class="card filter-bar"><div class="search-field">${icon('search')}<input class="form-control" id="courseSearch" data-filter="courseSearch" placeholder="Tìm tên môn, mã môn, giảng viên..." value="${esc(ui.courseSearch)}" aria-label="Tìm môn học"></div><span style="color:var(--muted);font-size:11px">${list.length} / ${data.courses.length} môn học</span></div>
    ${list.length?`<div class="course-grid">${list.map(c=>{const p=courseProgress(c.id);return `<article class="card course-card"><div class="course-top"><span class="course-icon" style="background:${c.color}20;color:${c.color}">${esc(c.name.slice(0,2).toUpperCase())}</span><div class="menu-inline"><button class="icon-action" data-action="edit" data-entity="course" data-id="${esc(c.id)}" title="Sửa môn học" aria-label="Sửa ${esc(c.name)}">${icon('pencil')}</button><button class="icon-action" data-action="delete" data-entity="course" data-id="${esc(c.id)}" title="Xóa môn học" aria-label="Xóa ${esc(c.name)}">${icon('trash-2')}</button></div></div><h3>${esc(c.name)}</h3><div class="course-code">${esc(c.code||'CHƯA CÓ MÃ MÔN')}</div><div class="course-teacher">${icon('graduation-cap')} ${esc(c.teacher||'Chưa cập nhật giảng viên')}</div><div class="course-bottom"><div class="course-stats"><span>${p.done}/${p.total} nhiệm vụ hoàn thành</span><b>${p.pct}%</b></div><div class="progress-track"><div class="progress-fill" style="background:${c.color};width:${p.pct}%"></div></div></div></article>`}).join('')}</div>`:emptyState(data.courses.length?'Không tìm thấy môn học':'Chưa có môn học nào',data.courses.length?'Hãy thử từ khóa khác.':'Hãy thêm môn học để liên kết nhiệm vụ và lịch học.','Thêm môn học','add','data-entity="course"')}`;
  }
  function filteredTasks(){
    const now=Date.now();let list=data.tasks.filter(t=>{
      if(ui.taskTab==='open'&&t.completed)return false;
      if(ui.taskTab==='done'&&!t.completed)return false;
      if(ui.taskTab==='overdue'&&(t.completed||+new Date(t.dueAt)>=now))return false;
      if(ui.courseFilter!=='all'&&t.courseId!==ui.courseFilter)return false;
      if(ui.priorityFilter!=='all'&&t.priority!==ui.priorityFilter)return false;
      const c=courseOf(t.courseId);return `${t.title} ${t.description} ${c?.name||''}`.toLowerCase().includes(ui.taskSearch.toLowerCase());
    });
    const rank={high:0,medium:1,low:2};
    list.sort((a,b)=>ui.taskSort==='priority'?(rank[a.priority]-rank[b.priority]||+new Date(a.dueAt)-+new Date(b.dueAt)):ui.taskSort==='newest'?(+new Date(b.createdAt)-+new Date(a.createdAt)):(+new Date(a.dueAt)-+new Date(b.dueAt)));
    return list;
  }
  function renderTasks(){
    const s=stats(),list=filteredTasks();
    const count={all:data.tasks.length,open:s.open,done:s.done,overdue:s.overdue};
    return `${header('LÀM VIỆC CÓ KẾ HOẠCH','Nhiệm vụ và hạn nộp','Tập trung vào điều quan trọng, không bỏ sót bất kỳ hạn nộp nào.',`<button class="btn btn-primary" data-action="add" data-entity="task">${icon('plus')} Thêm nhiệm vụ</button>`)}${demoBanner()}
    <div class="kpi-grid">${kpi('Tổng nhiệm vụ',s.total,'list-checks','purple','Tất cả nhiệm vụ')}${kpi('Cần thực hiện',s.open,'clock','orange','Chưa hoàn thành')}${kpi('Quá hạn',s.overdue,'alert-circle','red','Cần ưu tiên')}${kpi('Hoàn thành',s.done,'check','green',`${s.completion}% tổng công việc`)}</div>
    <div class="card filter-bar"><div class="search-field">${icon('search')}<input class="form-control" data-filter="taskSearch" value="${esc(ui.taskSearch)}" placeholder="Tìm tên nhiệm vụ, nội dung..." aria-label="Tìm nhiệm vụ"></div><select class="form-control" data-filter="courseFilter" aria-label="Lọc môn học"><option value="all">Tất cả môn học</option>${data.courses.map(c=>`<option value="${esc(c.id)}" ${ui.courseFilter===c.id?'selected':''}>${esc(c.name)}</option>`).join('')}</select><select class="form-control" data-filter="priorityFilter" aria-label="Lọc ưu tiên"><option value="all">Mọi ưu tiên</option><option value="high" ${ui.priorityFilter==='high'?'selected':''}>Ưu tiên cao</option><option value="medium" ${ui.priorityFilter==='medium'?'selected':''}>Trung bình</option><option value="low" ${ui.priorityFilter==='low'?'selected':''}>Ưu tiên thấp</option></select><select class="form-control" data-filter="taskSort" aria-label="Sắp xếp"><option value="due" ${ui.taskSort==='due'?'selected':''}>Hạn gần nhất</option><option value="priority" ${ui.taskSort==='priority'?'selected':''}>Theo ưu tiên</option><option value="newest" ${ui.taskSort==='newest'?'selected':''}>Mới tạo</option></select></div>
    <div class="card"><div class="tabs" role="tablist" aria-label="Trạng thái nhiệm vụ">${[['all','Tất cả'],['open','Cần làm'],['done','Hoàn thành'],['overdue','Quá hạn']].map(([key,label])=>`<button class="tab ${ui.taskTab===key?'active':''}" role="tab" aria-selected="${ui.taskTab===key}" data-action="task-tab" data-value="${key}">${label}<span class="count-inline">${count[key]}</span></button>`).join('')}</div>${list.length?`<div class="task-full-list">${list.map(t=>taskItem(t)).join('')}</div>`:emptyState(data.courses.length?'Không có nhiệm vụ phù hợp':'Chưa có môn học để tạo nhiệm vụ',data.courses.length?'Thay đổi bộ lọc hoặc tạo nhiệm vụ mới.':'Hãy thêm một môn học trước.','', '')}</div>`;
  }
  function renderSchedule(){
    const sorted=[...data.schedule].sort((a,b)=>a.start.localeCompare(b.start));
    return `${header('THỜI GIAN CỦA BẠN','Thời khóa biểu','Sắp xếp các buổi học cố định trong tuần.',`<button class="btn btn-primary" data-action="add" data-entity="schedule">${icon('plus')} Thêm buổi học</button>`)}${demoBanner()}<div class="schedule-notice">${icon('calendar-days')} Thời khóa biểu lặp lại hàng tuần. Kéo ngang để xem đủ 7 ngày trên màn hình nhỏ.</div>
    <div class="schedule-wrap"><div class="schedule-grid">${DAY_NAMES.map((day,i)=>{const sessions=sorted.filter(s=>s.day===i),today=i===mondayIndex();return `<section class="day-column ${today?'today':''}"><div class="day-head"><strong>${day}</strong><span>${today?'● Hôm nay':`${sessions.length} buổi học`}</span></div>${sessions.length?sessions.map(x=>{const c=courseOf(x.courseId);return `<div class="schedule-block" style="border-left-color:${c?.color||COLORS[0]}"><time>${esc(x.start)} – ${esc(x.end)}</time><strong>${esc(c?.name||'Môn học')}</strong><p>${esc(x.location||'Chưa có địa điểm')}</p><div class="sched-actions"><button class="icon-action" title="Sửa buổi học" aria-label="Sửa buổi học" data-action="edit" data-entity="schedule" data-id="${esc(x.id)}">${icon('pencil')}</button><button class="icon-action" title="Xóa buổi học" aria-label="Xóa buổi học" data-action="delete" data-entity="schedule" data-id="${esc(x.id)}">${icon('trash-2')}</button></div></div>`}).join(''):'<div class="day-quiet">Lịch trống</div>'}</section>`}).join('')}</div></div>
    <p class="tiny-note">Tổng cộng ${data.schedule.length} buổi học mỗi tuần. Lịch được lưu cục bộ trên trình duyệt của bạn.</p>`;
  }
  function renderFocus(){
    const s=stats(),sec=focusTimer.running?Math.max(0,Math.ceil((focusTimer.endAt-Date.now())/1000)):focusTimer.remaining;
    const total=timerDuration(focusTimer.mode),angle=(total-sec)/total*360;
    return `${header('KHÔNG GIAN TẬP TRUNG','Đồng hồ tập trung','Học tập sâu, nghỉ ngơi hợp lý và theo dõi thời gian của chính bạn.')}${demoBanner()}
    <div class="focus-grid"><section class="card timer-panel"><div class="timer-mode"><button class="mode-btn ${focusTimer.mode==='focus'?'active':''}" data-action="focus-mode" data-value="focus">${icon('graduation-cap')} Học tập · 25 phút</button><button class="mode-btn ${focusTimer.mode==='break'?'active':''}" data-action="focus-mode" data-value="break">${icon('coffee')} Nghỉ ngắn · 5 phút</button></div>
    <div class="timer-ring" id="timerRing" style="--angle:${Math.max(0,Math.min(360,angle))}deg"><div class="timer-inner"><div class="timer-display" id="timerText">${fmtClock(sec)}</div><div class="timer-desc" id="timerDesc">${focusTimer.running?'Bạn đang làm rất tốt!':focusTimer.mode==='focus'?'Sẵn sàng tập trung?':'Thả lỏng một chút nhé!'}</div></div></div>
    <div class="timer-controls"><button class="btn btn-primary" id="timerPlayBtn" data-action="timer-toggle">${icon(focusTimer.running?'pause':'play')} ${focusTimer.running?'Tạm dừng':'Bắt đầu'}</button><button class="btn" data-action="timer-reset">${icon('rotate-ccw')} Đặt lại</button></div><p class="focus-intro">${focusTimer.mode==='focus'?'Tắt thông báo, chọn một nhiệm vụ và học thật tập trung.':'Hãy đứng dậy, uống nước và thư giãn mắt.'}</p></section>
    <div class="stack-gap"><section class="card panel"><div class="panel-head"><div><h2 class="panel-title">Thành quả của bạn</h2><p class="panel-subtitle">Tính từ các phiên đã ghi nhận</p></div>${icon('sparkles')}</div><div class="focus-stat"><div class="focus-stat-icon i-purple">${icon('timer')}</div><div><b>${s.completedFocus}</b><span>Phiên tập trung hoàn thành</span></div></div><div class="focus-stat"><div class="focus-stat-icon i-green">${icon('clock')}</div><div><b>${fHours(s.minutes)}</b><span>Tổng thời gian tập trung</span></div></div><div class="focus-stat"><div class="focus-stat-icon i-orange">${icon('target')}</div><div><b>${fHours(s.weeklyMinutes)} / ${data.profile.goalHours} giờ</b><span>Tiến độ mục tiêu tuần</span></div></div></section><section class="tips-card"><strong>✦ Mẹo tập trung hiệu quả</strong><p>Chia công việc lớn thành những phần nhỏ. Dành 25 phút chỉ cho một việc, nghỉ 5 phút rồi bắt đầu vòng mới. Khi tạm dừng, thời gian đã học vẫn được ghi nhận.</p></section></div></div>`;
  }
  function renderReports(){
    const s=stats(),high=data.tasks.filter(t=>t.priority==='high').length,med=data.tasks.filter(t=>t.priority==='medium').length,low=data.tasks.filter(t=>t.priority==='low').length,total=data.tasks.length;
    const perCourse=data.courses.map(c=>({course:c,p:courseProgress(c.id)}));
    const goal=Math.min(100,Math.round(s.weeklyMinutes/60/data.profile.goalHours*100));
    return `${header('NHÌN LẠI ĐỂ TIẾN BỘ','Thống kê học tập','Dữ liệu thực tế từ nhiệm vụ và phiên học được lưu trên thiết bị.')}${demoBanner()}
    <div class="report-hero"><div class="card report-big"><div class="kpi-label">Tỷ lệ hoàn thành</div><strong>${s.completion}%</strong><p>${s.done}/${s.total} nhiệm vụ đã xong</p></div><div class="card report-big"><div class="kpi-label">Thời gian tập trung</div><strong>${fHours(s.minutes)}</strong><p>Tất cả phiên học được ghi nhận</p></div><div class="card report-big"><div class="kpi-label">Phiên tập trung hoàn thành</div><strong>${s.completedFocus} phiên</strong><p>Đủ thời lượng một phiên tập trung</p></div></div>
    <div class="section-grid equal"><section class="card panel"><div class="panel-head"><div><h2 class="panel-title">Giờ học theo ngày</h2><p class="panel-subtitle">Tuần hiện tại (Thứ Hai – Chủ Nhật)</p></div>${icon('chart-no-axes-column')}</div>${barsHtml(weeklyMinutesByDay())}<div class="progress-caption"><span>Mục tiêu tuần</span><b>${fHours(s.weeklyMinutes)} / ${data.profile.goalHours} giờ</b></div><div class="progress-track"><div class="progress-fill" style="width:${goal}%"></div></div><p class="tiny-note">Đạt ${goal}% mục tiêu tuần này.</p></section>
    <section class="card panel"><div class="panel-head"><div><h2 class="panel-title">Mức độ ưu tiên</h2><p class="panel-subtitle">Tất cả nhiệm vụ đã thêm</p></div>${icon('list-checks')}</div>${total?`<div class="priority-track"><div class="priority-segment" style="width:${high/total*100}%;background:var(--red)"></div><div class="priority-segment" style="width:${med/total*100}%;background:var(--orange)"></div><div class="priority-segment" style="width:${low/total*100}%;background:var(--green)"></div></div><div class="priority-legend"><span><span class="course-dot" style="background:var(--red)"></span> Cao</span><b>${high}</b></div><div class="priority-legend"><span><span class="course-dot" style="background:var(--orange)"></span> Trung bình</span><b>${med}</b></div><div class="priority-legend"><span><span class="course-dot" style="background:var(--green)"></span> Thấp</span><b>${low}</b></div><div class="progress-caption"><span>Hoàn thành</span><b>${s.done}/${total}</b></div><div class="progress-track"><div class="progress-fill" style="width:${s.completion}%"></div></div>`:emptyState('Chưa có dữ liệu nhiệm vụ','Thêm nhiệm vụ để xem tỷ lệ các mức ưu tiên.')}</section></div>
    <section class="card panel"><div class="panel-head"><div><h2 class="panel-title">Tiến độ từng môn học</h2><p class="panel-subtitle">Phần trăm nhiệm vụ hoàn thành theo môn</p></div><button class="text-link" data-action="navigate" data-page="courses">Quản lý môn ${icon('chevron-right')}</button></div>${perCourse.length?perCourse.map(({course:c,p})=>`<div class="subject-progress-row"><span class="course-dot" style="background:${c.color}"></span><span class="sp-name" title="${esc(c.name)}">${esc(c.name)}</span><div class="progress-track"><div class="progress-fill" style="width:${p.pct}%;background:${c.color}"></div></div><b>${p.pct}%</b></div>`).join(''):emptyState('Chưa có môn học','Hãy thêm môn học để bắt đầu theo dõi tiến độ.')}</section>`;
  }
  function renderSettings(){return `${header('CÁ NHÂN HÓA','Cài đặt & Dữ liệu','Tùy chỉnh StudyFlow theo nhịp học tập của riêng bạn.')}${demoBanner()}<div class="settings-grid"><div><section class="card setting-card"><h3>Hồ sơ học tập</h3><p>Thông tin này chỉ được lưu trên trình duyệt hiện tại.</p><form id="settingsForm"><div class="form-grid"><div class="form-group"><label for="profileName">Tên hiển thị</label><input id="profileName" class="form-control" name="name" maxlength="60" required value="${esc(data.profile.name)}" placeholder="Tên của bạn"></div><div class="form-group"><label for="goalHours">Mục tiêu mỗi tuần (giờ)</label><input id="goalHours" class="form-control" name="goalHours" type="number" min="1" max="168" step="0.5" required value="${data.profile.goalHours}"></div></div><div class="form-actions"><button type="submit" class="btn btn-primary">${icon('check')} Lưu thay đổi</button></div></form></section>
    <section class="card setting-card"><h3>Giao diện</h3><p>Chọn chế độ phù hợp cho mắt khi học lâu.</p><div class="settings-actions"><button class="btn ${data.profile.theme==='light'?'btn-soft':''}" data-action="set-theme" data-value="light">${icon('sun')} Sáng</button><button class="btn ${data.profile.theme==='dark'?'btn-soft':''}" data-action="set-theme" data-value="dark">${icon('moon')} Tối</button></div></section></div>
    <div><section class="card setting-card"><h3>Xuất và nhập dữ liệu</h3><p>Sao lưu, chuyển thiết bị hoặc lưu trữ các nhiệm vụ.</p><div class="settings-actions"><button class="btn" data-action="export-json">${icon('download')} Xuất JSON</button><button class="btn" data-action="import-json">${icon('upload')} Nhập JSON</button><button class="btn" data-action="export-csv">${icon('download')} Xuất CSV nhiệm vụ</button></div></section>
    <section class="card setting-card"><h3>Dữ liệu dùng thử</h3><p>Dữ liệu mẫu được gắn nhãn rõ ràng, không tính là thành tích thật của bạn.</p><div class="settings-actions"><button class="btn btn-soft" data-action="load-demo">${icon('sparkles')} Nạp dữ liệu mẫu</button><button class="btn btn-danger" data-action="clear-all">${icon('trash-2')} Xóa toàn bộ dữ liệu</button></div></section><div class="notice"><strong>🔒 Quyền riêng tư</strong><br>StudyFlow hoạt động hoàn toàn trong trình duyệt. Chúng tôi không gửi dữ liệu của bạn lên máy chủ. Nếu xóa dữ liệu trang web hoặc đổi thiết bị, bạn nên nhập lại tệp JSON đã sao lưu trước đó.</div></div></div>`;}
  function modalField(label,name,control,extra=''){return `<div class="form-group ${extra}"><label for="field-${name}">${label}</label>${control}</div>`;}
  function openModal(entity,id=null){
    if ((entity==='task'||entity==='schedule')&&!data.courses.length){toast('Hãy tạo một môn học trước khi thêm nhiệm vụ hoặc lịch học.','error');openModal('course');return;}
    const key=entity==='course'?'courses':entity==='task'?'tasks':'schedule';
    const item=id?data[key].find(x=>x.id===id):null;
    if(id&&!item){toast('Mục này không còn tồn tại.','error');return;}
    ui.modal={entity,id};ui.pickerColor=item?.color||COLORS[0];
    const isEdit=Boolean(item),label=entity==='course'?'môn học':entity==='task'?'nhiệm vụ':'buổi học';
    let form='';
    if(entity==='course'){
      form=`<div class="form-grid">${modalField('Tên môn học *','name',`<input id="field-name" name="name" class="form-control" maxlength="100" required placeholder="Ví dụ: Mạng máy tính" value="${esc(item?.name||'')}">`,'wide')}
      ${modalField('Mã môn','code',`<input id="field-code" name="code" class="form-control" maxlength="30" placeholder="Ví dụ: NET101" value="${esc(item?.code||'')}">`)}
      ${modalField('Giảng viên','teacher',`<input id="field-teacher" name="teacher" class="form-control" maxlength="80" placeholder="Tên giảng viên" value="${esc(item?.teacher||'')}">`)}
      <div class="form-group wide"><label>Màu đại diện</label><input name="color" type="hidden" value="${ui.pickerColor}" id="chosenColor"><div class="color-choices">${COLORS.map(c=>`<button class="color-choice ${ui.pickerColor===c?'selected':''}" type="button" data-action="pick-color" data-value="${c}" aria-label="Chọn màu ${c}" style="background:${c}"></button>`).join('')}</div></div></div>`;
    } else if(entity==='task'){
      const next=new Date();next.setDate(next.getDate()+1);next.setHours(23,59,0,0);
      form=`<div class="form-grid">${modalField('Tên nhiệm vụ *','title',`<input id="field-title" name="title" class="form-control" maxlength="140" required placeholder="Ví dụ: Nộp báo cáo nhóm" value="${esc(item?.title||'')}">`,'wide')}
      ${modalField('Môn học *','courseId',`<select id="field-courseId" name="courseId" class="form-control" required>${data.courses.map(c=>`<option value="${esc(c.id)}" ${item?.courseId===c.id?'selected':''}>${esc(c.name)}</option>`).join('')}</select>`)}
      ${modalField('Mức ưu tiên','priority',`<select id="field-priority" name="priority" class="form-control"><option value="high" ${item?.priority==='high'?'selected':''}>Cao</option><option value="medium" ${!item||item.priority==='medium'?'selected':''}>Trung bình</option><option value="low" ${item?.priority==='low'?'selected':''}>Thấp</option></select>`)}
      ${modalField('Hạn nộp *','dueAt',`<input id="field-dueAt" name="dueAt" type="datetime-local" class="form-control" required value="${localInput(item?.dueAt||next)}">`,'wide')}
      ${modalField('Mô tả / ghi chú','description',`<textarea id="field-description" name="description" class="form-control" maxlength="1000" rows="3" placeholder="Chi tiết công việc...">${esc(item?.description||'')}</textarea>`,'wide')}
      <div class="form-group wide"><label style="display:flex;align-items:center;gap:9px"><input name="completed" type="checkbox" ${item?.completed?'checked':''}> Đánh dấu đã hoàn thành</label></div></div>`;
    } else {
      form=`<div class="form-grid">${modalField('Môn học *','courseId',`<select id="field-courseId" class="form-control" name="courseId" required>${data.courses.map(c=>`<option value="${esc(c.id)}" ${item?.courseId===c.id?'selected':''}>${esc(c.name)}</option>`).join('')}</select>`,'wide')}
      ${modalField('Thứ trong tuần','day',`<select class="form-control" id="field-day" name="day">${DAY_NAMES.map((d,i)=>`<option value="${i}" ${(item?.day??mondayIndex())===i?'selected':''}>${d}</option>`).join('')}</select>`,'wide')}
      ${modalField('Giờ bắt đầu *','start',`<input id="field-start" class="form-control" type="time" name="start" required value="${item?.start||'08:00'}">`)}
      ${modalField('Giờ kết thúc *','end',`<input id="field-end" class="form-control" type="time" name="end" required value="${item?.end||'10:00'}">`)}
      ${modalField('Phòng / địa điểm','location',`<input id="field-location" name="location" class="form-control" maxlength="100" placeholder="Ví dụ: Phòng 301" value="${esc(item?.location||'')}">`,'wide')}</div>`;
    }
    $('#modalRoot').innerHTML=`<div class="modal-backdrop" data-action="close-modal"><div class="dialog" role="dialog" aria-modal="true" aria-labelledby="modalTitle"><div class="dialog-head"><div><h2 id="modalTitle">${isEdit?'Chỉnh sửa':'Thêm'} ${label}</h2><div class="dialog-sub">${isEdit?'Cập nhật thông tin đã lưu.':'Điền thông tin để thêm vào kế hoạch của bạn.'}</div></div><button class="icon-btn" data-action="close-modal" aria-label="Đóng hộp thoại">✕</button></div><form id="entityForm">${form}<div class="form-actions"><button type="button" class="btn" data-action="close-modal">Hủy</button><button type="submit" class="btn btn-primary">${icon('check')} ${isEdit?'Lưu thay đổi':'Thêm mới'}</button></div></form></div></div>`;
    document.body.style.overflow='hidden';
    setTimeout(()=>$('#entityForm input:not([type=hidden]), #entityForm select')?.focus(),0);
  }
  function closeModal(){ui.modal=null;$('#modalRoot').innerHTML='';document.body.style.overflow='';}
  function saveEntity(form){
    const entity=ui.modal?.entity,id=ui.modal?.id;if(!entity)return;
    const fd=new FormData(form),key=entity==='course'?'courses':entity==='task'?'tasks':'schedule';
    const previous=id?data[key].find(x=>x.id===id):null;
    if(id&&!previous){toast('Không tìm thấy mục cần sửa.','error');return;}
    let item;
    if(entity==='course'){
      const name=truncate(fd.get('name'),100),code=truncate(fd.get('code'),30),teacher=truncate(fd.get('teacher'),80);
      if(!name){toast('Bạn cần nhập tên môn học.','error');return;}
      item={id:id||uid(),name,code,teacher,color:isHex(fd.get('color'))?fd.get('color'):COLORS[0]};
    } else if(entity==='task'){
      const title=truncate(fd.get('title'),140),courseId=String(fd.get('courseId')),rawDue=String(fd.get('dueAt'));
      if(!title||!courseOf(courseId)||!rawDue||!validDate(rawDue)){toast('Vui lòng nhập đầy đủ và chính xác nhiệm vụ, môn học và hạn nộp.','error');return;}
      const priority=fd.get('priority');
      item={id:id||uid(),courseId,title,description:truncate(fd.get('description'),1000),dueAt:new Date(rawDue).toISOString(),priority:['high','medium','low'].includes(priority)?priority:'medium',completed:fd.has('completed'),createdAt:previous?.createdAt||new Date().toISOString()};
    } else {
      const courseId=String(fd.get('courseId')),day=Number(fd.get('day')),start=String(fd.get('start')),end=String(fd.get('end'));
      if(!courseOf(courseId)||!Number.isInteger(day)||day<0||day>6||!/^\d\d:\d\d$/.test(start)||!/^\d\d:\d\d$/.test(end)||start>=end){toast('Giờ kết thúc phải sau giờ bắt đầu. Kiểm tra lại buổi học.','error');return;}
      item={id:id||uid(),courseId,day,start,end,location:truncate(fd.get('location'),100)};
    }
    if(previous)data[key][data[key].findIndex(x=>x.id===id)]=item;else data[key].push(item);
    persist();closeModal();render();toast(previous?'Đã cập nhật thành công!':'Đã thêm thành công!');
  }
  function deleteEntity(entity,id){
    const key=entity==='course'?'courses':entity==='task'?'tasks':entity==='schedule'?'schedule':null;if(!key)return;
    const item=data[key].find(x=>x.id===id);if(!item)return;
    const label=entity==='course'?item.name:entity==='task'?item.title:`buổi học ${item.start} ${DAY_NAMES[item.day]}`;
    let warning=`Bạn có chắc muốn xóa “${label}”?`;
    if(entity==='course'){const countTask=data.tasks.filter(t=>t.courseId===id).length,countSchedule=data.schedule.filter(s=>s.courseId===id).length;warning+=`\nHành động này cũng xóa ${countTask} nhiệm vụ và ${countSchedule} buổi học liên quan.`;}
    if(!window.confirm(warning+'\nHành động không thể hoàn tác.'))return;
    data[key]=data[key].filter(x=>x.id!==id);
    if(entity==='course'){data.tasks=data.tasks.filter(t=>t.courseId!==id);data.schedule=data.schedule.filter(t=>t.courseId!==id);if(ui.courseFilter===id)ui.courseFilter='all';}
    persist();render();toast('Đã xóa thành công.');
  }
  function toggleTask(id,checked){const t=data.tasks.find(t=>t.id===id);if(!t)return;t.completed=checked;persist();render();toast(checked?'Đã hoàn thành nhiệm vụ!':'Đã chuyển về chưa hoàn thành.');}
  const fmtClock=(sec)=>`${String(Math.floor(Math.max(sec,0)/60)).padStart(2,'0')}:${String(Math.max(0,sec)%60).padStart(2,'0')}`;
  function recordFocusSegment(completed=false){
    if(focusTimer.mode!=='focus'||!focusTimer.running||!focusTimer.segmentStart)return;
    const elapsed=Math.min(focusTimer.startedRemaining||0,Math.max(0,(Date.now()-focusTimer.segmentStart)/1000));
    if(elapsed>=0.8){data.sessions.push({id:uid(),at:new Date().toISOString(),minutes:Math.round(elapsed/60*100)/100,completed});persist();}
  }
  function finishTimer(){
    if(!focusTimer.running)return;
    const finishedFocus=focusTimer.mode==='focus';
    if(finishedFocus)recordFocusSegment(true);
    focusTimer={...freshTimer(),mode:finishedFocus?'break':'focus',remaining:finishedFocus?300:1500};
    persistTimer();render();toast(finishedFocus?'Hoàn thành một phiên học! Đã ghi nhận thời gian. Bây giờ hãy nghỉ 5 phút.':'Đã hết giờ nghỉ. Sẵn sàng cho phiên mới!');
    try {const ctx=new (window.AudioContext||window.webkitAudioContext)(),osc=ctx.createOscillator(),gain=ctx.createGain();osc.type='sine';osc.frequency.value=800;gain.gain.value=.035;osc.connect(gain);gain.connect(ctx.destination);osc.start();osc.stop(ctx.currentTime+.14);osc.onended=()=>ctx.close();} catch(e) {/* âm thanh tùy trình duyệt */}
  }
  function tickTimer(){if(!focusTimer.running)return;if(Date.now()>=focusTimer.endAt){finishTimer();return;}updateTimerUI();}
  function updateTimerUI(){
    const el=$('#timerText'),ring=$('#timerRing'),desc=$('#timerDesc'),btn=$('#timerPlayBtn');if(!el||!ring||!btn)return;
    const seconds=focusTimer.running?Math.max(0,Math.ceil((focusTimer.endAt-Date.now())/1000)):Math.round(focusTimer.remaining);
    el.textContent=fmtClock(seconds);
    ring.style.setProperty('--angle',`${Math.min(360,Math.max(0,(1-seconds/timerDuration(focusTimer.mode))*360))}deg`);
    desc.textContent=focusTimer.running?'Bạn đang làm rất tốt!':focusTimer.mode==='focus'?'Sẵn sàng tập trung?':'Thả lỏng một chút nhé!';
    btn.innerHTML=`${icon(focusTimer.running?'pause':'play')} ${focusTimer.running?'Tạm dừng':'Bắt đầu'}`;
    if(ui.page==='focus')document.title=`${fmtClock(seconds)} • StudyFlow`;
  }
  function timerToggle(){
    if(focusTimer.running){
      recordFocusSegment(false);
      focusTimer.remaining=Math.max(0,Math.ceil((focusTimer.endAt-Date.now())/1000));
      focusTimer.running=false;focusTimer.endAt=null;focusTimer.segmentStart=null;focusTimer.startedRemaining=null;
    }else{
      focusTimer.remaining=Math.max(1,Math.round(focusTimer.remaining));
      focusTimer.running=true;focusTimer.endAt=Date.now()+focusTimer.remaining*1000;focusTimer.segmentStart=Date.now();focusTimer.startedRemaining=focusTimer.remaining;
    }
    persistTimer();render();
  }
  function timerReset(){if(focusTimer.running)recordFocusSegment(false);focusTimer={...freshTimer(),mode:focusTimer.mode,remaining:timerDuration(focusTimer.mode)};persistTimer();render();toast('Đã đặt lại đồng hồ.');}
  function timerMode(mode){if(!['focus','break'].includes(mode)||mode===focusTimer.mode)return;if(focusTimer.running)recordFocusSegment(false);focusTimer={...freshTimer(),mode,remaining:timerDuration(mode)};persistTimer();render();}
  function loadDemo(){
    if((data.courses.length||data.tasks.length||data.schedule.length||data.sessions.length)&&!confirm('Nạp dữ liệu mẫu sẽ thay thế toàn bộ dữ liệu đang có. Bạn có muốn tiếp tục?'))return;
    const subjects=[['Lập trình web','WEB101','Nguyễn Minh Anh','#6e60eb'],['Mạng máy tính','NET101','Trần Quốc Huy','#4796ec'],['Cơ sở dữ liệu','DBI202','Lê Thảo Vy','#23aa91'],['Tiếng Anh học thuật','ENG201','Phạm Mỹ Linh','#f0a354'],['An toàn thông tin','SEC101','Đỗ Minh Quân','#e97896']];
    const now=new Date();
    const at=(offset,hr=23,min=59)=>{const d=new Date(now);d.setDate(d.getDate()+offset);d.setHours(hr,min,0,0);return d.toISOString();};
    const c=subjects.map(([name,code,teacher,color])=>({id:uid(),name,code,teacher,color}));
    const rawTasks=[
      [0,'Hoàn thiện giao diện trang web',1,'high',false,'Tối ưu giao diện trên điện thoại và máy tính'],
      [1,'Ôn tập mô hình OSI',2,'high',false,'Vẽ sơ đồ, ghi nhớ 7 tầng và chức năng'],
      [2,'Nộp bài thiết kế ERD',4,'medium',false,'Vẽ ERD cho hệ thống quản lý thư viện'],
      [3,'Luyện nghe bài 5',3,'low',false,'Nghe 30 phút và ghi lại từ mới'],
      [4,'Chuẩn bị bài thuyết trình nhóm',6,'high',false,'Tổng hợp nội dung và chia việc cho nhóm'],
      [0,'Cài đặt môi trường lập trình',-3,'low',true,'Cài tiện ích hỗ trợ và chạy dự án đầu tiên'],
      [2,'Viết câu lệnh SQL cơ bản',-1,'medium',true,'Hoàn thành 10 bài thực hành'],
      [1,'Bài kiểm tra chia mạng con',-2,'high',false,'Ôn các công thức chia mạng con']
    ];
    const tasks=rawTasks.map(([idx,title,due,priority,completed,description])=>({id:uid(),courseId:c[idx].id,title,dueAt:at(due),priority,completed,description,createdAt:at(-5,9,0)}));
    const sessions=[0,1,2,3,4].map((idx)=>{const mon=mondayOf();mon.setDate(mon.getDate()+idx);mon.setHours(9+idx,15,0,0);return {id:uid(),at:mon.toISOString(),minutes:25,completed:true};}).filter(s=>+new Date(s.at)<=Date.now());
    const sch=[[0,0,'07:30','09:30','P. A201'],[0,3,'13:30','15:30','P. B402'],[1,1,'09:00','11:00','P. A305'],[2,2,'07:30','09:30','Phòng thực hành 02'],[3,4,'13:30','15:30','P. A105'],[4,0,'09:00','11:00','Phòng thực hành máy tính'],[5,3,'08:00','10:00','Học trực tuyến']].map(([day,idx,start,end,location])=>({id:uid(),day,courseId:c[idx].id,start,end,location}));
    data={version:1,profile:{...data.profile},courses:c,tasks,schedule:sch,sessions,demo:true};
    focusTimer=freshTimer();persistTimer();persist();ui.courseSearch='';ui.taskSearch='';ui.taskTab='all';ui.courseFilter='all';ui.priorityFilter='all';setPage('overview');toast('Đã nạp dữ liệu minh họa.');
  }
  function clearAll(){if(!confirm('Bạn có chắc muốn xóa TOÀN BỘ môn học, nhiệm vụ, lịch và thống kê trên thiết bị này? Hành động không thể hoàn tác.'))return;const profile={...data.profile};data=freshData();data.profile=profile;focusTimer=freshTimer();persist();persistTimer();ui.courseSearch='';ui.taskSearch='';ui.taskTab='all';ui.courseFilter='all';setPage('overview');toast('Đã xóa dữ liệu học tập.');}
  function downloadFile(filename,content,type){const blob=new Blob([content],{type}),href=URL.createObjectURL(blob),a=document.createElement('a');a.href=href;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(href),2000);}
  function exportJson(){downloadFile(`StudyFlow-sao-luu-${localInput(new Date()).slice(0,10)}.json`,JSON.stringify(data,null,2),'application/json;charset=utf-8');toast('Đã xuất bản sao lưu JSON.');}
  const csvCell=value=>{let text=String(value??'');if(/^[\s]*[=+@\-\t\r]/.test(text))text="'"+text;return `"${text.replace(/"/g,'""')}"`;};
  function exportCsv(){const head=['Tiêu đề','Môn học','Mã môn','Mô tả','Hạn nộp','Ưu tiên','Trạng thái'];const body=data.tasks.map(t=>{const c=courseOf(t.courseId);return [t.title,c?.name,c?.code,t.description,fdate(t.dueAt,true),{high:'Cao',medium:'Trung bình',low:'Thấp'}[t.priority],t.completed?'Hoàn thành':'Chưa hoàn thành'].map(csvCell).join(',')});downloadFile(`StudyFlow-nhiem-vu-${localInput(new Date()).slice(0,10)}.csv`,'\ufeff'+[head.map(csvCell).join(','),...body].join('\r\n'),'text/csv;charset=utf-8');toast('Đã xuất danh sách nhiệm vụ CSV.');}
  async function importJson(file){if(!file)return;if(file.size>10*1024*1024){toast('Tệp quá lớn (tối đa 10 MB).','error');return;}try{const text=await file.text(),parsed=safeParse(text),clean=sanitize(parsed);if(!confirm('Nhập dữ liệu sẽ thay thế toàn bộ dữ liệu học tập đang có trong trình duyệt. Tiếp tục?'))return;data=clean;focusTimer=freshTimer();persist();persistTimer();ui.courseSearch='';ui.taskSearch='';ui.taskTab='all';ui.courseFilter='all';ui.priorityFilter='all';setPage('overview');toast('Đã khôi phục dữ liệu StudyFlow thành công.');}catch(e){toast(e.message||'Không thể đọc tệp JSON.','error');}}

  document.addEventListener('click', (event) => {
    const el=event.target.closest('[data-action]');if(!el)return;
    const action=el.dataset.action,id=el.dataset.id,entity=el.dataset.entity;
    if(action==='close-modal'){if(event.target.closest('.dialog')&&el.classList.contains('modal-backdrop'))return;closeModal();return;}
    if(action==='toggle-task')return; // handled on input change below
    if(action==='navigate'){setPage(el.dataset.page);return;}
    if(action==='open-sidebar'){openSidebar();return;}
    if(action==='close-sidebar'){closeSidebar();return;}
    if(action==='add'){openModal(entity);return;}
    if(action==='edit'){openModal(entity,id);return;}
    if(action==='delete'){deleteEntity(entity,id);return;}
    if(action==='pick-color'){ui.pickerColor=el.dataset.value;$('#chosenColor').value=ui.pickerColor;document.querySelectorAll('.color-choice').forEach(x=>x.classList.toggle('selected',x.dataset.value===ui.pickerColor));return;}
    if(action==='task-tab'){ui.taskTab=el.dataset.value;render();return;}
    if(action==='toggle-theme'||action==='set-theme'){data.profile.theme=action==='toggle-theme'?(data.profile.theme==='dark'?'light':'dark'):el.dataset.value;persist();render();return;}
    if(action==='timer-toggle'){timerToggle();return;}
    if(action==='timer-reset'){timerReset();return;}
    if(action==='focus-mode'){timerMode(el.dataset.value);return;}
    if(action==='load-demo'){loadDemo();return;}
    if(action==='clear-all'){clearAll();return;}
    if(action==='export-json'){exportJson();return;}
    if(action==='export-csv'){exportCsv();return;}
    if(action==='import-json'){$('#jsonFile').value='';$('#jsonFile').click();return;}
  });
  document.addEventListener('change',(event)=>{
    const el=event.target;
    if(el.dataset.action==='toggle-task'){toggleTask(el.dataset.id,el.checked);return;}
    if(el.dataset.filter){ui[el.dataset.filter]=el.value;render();}
  });
  document.addEventListener('input',(event)=>{
    const el=event.target;if(el.isComposing||!el.dataset.filter||el.tagName!=='INPUT')return;
    const key=el.dataset.filter,pos=el.selectionStart;ui[key]=el.value;render();const replacement=$(`[data-filter="${key}"]`);if(replacement){replacement.focus();try{replacement.setSelectionRange(pos,pos);}catch(e){}}
  });
  document.addEventListener('submit',event=>{
    if(event.target.id==='entityForm'){event.preventDefault();saveEntity(event.target);return;}
    if(event.target.id==='settingsForm'){event.preventDefault();const fd=new FormData(event.target),name=truncate(fd.get('name'),60),hours=Number(fd.get('goalHours'));if(!name||!Number.isFinite(hours)||hours<1||hours>168){toast('Tên không được trống; mục tiêu phải từ 1 đến 168 giờ.','error');return;}data.profile.name=name;data.profile.goalHours=hours;persist();render();toast('Đã lưu cài đặt cá nhân.');}
  });
  $('#jsonFile').addEventListener('change',event=>importJson(event.target.files?.[0]));
  document.addEventListener('keydown',event=>{if(event.key==='Escape'){if(ui.modal)closeModal();else closeSidebar();}});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)tickTimer();});
  // Ensure a completed timer is committed on reload; otherwise restore the exact remaining time.
  if(focusTimer.running && Date.now()>=focusTimer.endAt)finishTimer();
  render();setInterval(tickTimer,1000);
})();
