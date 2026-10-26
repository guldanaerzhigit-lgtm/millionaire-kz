import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const questions = [
 {q:'Столица Казахстана?',a:['Алматы','Астана','Шымкент','Караганда'],correct:1},
 {q:'Сколько дней в високосном году?',a:['364','365','366','367'],correct:2},
 {q:'Какая планета известна как Красная планета?',a:['Венера','Марс','Юпитер','Меркурий'],correct:1},
 {q:'Сколько будет 12 × 8?',a:['86','92','96','108'],correct:2},
 {q:'Какой океан самый большой?',a:['Атлантический','Индийский','Северный Ледовитый','Тихий'],correct:3},
 {q:'Как называется национальная валюта Казахстана?',a:['Сом','Тенге','Рубль','Манат'],correct:1},
 {q:'Сколько сторон у шестиугольника?',a:['5','6','7','8'],correct:1},
 {q:'Какой газ необходим человеку для дыхания?',a:['Азот','Углекислый газ','Кислород','Водород'],correct:2},
 {q:'Кто написал роман «Путь Абая»?',a:['Мухтар Ауэзов','Абай Кунанбаев','Сакен Сейфуллин','Ильяс Есенберлин'],correct:0},
 {q:'Как называется процесс превращения воды в пар?',a:['Замерзание','Конденсация','Испарение','Плавление'],correct:2},
 {q:'Сколько минут в трёх часах?',a:['120','150','180','210'],correct:2},
 {q:'Какой материк самый большой?',a:['Африка','Евразия','Северная Америка','Антарктида'],correct:1},
 {q:'Какой орган перекачивает кровь?',a:['Лёгкие','Печень','Сердце','Почки'],correct:2},
 {q:'Какое число является простым?',a:['21','27','29','33'],correct:2},
 {q:'В каком году Казахстан провозгласил независимость?',a:['1989','1990','1991','1992'],correct:2}
];
const prizes = ['1 000 ₸','2 000 ₸','5 000 ₸','10 000 ₸','20 000 ₸','40 000 ₸','80 000 ₸','125 000 ₸','250 000 ₸','500 000 ₸','1 000 000 ₸'];
function App(){
 const [lang,setLang]=useState('ru'), [index,setIndex]=useState(0), [selected,setSelected]=useState(null), [done,setDone]=useState(false), [lifelines,setLifelines]=useState({half:true,skip:true}), [hidden,setHidden]=useState([]);
 const kk=lang==='kk';
 const q=questions[index];
 const ladder=[...prizes].reverse();
 function choose(i){if(selected!==null||done)return;setSelected(i);setTimeout(()=>{if(i===q.correct){if(index===questions.length-1)setDone(true);else{setIndex(v=>v+1);setSelected(null);setHidden([])}}else setDone(true)},850)}
 function restart(){setIndex(0);setSelected(null);setDone(false);setHidden([]);setLifelines({half:true,skip:true})}
 function half(){if(!lifelines.half||selected!==null)return;const wrong=q.a.map((_,i)=>i).filter(i=>i!==q.correct).slice(0,2);setHidden(wrong);setLifelines(v=>({...v,half:false}))}
 function skip(){if(!lifelines.skip||selected!==null)return;if(index===questions.length-1){setDone(true);return}setIndex(v=>v+1);setSelected(null);setHidden([]);setLifelines(v=>({...v,skip:false}))}
 const earned=index===0? '0 ₸':prizes[Math.min(index-1,prizes.length-1)];
 return <main className="app"><header><div className="brand"><span className="logo">₸</span><div><h1>Millionaire <em>KZ</em></h1><p>{kk?'Біліміңді сына — миллион ұтып ал!':'Проверь знания — дойди до миллиона!'}</p></div></div><button className="lang" onClick={()=>setLang(kk?'ru':'kk')}>{kk?'ҚАЗ':'РУС'}</button></header>
 <section className="layout"><div className="game"><div className="eyebrow">{kk?'БІЛІМ ШОУЫ':'ИГРА НА ЗНАНИЯ'}</div><h2>{done?(kk?'Ойын аяқталды':'Игра завершена'):(kk?'15 сұрақ. Бір миллион.':'15 вопросов. Один миллион.')}</h2><div className="progress"><span style={{width:done?'100%':((index+1)/questions.length*100)+'%'}}/></div>
 {done?<div className="result"><div className="trophy">🏆</div><h3>{selected!==null&&selected===q.correct||index===questions.length-1?'Поздравляем!':'Хорошая попытка!'}</h3><p>{kk?'Сенің нәтижелерің':'Ваш выигрыш'}: <strong>{index===questions.length-1&&selected===q.correct?'1 000 000 ₸':earned}</strong></p><button className="primary" onClick={restart}>{kk?'Қайта ойнау':'Играть снова'}</button></div>:<><div className="question-top"><span>{kk?'СҰРАҚ':'ВОПРОС'} {index+1} / {questions.length}</span><span className="timer">⏱ 30</span></div><h3 className="question">{q.q}</h3><div className="answers">{q.a.map((a,i)=><button key={a} disabled={selected!==null||hidden.includes(i)} className={'answer '+(selected===i?(i===q.correct?'correct':'wrong'):'')} onClick={()=>choose(i)}><b>{String.fromCharCode(65+i)}</b>{hidden.includes(i)?'':a}</button>)}</div><div className="lifelines"><button disabled={!lifelines.half} onClick={half}>½ <span>{kk?'50:50':'50:50'}</span></button><button disabled={!lifelines.skip} onClick={skip}>⏭ <span>{kk?'Өткізу':'Пропуск'}</span></button><button onClick={()=>alert(kk?'Дұрыс жауапты өзің таңда!':'Доверься своим знаниям!')}>☎ <span>{kk?'Көмек':'Подсказка'}</span></button></div></>}
 </div><aside className="ladder"><div className="ladder-title">🏆 {kk?'ЖҮЛДЕ ҚОРЫ':'ПРИЗОВАЯ ЛЕСТНИЦА'}</div>{ladder.map((p,i)=><div key={p} className={'step '+(prizes.length-1-i===index?'active':'')+(i>=prizes.length-3?' safe':'')}><span>{String(prizes.length-i).padStart(2,'0')}</span><b>{p}</b></div>)}</aside></section><footer><span>© 2026 Millionaire KZ</span><span>{kk?'Оқу-ойын жобасы':'Образовательная игра'}</span></footer></main>
}
createRoot(document.getElementById('root')).render(<App/>);