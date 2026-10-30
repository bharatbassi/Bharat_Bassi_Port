import {useRef,useState,useEffect} from 'react';
import {motion as fm} from 'framer-motion';
import gsap from 'gsap';import {ScrollTrigger} from 'gsap/ScrollTrigger';import {useGSAP} from '@gsap/react';
import Flashlight from './Flashlight.jsx';import Collaborate from './Collaborate.jsx';
import {SITE,PROJECTS,ROLES,SKILLS,EDU} from './config.js';
gsap.registerPlugin(ScrollTrigger,useGSAP);
const SHOW='inset(0% 0% 0% 0%)';
const NAV=[['subject','The subject'],['work','Case files'],['record','Record'],['toolkit','Toolkit'],['hire','Hire me']];
function Switch({label,on,set}){return(<fm.button className="tog" role="switch" aria-checked={on} onClick={()=>set(!on)} whileTap={{scale:.95}}>
  <span className="mono">{label}</span><span className="trk"><fm.span className="knob" animate={{x:on?16:0}} transition={{type:'spring',stiffness:500,damping:30}}/></span></fm.button>)}
function Nav(p){return(<header className="nav"><a href="#subject" className="logo" aria-label="Bharat Bassi, top of page">B•B</a>
  <nav aria-label="Sections"><ul>{NAV.map(([id,l])=><li key={id}><fm.a href={'#'+id} whileHover={{y:-2}} whileTap={{scale:.95}}>{l}</fm.a></li>)}</ul></nav>
  <div className="togs"><Switch label="Motion" on={p.motion} set={p.setMotion}/><Switch label="Torch" on={p.torch} set={p.setTorch}/></div></header>)}

const Cut=({gray})=><img className={'cut'+(gray?' gray':'')} src={SITE.portrait} width="900" height="900" alt={gray?'Portrait of Bharat Bassi':''}/>;

function Hero({torch,motion}){
  const root=useRef();
  useGSAP(()=>{
    if(!motion)return;
    const tl=gsap.timeline({defaults:{ease:'power4.out'}});
    tl.fromTo('.outline',{clipPath:'inset(0% 100% 0% 0%)',opacity:0},{clipPath:SHOW,opacity:1,duration:1.6,ease:'power3.inOut'})
      .fromTo('.slab',{clipPath:'inset(100% 0% 0% 0%)'},{clipPath:SHOW,duration:1.2,ease:'power3.inOut'},'-=1.2')
      .from('.name i',{yPercent:115,duration:1.1,stagger:.07},'-=.9')
      .fromTo('.fl-base .cut',{yPercent:10,opacity:0},{yPercent:0,opacity:1,duration:1.6},'-=1')
      .from('.cap',{opacity:0,y:14,stagger:.09,duration:.8},'-=.9')
      .from('.ring path',{strokeDashoffset:1,duration:1.2,ease:'power2.inOut'},'-=.8');
    gsap.to('.outline',{y:-90,ease:'none',scrollTrigger:{trigger:root.current,start:'top top',end:'bottom top',scrub:true}});
    gsap.to('.slab',{yPercent:-10,ease:'none',scrollTrigger:{trigger:root.current,start:'top top',end:'bottom top',scrub:true}});
  },{scope:root,dependencies:[motion],revertOnUpdate:true});
  const reveal=<><Cut/>
    <p className="note n1 mono">Star of the Month, DAZN 2025.<br/>Root cause analysis lifted Service Level 35%.</p>
    <p className="note n2 mono">Reporting prep: 3–4 hours down to 30–40 minutes.</p>
    <p className="note n3 mono">First response under 7 minutes across 21+ airport channels.</p></>;
  return(<section id="subject" ref={root} className="hero" aria-label="Introduction">
    <Flashlight disabled={!torch} still={!motion} reveal={reveal}>
      <div className="halo"/><div className="slab"/>
      <p className="outline" aria-hidden="true">BASSI</p>
      <h1 className="name"><span className="sr">Bharat Bassi</span><span aria-hidden="true">{[...'BHARAT'].map((c,i)=><i key={i}>{c}</i>)}</span></h1>
      <Cut gray/><div className="fade"/>
      <p className="cap mono fig">Fig. 1 — the analyst</p>
      <p className="cap tag mono">6+ years in social listening</p>
      <div className="cap stat"><svg className="ring" viewBox="0 0 220 120" aria-hidden="true"><path pathLength="1" d="M110 8C50 6 8 30 12 62c4 34 62 52 120 46 56-6 84-32 76-62C200 18 150 4 96 10"/></svg>
        <b>10+</b><span className="mono">markets monitored at DAZN</span></div>
      <div className="cap lede"><p>Social media analyst, social listening and ORM specialist. I turn audience signals across sports streaming, automotive, aviation and media into decisions leadership can act on.</p>
        <p className="mono">Hyderabad, India</p></div>
    </Flashlight>
  </section>)}

