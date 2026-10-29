import {useRef,useState,useEffect} from 'react';
import {motion} from 'framer-motion';
import gsap from 'gsap';import {ScrollTrigger} from 'gsap/ScrollTrigger';import {useGSAP} from '@gsap/react';
import Flashlight from './Flashlight.jsx';import Collaborate from './Collaborate.jsx';
import {SITE,PROJECTS,ROLES,SKILLS,EDU} from './config.js';
gsap.registerPlugin(ScrollTrigger,useGSAP);

const NAV=[['subject','The subject'],['work','Case files'],['record','Record'],['toolkit','Toolkit'],['hire','Hire me']];
function Nav({torch,setTorch}){return(
  <header className="nav"><a href="#subject" className="logo" aria-label="Bharat Bassi, top of page">B•B</a>
    <nav aria-label="Sections"><ul>{NAV.map(([id,l])=><li key={id}><motion.a href={'#'+id} whileHover={{y:-2}} whileTap={{scale:.95}}>{l}</motion.a></li>)}</ul></nav>
    <motion.button className="tog" role="switch" aria-checked={torch} onClick={()=>setTorch(!torch)} whileTap={{scale:.95}}>
      <span className="mono">Torch</span><span className="trk"><motion.span className="knob" animate={{x:torch?16:0}} transition={{type:'spring',stiffness:500,damping:30}}/></span></motion.button>
  </header>)}

function Portrait({gray}){const [ok,setOk]=useState(true);
  return(<div className={'frame'+(gray?' gray':'')}>{ok
    ?<img src={SITE.portrait} alt={gray?'Portrait of Bharat Bassi':''} width="430" height="538" onError={()=>setOk(false)}/>
    :<div className="ph" role={gray?'img':undefined} aria-label="Portrait placeholder">BB<small className="mono">Add public/portrait.jpg</small></div>}</div>)}

function Hero({torch}){
  const root=useRef();
  useGSAP(()=>{
    const mm=gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)',()=>{
      const tl=gsap.timeline({defaults:{ease:'power4.out'}});
      tl.from('.outline',{clipPath:'inset(0 100% 0 0)',opacity:0,duration:1.6,ease:'power3.inOut'})
        .from('.name i',{yPercent:115,duration:1.1,stagger:.07},'-=1.1')
        .from('.fl-base .frame',{clipPath:'inset(100% 0 0 0)',duration:1.2,ease:'power3.inOut'},'-=.9')
        .from('.fl-base .frame img,.fl-base .frame .ph',{scale:1.3,duration:1.8},'<')
        .from('.cap',{opacity:0,y:14,stagger:.09,duration:.8},'-=.8')
        .from('.ring path',{strokeDashoffset:1,duration:1.2,ease:'power2.inOut'},'-=.6');
      gsap.to('.outline',{y:-90,ease:'none',scrollTrigger:{trigger:root.current,start:'top top',end:'bottom top',scrub:true}});
      gsap.to('.fl-base .frame',{yPercent:-7,ease:'none',scrollTrigger:{trigger:root.current,start:'top top',end:'bottom top',scrub:true}});
    });
  },{scope:root});
  const reveal=<><Portrait/>
    <p className="note n1 mono">Star of the Month, DAZN 2025.<br/>Root cause analysis lifted Service Level 35%.</p>
    <p className="note n2 mono">Reporting prep: 3–4 hours down to 30–40 minutes.</p>
    <p className="note n3 mono">First response under 7 minutes across 21+ airport channels.</p></>;
  return(<section id="subject" ref={root} className="hero" aria-label="Introduction">
    <Flashlight disabled={!torch} reveal={reveal}>
      <p className="outline" aria-hidden="true">BASSI</p>
      <Portrait gray/>
      <p className="cap mono fig">Fig. 1 — the analyst</p>
      <p className="cap tag mono">6+ years in social listening</p>
      <div className="cap stat"><svg className="ring" viewBox="0 0 220 120" aria-hidden="true"><path pathLength="1" d="M110 8C50 6 8 30 12 62c4 34 62 52 120 46 56-6 84-32 76-62C200 18 150 4 96 10"/></svg>
        <b>10+</b><span className="mono">markets monitored at DAZN</span></div>
      <h1 className="name"><span className="sr">Bharat Bassi</span><span aria-hidden="true">{[...'BHARAT'].map((c,i)=><i key={i}>{c}</i>)}</span></h1>
      <div className="cap lede"><p>Social media analyst, social listening and ORM specialist. I turn audience signals across sports streaming, automotive, aviation and media into decisions leadership can act on.</p>
        <p className="mono">{'Hyderabad, India'}</p></div>
    </Flashlight>
  </section>)}

function Work(){
  const root=useRef(),track=useRef();
  useGSAP(()=>{
    const mm=gsap.matchMedia();
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)',()=>{
      const el=root.current;el.classList.add('is-h');
      const dist=()=>track.current.scrollWidth-window.innerWidth;
      const tw=gsap.to(track.current,{x:()=>-dist(),ease:'none',scrollTrigger:{trigger:el,pin:true,scrub:.6,end:()=>'+='+dist(),invalidateOnRefresh:true}});
      gsap.utils.toArray('.big',el).forEach(b=>gsap.fromTo(b,{xPercent:10},{xPercent:-10,ease:'none',scrollTrigger:{trigger:b.closest('.case'),containerAnimation:tw,start:'left right',end:'right left',scrub:true}}));
      return()=>el.classList.remove('is-h');
    });
    mm.add('(max-width: 899px), (prefers-reduced-motion: reduce)',()=>{
      gsap.utils.toArray('.case-vis',root.current).forEach(v=>gsap.from(v,{clipPath:'inset(0 100% 0 0)',duration:1.1,ease:'power3.out',scrollTrigger:{trigger:v,start:'top 80%',once:true}}));
    });
  },{scope:root});
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
  useGSAP(()=>{
    const mm=gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)',()=>{
      gsap.utils.toArray('[data-rv]').forEach(el=>gsap.from(el,{clipPath:'inset(0 0 100% 0)',yPercent:18,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}}));
    });
  });
  useEffect(()=>{document.fonts?.ready.then(()=>ScrollTrigger.refresh())},[]);
  return(<><a className="skip" href="#work">Skip to case files</a><div className="grain" aria-hidden="true"/>
    <Nav torch={torch} setTorch={setTorch}/>
    <main><Hero torch={torch}/><Work/><Record/><Toolkit/><Collaborate/></main>
    <footer className="foot mono">© 2026 Bharat Bassi · <a href={`mailto:${SITE.email}`}>{SITE.email}</a></footer></>)}
