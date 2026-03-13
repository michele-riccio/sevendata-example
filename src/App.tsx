import { useState, useEffect } from "react";
import {
  Search, Database, BarChart2, TrendingUp, Shield, Target,
  ChevronRight, Sparkles, Download, Filter, RefreshCw,
  ArrowUpRight, MoreHorizontal, MapPin, Users, Zap,
  CheckCircle, Clock, Settings, Bell, HelpCircle,
  Activity, Layers, FileText, AlertTriangle, X,
  ChevronDown, Circle
} from "lucide-react";

// ── DESIGN TOKENS ──────────────────────────────────────
const VERTICALS = {
  analizza: {
    id:"analizza", num:"01", label:"Analizza", tagline:"Comprendi clienti e mercati",
    desc:"Data Quality · Data Analytics · Geo Analytics",
    icon:<BarChart2 size={14}/>, heroIcon:<BarChart2 size={18}/>,
    hex:"#0f766e", light:"#f0fdfa", border:"#99f6e4",
    tw:{ text:"text-teal-700", bg:"bg-teal-50", ring:"ring-teal-300", btn:"bg-teal-600 hover:bg-teal-700", soft:"bg-teal-50 text-teal-700 border-teal-200" },
    kpis:[
      {label:"Aziende analizzate",value:"1.24M",delta:"+8.2%",up:true,icon:<Database size={12}/>},
      {label:"DQ Score medio",value:"98.4%",delta:"+0.3pp",up:true,icon:<CheckCircle size={12}/>},
      {label:"Geo cluster attivi",value:"847",delta:"+12",up:true,icon:<MapPin size={12}/>},
      {label:"Modelli AI",value:"14",delta:"Live",up:true,icon:<Sparkles size={12}/>},
    ],
    pills:["Segmenta customer base","Deduplica CRM","Geo heatmap Lombardia"],
    placeholder:"Analizza la tua customer base (es. Segmenta clienti manifatturieri per fatturato e regione geografica)",
    cta:"Avvia Analisi AI",
    cols:["Segmento","Aziende","Fatturato medio","Copertura","DQ Score"],
    rows:[
      {name:"Manifatturiero Nord",sub:"Cluster A · 47 variabili",c1:"14.280",c2:"€ 4.2M",c3:"Lombardia, Piemonte",score:97,risk:"low"},
      {name:"Retail Centro",sub:"Cluster B · 39 variabili",c1:"8.941",c2:"€ 1.8M",c3:"Lazio, Toscana",score:91,risk:"low"},
      {name:"Agrifood Sud",sub:"Cluster C · 31 variabili",c1:"5.330",c2:"€ 890K",c3:"Campania, Sicilia",score:84,risk:"med"},
      {name:"Tech & Software",sub:"Cluster D · 52 variabili",c1:"3.102",c2:"€ 7.6M",c3:"Milano, Roma",score:99,risk:"low"},
      {name:"Costruzioni",sub:"Cluster E · 28 variabili",c1:"9.780",c2:"€ 2.1M",c3:"Nazionale",score:73,risk:"med"},
    ],
    panel:{
      title:"Top settori",
      items:[
        {label:"Manifatturiero",val:"31%",score:97},
        {label:"Retail & GDO",val:"18%",score:84},
        {label:"Tech & Software",val:"14%",score:91},
        {label:"Agrifood",val:"11%",score:78},
      ],
      recent:["Analisi cluster Milano eseguita","DQ batch completato: 14.280 rec.","Geo report Lombardia pronto"],
    }
  },
  scegli: {
    id:"scegli", num:"02", label:"Scegli", tagline:"Identifica i target migliori",
    desc:"Kompass EasyBusiness · Data Lake B2B · Data Lake B2C",
    icon:<Target size={14}/>, heroIcon:<Target size={18}/>,
    hex:"#4f46e5", light:"#eef2ff", border:"#c7d2fe",
    tw:{ text:"text-indigo-700", bg:"bg-indigo-50", ring:"ring-indigo-300", btn:"bg-indigo-600 hover:bg-indigo-700", soft:"bg-indigo-50 text-indigo-700 border-indigo-200" },
    kpis:[
      {label:"Aziende nel Data Lake",value:"8.4M",delta:"Italia",up:true,icon:<Database size={12}/>},
      {label:"Copertura mondiale",value:"70+",delta:"Paesi",up:true,icon:<MapPin size={12}/>},
      {label:"Contatti verificati",value:"22.1M",delta:"+1.2M",up:true,icon:<Users size={12}/>},
      {label:"AI Match medio",value:"94.2%",delta:"↑ qualità",up:true,icon:<Sparkles size={12}/>},
    ],
    pills:["Prospect Horeca Roma","Manifatturiero Torino >5M","Lookalike top clienti"],
    placeholder:"Cerca nel Data Lake B2B (es. Aziende manifatturiere a Torino con >50 dipendenti e fatturato >5 milioni)",
    cta:"Genera Target List",
    cols:["Nome Azienda","Partita IVA","Settore","Fatturato","Rischio","AI Match"],
    rows:[
      {name:"TechNova S.p.A.",sub:"Software B2B · Milano",c1:"IT04821930963",c2:"€ 12.4M",c3:"Basso",score:98,risk:"low"},
      {name:"Ind. Meccaniche Rossi S.r.l.",sub:"Manifatturiero · Torino",c1:"IT00934570168",c2:"€ 8.1M",c3:"Basso",score:91,risk:"low"},
      {name:"Distribuzione Verdi S.p.A.",sub:"GDO / Horeca · Roma",c1:"IT02156890371",c2:"€ 31.7M",c3:"Medio",score:83,risk:"med"},
      {name:"Pharma Solutions Italia S.p.A.",sub:"Farmaceutico · Milano",c1:"IT08341200150",c2:"€ 47.9M",c3:"Basso",score:96,risk:"low"},
      {name:"Costruzioni Bianchi & Figli",sub:"Edilizia · Napoli",c1:"IT01378450256",c2:"€ 5.3M",c3:"Medio",score:74,risk:"med"},
    ],
    panel:{
      title:"Distribuzione rischio",
      items:[
        {label:"Rischio basso",val:"62%",score:95},
        {label:"Rischio medio",val:"27%",score:60},
        {label:"Rischio alto",val:"11%",score:20},
      ],
      recent:["Target list Horeca esportata","Query Manifatturiero completata","New: 1.2M contatti B2C aggiornati"],
    }
  },
  informati: {
    id:"informati", num:"03", label:"Informati", tagline:"Valuta rischi e affidabilità",
    desc:"Report 7Information · Data Lake 7Information",
    icon:<Shield size={14}/>, heroIcon:<Shield size={18}/>,
    hex:"#b45309", light:"#fffbeb", border:"#fde68a",
    tw:{ text:"text-amber-700", bg:"bg-amber-50", ring:"ring-amber-300", btn:"bg-amber-600 hover:bg-amber-700", soft:"bg-amber-50 text-amber-700 border-amber-200" },
    kpis:[
      {label:"Report generati (30gg)",value:"4.821",delta:"+340",up:true,icon:<FileText size={12}/>},
      {label:"Aziende monitorate",value:"18.4K",delta:"Live",up:true,icon:<Bell size={12}/>},
      {label:"Alert rischio emessi",value:"127",delta:"Questo mese",up:false,icon:<AlertTriangle size={12}/>},
      {label:"Rating aggiornati",value:"99.1%",delta:"Real-time",up:true,icon:<RefreshCw size={12}/>},
    ],
    pills:["Check solvibilità P.IVA","Alert deterioramento","Valuta fornitore strategico"],
    placeholder:"Verifica affidabilità creditizia (es. Report completo su azienda con storico pagamenti e rating Cerved)",
    cta:"Genera Report Rischio",
    cols:["Azienda","Partita IVA","Rating","Score","Stato","Aggiornato"],
    rows:[
      {name:"Logistica Napoli Express",sub:"Trasporti · Napoli",c1:"IT05209640635",c2:"42/100",c3:"Alto",score:42,risk:"high"},
      {name:"Costruzioni Bianchi S.r.l.",sub:"Edilizia · Bari",c1:"IT01378450256",c2:"64/100",c3:"Medio",score:64,risk:"med"},
      {name:"Distribuzione Verdi S.p.A.",sub:"GDO · Roma",c1:"IT02156890371",c2:"74/100",c3:"Medio",score:74,risk:"med"},
      {name:"TechNova S.p.A.",sub:"Software · Milano",c1:"IT04821930963",c2:"91/100",c3:"Basso",score:91,risk:"low"},
      {name:"Pharma Solutions Italia",sub:"Farmaceutico · Milano",c1:"IT08341200150",c2:"95/100",c3:"Basso",score:95,risk:"low"},
    ],
    panel:{
      title:"Monitoraggio attivo",
      items:[
        {label:"Rischio basso",val:"58%",score:91},
        {label:"Rischio medio",val:"29%",score:60},
        {label:"Rischio alto",val:"13%",score:20},
      ],
      recent:["Alert: Logistica Napoli — rating ↓","Report Pharma Solutions pronto","Monitoring batch notturno ok"],
    }
  },
  conquista: {
    id:"conquista", num:"04", label:"Conquista", tagline:"Genera lead e acquisisci clienti",
    desc:"Lead Generation · Kompass ADV · DEM & SMS · Social Selling",
    icon:<TrendingUp size={14}/>, heroIcon:<TrendingUp size={18}/>,
    hex:"#047857", light:"#ecfdf5", border:"#a7f3d0",
    tw:{ text:"text-emerald-700", bg:"bg-emerald-50", ring:"ring-emerald-300", btn:"bg-emerald-600 hover:bg-emerald-700", soft:"bg-emerald-50 text-emerald-700 border-emerald-200" },
    kpis:[
      {label:"Lead generati (mese)",value:"3.241",delta:"+18%",up:true,icon:<Zap size={12}/>},
      {label:"Campagne attive",value:"12",delta:"In corso",up:true,icon:<Activity size={12}/>},
      {label:"Conversion rate medio",value:"6.8%",delta:"+1.2pp",up:true,icon:<ArrowUpRight size={12}/>},
      {label:"CPL medio",value:"€ 4.20",delta:"-€ 0.30",up:true,icon:<Target size={12}/>},
    ],
    pills:["Nuova campagna DEM","Social Selling LinkedIn","Export lista prospect"],
    placeholder:"Pianifica campagna di acquisizione (es. 500 lead settore manifatturiero Torino per campagna DEM multicanale)",
    cta:"Avvia Campagna AI",
    cols:["Campagna","Canale","Lead","Conv. rate","CPL","Stato"],
    rows:[
      {name:"Manifatturiero Nord Q2",sub:"DEM + Telefono · Attiva",c1:"841",c2:"7.2%",c3:"€ 3.80",score:95,risk:"low"},
      {name:"Farmaceutico Lombardia",sub:"Social Selling · Attiva",c1:"312",c2:"5.1%",c3:"€ 5.20",score:78,risk:"med"},
      {name:"Horeca Roma Estate",sub:"DEM · Attiva",c1:"1.204",c2:"8.4%",c3:"€ 2.90",score:99,risk:"low"},
      {name:"Tech Startup Italia",sub:"Kompass ADV · Pausa",c1:"188",c2:"4.8%",c3:"€ 6.10",score:71,risk:"med"},
      {name:"GDO Centro Sud",sub:"SMS + DEM · Attiva",c1:"696",c2:"6.9%",c3:"€ 4.40",score:88,risk:"low"},
    ],
    panel:{
      title:"Performance canali",
      items:[
        {label:"DEM",val:"41%",score:92},
        {label:"Social Selling",val:"28%",score:78},
        {label:"Telefono",val:"19%",score:71},
        {label:"Kompass ADV",val:"12%",score:65},
      ],
      recent:["Campagna Horeca: 1.204 lead ✓","Export CSV completato","Nuovo batch SMS programmato"],
    }
  }
};

