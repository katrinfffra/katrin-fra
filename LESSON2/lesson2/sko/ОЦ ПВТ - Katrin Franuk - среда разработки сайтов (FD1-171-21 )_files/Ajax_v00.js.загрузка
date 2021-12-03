
/* (C) 2007-2008 Alexey Loktev, loktev (at) tut by */

// !!! глобальная переменная SessionId должна быть установлена снаружи

var LoadingStr="идёт&nbsp;загрузка...<br><br><br>";

function GetParsedString(UnParsedString,Args)
{
  var ParsedString='';
  var UnParsedStringU=UnParsedString.toUpperCase();

  while ( true )
  {
    var ScriptBegI1=UnParsedStringU.indexOf("<SCR"+"IPT");
    if ( ScriptBegI1==-1 )
      break;
    var ScriptBegI1_=UnParsedStringU.indexOf(">",ScriptBegI1+6);
    if ( ScriptBegI1_==-1 )
      break;
    var ExecuteScript=true;
    var ScriptAttrsStr=UnParsedString.substring(ScriptBegI1+7,ScriptBegI1_);
    if ( ScriptAttrsStr!="" )
    {
      var re=new RegExp("SRC[\\s]*=[\\s]*[\'\"]([^\'^\"]+)[\'\"]","i");
      var res=re.exec(ScriptAttrsStr);
      if ( res )
      {
        ExecuteScript=false;
        var LoadingScriptURL=res[1];
      }
    }
    var ScriptBegI2=UnParsedStringU.indexOf("<"+"!--",ScriptBegI1_);
    var ScriptBegI=((ScriptBegI2!=-1)&&(ScriptBegI2<=ScriptBegI1_+5))?(ScriptBegI2+4):(ScriptBegI1_+1);

    var ScriptEndI1=UnParsedStringU.indexOf("</SCR"+"IPT>",ScriptBegI1_);
    if ( ScriptEndI1==-1 )
      break;
    var ScriptEndI2=UnParsedStringU.indexOf("//--"+">",ScriptBegI1_);
    var ScriptEndI=((ScriptEndI2!=-1)&&(ScriptEndI2<ScriptEndI1))?ScriptEndI2:ScriptEndI1;

    ParsedString+=UnParsedString.substring(0,ScriptBegI1);

    var ScriptString='';
    if ( ExecuteScript )
    {
      var ScriptContents=UnParsedString.substring(ScriptBegI,ScriptEndI);
      ScriptContents=ReplaceAllSubstrings(ScriptContents,"document.write","ScriptString+=",true);

      // для акавиты
      ScriptContents=ReplaceAllSubstrings(ScriptContents,"d.write","ScriptString+=",true);
      ScriptContents=ReplaceAllSubstrings(ScriptContents,"w.location.href","w. location.href+'&"+Args+"'",true);

      //alert('evaluating\n'+ScriptContents);
      eval(ScriptContents);
    }
    else
    {
      //alert('loading\n'+LoadingScriptURL);
      var ScriptContents=AjaxLoadText(LoadingScriptURL);
      //alert(ScriptContents);
      ScriptString+="<SCRIPT>"+ScriptContents+"</SCRIPT>";
    }

    UnParsedString=ScriptString+UnParsedString.substring(ScriptEndI1+9);
    UnParsedStringU=ScriptString.toUpperCase()+UnParsedStringU.substring(ScriptEndI1+9);
  }
  ParsedString+=UnParsedString;
//if ( ParsedString!="" )
//  alert(ParsedString);

  return {html:ParsedString};
}

var AjaxLoadHandles=new Array();

function AjaxLoadStateChange()
{
  for ( var FuncNum in AjaxLoadHandles )
  {
    if ( (AjaxLoadHandles[FuncNum].readyState==4) && (!AjaxLoadHandles[FuncNum].Processing) )
    {
      AjaxLoadHandles[FuncNum].Processing=true;
      //AjaxLoadHandles[FuncNum].readyState=-1;
      if ( AjaxLoadHandles[FuncNum].responseText=='' )
      {
        var TargetDivId=AjaxLoadHandles[FuncNum].TargetDivId;
        if ( TargetDivId!='' )
        {
          var Args=AjaxLoadHandles[FuncNum].AjaxArgs;
          var ResponseJS=AjaxLoadHandles[FuncNum].responseJS.php;
//alert("unparsed "+FuncNum+'\n'+ResponseJS);
//alert(FuncNum+" /// "+AjaxLoadHandles[FuncNum].readyState+" /// "+AjaxLoadHandles[FuncNum].responseJS.php+" /// "+AjaxLoadHandles[FuncNum].responseText);
          ResponseJS=GetParsedString(ResponseJS,Args);
//alert("parsed "+FuncNum+'\n'+ResponseJS.html);
          document.getElementById(TargetDivId).innerHTML=ResponseJS.html;
          RemoveAnchorFromTitle();
          //delete AjaxLoadHandles[FuncNum];
        }
      }
      else
        alert(AjaxLoadHandles[FuncNum].responseText);
      delete AjaxLoadHandles[FuncNum];
    }
  }
}

