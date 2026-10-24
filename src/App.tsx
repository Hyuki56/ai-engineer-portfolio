import { useEffect, useState } from 'react'

type Project = {
  id: 'pj1' | 'pj2'; no: string; title: string; type: string; summary: string
  problem: string; flow: string[]; stack: string[]; features: [string, string][]
  challenges: [string, string, string][]; limits: string[]; next: string[]
}
const projects: Project[] = [
  {
    id:'pj1', no:'01', title:'Codebase AI Assistant', type:'LLM · RAG · DEVELOPER TOOLING',
    summary:'Python 저장소를 색인하고 질문과 관련된 코드 조각을 검색해 출처가 있는 답변을 제공하는 코드 질의응답 서비스입니다.',
    problem:'코드가 여러 파일과 함수에 분산되어 있으면 동작의 위치와 흐름을 찾기 어렵습니다. 저장소 전체를 LLM에 전달하는 방식은 입력 문맥과 근거 추적에 제약이 있습니다.',
    flow:['Python 저장소','수집 · AST 청킹','임베딩','ChromaDB','코드 검색','Ollama 답변','FastAPI'],
    stack:['Python','FastAPI','ChromaDB','Ollama','nomic-embed-text','qwen2.5-coder:7b'],
    features:[['AST 기반 청킹과 안전한 분할','모듈 최상위 클래스·함수를 AST로 추출하고, 1,500자를 넘는 코드는 줄바꿈 경계로 나눕니다. AST 파싱 실패 시 모듈 텍스트 분할로 처리합니다.'],['검색 출처 보존','각 청크에 파일 경로·청크 유형·심볼 이름을 저장하고, 검색 결과의 경로를 답변 응답에 포함합니다.'],['인덱싱과 질의 분리','POST /api/index가 저장소를 읽어 청크를 임베딩하고, POST /api/ask가 질문 임베딩·검색·문맥 구성·생성을 순서대로 수행합니다.'],['로컬 모델 연동','Ollama의 nomic-embed-text와 qwen2.5-coder:7b를 연결하고 ChromaDB를 검색 저장소로 사용합니다.']],
    challenges:[['긴 코드 조각','큰 함수와 클래스가 모델 입력 문맥을 과도하게 차지할 수 있었습니다.','1,500자 기준으로 안전 분할하고 AST 파싱 실패 파일은 텍스트 단위로 처리했습니다.'],['답변 근거 추적','응답만 반환하면 근거가 된 파일을 찾기 어려웠습니다.','파일 경로와 구조 정보를 보존하고 응답 데이터에 출처 경로를 포함했습니다.']],
    limits:['AST 청킹은 모듈 최상위 클래스·함수 중심이며, 클래스 내부 메서드 관계를 별도 그래프로 모델링하지 않습니다.','저장소를 다시 색인할 때 기존 ChromaDB 데이터를 초기화하는 전체 재색인 방식입니다.','검색 품질과 답변 정확도를 수치로 평가한 결과는 확인되지 않았습니다.'],
    next:['언어·저장소별 검색 평가','증분 색인과 변경 추적','검색 결과 재정렬과 근거 표시 개선']
  },
  {
    id:'pj2', no:'02', title:'AI Smart Surveillance Platform', type:'COMPUTER VISION · API · FULL-STACK',
    summary:'영상 속 사람을 탐지·추적해 제한 구역의 진입과 이탈을 판별하고, 이벤트와 스냅샷을 대시보드에 전달하는 영상 분석 시스템입니다.',
    problem:'사람 탐지에 그치지 않고 제한 구역 진입을 판단하고 상황을 기록·확인할 수 있도록 추적, 이벤트, API, 웹 화면을 연결해야 했습니다.',
    flow:['영상 입력','YOLO11 탐지','ByteTrack 추적','발 위치 · Polygon','ENTER / EXIT','SQLite · 스냅샷','FastAPI · MJPEG','React UI'],
    stack:['Python','YOLO11','OpenCV','ByteTrack','FastAPI','React','TypeScript','SQLite'],
    features:[['탐지 결과 정제와 추적','YOLO11에서 사람 클래스 결과를 얻고, 중복 박스를 IoU·포함률 기준으로 걸러 ByteTrack에 전달합니다.'],['발 위치 기준 구역 판정','바운딩 박스 하단 중앙을 foot point로 사용하고 OpenCV pointPolygonTest로 고정 Polygon 안팎을 판별합니다.'],['ID별 상태 전이 이벤트','tracker ID별 이전 구역 상태를 비교해 OUTSIDE→INSIDE에서 ENTER, INSIDE→OUTSIDE에서 EXIT를 생성합니다. ENTER 때 시각·스냅샷·DB 레코드를 만들고 EXIT 때 체류 시간을 업데이트합니다.'],['대시보드 스트리밍 API','FastAPI가 시작·중지·상태·이벤트·스냅샷 API와 최신 프레임 기반 MJPEG 스트림을 제공하며 React 화면과 연결됩니다.']],
    challenges:[['구역 경계 판정','박스 중심은 사람의 바닥 접점을 나타내지 않아 경계 판정에 적절하지 않을 수 있습니다.','검출 박스 하단 중앙인 foot point를 Polygon 포함 판정에 사용했습니다.'],['이벤트 시점 스냅샷','저장 이미지에 탐지·추적 정보와 구역 상태가 함께 보여야 합니다.','박스·ID·구역을 프레임에 그린 뒤 ENTER 순간 스냅샷을 저장합니다.']],
    limits:['영상 파일 경로와 Polygon 꼭짓점이 코드에 고정되어 있어, 운영 중 설정 변경 UI는 없습니다.','탐지 신뢰도·추적 설정은 코드 상수로 관리되며 환경별 튜닝과 정량 평가가 추가로 필요합니다.','추적 ID 재사용·장시간 상태 정리와 원격 접근 제어는 추가 설계가 필요합니다.'],
    next:['카메라·구역 설정을 UI와 설정 파일로 분리','오탐·미탐을 구분한 데이터셋 평가와 임계값 튜닝','추적 상태 만료 정책, 장시간 안정성 측정, 접근 제어']
  }
]
function Header({route}:{route:string}) {
  return <header className="header"><a className="brand" href="#/"><b>AI</b><span>ENGINEER<br/>PORTFOLIO</span></a><nav><a className={route==='home'?'active':''} href="#/">Overview</a><a className={route==='pj1'?'active':''} href="#/pj1">Codebase AI</a><a className={route==='pj2'?'active':''} href="#/pj2">Surveillance</a><a href="#contact">Contact ↗</a></nav></header>
}
function Footer(){return <footer className="footer"><span>AI ENGINEER PORTFOLIO</span><span>Systems · Evidence · Iteration</span><a href="#top">Back to top ↑</a></footer>}
function Home(){
  const skills:[string,string][]=[['Python','AI pipeline · backend'],['FastAPI','service API'],['RAG · ChromaDB','code retrieval'],['Ollama · LLM','local inference'],['YOLO11 · OpenCV','vision pipeline'],['ByteTrack','object tracking'],['React · TypeScript','web interface'],['SQLite','event records']]
  const steps:[string,string][]=[['01','문제 정의'],['02','시스템 설계'],['03','구현'],['04','검증'],['05','개선']]
  return <>
    <section className="hero wrap" id="top"><div><p className="hero-name">최혁</p><small className="eyebrow">● &nbsp; AI ENGINEER / AI DEVELOPER</small><h1>AI를 실제로<br/><em>작동하는 시스템</em>으로.</h1><p className="lead">AI 모델을 서비스의 일부로 연결하고, 데이터와 API와 사용자 경험이 이어지는 시스템을 만듭니다.</p><div className="actions"><a className="button" href="#projects">프로젝트 살펴보기 ↗</a><a href={`${import.meta.env.BASE_URL}AI_Engineer_Portfolio_KR.pdf`} target="_blank" rel="noreferrer">PDF 포트폴리오 ↗</a></div><small className="hero-meta">PYTHON-FIRST DEVELOPMENT <span>AI · API · PRODUCT</span></small></div><div className="system-card"><div className="sys-head"><span>SYSTEMS IN PRACTICE</span><span>01 — 02</span></div><div className="sys-flow"><div><b>DATA</b><span>code · video</span></div><i>→</i><div className="focus"><b>AI PIPELINE</b><span>retrieve · detect</span></div><i>→</i><div><b>SERVICE</b><span>API · interface</span></div></div><hr/><p>모델의 결과가 사용자에게 도달하기까지<br/>전체 흐름을 연결합니다.</p></div></section>
    <section className="thesis"><div className="wrap thesis-row"><small>01 / APPROACH</small><p>AI의 가능성은 모델에서 시작하지만,<br/><b>신뢰할 수 있는 제품은 시스템에서 완성됩니다.</b></p></div></section>
    <section className="wrap section"><small>02 / ABOUT</small><h2>모델을 서비스의<br/>언어로 연결합니다.</h2><div className="about"><p>Python 기반 AI 프로젝트를 직접 구현하며 추론에서 끝나지 않는 서비스 흐름에 집중합니다. 데이터 처리, 추론, API, 프론트엔드 연결까지 각 구성 요소가 함께 동작하도록 설계하고 확인합니다.</p><div className="principles"><p><b>구조를 먼저 봅니다</b><br/>입력부터 결과까지 데이터 경로를 정리합니다.</p><p><b>근거를 남깁니다</b><br/>검색 출처와 이벤트 상태를 보존합니다.</p><p><b>끝까지 연결합니다</b><br/>모델·백엔드·인터페이스를 함께 확인합니다.</p></div></div></section>
    <section className="band" id="skills"><div className="wrap section"><div className="heading-row"><div><small>03 / SKILLS · PROJECT EXPERIENCE</small><h2>프로젝트에서 사용한 기술</h2></div><p>실제 프로젝트 코드와 구조에서 확인한 항목입니다.</p></div><div className="skills">{skills.map(([a,b],i)=><div className="skill" key={a}><small>0{i+1}</small><b>{a}</b><span>{b}</span></div>)}</div><div className="learning"><small>IMPROVEMENT FOCUS</small><span>검색 품질 평가 · 증분 색인 · 영상 안정성 검증</span></div></div></section>
    <section className="wrap section" id="projects"><div className="heading-row"><div><small>04 / SELECTED WORK</small><h2>기능을 연결해<br/>서비스를 만듭니다.</h2></div><p>AI 추론을 실제 흐름으로 묶은 두 가지 프로젝트입니다.</p></div><div className="projects">{projects.map(p=><a className="project" href={'#/'+p.id} key={p.id}><div className="project-head"><span>PROJECT {p.no}</span><b>↗</b></div><div className="mini-flow">{p.flow.slice(0,3).map((x,i)=><span key={x}>{i?'→ ':''}{x}</span>)}</div><small>{p.type}</small><h3>{p.title}</h3><p>{p.summary}</p><div className="tags">{p.stack.slice(0,4).map(t=><span key={t}>{t}</span>)}</div><div className="project-foot">CASE STUDY <b>상세 보기 →</b></div></a>)}</div></section>
    <section className="band"><div className="wrap section"><small>05 / DEVELOPMENT APPROACH</small><h2>문제 정의 → 설계 → 구현 → 검증 → 개선</h2><div className="steps">{steps.map(s=><div key={s[0]}><small>{s[0]}</small><b>{s[1]}</b></div>)}</div></div></section>
    <section className="wrap section contact" id="contact"><div><small>06 / CONTACT</small><h2>함께 만들고 싶은<br/>문제가 있다면.</h2><p>프로젝트와 AI 시스템 엔지니어링에 대해 이야기 나눠요.</p></div><div className="contact-list"><a href="mailto:soundaim56@gmail.com"><span>EMAIL</span><b>soundaim56@gmail.com ↗</b></a><a href="https://github.com/Hyuki56" target="_blank" rel="noreferrer"><span>GITHUB PROFILE</span><b>github.com/Hyuki56 ↗</b></a></div></section>
  </>
}
function Detail({p}:{p:Project}){
  const repoUrl=p.id==='pj1'?'https://github.com/Hyuki56/codebase-ai-assistant':'https://github.com/Hyuki56/AI-Smart-Surveillance-Platform'
  const pipeline:[string,string,string][]=p.id==='pj1'?[['01','수집','Python 파일과 경로 정보를 읽습니다.'],['02','구조 분할','AST로 클래스·함수를 나누고 긴 조각을 자릅니다.'],['03','색인','임베딩을 생성해 ChromaDB에 저장합니다.'],['04','질의 응답','관련 코드를 검색해 Ollama에 문맥으로 전달합니다.']]:[['01','사람 탐지','YOLO11으로 영상 프레임에서 사람을 찾습니다.'],['02','ID 추적','ByteTrack으로 프레임 간 결과를 연결합니다.'],['03','구역 판정','발 위치와 Polygon을 비교합니다.'],['04','이벤트 처리','ENTER/EXIT를 기록하고 스냅샷을 저장합니다.'],['05','웹 전달','FastAPI와 MJPEG를 React UI에 연결합니다.']]
  return <article className={'detail '+p.id}><section className="wrap detail-hero" id="top"><a className="crumb" href="#/">WORK / PROJECT {p.no}</a><small>{p.type}</small><div className="detail-title"><h1>{p.title}</h1><span>{p.no}</span></div><p className="detail-summary">{p.summary}</p><div className="meta"><div><small>ROLE / SCOPE</small><span>{p.id==='pj1'?'코드 수집 · AST 청킹 · 검색 · API':'탐지 · 추적 · 이벤트 · API · 대시보드'}</span></div><div><small>STATUS</small><span>개인 프로젝트 · 코드 구조 확인</span></div></div></section>
    <section className="band"><div className="wrap section"><small>01 / PROBLEM</small><h2>왜 만들었는가</h2><div className="problem"><p>{p.problem}</p><b>{p.id==='pj1'?'코드의 위치와 맥락을 질문으로 찾을 수 있을까?':'프레임 탐지를 검토 가능한 이벤트로 바꿀 수 있을까?'}</b></div></div></section>
    <section className="wrap section"><small>02 / ARCHITECTURE</small><h2>시스템 흐름</h2><p className="muted">데이터가 각 단계에서 처리되는 경로입니다.</p><div className="flow">{p.flow.map((x,i)=><span key={x}><small>0{i+1}</small> {x}{i<p.flow.length-1?' →':''}</span>)}</div></section>
    <section className="band"><div className="wrap section"><small>03 / PIPELINE</small><h2>{p.id==='pj1'?'RAG 처리 파이프라인':'영상 분석 파이프라인'}</h2><div className="pipeline">{pipeline.map(([n,t,d])=><div key={n}><small>{n}</small><section><b>{t}</b><span>{d}</span></section></div>)}</div></div></section>
    <section className="wrap section"><small>04 / ENGINEERING NOTES</small><h2>핵심 구현과 기술 스택</h2><div className="feature-grid">{p.features.map((f,i)=><div key={f[0]}><small>0{i+1}</small><h3>{f[0]}</h3><p>{f[1]}</p></div>)}</div><div className="tags stack">{p.stack.map(t=><span key={t}>{t}</span>)}</div></section>
    <section className="band"><div className="wrap section"><small>05 / PROBLEM SOLVING</small><h2>문제와 대응</h2>{p.challenges.map((c,i)=><div className="challenge" key={c[0]}><b>0{i+1} / {c[0]}</b><p>{c[1]}<br/><strong>대응: </strong>{c[2]}</p></div>)}</div></section>
    <section className="wrap section"><small>06 / IN THE INTERFACE</small><h2>실행 화면</h2><p className="muted">{p.id==='pj2'?'실제 감지 파이프라인이 저장한 침입 프레임입니다.':'Codebase AI Assistant가 PJ2 감시 프로젝트를 색인한 뒤 질문에 답한 실제 화면입니다. 답변과 검색 출처를 확인할 수 있으며, PJ1 자체 저장소를 색인한 화면은 아닙니다.'}</p>{p.id==='pj2'?<figure className="screenshot actual"><img src={`${import.meta.env.BASE_URL}images/surveillance-intrusion.jpg`} alt="YOLO 탐지 박스, ByteTrack ID, 제한구역 Polygon과 침입 상태가 표시된 실제 감지 프레임"/><figcaption>실제 감지 스냅샷 · 사람 탐지 박스와 tracker ID, 제한구역 및 침입 상태 표시</figcaption></figure>:<div className="rag-gallery"><figure className="screenshot rag-screen"><img src={`${import.meta.env.BASE_URL}images/codebase-ai-index.png`} alt="Codebase AI Assistant가 AI Smart Surveillance Platform 저장소를 색인한 화면. Python 파일 12개와 코드 청크 35개가 표시됨"/><figcaption>저장소 색인 결과 · AI-Smart-Surveillance-Platform · Python 파일 12개 · 코드 청크 35개</figcaption></figure><figure className="screenshot rag-screen"><img src={`${import.meta.env.BASE_URL}images/codebase-ai-answer.png`} alt="감시 프로젝트 질문에 답하고 person_detection.py와 surveillance_service.py를 출처로 표시한 RAG 응답 화면"/><figcaption>질의 응답 결과 · 답변에 person_detection.py와 surveillance_service.py의 상대 경로를 출처로 표시</figcaption></figure></div>}</section>
    <section className="band"><div className="wrap section limits"><div><small>07 / CURRENT LIMITS</small><h2>현재 한계</h2>{p.limits.map(x=><p key={x}>{x}</p>)}</div><div><small>NEXT / ITERATION</small><h2>개선 방향</h2>{p.next.map(x=><p key={x}>{x}</p>)}</div></div></section>
    <section className="wrap section repo"><small>GITHUB REPOSITORY</small><h2>프로젝트 코드와 문서</h2><p>실제 구현 코드와 프로젝트 문서를 확인할 수 있습니다.</p><a className="repo-link" href={repoUrl} target="_blank" rel="noreferrer">{repoUrl.replace('https://github.com/','github.com/')} ↗</a></section></article>
}
export default function App(){
  const [route,setRoute]=useState(window.location.hash.replace(/^#\/?/,'')||'home')
  useEffect(()=>{const change=()=>{const next=window.location.hash.replace(/^#\/?/,'')||'home';setRoute(next);window.scrollTo(0,0);if(next==='contact')requestAnimationFrame(()=>requestAnimationFrame(()=>document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})))};window.addEventListener('hashchange',change);return()=>window.removeEventListener('hashchange',change)},[])
  const p=projects.find(x=>x.id===route)
  return <><Header route={route}/><main>{p?<Detail p={p}/>:<Home/>}</main><Footer/></>
}


