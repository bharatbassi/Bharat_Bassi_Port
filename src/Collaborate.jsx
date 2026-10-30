import {useEffect,useRef,useState} from 'react';
import {AnimatePresence,motion,useMotionValue,useSpring} from 'framer-motion';
import gsap from 'gsap';import {ScrollTrigger} from 'gsap/ScrollTrigger';import {useGSAP} from '@gsap/react';
import {SITE} from './config.js';
gsap.registerPlugin(ScrollTrigger,useGSAP);
const PIVOT='348 364';
const STRINGS=['M346 366 C380 340 450 330 560 197','M350 369 C420 360 520 280 620 199','M352 371 C450 380 600 300 690 199','M349 372 C470 410 680 330 760 199','M347 370 C440 440 760 400 830 197'];
export default function Collaborate({live=true}){
  const root=useRef(),btn=useRef(),panel=useRef(),closeBtn=useRef();
  const [open,setOpen]=useState(false);
  const calm=!live;
  const rx=useSpring(useMotionValue(0),{stiffness:200,damping:18}),ry=useSpring(useMotionValue(0),{stiffness:200,damping:18});

  useGSAP(()=>{
    const sc=root.current,strs=gsap.utils.toArray('.str',sc);
    strs.forEach(s=>{const l=s.getTotalLength();gsap.set(s,{strokeDasharray:l,strokeDashoffset:live?l:0})});
    if(!live)return;
    const tl=gsap.timeline({scrollTrigger:{trigger:sc,start:'top 70%',once:true}});
    tl.fromTo('.cta-wrap',{y:50,opacity:0},{y:0,opacity:1,duration:1,ease:'power3.out'})
      .from('.hand',{x:90,opacity:0,duration:1.1,ease:'power3.out'},'<.15')
      .to(strs,{strokeDashoffset:0,duration:1.6,stagger:.12,ease:'power2.out'},'<.3');
    const loops=[gsap.to('.pull',{x:-5,y:3,duration:2.2,ease:'sine.inOut',repeat:-1,yoyo:true,paused:true}),
      ...strs.map((s,i)=>gsap.to(s,{rotation:(i%2?1:-1)*(.5+i*.15),svgOrigin:PIVOT,duration:2.6+i*.4,ease:'sine.inOut',repeat:-1,yoyo:true,paused:true}))];
    const st=ScrollTrigger.create({trigger:sc,onToggle:s=>loops.forEach(t=>s.isActive?t.play():t.pause())});
    const mv=e=>{const b=sc.getBoundingClientRect();gsap.to('.react',{rotation:((e.clientX-b.left)/b.width-.5)*3,svgOrigin:PIVOT,duration:.9,ease:'power3.out',overwrite:true})};
    sc.addEventListener('pointermove',mv);
    return()=>{sc.removeEventListener('pointermove',mv);st.kill();loops.forEach(t=>t.kill())};
  },{scope:root,dependencies:[live],revertOnUpdate:true});

  useEffect(()=>{ // dialog: focus, Escape, Tab trap, scroll lock, restore focus
    if(!open)return;
    const prev=document.activeElement,body=document.body.style.overflow;
    document.body.style.overflow='hidden';
    const t=setTimeout(()=>closeBtn.current?.focus(),50);
    const key=e=>{
      if(e.key==='Escape')setOpen(false);
      if(e.key==='Tab'&&panel.current){
        const f=[...panel.current.querySelectorAll('a[href],button:not([disabled])')];if(!f.length)return;
        const a=f[0],z=f[f.length-1];
        if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}
        else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}
      }};
    document.addEventListener('keydown',key);
    return()=>{clearTimeout(t);document.removeEventListener('keydown',key);document.body.style.overflow=body;setTimeout(()=>(btn.current||prev)?.focus(),60)};
  },[open]);

  const tilt=e=>{if(calm)return;const b=e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX-b.left)/b.width-.5)*14);rx.set(-((e.clientY-b.top)/b.height-.5)*14)};
  const mail=`mailto:${SITE.email}?subject=${encodeURIComponent('Project enquiry')}`;
  return(
  <section id="hire" ref={root} className="hire" aria-labelledby="hire-h">
    <h2 id="hire-h" className="sr">Hire me</h2>
    <div className="scene-clip"><div className="scene">
      <svg viewBox="0 0 1000 620" className="svg" role="img" aria-label="A hand pulling the Let's Collaborate button with thin strings">
        <defs><filter id="sh" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="10" stdDeviation="9" floodColor="#000" floodOpacity=".28"/></filter></defs>
        <g className="react"><g className="pull">
          <g fill="none" stroke="#0b0a09" strokeWidth="1.5" strokeLinecap="round">
            {STRINGS.map((d,i)=><path key={i} className="str" d={d}/>)}
          </g>
          <g className="hand" transform="translate(150 492) rotate(-32)" filter="url(#sh)" strokeLinejoin="round" strokeLinecap="round">
            <path d="M-170 -58 L-6 -52 L-6 52 L-170 64 Z" fill="#0b0a09"/>
            <path d="M-6 -50 C40 -58 90 -60 130 -52 C175 -44 192 -10 180 20 C172 42 150 52 120 56 C80 62 30 64 -6 52 Z" fill="#f7f5f0" stroke="#0b0a09" strokeWidth="2.4"/>
            <path d="M150 -46 C158 -30 156 -10 148 6 M166 -38 C176 -22 172 0 162 14 M-2 -40 C30 -46 70 -48 110 -44" fill="none" stroke="#0b0a09" strokeWidth="1.6"/>
            <path d="M120 -52 C160 -68 208 -58 238 -14 C246 -4 238 6 228 2 C206 -4 184 -8 168 -2 Z" fill="#f7f5f0" stroke="#0b0a09" strokeWidth="2.4"/>
            <path d="M30 56 C80 96 160 92 204 52 C222 36 234 18 240 4 C232 -4 222 2 214 10 C186 40 140 58 100 56 Z" fill="#f7f5f0" stroke="#0b0a09" strokeWidth="2.4"/>
            <path d="M60 -38 C90 -42 120 -42 140 -38 M150 -60 C180 -64 205 -52 222 -30" fill="none" stroke="#fff" strokeWidth="3" opacity=".9"/>
          </g>
        </g></g>
      </svg>
      <div className="cta-wrap">
        {!open&&<motion.button ref={btn} layoutId="cta" className="pill" aria-haspopup="dialog" onClick={()=>setOpen(true)}
          style={{borderRadius:999,rotateX:rx,rotateY:ry}} onPointerMove={tilt} onPointerLeave={()=>{rx.set(0);ry.set(0)}}
          initial="rest" whileHover="hover" whileTap="tap"
          variants={{rest:{y:0,scale:1},hover:{y:-6,scale:1.03},tap:{scale:.97}}} transition={{type:'spring',stiffness:300,damping:22}}>
          <span>LET’S COLLABORATE</span>
          <motion.i className="sweep" aria-hidden variants={{rest:{x:'-140%'},hover:{x:'140%',transition:{duration:.9,ease:'easeInOut'}}}}/>
        </motion.button>}
      </div>
    </div></div>
    <AnimatePresence>{open&&(
      <motion.div className="ov" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={e=>e.target===e.currentTarget&&setOpen(false)}>
        <motion.div ref={panel} layoutId="cta" className="panel" role="dialog" aria-modal="true" aria-labelledby="ct"
          style={{borderRadius:28}} transition={{type:'spring',stiffness:260,damping:30}}>
          <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0,transition:{delay:.28}}} exit={{opacity:0,transition:{duration:.08}}}>
            <button ref={closeBtn} className="x" onClick={()=>setOpen(false)} aria-label="Close contact panel">Close</button>
            <h3 id="ct">Let’s work on something.</h3>
            <ul className="links">
              <li><a href={`mailto:${SITE.email}`}><span className="mono">Email</span>{SITE.email}</a></li>
              <li><a href={SITE.linkedin} target="_blank" rel="noopener noreferrer"><span className="mono">LinkedIn</span>linkedin.com/in/bharatbassi</a></li>
              <li>{SITE.github?<a href={SITE.github} target="_blank" rel="noopener noreferrer"><span className="mono">GitHub</span>{SITE.github.replace(/^https?:\/\//,'')}</a>
                :<span className="ph-link"><span className="mono">GitHub</span>Not set. Add SITE.github in src/config.js</span>}</li>
            </ul>
            <motion.a className="go" href={mail} whileHover={{y:-3}} whileTap={{scale:.97}}>Start a Project</motion.a>
          </motion.div>
        </motion.div>
      </motion.div>)}
    </AnimatePresence>
  </section>);
}