function Work({motion}){
  const root=useRef(),track=useRef();
  useGSAP(()=>{
    if(!motion)return;
    const mm=gsap.matchMedia();
    mm.add('(min-width: 900px)',()=>{
      const el=root.current;el.classList.add('is-h');
      const dist=()=>track.current.scrollWidth-window.innerWidth;
      const tw=gsap.to(track.current,{x:()=>-dist(),ease:'none',scrollTrigger:{trigger:el,pin:true,scrub:.6,end:()=>'+='+dist(),invalidateOnRefresh:true}});
      gsap.utils.toArray('.big',el).forEach(b=>gsap.fromTo(b,{xPercent:10},{xPercent:-10,ease:'none',scrollTrigger:{trigger:b.closest('.case'),containerAnimation:tw,start:'left right',end:'right left',scrub:true}}));
      return()=>el.classList.remove('is-h');
    });
    mm.add('(max-width: 899px)',()=>{
      gsap.utils.toArray('.case-vis',root.current).forEach(v=>gsap.fromTo(v,{clipPath:'inset(0% 100% 0% 0%)'},{clipPath:SHOW,duration:1.1,ease:'power3.out',scrollTrigger:{trigger:v,start:'top 80%',once:true}}));
    });
  },{scope:root,dependencies:[motion],revertOnUpdate:true});
  return(<section id="work" ref={root} className="work" aria-labelledby="work-h"><div ref={track} className="track">
    <div className="case intro"><h2 id="work-h">Case files</h2><p>Four dashboards and automations, in the order they were built to be used.</p></div>
    {PROJECTS.map((p,i)=><article key={p.title} className={'case c'+(i%2)} style={{'--c':p.color}}>
      <div className="case-vis" aria-hidden="true"><span className="big">{p.big}</span><span className="mono unit">{p.unit}</span></div>
      <div className="case-txt"><p className="mono">{p.tools}</p><h3>{p.title}</h3><p>{p.what}</p><p className="role">{p.role}</p></div>
    </article>)}</div></section>)}

function Record(){return(
  <section id="record" className="record" aria-labelledby="rec-h">
    <h2 id="rec-h" data-rv>Record</h2>
    <p className="about" data-rv>Six years across sports streaming, automotive, aviation and media. The work is crisis communication, competitive intelligence and reporting that senior stakeholders can use. Now pursuing an MBA in Business Analytics to sharpen the strategic side.</p>
    <ol className="roles">{ROLES.map(r=><li key={r.org} data-rv><p className="mono when">{r.when}</p>
      <div><h3>{r.role}</h3><p className="org">{r.org}</p><ul>{r.pts.map(t=><li key={t}>{t}</li>)}</ul></div></li>)}</ol>
    <h3 className="sub" data-rv>Education and certifications</h3>
    <dl className="edu">{EDU.map(([a,b])=><div key={a} data-rv><dt>{a}</dt><dd>{b}</dd></div>)}</dl>
  </section>)}
function Toolkit(){return(
  <section id="toolkit" className="toolkit" aria-labelledby="tk-h"><h2 id="tk-h" data-rv>Toolkit</h2>
    <dl>{SKILLS.map(([g,t])=><div key={g} data-rv><dt>{g}</dt><dd>{t}</dd></div>)}</dl></section>)}

export default function App(){
  const [torch,setTorch]=useState(true);
  // Respect the OS "reduce motion" setting by default, but let the visitor override it.
  const [motion,setMotion]=useState(()=>!matchMedia('(prefers-reduced-motion: reduce)').matches);
  const rest=useRef();
  useGSAP(()=>{
    if(!motion)return;
    gsap.utils.toArray('[data-rv]').forEach(el=>gsap.fromTo(el,{clipPath:'inset(0% 0% 100% 0%)',yPercent:18},{clipPath:SHOW,yPercent:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 90%',once:true}}));
  },{dependencies:[motion],revertOnUpdate:true});
  useEffect(()=>{document.fonts?.ready.then(()=>ScrollTrigger.refresh())},[]);
  useEffect(()=>{document.documentElement.style.scrollBehavior=motion?'smooth':'auto'},[motion]);
  return(<><a className="skip" href="#work">Skip to case files</a><div className="grain" aria-hidden="true"/>
    <Nav torch={torch} setTorch={setTorch} motion={motion} setMotion={setMotion}/>
    <main><Hero torch={torch} motion={motion}/><Work motion={motion}/><Record/><Toolkit/><Collaborate live={motion}/></main>
    <footer className="foot mono">© 2026 Bharat Bassi · <a href={`mailto:${SITE.email}`}>{SITE.email}</a></footer></>)}
