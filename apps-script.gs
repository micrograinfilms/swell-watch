// Swell Watch session log — Google Apps Script
// 1. Create a Google Sheet. Rename the first tab "log".
// 2. Extensions → Apps Script. Replace the contents with this file. Save.
// 3. Deploy → New deployment → Type: Web app. Execute as: Me. Who has access: Anyone. Deploy.
// 4. Copy the Web app URL into SHEET_URL at the top of index.html.
const SHEET='log';
const COLS=['id','t','spot','who','face','q','wind','note','snap'];
function sheet_(){const ss=SpreadsheetApp.getActiveSpreadsheet();let sh=ss.getSheetByName(SHEET);if(!sh){sh=ss.insertSheet(SHEET);}if(sh.getLastRow()===0)sh.appendRow(COLS);return sh;}
function out_(o){return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);}
function doGet(e){
  const sh=sheet_();const vals=sh.getDataRange().getValues();const rows=[];
  for(let i=1;i<vals.length;i++){const r=vals[i];if(!r[0])continue;
    rows.push({id:String(r[0]),t:String(r[1]),spot:r[2],who:r[3],face:Number(r[4]),q:Number(r[5]),wind:r[6],note:r[7],snap:r[8]?JSON.parse(r[8]):null});}
  return out_({ok:true,rows});
}
function doPost(e){
  const body=JSON.parse(e.postData.contents||'{}');const sh=sheet_();
  if(body.action==='add'&&body.entry){const x=body.entry;
    sh.appendRow([String(x.id),x.t,x.spot,x.who||'',x.face,x.q,x.wind||'',x.note||'',x.snap?JSON.stringify(x.snap):'']);return out_({ok:true});}
  if(body.action==='delete'&&body.id){const vals=sh.getDataRange().getValues();
    for(let i=vals.length-1;i>=1;i--){if(String(vals[i][0])===String(body.id))sh.deleteRow(i+1);}return out_({ok:true});}
  return out_({ok:false,error:'unknown action'});
}