function AjaxLoad(TargetDivId,LoadingStrDivClass,FuncNum,Args)
{
  if ( (TargetDivId!="") && !GetObj(TargetDivId) )
    return;

  if ( LoadingStrDivClass!='' )
  {
    var LoadingStrText='';
    if ( LoadingStrDivClass!="" )
      LoadingStrText+="<div class='"+LoadingStrDivClass+"'>";
    LoadingStrText+=LoadingStr;
    if ( LoadingStrDivClass!="" )
      LoadingStrText+="</div>";
    document.getElementById(TargetDivId).innerHTML=LoadingStrText;
  }

  var CalledURL=AjaxHandlerPage+'?af='+FuncNum+'&'+Args;
  if ( SessionId!="" )
    CalledURL+="&sid="+SessionId;

  AjaxLoadHandles[FuncNum]=new JsHttpRequest();
  AjaxLoadHandles[FuncNum].TargetDivId=TargetDivId;
  AjaxLoadHandles[FuncNum].AjaxArgs=Args;
  AjaxLoadHandles[FuncNum].onreadystatechange=AjaxLoadStateChange;
  AjaxLoadHandles[FuncNum].open(null,CalledURL,!isOpera);
  AjaxLoadHandles[FuncNum].send( { } );
}

function Ajax_LoadToDiv(TargetDivId,LoadingStrDivClass,FuncNum,ArgsH)
{
  if ( (TargetDivId!="") && !GetObj(TargetDivId) )
    return;

  if ( LoadingStrDivClass!='' )
  {
    var LoadingStrText='';
    if ( LoadingStrDivClass!="" )
      LoadingStrText+="<div class='"+LoadingStrDivClass+"'>";
    LoadingStrText+=LoadingStr;
    if ( LoadingStrDivClass!="" )
      LoadingStrText+="</div>";
    document.getElementById(TargetDivId).innerHTML=LoadingStrText;
  }

  if ( SessionId!="" )
    ArgsH['sid']=SessionId;

  AjaxLoadHandles[FuncNum]=new JsHttpRequest();
  var AjaxLoadHandle=AjaxLoadHandles[FuncNum];
  AjaxLoadHandle.TargetDivId=TargetDivId;
  AjaxLoadHandle.AjaxArgs=HashToURL(ArgsH);
  AjaxLoadHandle.onreadystatechange=AjaxLoadStateChange;
  AjaxLoadHandle.open(null,AjaxHandlerPage+'?af='+FuncNum,!isOpera);
  AjaxLoadHandle.send(ArgsH);
}

function LoadJS(id,href)
{
  with ( document )
  {
    var span = createElement('SPAN');
    span.id=id;
    span.style.display = 'none';
    body.insertBefore(span, body.lastChild);
    //span.innerHTML = '<br>Text for stupid IE.'+id+'<s'+'cript></' + 'script>';
    setTimeout(function()
    {
      s=createElement('SCRIPT');
      s.language = 'JavaScript';
      if (s.setAttribute) s.setAttribute('src', href); else s.src = href;
      span.insertBefore(s,span.lastChild);
    },10);
  }
}

/*
// не работает в Chrome - создаётся мёртвый script
function LoadJS2(id,href)
{
  with ( document )
  {
    var span = createElement('SPAN');
    span.id=id;
    span.style.display = 'none';
    body.insertBefore(span, body.lastChild);
    span.innerHTML = '<br>Text for stupid IE.'+id+'<s'+'cript></' + 'script>';
    setTimeout(function()
    {
      var s = span.getElementsByTagName('script')[0];
alert(id+' '+href+' '+s.setAttribute);
      s.language = 'JavaScript';
      //if (s.setAttribute) s.setAttribute('language', 'JavaScript'); else s.language = 'JavaScript';
      if (s.setAttribute) s.setAttribute('src', href); else s.src = href;
    }, 10);
    //this._id = id;
    //this._span = span;
  }
}
*/

function AjaxLoadText(URL)
{
  var ResultText='';

  var request;
  try
  {
    request=new XMLHttpRequest();
  }
  catch(e)
  {
    try
    {
      request=new ActiveXObject('Msxml2.XMLHTTP');
    }
    catch(e)
    {
      try
      {
        request=new ActiveXObject('Microsoft.XMLHTTP');
      }
      catch(e)
      {
      }
    }
  }

  if ( request )
  {
    try
    {
      request.open('GET',URL,false);
    }
    catch(e)
    {
      request=null;
    }
    //request.setRequestHeader('Content-Type','text/plain; charset=UTF-8');
    //request.overrideMimeType('text/xml; charset=windows-1251');
    //request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    //request.setRequestHeader("Accept-Charset", "windows-1251");
    //request.setRequestHeader('Content-Type', 'application/octet-stream');
    if ( request )
    {
      request.send(null);
      if ( request.status==200 )
        ResultText=request.responseText;
    }
  }

  return ResultText;
}

/*
function AJAX_TEST1()
{
//  LoadJS('asdasdasd','__/test222.js');
//return;
  with ( document )
  {
    var span = createElement('SPAN');
    var href='__/test222.js';
    span.id='TESTDIV';
//    span.style.display = 'none';
    body.insertBefore(span, body.lastChild);
    span.innerHTML = '<br>Text for stupid IE.<s'+'cript></' + 'script>';
    setTimeout(function()
    {
      var s = span.getElementsByTagName('script')[0];
      s.language = 'JavaScript';
      if (s.setAttribute) s.setAttribute('src', href); else s.src = href;
    }, 10);
  }
}

function AJAX_TEST2()
{
  DivObj=GetObj('TESTDIV');
  var s = DivObj.getElementsByTagName('script')[0];
  alert(GetObjectProps(s.childNodes));
}
*/