// ── PRIMITIVES ─────────────────────────────────────────
const Btn = ({children,cls="",onClick,icon,sm}: any) => (
  <button onClick={onClick}
    className={`inline-flex items-center gap-1.5 rounded-lg font-medium transition-all duration-150
      ${sm?"px-3 py-1.5 text-xs":"px-3.5 py-2 text-sm"} ${cls}`}>
    {icon}{children}
  </button>
);

const RiskDot = ({risk}: any) => {
  const map: Record<string, string> = {low:"bg-emerald-500",med:"bg-amber-500",high:"bg-rose-500"};
  return <span className={`w-1.5 h-1.5 rounded-full inline-block ${map[risk]||"bg-zinc-300"}`}/>;
};

const RiskBadge = ({label}: any) => {
  const m: Record<string, string> = {
    "Basso":"bg-emerald-50 text-emerald-700 border-emerald-200",
    "Medio":"bg-amber-50 text-amber-700 border-amber-200",
    "Alto":"bg-rose-50 text-rose-700 border-rose-200",
    "In corso":"bg-indigo-50 text-indigo-700 border-indigo-200",
    "Pausa":"bg-zinc-100 text-zinc-500 border-zinc-200",
    "Live":"bg-teal-50 text-teal-700 border-teal-200",
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${m[label]||"bg-zinc-100 text-zinc-500 border-zinc-200"}`}>{label}</span>;
};

const ScoreBar = ({score,hex,risk}: any) => {
  const color = risk==="high"?"#e11d48":risk==="med"?"#d97706":hex;
  return (
    <div className="flex items-center gap-2 min-w-[90px]">
      <div className="flex-1 h-1 bg-zinc-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700"
          style={{width:`${score}%`,background:color}}/>
      </div>
      <span className="text-xs tabular-nums font-semibold text-zinc-600 w-7 text-right">{score}</span>
    </div>
  );
};

const MiniBar = ({val,hex}: any) => {
  const pct = parseInt(val);
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1 bg-zinc-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{width:`${pct}%`,background:hex}}/>
      </div>
      <span className="text-xs font-medium text-zinc-600 tabular-nums">{val}</span>
    </div>
  );
};

// ── APP ────────────────────────────────────────────────
export default function App() {
  const [vid, setVid] = useState<keyof typeof VERTICALS>("scegli");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [tick, setTick] = useState(0);
  const [queryCount, setQueryCount] = useState(3847291);
  const [time, setTime] = useState(new Date());

  const v = VERTICALS[vid];

  useEffect(()=>{
    const t=setInterval(()=>{
      setTime(new Date());
      setQueryCount(q=>q+Math.floor(Math.random()*3)+1);
    },2000);
    return ()=>clearInterval(t);
  },[]);

  const switchV = (id: keyof typeof VERTICALS) => { setVid(id); setQuery(""); setSearched(false); setLoading(false); };

  const runSearch = () => {
    if(!query.trim()) return;
    setLoading(true);
    setSearched(false);
    setTimeout(()=>{ setLoading(false); setSearched(true); },800);
  };

  const rows = v.rows;

  return (
    <div className="flex h-screen bg-zinc-50 overflow-hidden"
      style={{fontFamily:"system-ui,-apple-system,'Inter',sans-serif"}}>

      {/* ── SIDEBAR ── */}
      <aside className="w-56 bg-white border-r border-zinc-200 flex flex-col shrink-0 select-none">
        {/* Brand */}
        <div className="px-4 py-3.5 border-b border-zinc-100 flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0 transition-colors duration-300"
            style={{background:v.hex}}>7D</div>
          <div>
            <div className="text-sm font-semibold text-zinc-800 leading-none">SevenData</div>
            <div className="text-[10px] text-zinc-400 mt-0.5 font-mono">Platform · v4.2</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest px-2 mb-1.5">Soluzioni</p>
          {(Object.values(VERTICALS) as typeof VERTICALS[keyof typeof VERTICALS][]).map(vt=>(
            <button key={vt.id} onClick={()=>switchV(vt.id as keyof typeof VERTICALS)}
              className={`w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-left mb-0.5 text-sm transition-all duration-150
                ${vid===vt.id
                  ? `font-semibold`
                  : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700"}`}
              style={vid===vt.id?{background:vt.light,color:vt.hex}:{}}>
              <span style={vid===vt.id?{color:vt.hex}:{}}>{vt.icon}</span>
              <span className="flex-1 leading-none">{vt.num} {vt.label}</span>
              {vid===vt.id && <ChevronRight size={11} className="opacity-40"/>}
            </button>
          ))}

          <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest px-2 mt-4 mb-1.5">Workspace</p>
          {[{i:<Layers size={13}/>,l:"Database"},{i:<Users size={13}/>,l:"Liste CRM"},{i:<Download size={13}/>,l:"Export"},{i:<FileText size={13}/>,l:"Report"}].map(x=>(
            <button key={x.l} className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-left text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700 text-sm transition-colors mb-0.5">
              <span className="text-zinc-400">{x.i}</span>{x.l}
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="px-3 py-2.5 border-t border-zinc-100 flex items-center gap-2">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0 transition-colors duration-300"
            style={{background:v.hex}}>MR</div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-zinc-700 truncate leading-none">Marco Rossi</div>
            <div className="text-[10px] text-zinc-400 mt-0.5">Admin · SevenData</div>
          </div>
          <button className="text-zinc-400 hover:text-zinc-600 transition-colors"><Settings size={12}/></button>
        </div>
      </aside>

      {/* ── CONTENT AREA ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Topbar */}
        <header className="bg-white border-b border-zinc-200 px-5 h-11 flex items-center justify-between shrink-0">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-sm">
            <span className="text-zinc-400">SevenData</span>
            <ChevronRight size={12} className="text-zinc-300"/>
            <span className="font-medium transition-colors duration-300" style={{color:v.hex}}>{v.num} {v.label}</span>
            <ChevronRight size={12} className="text-zinc-300"/>
            <span className="text-zinc-500">{v.tagline}</span>
          </div>
          {/* Status */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block shrink-0"/>
              <span className="text-xs font-mono text-zinc-500">
                Core API: <span className="text-emerald-600 font-semibold">11ms</span>
              </span>
              <span className="text-zinc-200 text-xs">|</span>
              <span className="text-xs font-mono text-zinc-500">
                Queries: <span className="font-semibold tabular-nums transition-colors duration-300" style={{color:v.hex}}>
                  {queryCount.toLocaleString("it-IT")}
                </span>
              </span>
              <span className="text-zinc-200 text-xs">|</span>
              <span className="text-xs font-mono text-zinc-500">
                {time.toLocaleTimeString("it-IT",{hour:"2-digit",minute:"2-digit",second:"2-digit"})}
              </span>
            </div>
            <button className="p-1.5 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors"><Bell size={13}/></button>
            <button className="p-1.5 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors"><HelpCircle size={13}/></button>
          </div>
        </header>

        {/* Main + Right panel */}
        <div className="flex flex-1 overflow-hidden">

          {/* Scrollable main */}
          <main className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3.5">

            {/* Vertical hero strip */}
            <div className="rounded-xl border px-4 py-3 flex items-center justify-between transition-all duration-300"
              style={{background:v.light,borderColor:v.border}}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white transition-colors duration-300"
                  style={{background:v.hex}}>{v.heroIcon}</div>
                <div>
                  <div className="text-sm font-semibold transition-colors duration-300" style={{color:v.hex}}>
                    {v.num} {v.label} — {v.tagline}
                  </div>
                  <div className="text-xs text-zinc-500 mt-0.5">{v.desc}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {/* Vertical switcher pills */}
                <div className="flex items-center gap-1">
                  {(Object.values(VERTICALS) as typeof VERTICALS[keyof typeof VERTICALS][]).map(vt=>(
                    <button key={vt.id} onClick={()=>switchV(vt.id as keyof typeof VERTICALS)}
                      title={`${vt.num} ${vt.label}`}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${vid===vt.id?"scale-125":""}`}
                      style={{background:vt.hex,opacity:vid===vt.id?1:0.3}}/>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                  <Clock size={11}/>
                  <span className="font-mono">Aggiornato oggi, 14:32</span>
                </div>
              </div>
            </div>

            {/* KPI row */}
            <div className="grid grid-cols-4 gap-3">
              {v.kpis.map((k,i)=>(
                <div key={i} className="bg-white rounded-xl border border-zinc-200 shadow-sm p-3.5 flex flex-col gap-2 hover:border-zinc-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider leading-tight">{k.label}</span>
                    <span className="text-zinc-300 transition-colors duration-300" style={{color:`${v.hex}55`}}>{k.icon}</span>
                  </div>
                  <div className="text-[22px] font-bold text-zinc-900 tabular-nums leading-none">{k.value}</div>
                  <div className="flex items-center gap-1 text-xs font-medium transition-colors duration-300" style={{color:v.hex}}>
                    {k.up && <ArrowUpRight size={10}/>}{k.delta}
                  </div>
                </div>
              ))}
            </div>

            {/* Search card */}
            <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-4">
              <div className="flex items-center gap-1.5 mb-2.5">
                <Sparkles size={12} style={{color:v.hex}}/>
                <span className="text-[10px] font-bold uppercase tracking-widest transition-colors duration-300" style={{color:v.hex}}>
                  Natural Language Search — AI-Powered
                </span>
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"/>
                  <input value={query} onChange={e=>setQuery(e.target.value)}
                    onKeyDown={e=>e.key==="Enter"&&runSearch()}
                    className="w-full pl-8 pr-3 py-2 text-sm bg-zinc-50 border border-zinc-200 rounded-lg outline-none text-zinc-700 placeholder:text-zinc-400 transition-all duration-150"
                    onFocus={e=>{e.target.style.borderColor=v.hex;e.target.style.boxShadow=`0 0 0 3px ${v.hex}18`;}}
                    onBlur={e=>{e.target.style.borderColor="";e.target.style.boxShadow="";}}
                    placeholder={v.placeholder}/>
                </div>
                <Btn onClick={runSearch}
                  cls={`text-white shadow-sm ${v.tw.btn}`}
                  icon={loading?<RefreshCw size={12} className="animate-spin"/>:<Sparkles size={12}/>}>
                  {loading?"Elaborazione…":v.cta}
                </Btn>
                <Btn cls="bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50 shadow-sm"
                  icon={<Filter size={12}/>} sm>Filtri</Btn>
              </div>
              {/* Pills */}
              <div className="flex gap-2 mt-2.5 flex-wrap">
                {v.pills.map(p=>(
                  <button key={p} onClick={()=>setQuery(p)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-500 text-xs font-medium rounded-full border border-zinc-200 transition-colors">
                    <ChevronRight size={9}/>{p}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
              {/* Table topbar */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-100">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-zinc-800">Risultati</span>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border transition-all duration-300 ${v.tw.soft}`}>
                    <Sparkles size={9}/>{rows.length} record · AI filtered
                  </span>
                  {loading && <span className="text-xs text-zinc-400 flex items-center gap-1"><RefreshCw size={10} className="animate-spin"/>Ricerca in corso…</span>}
                </div>
                <div className="flex items-center gap-1.5">
                  <Btn cls="text-zinc-500 hover:bg-zinc-100" sm icon={<Download size={11}/>}>CSV</Btn>
                  <Btn cls="text-zinc-500 hover:bg-zinc-100" sm icon={<Download size={11}/>}>Excel</Btn>
                  <div className="w-px h-4 bg-zinc-200 mx-0.5"/>
                  <Btn cls="text-zinc-500 hover:bg-zinc-100" sm icon={<MoreHorizontal size={11}/>}/>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr style={{background:"#fafafa"}} className="border-b border-zinc-100">
                      <th className="px-4 py-2.5 text-left text-[10px] font-semibold text-zinc-400 uppercase tracking-wider w-8">#</th>
                      {v.cols.map(c=>(
                        <th key={c} className="px-4 py-2.5 text-left text-[10px] font-semibold text-zinc-400 uppercase tracking-wider whitespace-nowrap">{c}</th>
                      ))}
                      <th className="px-4 py-2.5 text-left text-[10px] font-semibold text-zinc-400 uppercase tracking-wider whitespace-nowrap">
                        Score
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? [...Array(4)].map((_,i)=>(
                      <tr key={i} className="border-b border-zinc-50">
                        {[...Array(v.cols.length+2)].map((_,j)=>(
                          <td key={j} className="px-4 py-3">
                            <div className="h-2.5 rounded bg-zinc-100 animate-pulse" style={{width:`${40+Math.random()*45}%`}}/>
                          </td>
                        ))}
                      </tr>
                    )) : rows.map((row,i)=>(
                      <tr key={i} className="border-b border-zinc-50 hover:bg-zinc-50 transition-colors cursor-pointer group">
                        <td className="px-4 py-3 text-[10px] font-mono text-zinc-400 tabular-nums">
                          {String(i+1).padStart(2,"0")}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 transition-colors duration-300"
                              style={{background:`${v.hex}18`,color:v.hex}}>
                              {row.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium text-zinc-800 text-xs leading-tight whitespace-nowrap">{row.name}</div>
                              <div className="text-[10px] text-zinc-400 mt-0.5 whitespace-nowrap">{row.sub}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-mono text-[11px] text-zinc-500 bg-zinc-50 border border-zinc-100 rounded px-1.5 py-0.5 whitespace-nowrap">{row.c1}</span>
                        </td>
                        <td className="px-4 py-3 text-xs font-semibold text-zinc-700 tabular-nums whitespace-nowrap">{row.c2}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <RiskDot risk={row.risk}/>
                            <RiskBadge label={row.c3}/>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <ScoreBar score={row.score} hex={v.hex} risk={row.risk}/>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table footer */}
              <div className="px-4 py-2.5 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-zinc-400">
                  <span>{rows.length} di 8.4M aziende</span>
                  <span className="text-zinc-200">·</span>
                  <span>Token: <span className="font-mono font-medium" style={{color:v.hex}}>{v.id}-600</span></span>
                </div>
                {/* Pagination */}
                <div className="flex items-center gap-1">
                  {["‹","1","2","3","…","847","›"].map((p,i)=>(
                    <button key={i}
                      className={`w-6 h-6 text-xs rounded flex items-center justify-center transition-colors
                        ${p==="1"
                          ? `text-white font-semibold`
                          : "text-zinc-500 hover:bg-zinc-200"}`}
                      style={p==="1"?{background:v.hex}:{}}>{p}</button>
                  ))}
                </div>
              </div>
            </div>
          </main>

          {/* ── RIGHT PANEL ── */}
          <aside className="w-52 bg-white border-l border-zinc-200 flex flex-col py-4 px-3 gap-4 shrink-0 overflow-y-auto">

            {/* Vertical context */}
            <div className="rounded-lg border p-2.5 transition-all duration-300" style={{background:v.light,borderColor:v.border}}>
              <div className="text-[10px] font-bold uppercase tracking-widest mb-1.5 transition-colors duration-300" style={{color:v.hex}}>{v.panel.title}</div>
              <div className="flex flex-col gap-1.5">
                {v.panel.items.map((it: any,i: number)=>(
                  <div key={i}>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs text-zinc-600">{it.label}</span>
                    </div>
                    <MiniBar val={it.val} hex={v.hex}/>
                  </div>
                ))}
              </div>
            </div>

            {/* Attività recente */}
            <div>
              <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-2 px-0.5">Attività recente</div>
              <div className="flex flex-col gap-0.5">
                {v.panel.recent.map((r: any,i: number)=>(
                  <div key={i} className="flex items-start gap-2 px-2 py-1.5 rounded-lg hover:bg-zinc-50 transition-colors cursor-default">
                    <div className="w-1 h-1 rounded-full mt-1.5 shrink-0 transition-colors duration-300" style={{background:v.hex}}/>
                    <span className="text-xs text-zinc-500 leading-snug">{r}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Query rapide */}
            <div>
              <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-2 px-0.5">Query salvate</div>
              {v.pills.map((p: any,i: number)=>(
                <button key={i} onClick={()=>setQuery(p)}
                  className="w-full text-left flex items-center gap-1.5 px-2 py-1.5 text-xs text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50 rounded-lg transition-colors">
                  <Search size={10} className="shrink-0 opacity-50"/><span className="truncate">{p}</span>
                </button>
              ))}
            </div>

            {/* Vertical switcher */}
            <div className="mt-auto">
              <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-2 px-0.5">Cambia vertical</div>
              <div className="flex flex-col gap-1">
                {(Object.values(VERTICALS) as typeof VERTICALS[keyof typeof VERTICALS][]).map(vt=>(
                  <button key={vt.id} onClick={()=>switchV(vt.id as keyof typeof VERTICALS)}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-all duration-150
                      ${vid===vt.id?"font-semibold":"text-zinc-500 hover:bg-zinc-50"}`}
                    style={vid===vt.id?{color:vt.hex,background:vt.light}:{}}>
                    <span style={vid===vt.id?{color:vt.hex}:{}}>{vt.icon}</span>
                    {vt.num} {vt.label}
                  </button>
                ))}
              </div>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}
