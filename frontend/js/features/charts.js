/* ═══════════════════════════════════════════════
   CHARTS (Chart.js)
═══════════════════════════════════════════════ */
let lineInst,doughInst;
function initCharts(){
  // Destroy previous
  if(lineInst){lineInst.destroy();lineInst=null}
  if(doughInst){doughInst.destroy();doughInst=null}

  const gridColor='rgba(18,32,46,0.06)';
  const tickColor='#9BA0AE';
  const font={size:11,family:"'Plus Jakarta Sans',sans-serif"};

  // Line chart
  const lc=document.getElementById('lineChart');
  if(lc){
    lineInst=new Chart(lc,{
      type:'line',
      data:{
        labels:['Jan','Feb','Mar','Apr','May','Jun'],
        datasets:[
          {label:'Applied',data:[4,6,9,12,10,14],borderColor:'#1E3A5F',backgroundColor:'rgba(30,58,95,0.07)',fill:true,tension:.42,borderWidth:2.5,pointRadius:4,pointHoverRadius:6,pointBackgroundColor:'#1E3A5F'},
          {label:'Interviews',data:[1,2,3,5,4,7],borderColor:'#E8A838',backgroundColor:'rgba(232,168,56,0.08)',fill:true,tension:.42,borderWidth:2.5,pointRadius:4,pointHoverRadius:6,pointBackgroundColor:'#E8A838'}
        ]
      },
      options:{
        responsive:true,
        plugins:{legend:{display:false},tooltip:{backgroundColor:'#16181D',borderColor:'rgba(18,32,46,0.1)',borderWidth:1,titleFont:{...font,weight:'600'},bodyFont:font,padding:10,cornerRadius:8}},
        scales:{
          x:{grid:{color:gridColor},ticks:{color:tickColor,font}},
          y:{grid:{color:gridColor},ticks:{color:tickColor,font},beginAtZero:true}
        },
        elements:{line:{capBezierPoints:true}}
      }
    });
  }

  // Doughnut chart
  const counts={};
  COLS.forEach(c=>{counts[c.id]=jobs.filter(j=>j.status===c.id).length});
  const dc=document.getElementById('doughnutChart');
  if(dc){
    doughInst=new Chart(dc,{
      type:'doughnut',
      data:{
        labels:COLS.map(c=>c.label),
        datasets:[{
          data:COLS.map(c=>counts[c.id]||0),
          backgroundColor:COLS.map(c=>c.color+'22'),
          borderColor:COLS.map(c=>c.color),
          borderWidth:2,hoverOffset:6
        }]
      },
      options:{
        responsive:true,cutout:'68%',
        plugins:{
          legend:{position:'right',labels:{color:'#5A6272',font,boxWidth:11,padding:10}},
          tooltip:{backgroundColor:'#16181D',borderColor:'rgba(18,32,46,0.1)',borderWidth:1,titleFont:{...font,weight:'600'},bodyFont:font,padding:10,cornerRadius:8}
        }
      }
    });
  }
}
