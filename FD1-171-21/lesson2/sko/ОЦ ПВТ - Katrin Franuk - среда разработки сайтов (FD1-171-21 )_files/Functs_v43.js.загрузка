
/* (C) 2005-2014 Alexey Loktev, loktev (at) tut by */

isDOM=document.getElementById; //DOM1 browser (MSIE 5+, Netscape 6, Opera 5+)
isOpera=isOpera5p=( window.opera && isDOM ) ? true : false;
//isOpera6p=( isOpera && window.print ) ? true : false;
//isOpera7p=( isOpera && document.readyState ) ? true : false;
isMSIE=isMSIE4p=( document.all && document.all.item && !isOpera ) ? true : false;
//isMSIE5p=isDOM && isMSIE;
//isNetscape3=( document.images && !document.layers && !document.all && !document.getElementById ) ? true : false;
//isNetscape4=( document.layers ) ? true : false;
//isNetscape6pOrMozilla=( isDOM && navigator.appName=="Netscape" && document.images ) ? true : false;

//BrowserOperaVersion=isOpera7p?7:(isOpera6p?6:(isOpera5p?5:0));
//BrowserMSIEVersion=isMSIE5p?5:(isMSIE4p?4:0);
//BrowserNetscapeVersion=isNetscape6pOrMozilla?6:(isNetscape4?4:(isNetscape3?3:0));

var clientPC = navigator.userAgent.toLowerCase();  
var is_nav = ((clientPC.indexOf('mozilla')!=-1) && (clientPC.indexOf('spoofer')==-1) 
                && (clientPC.indexOf('compatible') == -1) && (clientPC.indexOf('opera')==-1) 
                && (clientPC.indexOf('webtv')==-1) && (clientPC.indexOf('hotjava')==-1)); 

var CaretPosObj=null;
var CaretPosStr=null;

var MonthNamesPI=["€нварь","февраль","март","апрель","май","июнь","июль","август","сент€брь","окт€брь","но€брь","декабрь"];
var MonthNamesPR=["€нвар€","феврал€","марта","апрел€","ма€","июн€","июл€","августа","сент€бр€","окт€бр€","но€бр€","декабр€"];

var UnixTimeStamp0=Date.UTC(1970,0,1,0,0,0);

var EmptyArray=[];

var PreloadedImagesH={};

var WindowOnLoadHandlersA=[];

function IA()
{
  this.length=IA.arguments.length;
  for ( var i=0; i<this.length; i++ )
    this[i]=IA.arguments[i];
}

var ar_chr=new Array();

for ( var i=1; i<=255; i++)
  ar_chr[i]=unescape('%' + i.toString(16));
	    
function ar_C2ASCII(c)
{
  for (var i=1;i<=255;i++)
  {
    if (ar_chr[i] == c)
      return i;
  }
  return c;
}

function urlencode(text)
{
  if ( !text )
    return "";
//  return encodeURI(text);

  var RusSyms="јЅ¬√ƒ≈®∆«»… ЋћЌќѕ–—“”‘’÷„ЎўЏџ№ЁёяабвгдеЄжзийклмнопрстуфхцчшщъыьэю€є";
  var URLSyms="%C0%C1%C2%C3%C4%C5%A8%C6%C7%C8%C9%CA%CB%CC%CD%CE%CF%D0%D1%D2%D3%D4%D5%D6%D7%D8%D9%DA%DB%DC%DD%DE%DF%E0%E1%E2%E3%E4%E5%B8%E6%E7%E8%E9%EA%EB%EC%ED%EE%EF%F0%F1%F2%F3%F4%F5%F6%F7%F8%F9%FA%FB%FC%FD%FE%FF%B9";

  
  var tmp = '';
  var n, i;
  for ( i=0; i<text.length; i++)
  {
    var c=text.charAt(i);
    if ( c==unescape('%0D') )
      tmp+='%0D';
    else
      if ( c==unescape('%0A') )
        tmp+='%0A';
      else
      {
        var RusSymI=RusSyms.indexOf(c);
        if ( RusSymI!=-1 )
        {
          tmp+=URLSyms.substring(RusSymI*3,(RusSymI+1)*3);
        }
        else
        {
          n=ar_C2ASCII(c);
          if (n<=38 || (n>=58 && n<=64) || (n>=122 && n<=191))
            tmp += '%' + n.toString(16)
          else
            tmp += text.charAt(i);
        }
      }
  }
  return tmp;
  
}

function GetObj(name)
{
  if ( document.images )
  {
    var ImageObj=document.images[name];
    if ( ImageObj )
      return ImageObj;
  }
  if ( document.getElementById )
    return document.getElementById(name);
  else if ( document.all )
    return document.all[name];
  else if (document.layers)
    return GetObjNN4(document,name);
  return NULL;
}

function GetObjNN4(obj,name)
{
  var x=obj.layers;
  var foundLayer;
  for ( var i=0; i<x.length; i++ )
  {
    if ( x[i].id==name )
      foundLayer=x[i];
    else if ( x[i].layers.length )
      var tmp = getObjNN4(x[i],name);
    if ( tmp )
      foundLayer=tmp;
  }
  return foundLayer;
}

function GetProp(el,sProp)
{
  var iPos=0;
  while ( el!=null )
  {
    iPos+=el["offset"+sProp];
    el=el.offsetParent;
  }
  return iPos;
}

function GetPropRel(el,sProp,ContObj)
{
  var iPos=0;
  while ( el && (el!=ContObj) )
  {
    iPos+=el["offset"+sProp];
    el=el.parentNode; //offsetParent;
  }
  return iPos;
}

function IsImageLoaded(ImageName)
{
  var Res=true;

  ImageObject=GetObj(ImageName);
  if ( !ImageObject.complete )
    Res=false;
  else
    if ( (typeof ImageObject.naturalWidth != "undefined") && (ImageObject.naturalWidth==0) )
      Res=false;

  return Res;
}

function NonBreakBlanks(S)
{
  var Res='';
  for ( var i=0; i<S.length; i++ )
  {
    var c=S.charAt(i);
    if ( c==' ' )
      Res+="&nbsp;";
    else
      Res+=c;
  }
  return Res;
}

function nl2br(S)
{
  S=ReplaceAllSubstrings(S,"\n","<br>",true);
  S=ReplaceAllSubstrings(S,"\r","",true);
  return S;
}

function br2nl(S)
{
  S=ReplaceAllSubstrings(S,"<br>","\n",false);
  return S;
}

function ReplaceAllSubstrings(S,OldStr,NewStr,CaseSensitive)
{
  S=S+"";
  
  if ( CaseSensitive )
  {
    S=S.split(OldStr).join(NewStr);
    return S;
  }

  var RetS='';
  var SU=S.toUpperCase();
  OldStr=OldStr.toUpperCase();
  while ( true )
  {
    var BrPos=SU.indexOf(OldStr);
    if ( BrPos==-1 )
      return RetS+S;
    RetS+=S.substring(0,BrPos)+NewStr;
    var NextPos=BrPos+OldStr.length;
    S=S.substring(NextPos);
    SU=SU.substring(NextPos);
  }
}

function StringIsInteger(StrVal)
{
  if ( !StrVal.length )
    return false;

  if ( StrVal.charAt(0)=="-" )
    StrVal=StrVal.substring(1,StrVal.length);

  for ( var i=0; i<StrVal.length; i++ )
  {
    var C=StrVal.charAt(i);
    if ( (C<'0') || (C>'9') )
      return false;
  }

  return true;
}

function StrToInt(StrVal)
{
  var Minus=false;
  if ( StrVal.charAt(0)=="-" )
  {
    StrVal=StrVal.substring(1,StrVal.length);
    Minus=true;
  }

  var Value=0;

  for ( var i=0; i<StrVal.length; i++ )
  {
    var C=StrVal.charAt(i);
    Value=Value*10+parseInt(C);
  }

  if ( Minus )
    Value=-Value;

  return Value;
}

function StringIsFloat(StrVal)
{
  if ( StrVal.charAt(0)=="-" )
    StrVal=StrVal.substring(1,StrVal.length);

  if ( !StrVal.length )
    return false;

  var DecPointExist=false;
  for ( var i=0; i<StrVal.length; i++ )
  {
    var C=StrVal.charAt(i);
    if ( C=='.' )
    {
      if ( DecPointExist )
        return false;
      DecPointExist=true;
    }
    else
      if ( (C<'0') || (C>'9') )
        return false;
  }

  return true;
}

function StrToFloat(StrVal)
{
  var Minus=false;
  if ( StrVal.charAt(0)=="-" )
  {
    StrVal=StrVal.substring(1,StrVal.length);
    Minus=true;
  }

  var Value=0;

  var DecMul=0;
  for ( var i=0; i<StrVal.length; i++ )
  {
    var C=StrVal.charAt(i);
    if ( C=='.' )
      DecMul=1;
    else
    {
      Value=Value*10+parseInt(C);
      DecMul*=10;
    }
  }

  if ( DecMul>0 )
    Value/=DecMul;

  if ( Minus )
    Value=-Value;

  return Value;
}

function Str0L(Val,Len)
{
  var StrVal=Val.toString();
  while ( StrVal.length<Len )
    StrVal='0'+StrVal;
  return StrVal;
}

function EncodeStringDateTime(DateTimeArray,FormatString)
{
  // y m d h n s f
  var ResStr='';

  var i=0;
  while ( i<FormatString.length )
  {
    var F=FormatString.charAt(i);
    var ParI="ymdhnsf".indexOf(F);
    if ( ParI==-1 )
    {
      ResStr+=F;
      i++;
    }
    else
    {
      // найдЄм длину
      var Len=0;
      while ( (i<FormatString.length) && (FormatString.charAt(i)==F) )
      {
        Len++;
        i++;
      }
      ResStr+=Str0L(DateTimeArray[ParI],Len);
    }
  }
  return ResStr;
}

function DecodeStringDateTime(StrDateTime,FormatString)
{
  if ( FormatString.length!=StrDateTime.length )
    return false;

  // y m d h n s f

  var YearStr='0';
  var MonthStr='0';
  var DayStr='0';
  var HourStr='0';
  var MinuteStr='0';
  var SecondStr='0';
  var FractionStr='0';

  var DateExists=false;

  for ( var i=0; i<FormatString.length; i++ )
  {
    var F=FormatString.charAt(i);
    var V=StrDateTime.charAt(i);
    if ( F=='y' )
    {
      YearStr+=V;
      DateExists=true;
    }
    else if ( F=='m' )
    {
      MonthStr+=V;
      DateExists=true;
    }
    else if ( F=='d' )
    {
      DayStr+=V;
      DateExists=true;
    }
    else if ( F=='h' )
      HourStr+=V;
    else if ( F=='n' )
      MinuteStr+=V;
    else if ( F=='s' )
      SecondStr+=V;
    else if ( F=='f' )
      FractionStr+=V;
    else if ( F!=V )
      return false;
  }

  if ( !StringIsInteger(YearStr+MonthStr+DayStr+HourStr+MinuteStr+SecondStr+FractionStr) )
    return false;

  var Year=StrToInt(YearStr);
  var Month=StrToInt(MonthStr);
  var Day=StrToInt(DayStr);
  var Hour=StrToInt(HourStr);
  var Minute=StrToInt(MinuteStr);
  var Second=StrToInt(SecondStr);
  var Fraction=StrToInt(FractionStr);

  if ( DateExists )
  {
    var D=new Date(Year,Month-1,Day);
    if ( (D.getYear()!=Year) && (D.getYear()!=Year-1900) )
      return false;
    if ( D.getMonth()!=Month-1 )
      return false;
    if ( D.getDate()!=Day )
      return false;
  }

  if ( (Hour<0) || (Hour>=24) )
    return false;
  if ( (Minute<0) || (Minute>=60) )
    return false;
  if ( (Second<0) || (Second>=60) )
    return false;
  if ( (Fraction<0) || (Fraction>=100) )
    return false;

  return new IA(Year,Month,Day,Hour,Minute,Second,Fraction);
}

function SubmitForm(FormName)
{
  document.forms[FormName].submit();
}

function EmptySafe(str)
{
  if ( str==="" )
    return "&nbsp;";
  return str;
}

function MySQLDateString(DateTimeS, H1M2S3)
{
  if ( DateTimeS=="" )
    return "";
  var DTS=DateTimeS.substring(8,10)+"."+DateTimeS.substring(5,7)+"."+DateTimeS.substring(2,4);
  // H1M2S3: 0 - 10   1 - 13   2 - 16   3 - 19
  DTS+=" "+DateTimeS.substring(11,10+H1M2S3*3);
  return DTS;
}

function OrdDateString(DateTimeS)
{
  if ( DateTimeS=="" )
    return "";
  var DTS=DateTimeS.substring(6,10)+"-"+DateTimeS.substring(3,5)+"-"+DateTimeS.substring(0,2)+DateTimeS.substring(10);
  return DTS;
}

function ShowSWFH(SWFFileNamePattern,VersionsArray,BackFileName,Args,FileWidth,FileHeight,BgColor,HintText,MovieName)
{
  if ( MovieName==undefined )
    MovieName="movie";
  
  var UseVersion=0;
  var PlayerVerMaj=GetFlashVer()[0];
  for ( var v=VersionsArray.length-1; v>=0; v-- )
  {
    var Version=VersionsArray[v];
    if ( Version<=PlayerVerMaj )
    {
      UseVersion=Version;
      break;
    }
  }

  var LineStr="";

  if ( UseVersion==0 )
  {
    if ( BackFileName!="" )
    {
      //LineStr+="<div style='width: "+FileWidth+"px; height: "+FileHeight+"px; background-image: url(\""+BackFileName+"\")'>";
      //LineStr+="</div>";
      LineStr+=InsertPicture(BackFileName,br2nl(HintText));
    }
  }
  else
  {
    var SWFFileName=ReplaceAllSubstrings(SWFFileNamePattern,"$",UseVersion,true);
    
    SWFFileName=SWFFileName.split('&amp;').join('&').split('&').join('&amp;');

    LineStr+='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"';
    LineStr+=' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version='+UseVersion+',0,0,0"';
    LineStr+=' type="application/x-shockwave-flash"';
    LineStr+=' data="'+SWFFileName+'"';
    if ( (FileWidth!=0) && (FileHeight!=0) )
      LineStr+=" width='"+FileWidth+"' height='"+FileHeight+"'";
    LineStr+='  id="'+MovieName+'" align=""';
    LineStr+='>';
    LineStr+='<param name="movie" value="'+SWFFileName+'">';
    LineStr+='<param name="quality" value="high">';
    if ( (BgColor===null) || (BgColor=="transparent") )
      LineStr+='<param name="wmode" value="transparent">';
    else if ( BgColor=="opaque" )
      LineStr+='<param name="wmode" value="opaque">';
    else
      LineStr+='<param name="bgcolor" value="'+BgColor+'">';
    if ( Args!="" )
      LineStr+='<param name="FlashVars" value="'+Args+'">';
    
    LineStr+='<embed src="'+SWFFileName+'" quality="high"';
    if ( (BgColor===null) || (BgColor=="transparent") )
      LineStr+=' wmode="transparent"';
    else if ( (BgColor===null) || (BgColor=="opaque") )
      LineStr+=' wmode="opaque"';
    else
      LineStr+=' bgcolor="'+BgColor+'"';
    if ( (FileWidth!=0) && (FileHeight!=0) )
      LineStr+=' width="'+FileWidth+'" height="'+FileHeight+'"';
    if ( Args!="" )
      LineStr+=" FlashVars='"+Args+"'";
    LineStr+=' name="'+MovieName+'" align="middle" type="application/x-shockwave-flash"';
    LineStr+=' pluginspage="http://www.macromedia.com/go/getflashplayer">';
    
    LineStr+='</object>';
  }

  return LineStr;
}

function ShowSWF2(SWFFileNamePattern,VersionsArray,BackFileName,Args,FileWidth,FileHeight,BgColor)
{
  return ShowSWFH(SWFFileNamePattern,VersionsArray,BackFileName,Args,FileWidth,FileHeight,BgColor,'');
}

function HTMLValue(S)
{
  S=ReplaceAllSubstrings(S,"&","&amp;",false);
  S=ReplaceAllSubstrings(S,"\"","&quot;",false);
  S=ReplaceAllSubstrings(S,"\'","&#039;",false);
  S=ReplaceAllSubstrings(S,"<","&lt;",false);
  S=ReplaceAllSubstrings(S,">","&gt;",false);

  return S;
}

function ComposeURLFromElements(FormName,ZakazItems)
{
  var URL="";
  for ( var i=0; i<ZakazItems.length; i++ )
  {
    var ElementName=ZakazItems[i];
    var ElementValue=document.forms[FormName][ElementName].value;
    //alert(ElementValue);
    URL+="&"+ElementName+"="+urlencode(ElementValue);
  }
  return URL;
}

function RoundBased(Num,Base)
{
  Base=1/Base;
  Num=Num*Base;
  Num=Math.floor(Num+0.5);
  Num=Num/Base;
  return Num;
}

function GetEvent(e)
{
  return window.event?window.event:e;
}

function GetEventObject(e)
{
  ClickedObj=null;

  if ( window.event && window.event.srcElement )
    ClickedObj=window.event.srcElement;
  else
    if ( e && e.target )
      ClickedObj=e.target;

  return ClickedObj;
}

function GetEventTarget(e)
{
  var TargetObj=GetEventObject(e);
  var EventInfo=GetEvent(e);
  if ( EventInfo.offsetX==undefined )
  {
    // ‘‘
    var InnerX=EventInfo.layerX;
    var InnerY=EventInfo.layerY;
  }
  else
  {
    // »≈
    var InnerX=EventInfo.offsetX?EventInfo.offsetX:0;
    var InnerY=EventInfo.offsetY?EventInfo.offsetY:0;
  }
  // IE почему-то возвращает дл€ координат мыши значени€ увеличенные на 2
  // поэтому вычисл€ем эту поправку
  var ObjectX=GetProp(TargetObj,"Left");
  var ObjectY=GetProp(TargetObj,"Top");
  var MouseShiftX=EventInfo.clientX-(ObjectX+InnerX);
  var MouseShiftY=EventInfo.clientY-(ObjectY+InnerY);
  return {target:TargetObj,info:EventInfo,
    ix:InnerX,iy:InnerY,
    mx:EventInfo.clientX,my:EventInfo.clientY,
    msx:MouseShiftX,msy:MouseShiftY
    };
}

function GetObjectProps(Obj,ShowFunctions)
{
  var Line='';
  var ConstantRE=/^[A-Z_]+$/;
  for ( Key in Obj )
  {
    if ( Obj[Key] )
    {
      var V=Obj[Key]+'  ';
      if ( V!=undefined )
      {
        var Res=ConstantRE.exec(Key);
        var IsConstant=(Res!==null);
        var IsFunction=((V.substr(0,8)=='function') || (V.substr(0,9)=='\nfunction'))
        if ( (Key.substr(0,2)!='on') && (Key!='innerHTML') && (Key!='outerHTML') && (Key!='outerText') && (ShowFunctions || !IsFunction) && !IsConstant )
          Line+='['+Key+']='+(''+V).substr(0,70)+'\r\n';
      }
    }
  }
  return Line;
}

function GetMouseCoords(e)
{
  var x=0, y=0;

  if ( !e )
    e=window.event;

  if ( e.pageX || e.pageY )
  {
    x=e.pageX;
    y=e.pageY;
  }
  else if ( e.clientX || e.clientY )
  {
    x=e.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft)-document.documentElement.clientLeft;
    y=e.clientY+(document.documentElement.scrollTop||document.body.scrollTop)-document.documentElement.clientTop;
  }

  return {"x":x, "y":y};
}

function GetEventModifiers(e)
{

  if ( !e )
    e=window.event;

  var ShiftPressed=false;
  var CtrlPressed=false;
  var AltPressed=false;
  //if ( document.all ) // IE4 or later
  {
    ShiftPressed=e.shiftKey;
    CtrlPressed=e.ctrlKey;
    AltPressed=e.altKey;
  }
  /*
  else if ( document.layers )
  {
    ShiftPressed=(e.modifiers & Event.SHIFT_MASK);
    CtrlPressed=(e.modifiers & Event.CONTROL_MASK);
    AltPressed=(e.modifiers & Event.ALT_MASK);
  }
  */
  return {Shift: ShiftPressed, Ctrl: CtrlPressed, Alt: AltPressed};
}

function IsCoordsInObj(X,Y,ObjId)
{
  var Obj=GetObj(ObjId);
  
  var ObjX1=GetProp(Obj,"Left");
  var ObjY1=GetProp(Obj,"Top");
  var ObjX2=ObjX1+Obj.offsetWidth;
  var ObjY2=ObjY1+Obj.offsetHeight;

  return (X>=ObjX1)&&(X<ObjX2)&&(Y>=ObjY1)&&(Y<ObjY2);
}

function _ComposeSensorImage(ImageId,StyleStr,NormalHref,OverHref,PressHref,PressFuncCall,PressURL,AltText)
{
  if ( StyleStr!="" )
    StyleStr+="; ";
  StyleStr+="cursor: pointer";

  var NormalImage=new Image();	NormalImage.src=NormalHref;
  var OverImage=new Image();	OverImage.src=OverHref;
  var PressImage=new Image();	PressImage.src=PressHref;
  var Str="";
  if ( PressURL!="" )
    Str+="<a href='"+PressURL+"'>";
  Str+="<img";
  if ( ImageId!='' )
    Str+=" id='"+ImageId+"'";
  Str+=" src='"+NormalHref+"'";
  Str+=" onmouseover=\"this.src='"+OverHref+"'\"";
  Str+=" onmouseout=\"this.src='"+NormalHref+"'\"";
  Str+=" onmousedown=\"this.src='"+PressHref+"';\"";
  Str+=" onmouseup=\"this.src='"+OverHref+"'; this.blur(); "+PressFuncCall+";\"";
  Str+=" style='"+StyleStr+"'";
  if ( AltText!="" )
    Str+=" alt='"+AltText+"' title='"+AltText+"'";
  Str+=" border=0>";
  if ( PressURL!="" )
    Str+="</a>";
  return Str;
}

function ComposeSensorImage(ImageId,StyleStr,NormalHref,OverHref,PressHref,PressFuncCall,PressURL,AltText)
{
  document.write(_ComposeSensorImage(ImageId,StyleStr,NormalHref,OverHref,PressHref,PressFuncCall,PressURL,AltText));
}

function _ComposeSensorImage2(ImageId,StyleStr,StatesH,PressFuncCall,PressURL,AltText,StatusText)
{
  var Str="";
  if ( PressURL!="" )
    Str+="<a href='"+PressURL+"'>";

  Str+="<img";

  if ( ImageId!='' )
    Str+=" id='"+ImageId+"'";

  if ( StyleStr!="" )
    StyleStr+="; ";
  StyleStr+="cursor: pointer";
  Str+=" style='"+StyleStr+"'";

  PreloadImage(StatesH.normal.imageurl);
  Str+=" src='"+StatesH.normal.imageurl+"'";

  var OnMouseOverA=[];
  var OnMouseOutA=[];
  var OnMouseDownA=[];
  var OnMouseUpA=[];

  if ( StatesH.over && StatesH.over.imageurl )
  {
    PreloadImage(StatesH.over.imageurl);
    OnMouseOverA.push("this.src='"+StatesH.over.imageurl+"'");
  }

  if ( StatesH.pressed && StatesH.pressed.imageurl )
  {
    PreloadImage(StatesH.pressed.imageurl);
    OnMouseDownA.push("this.src='"+StatesH.pressed.imageurl+"'");
    OnMouseUpA.push("this.src='"+((StatesH.over&&StatesH.over.imageurl)?StatesH.over.imageurl:StatesH.normal.imageurl)+"'");
  }

  if ( (StatesH.over&&StatesH.over.imageurl) || (StatesH.pressed&&StatesH.pressed.imageurl) )
    OnMouseOutA.push("this.src='"+StatesH.normal.imageurl+"'");

  if ( PressFuncCall!="" )
    OnMouseUpA.push(PressFuncCall);

  if ( (StatesH.pressed&&StatesH.pressed.imageurl) || (PressFuncCall!="") )
    OnMouseUpA.push("this.blur()");

  if ( StatusText!="" )
  {
    OnMouseOverA.push("window.status='"+StatusText+"'");
    OnMouseOutA.push("window.status=''");
  }

  if ( OnMouseOverA.length )
    Str+=' onmouseover="'+OnMouseOverA.join('; ')+'"';
  if ( OnMouseOutA.length )
    Str+=' onmouseout="'+OnMouseOutA.join('; ')+'"';
  if ( OnMouseDownA.length )
    Str+=' onmousedown="'+OnMouseDownA.join('; ')+'"';
  if ( OnMouseUpA.length )
    Str+=' onmouseup="'+OnMouseUpA.join('; ')+'"';

  if ( AltText!="" )
    Str+=" alt='"+AltText+"' title='"+AltText+"'";

  Str+=" border=0>";

  if ( PressURL!="" )
    Str+="</a>";
  return Str;
}

function DeleteArrayItem(Arr,I)
{
  return DeleteArrayItems(Arr,I,1);
}

function DeleteArrayItems(Arr,FromI,Cnt)
{
  var Arr2=[];
  for ( var i=0; i<FromI; i++ )
    Arr2.push(Arr[i]);
  for ( var i=FromI+Cnt; i<Arr.length; i++ )
    Arr2.push(Arr[i]);
  return Arr2;
}

function _ShowMP3Player(FileName,DuratSecs,Caption,Width,Height)
{
  var Str='';

  Str+='<OBJECT height='+Height+' width='+Width+'>';
  Str+='<PARAM NAME="movie" VALUE="flash/ump3player.swf">';
  Str+='<param name="wmode" VALUE="transparent">';
  Str+='<param name=FlashVars value="way='+FileName+'&w='+Width+'&h='+Height+'&time_seconds='+DuratSecs+'&autoplay=0&skin=bb&volume=70&comment='+Caption+'">';
  Str+='<embed';
  Str+=' src="flash/ump3player.swf"';
  Str+=' type="application/x-shockwave-flash"';
  Str+=' wmode="transparent"';
  Str+=' flashvars="way='+FileName+'&w='+Width+'&h='+Height+'&time_seconds='+DuratSecs+'&autoplay=0&skin=bb&volume=70&comment='+Caption+'"';
  Str+=' height="'+Height+'"';
  Str+=' width="'+Width+'">';
  Str+='</embed>';
  Str+='</OBJECT>';

  return Str;
}

function ShowMP3Player(FileName,DuratSecs,Caption,Width,Height,OverlapMode)
{
  var PlayerCode=_ShowMP3Player(FileName,DuratSecs,Caption,Width,Height);
  if ( OverlapMode )
  {
    var DivObj=GetObj("IFloatMP3PlayerDiv");
    DivObj.innerHTML=PlayerCode;
    DivObj.style.left="100px";
    DivObj.style.top="300px";
  }
  else
    document.write(PlayerCode);
}

function ComposeComboBox(Id,Name,ControlWidth,ClassName,AuxStr,ControlVariants,SelectedValue)
{
  // ControlVariants[x]:
  // 0 - значение
  // 1 - текст
  // 2 - им€ группы
  // 3 - enabled

  var ScrollBarWidth=16;
  ControlWidth-=ScrollBarWidth;
  ControlWidth-=3;

  var AverPixelsPerChar=6.7;
  var EllipsisWidth=12;
  var MaxTextLength=Math.floor(ControlWidth/AverPixelsPerChar);
  var CropTextLength=Math.floor((ControlWidth-EllipsisWidth)/AverPixelsPerChar);

  var CurrGroupName=null;
  var Line='';
  Line+='<select';
  if ( Id!='' )
    Line+=' id="'+Id+'"';
  if ( Name!='' )
    Line+=' name="'+Name+'"';
  if ( ClassName!='' )
    Line+=' class="'+ClassName+'"';
  if ( AuxStr!='' )
    Line+=' '+AuxStr;
  Line+='>';
  for ( var i=0; i<ControlVariants.length; i++ )
  {
    var VariantValue=ControlVariants[i][0];
    var VariantText=ControlVariants[i][1];

    if ( ControlVariants[i][2] && (ControlVariants[i][2]!==CurrGroupName) )
    {
      if ( CurrGroupName!==null )
        Line+="</optgroup>";
      CurrGroupName=ControlVariants[i][2];
      Line+="<optgroup label='"+CurrGroupName+"'>";
    }

    var DisabledStr='';
    if ( (3 in ControlVariants[i]) && (ControlVariants[i][3]==='') )
      DisabledStr=' disabled';

    if ( VariantText.length>MaxTextLength )
      VariantText="..."+VariantText.substring(VariantText.length-CropTextLength);

    var SelectedStr="";
    if ( VariantValue==SelectedValue )
      SelectedStr=" selected";
    
    Line+="<option value='"+VariantValue+"'"+SelectedStr+DisabledStr+">"+VariantText+"</option>";
  }
  if ( CurrGroupName!==null )
    Line+="</optgroup>";
  Line+='</select>';
  return Line;
}

function RemoveAnchorFromTitle()
{
  var AnchorPos=location.href.lastIndexOf("#");
  if ( AnchorPos!=-1 )
  {
    var AnchorStr=location.href.substr(AnchorPos);
    var NewTitle=ReplaceAllSubstrings(document.title,AnchorStr,"",true);
    document.title=NewTitle;
  }
}

function Implode(Div,Hash)
{
  var Str='';
  var Koska=false;
  for ( var K in Hash )
  {
    if ( !Koska ) Koska=true; else Str+=Div;
    Str+=Hash[K];
  }
  return Str;
}

function ImplodeKeys(Div,Hash)
{
  var Str='';
  var Koska=false;
  for ( var K in Hash )
  {
    if ( !Koska ) Koska=true; else Str+=Div;
    Str+=K;
  }
  return Str;
}

function ImplodeArray(Div,Arr)
{
  var Str='';
  var Koska=false;
  for ( var i=0; i<Arr.length; i++ )
  {
    if ( !Koska ) Koska=true; else Str+=Div;
    Str+=Arr[i];
  }
  return Str;
}

function InsertPicture(ImageFN,Hint,Width,Height)
{
  if ( ImageFN=='' )
    return '';
  var Str='<img src="'+ImageFN+'"';
  if ( Hint!="" )
  {
    Hint=Hint.split("<nobr>").join("");
    Hint=Hint.split("</nobr>").join("");
    Str+=' alt="'+Hint+'"';
  }
  Str+=' title="'+Hint+'" border=0';
  if ( Width )
    Str+=" width="+Width;
  if ( Height )
    Str+=" height="+Height;
  Str+='>';
  return Str;
}


function InsertTransPict(Width,Height)
{
  return '<img src="'+ImagesPath+'tp.gif" width="'+Width+'" height="'+Height+'" alt="">';
}

function InsertTransPictHint(Width,Height,Hint)
{
  return '<img src="'+ImagesPath+'tp.gif" width="'+Width+'" height="'+Height+'" alt="'+Hint+'" title="'+Hint+'">';
}

function AddToArray(A1,A2)
{
  var A1Len=A1.length;
  for ( var i=0; i<A2.length; i++ )
    A1[A1Len++]=A2[i];
}

function CompareInt(A,B)
{
  return A-B;
}

function UnixTimeStampToDate(TS)
{
  var d=new Date(UnixTimeStamp0);
  d.setSeconds(TS);
  return d;
}

function InArray(V,A)
{
  for ( var i=0; i<A.length; i++ )
    if ( A[i]==V )
      return true;
  return false;
}

function AllTrim(S)
{
  var SpaceChars=" \r\n\t\0";
  for ( var I1=0; I1<S.length; I1++ )
  {
    var C=S.substr(I1,1);
    if ( SpaceChars.indexOf(C)==-1 )
      break;
  }
  for ( var I2=S.length-1; I2>I1; I2-- )
  {
    var C=S.substr(I2,1);
    if ( SpaceChars.indexOf(C)==-1 )
      break;
  }
  return S.substr(I1,I2-I1+1);
}

function PreloadImage(src)
{
  var FileName=GetFileName(src);
  if ( FileName=='' )
    return null;

  
  if ( src in PreloadedImagesH )
    return PreloadedImagesH[src];
  var Img=new Image();
  Img.src=src;
  PreloadedImagesH[src]=Img;
  return Img;
}

function GetBodyScroll()
{
  var ScrollX=(self.pageXOffset || (document.documentElement && document.documentElement.scrollLeft) || (document.body && document.body.scrollLeft));
  var ScrollY=(self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop));
  return {x:ScrollX,y:ScrollY};
}

function IsHashEmpty(Hash)
{
  var Empty=true;
  for ( var I in Hash )
  {
    Empty=false;
    break;
  }
  return Empty;
}

function RTrim(Txt)
{
  var Pos=Txt.length-1;
  while ( Pos>=0 )
  {
    if ( Txt.charAt(Pos)!='' )
      break;
    Pos--;
  }
  return Txt.substr(0,Pos);
}

function SplitTextToLines(Txt,MaxLineLen,Divider,MaxLinesCount)
{
  var ResultText="";

  var LinesCount=0; 
  var DividersStr=" ,.?:;!";
  while ( Txt.length>MaxLineLen )
  {
    var Pos=MaxLineLen;
    while ( Pos )
    {
      var C=Txt.charAt(Pos);
      if ( DividersStr.indexOf(C)!=-1 )
        break;
      Pos--;
    }
    LinesCount++;
    ResultText+=RTrim(Txt.substr(0,Pos+1));
    if ( LinesCount==MaxLinesCount )
    {
      ResultText+="...";
      Txt='';
    }
    else
    {
      ResultText+=Divider;
      Txt=Txt.substr(Pos+1);
    }
  }
  
  ResultText+=Txt;
  return ResultText;
}

function GetCaretSelectedText()
{
  if ( CaretPosObj.selectionStart || CaretPosObj.selectionEnd )
    return CaretPosObj.value.substring(CaretPosObj.selectionStart,CaretPosObj.selectionEnd);
  return GetSelectedText();
}

function WrapCaretSelectedText(LeftWrapStr,RightWrapStr,ErrMessage)
{
  if ( CaretPosObj )
  {
    var SelectedText=GetCaretSelectedText();
    if ( SelectedText!="" )
      InsertAtCaretPos2(LeftWrapStr+SelectedText+RightWrapStr);
    else
    {
      alert(ErrMessage);
      CaretPosObj.focus(); 
    }
  }
  else
    alert(ErrMessage);
}

function ReplaceCaretSelectedText(ReplStr)
{
  if ( CaretPosObj )
    InsertAtCaretPos2(ReplStr);
}

function StoreCaretPos(textEl)  
{ 
  CaretPosObj=textEl;
  CaretPosStr=null;
  if ( textEl.createTextRange )
    CaretPosStr=document.selection.createRange().duplicate(); 
} 

function InsertAtCaretPos_Mozilla(text) 
{ 
  var selStart=CaretPosObj.selectionStart; 
  var selEnd=CaretPosObj.selectionEnd; 
 
  var s1=CaretPosObj.value.substr(0,selStart); 
  var s3=CaretPosObj.value.substr(selEnd); 
  CaretPosObj.value=s1+text+s3; 
  
  CaretPosObj.selectionEnd=0; 
  CaretPosObj.selectionStart=selStart+text.length;
} 
 
function InsertAtCaretPos(text)
{ 
  if ( !CaretPosObj )
    return;

  if ( CaretPosObj.createTextRange && CaretPosStr )
  {
    if ( document.selection.clear )
      document.selection.clear();
    CaretPosStr.text=text;
  }
  else
  { 
    if ( is_nav && document.getElementById )
      InsertAtCaretPos_Mozilla(text); 
    else
      CaretPosObj.value+=text;
  } 
  CaretPosObj.focus(); 
}

function InsertAtCaretPos2(text)
{ 
  if ( !CaretPosObj )
    return;

  if ( CaretPosObj.createTextRange && CaretPosStr )
  {
    if ( document.selection.clear )
      document.selection.clear();
    CaretPosStr.text=text;
  }
  else
  { 
    var selStart=CaretPosObj.selectionStart; 
    var selEnd=CaretPosObj.selectionEnd; 
   
    var s1=CaretPosObj.value.substr(0,selStart); 
    var s3=CaretPosObj.value.substr(selEnd); 
    CaretPosObj.value=s1+text+s3; 
    
    CaretPosObj.selectionStart=selStart+text.length;
    CaretPosObj.selectionEnd=CaretPosObj.selectionStart; 
  } 
  CaretPosObj.focus(); 
}

function GetFileExt(FileName)
{
  var Ext='';
  var Pos=FileName.lastIndexOf('.');
  if ( Pos!=-1 )
    Ext=FileName.substr(Pos+1).toUpperCase();
  return Ext;
}

function GetFileName(FPN)
{
  var FileName='';
  var Pos=FPN.lastIndexOf('/');
  if ( Pos!=-1 )
    FileName=FPN.substr(Pos+1);
  return FileName;
}

function HashToURL(ArgsH)
{
  var Str='';
  for ( var K in ArgsH ) 
  {
    if ( Str!='' )
      Str+='&';
    Str+=K+'='+urlencode(ArgsH[K]);
  }
  return Str;
}

function FormatNumber(FieldValue)
{
  var FVS=''+FieldValue;
  var Res='';

  var RightStr='';
  var RightPos=FVS.indexOf('.');
  if ( RightPos!=-1 )
  {
    RightStr=FVS.substr(RightPos);
    FVS=FVS.substr(0,RightPos);
  }

  while ( FVS.length>3 )
  {
    Res='&nbsp;'+FVS.substr(FVS.length-3)+Res;
    FVS=FVS.substr(0,FVS.length-3);
  }
  Res=FVS+Res+RightStr;

  return Res;
}

function GetObjectPos(ObjectId)
{
  var Obj=GetObj(ObjectId);
  var X=0, Y=0;
  while ( Obj!=null )
  {
    X+=Obj.offsetLeft;
    Y+=Obj.offsetTop;
    Obj=Obj.offsetParent;
  }
  return {left:X, top:Y};
}

function GetObjectSize(ObjectId)
{
  var Obj=GetObj(ObjectId);
  return {width:Obj.offsetWidth, height:Obj.offsetHeight};
}

function GetDocumentSize()
{
  var TotalHeight=(document.body.scrollHeight > document.body.offsetHeight)?document.body.scrollHeight:document.body.offsetHeight;
  var TotalWidth=(document.body.scrollWidth > document.body.offsetWidth)?document.body.scrollWidth:document.body.offsetWidth;
  return {width:TotalWidth, height:TotalHeight};
}

function GetWindowClientSize()
{
  // если окно с фреймами, правильно работать не будет -
  // может возвращать нули или размеры уже загруженных фреймов

  //alert(document.documentElement.clientWidth);
  if ( (document.compatMode=='CSS1Compat' && (!window.opera)) || (!document.body) )
  {
    var ClientWidth=document.documentElement.clientWidth;
    var ClientHeight=document.documentElement.clientHeight;
  }
  else
  {
    var ClientWidth=document.body.clientWidth;
    var ClientHeight=document.body.clientHeight;
  }
  return {width:ClientWidth, height:ClientHeight};
}

function GetWindowScrollPos()
{
//  var ScrollX=self.pageXOffset || (document.documentElement && document.documentElement.scrollLeft) || (document.body && document.body.scrollLeft);
//  var ScrollY=self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
//  return {scrollx:ScrollX, scrolly: ScrollY};

  if ( 'pageXOffset' in self )
    return { scrollx: self.pageXOffset, scrolly: self.pageYOffset };
  if ( document.documentElement && ('scrollLeft' in document.documentElement) )
    return { scrollx: document.documentElement.scrollLeft, scrolly: document.documentElement.scrollTop };
  if ( document.body && ('scrollLeft' in document.body) )
    return { scrollx: document.body.scrollLeft, scrolly: document.body.scrollTop };
  return { scrollx: 0, scrolly: 0 };
}

function ScrollToObj(ObjId,ScrollMode)
{
  // ScrollMode
  // 0 - сделать видимым с минимальным скроллингом
  // 1 - верх объекта - к верху экрана
  // 2 - объект на середину экрана
  // 3 - низ объекта - к низу экрана
  // 4 - верх объекта - к низу верхней трети экрана

  if ( !GetObj(ObjId) )
    return;

  var ObjPos=GetObjectPos(ObjId);
  switch ( ScrollMode )
  {
    case 0:
      var ScrollPos=GetWindowScrollPos();
      // если верх объекта выше верхней границы клиентской области -
      // скроллируем к верхней
      // если низ объекта ниже нижней границы клиентской области -
      // скроллируем к нижней
      if ( ObjPos.top<ScrollPos.scrolly )
      {
        //alert('top '+ObjPos.top);
        window.scrollTo(0,ObjPos.top);
      }
      else
      {
        var ObjSize=GetObjectSize(ObjId);
        var ClientSize=GetWindowClientSize();
        //alert(ObjPos.top+' '+ObjSize.height+' '+ClientSize.height);
        if ( ObjPos.top+ObjSize.height>ScrollPos.scrolly+ClientSize.height )
        {
          //alert('bottom '+(ObjPos.top+ObjSize.height-ClientSize.height));
          window.scrollTo(0,ObjPos.top+ObjSize.height-ClientSize.height);
        }
      }
      break;
    case 1:
      window.scrollTo(0,ObjPos.top);
      break;
    case 2:
      var ObjSize=GetObjectSize(ObjId);
      var ClientSize=GetWindowClientSize();
      window.scrollTo(0,ObjPos.top+ObjSize.height/2-ClientSize.height/2);
      break;
    case 3:
      var ObjSize=GetObjectSize(ObjId);
      var ClientSize=GetWindowClientSize();
      window.scrollTo(0,ObjPos.top+ObjSize.height-ClientSize.height);
      break;
    case 4:
      var ObjSize=GetObjectSize(ObjId);
      var ClientSize=GetWindowClientSize();
      window.scrollTo(0,ObjPos.top-ClientSize.height/3);
      break;
  }
}

function SetWindowInnerSize(ReqClientWidth,ReqClientHeight,AutoRepos)
{
 
  // если окно с фреймами, правильно работать не будет -
  // GetWindowClientSize может возвращать нули или меньшие размеры
  
  if ( !AutoRepos )
  {
    var ClientSize=GetWindowClientSize();
    window.resizeBy(ReqClientWidth-ClientSize.width,ReqClientHeight-ClientSize.height);
  }
  else
  {
    // 1. надо вычислить разницу между размерами окна и клиента
    if ( window.mozInnerScreenX!==undefined )
    {
      // это ‘‘ - разница вычисл€етс€ легко
      var HorzLuft=window.outerWidth-window.innerWidth;
      var VertLuft=window.outerHeight-window.innerHeight;
    }
    else
    {
      // это »≈ - разницу надо получать
      //var WindowSizeLuftCkName="WindowSizeLuft";
      //var CkVal=Cookie_Get(WindowSizeLuftCkName);
      //if ( CkVal===null )
      {
        window.resizeTo(ReqClientWidth,ReqClientHeight);
        var FactClientSize=GetWindowClientSize();
        var HorzLuft=ReqClientWidth-FactClientSize.width;
        var VertLuft=ReqClientHeight-FactClientSize.height;
        // сохраним люфты в куках, чтобы в следующий раз не делать лишний resizeTo
        //Cookie_Set(WindowSizeLuftCkName,HorzLuft+'|'+VertLuft,1000*60*60*24*365);
      }
      /*
      else
      {
        var CkValA=CkVal.split("|");
        var HorzLuft=CkValA[0]*1;
        var VertLuft=CkValA[1]*1;
      }
      */
    }

    var ReqWindowWidth=ReqClientWidth+HorzLuft;
    var ReqWindowHeight=ReqClientHeight+VertLuft;

    var MaxHeight=window.screen.availHeight;
    if ( ReqWindowHeight>MaxHeight )
      ReqWindowHeight=MaxHeight;

    window.resizeTo(ReqWindowWidth,ReqWindowHeight);

    // позици€ окна - если вылезло за экран, сместим в середину

    var AlrCentered=false;
    if ( window.mozInnerScreenX!==undefined )
    {
      // это ‘‘ - позици€ известна
      var WindowLeft=window.screenX;
      var WindowTop=window.screenY;
    }
    else
    {
      // это »≈ - позицию надо получать
      //var WindowPosLuftCkName="WindowPosLuft";
      //var CkVal=Cookie_Get(WindowPosLuftCkName);
      //if ( CkVal===null )
      {
        // кука ещЄ нет
        // позиционируем в центр экрана, т.к. проверить не можем, влезает ли
        var NewLeft=(window.screen.availWidth-ReqWindowWidth)/2;
        var NewTop=(window.screen.availHeight-ReqWindowHeight)/2;
        window.moveTo(NewLeft,NewTop);
        var NewClientLeft=window.screenLeft;
        var NewClientTop=window.screenTop;
        var HorzOffset=NewClientLeft-NewLeft;
        var VertOffset=NewClientTop-NewTop;
        AlrCentered=true;
        // сохраним люфты в куках, чтобы в следующий раз не делать лишний moveTo
        //Cookie_Set(WindowPosLuftCkName,HorzOffset+'|'+VertOffset,1000*60*60*24*365);
      }
      /*
      else
      {
        var CkValA=CkVal.split("|");
        var HorzOffset=CkValA[0]*1;
        var VertOffset=CkValA[1]*1;
        var WindowLeft=window.screenLeft-HorzOffset;
        var WindowTop=window.screenTop-VertOffset;
      }
      */
    }

    if
    ( (!AlrCentered) &&
      (
        (WindowLeft+ReqWindowWidth>window.screen.availWidth)
          ||
        (WindowTop+ReqWindowHeight>window.screen.availHeight)
      )
    )
    {
      var NewLeft=(window.screen.availWidth-ReqWindowWidth)/2;
      var NewTop=(window.screen.availHeight-ReqWindowHeight)/2;
      window.moveTo(NewLeft,NewTop);
    }
  }
}

function ComposePNGContainerClass(ClassName,FileName,AuxPars1,AuxPars2)
{
  var Str='';
  Str+="\r\n."+ClassName+" {"+AuxPars1;
  Str+="\r\nfilter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=scale src='"+ImagesPath+FileName+"');";
  Str+="\r\n}";
  Str+="\r\n."+ClassName+"[class] {"+AuxPars2;
  Str+="\r\nbackground-image:url('"+ImagesPath+FileName+"');";
  Str+="\r\n}";
  return Str;
}

function qsort(base,compar)
{
  var nmemb=base.length;

  var lbStack=[];
  var ubStack=[];

  lbStack[0]=0;
  ubStack[0]=nmemb-1;

  for ( var sp=0; sp>=0; sp--)
  {
    var lb=lbStack[sp];
    var ub=ubStack[sp];

    while ( lb<ub )
    {
      /* выбираем центр и мен€емс€ с 1м элементом */
      var offset=Math.floor((ub-lb)/2);
      var P=lb+offset;
      //exchange (lb,P);
      var t=base[lb];
      base[lb]=base[P];
      base[P]=t;

      /* разделение в два сегмента */
      i=lb+1;
      j=ub;
      while ( true )
      {
        while ( i<j && compar(base,lb,i)>0 )
          i++;
        while ( j>=i && compar(base,j,lb)>0 )
          j--;
        if ( i>=j )
          break;
        //exchange (i, j, size);
        var t=base[i];
        base[i]=base[j];
        base[j]=t;
        j--;
        i++;
      }

      /* центр в A[j] */
      //exchange (lb, j, size);
      var t=base[lb];
      base[lb]=base[j];
      base[j]=t;
      var m=j;

      /* ћеньший сегмент продолжаем обрабатывать, больший - в стек */
      if ( m-lb<=ub-m )
      {
        if (m+1<ub)
        {
          lbStack[sp]=m+1;
          ubStack[sp++]=ub;
        }
        ub=m-1;
      }
      else
      {
        if ( m-1>lb )
        {
          lbStack[sp]=lb;
          ubStack[sp++]=m-1;
        }
        lb=m+1;
      }
    }
  }
}

function Cookie_Delete(name)
{
  Cookie_Set(name,'',-1);
}

function Cookie_Set(name,value,time_msec)
{ 
  var valueEscaped=escape(value); 
  if ( valueEscaped.length<=4000 )
  {
    var newCookie=name+"="+valueEscaped+"; path=/";
    if ( time_msec )
    {
      var expiresDate=new Date(); 
      expiresDate.setTime(expiresDate.getTime()+time_msec);
      newCookie+="; expires="+expiresDate.toGMTString();
    }
    document.cookie=newCookie+";"; 
  }
} 

function Cookie_Get(name)
{ 
  var prefix=name+"="; 
  var cookieStartIndex=document.cookie.indexOf(prefix); 
  if ( cookieStartIndex==-1 )
    return null; 
  var cookieEndIndex=document.cookie.indexOf(";",cookieStartIndex+prefix.length);
  if ( cookieEndIndex==-1 )
    cookieEndIndex=document.cookie.length; 
  return unescape(document.cookie.substring(cookieStartIndex+prefix.length,cookieEndIndex)); 
}

function ComposeShiftedBGImageStyle(GridImagePFN,Left,Top)
{
  return "background-image: url('"+GridImagePFN+"'); background-position: "+(-Left)+"px "+(-Top)+"px";
}

function GetSelectedText()
{ 
  var sel='';
  /*
  if ( window.getSelection )
    sel=window.getSelection().toString();
  else if ( document.getSelection )
    sel=document.getSelection();
  else if ( document.selection )
    sel=document.selection.createRange().text;
    */
  if ( document.selection )
    sel=document.selection.createRange().text;
  else if ( window.getSelection )
    sel=window.getSelection().toString();
  else if ( document.getSelection )
    sel=document.getSelection();
  return sel;
} 

function ComposeRadioGroup(ControlName,ControlVariants,AuxStr,SelectedValue,CaptionClass,NewLineFlag)
{
  var Str='';
  for ( i=0; i<ControlVariants.length; i++ )
  {
    if ( i && NewLineFlag )
      Str+="<br>";

    var VariantValue=ControlVariants[i][0];
    var VariantText=ControlVariants[i][1];
    var CheckedStr=(SelectedValue==VariantValue)?"checked":"";
    Str+="<input type='radio' id='"+ControlName+"' name='"+ControlName+"' value='"+VariantValue+"' "+AuxStr+" "+CheckedStr+">";
    if ( CaptionClass!="" )
      Str+="<span class='"+CaptionClass+"'>";
    Str+=VariantText;
    if ( CaptionClass!="" )
      Str+="</span>";
  }
  return Str;
}

function GetRadioGroupValue(RadioGroupObj)
{
  for ( var i=0; i<RadioGroupObj.length; i++ )
    if ( RadioGroupObj[i].checked )
      return RadioGroupObj[i].value;
  return "";
}

function SetRadioGroupValue(RadioGroupObj,Value)
{
  /*
  for ( var i=0; i<RadioGroupObj.length; i++ )
    if ( RadioGroupObj[i].value==Value )
    {
      RadioGroupObj[i].checked=true;
      break;
    }
  */
  for ( var i=0; i<RadioGroupObj.length; i++ )
      RadioGroupObj[i].checked=(RadioGroupObj[i].value==Value);
}

function ArrayToHash(Arr,KeyFieldI,FieldNamesH)
{
  var ResH={};

  var ArrLength=Arr.length;
  for ( var i=0; i<ArrLength; i++ )
  {
    var Row=Arr[i];
    var Key=Row[KeyFieldI];
    var Hash={};
    for ( Ind in FieldNamesH )
    {
      var ElemName=FieldNamesH[Ind];
      Hash[ElemName]=Row[Ind];
    }
    ResH[Key]=Hash;
  }
  return ResH;
}

function HashSerialize(Hash)
{
  var S='{';
  var FirstElem=true;
  for ( Key in Hash )
  {
    if ( FirstElem )
      FirstElem=false;
    else
      S+=', ';
    var Val=Hash[Key];
    var T=typeof Val;
    if ( T=='number' )
      S+=Key+':'+Val;
    else if ( T=='string' )
      S+=Key+':'+"'"+Val+"'";
    else if ( T=='object' )
      S+=Key+':'+HashSerialize(Val);
  }
  S+='}';
  return S;
}

function UpdateComboItems(ComboObj,ValuesA,NewValue)
{
//var Date1=new Date();

  var SelectedIndex=-1;
  ComboObj.options.length=0;
//var Date2=new Date();
  var ValuesCount=ValuesA.length;
  for ( var i=0; i<ValuesCount; i++ )
  {
    var ValueR=ValuesA[i];
    var NewOption=new Option(ValueR[1],ValueR[0]);
    ComboObj.options.add(NewOption);
    if ( ValueR[0]==NewValue )
      SelectedIndex=i;
  }

//var Date3=new Date();
//alert((Date2.valueOf()-Date1.valueOf())+" "+(Date3.valueOf()-Date2.valueOf()));

  if ( SelectedIndex!=-1 )
    ComboObj.selectedIndex=SelectedIndex;
}

function RegisterWindowOnLoadHandler(HandlerStr)
{
  WindowOnLoadHandlersA.push(HandlerStr);
  window.onload=CallWindowOnLoadHandlers;
}

function CallWindowOnLoadHandlers()
{
  for ( var h=0; h<WindowOnLoadHandlersA.length; h++ )
  {
    var HandlerStr=WindowOnLoadHandlersA[h];
    eval(HandlerStr);
  }
}

function BooleanFilter(Val1,Val2)
{
//alert('|'+Val1+'|'+Val2+'|');
  var Flag1=((Val1==0)||(Val1=='')||(Val1==null));
  var Flag2=((Val2==0)||(Val2=='')||(Val2==null));
  return (Flag1==Flag2);
}

function SafePochta(Login,Domain,Text,ClassName)
{
  var Str="";
  var Addr=Login;
  if ( Domain!="" )
    Addr+='@'+Domain;
  if ( Text=='' )
    Text=Addr;
  var Prefix='mai';
  Prefix+='lto';
  Addr=Prefix+':'+Addr;
  if ( ClassName!='' )
    ClassName=' class="'+ClassName+'"';
  document.write('<a href="'+Addr+'"'+ClassName+'>'+Text+'</a>');
}

function StrToJSStr(Str)
{
  if ( typeof(Str)=="string" )
    Str=Str.split("'").join("\\'");
  return Str;
}

function AddToURL(URL,ParsH)
{
  var ParsExists=(URL.indexOf('?')!==-1);
  for ( var ParName in ParsH )
  {
    URL+=ParsExists?"&":"?";
    URL+=ParName+"="+urlencode(ParsH[ParName]+'');
    ParsExists=true;
  }
  return URL;
}

function IFrame_GetContainer()
{
  return document.parentWindow?document.parentWindow.parent:document.defaultView.parent;
}

function IFrame_GetChildFrame(FrameId)
{
  return document.getElementById(FrameId);
}

function IFrame_GetSiblingFrame(FrameId)
{
  var ParentWindow=IFrame_GetContainer();
  return ParentWindow.document.getElementById(FrameId);
}

function IFrame_GetWindow(FrameObj)
{
  if ( !FrameObj )
    return null;
  if ( FrameObj.window )
    return FrameObj.window;
  if ( FrameObj.contentWindow )
    return FrameObj.contentWindow;
  return null;
}

function IFrame_GetChildWindow(FrameId)
{
  var FrameObj=document.getElementById(FrameId);
  return IFrame_GetWindow(FrameObj);
}

function IFrame_GetSiblingWindow(FrameId)
{
  var ParentWindow=IFrame_GetContainer();
  var FrameObj=ParentWindow.document.getElementById(FrameId);
  if ( !FrameObj )
    return null;
  return IFrame_GetWindow(FrameObj);
}

var Drag_CurrObj=null;
var Drag_CurrInfo=null;
var Drag_CoverImage=null;
var Drag_PrevX=0;
var Drag_PrevY=0;

function Drag_Enable(Obj)
{
  Obj.onmousedown=Drag_MouseDown;
  Obj.onclick=Drag_Dummy;
  Obj.ondragstart=Drag_Dummy;
}

function Drag_Disable(Obj)
{
  Obj.onmousedown=null;
  Obj.onclick=null;
  Obj.ondragstart=null;
  if ( Drag_CurrObj==Obj )
    Drag_Stop();
}

function Drag_Dummy()
{
  return false;
}

function Drag_MouseDown(e)
{
  var Ev=GetEventTarget(e);
  Drag_Start(Ev);
}

function Drag_MouseUp(e)
{
  Drag_Stop();
}

function Drag_MouseMove(e)
{
  if ( Drag_CurrObj )
  {
    var Ev=GetEventTarget(e);
    Drag_CurrObj.style.left=(Ev.mx-Drag_CurrInfo.ix-Drag_CurrInfo.msx)+"px";
    Drag_CurrObj.style.top=(Ev.my-Drag_CurrInfo.iy-Drag_CurrInfo.msy)+"px";
    Drag_TestBounds();

    Drag_CurrX=GetProp(Drag_CurrObj,"Left");
    Drag_CurrY=GetProp(Drag_CurrObj,"Top");
    if ( Drag_CurrObj.Drag_Resized )
      Drag_CurrObj.Drag_Resized(Drag_CurrObj,Drag_CurrX-Drag_PrevX,Drag_CurrY-Drag_PrevY);
    Drag_PrevX=Drag_CurrX;
    Drag_PrevY=Drag_CurrY;
  }
}

function Drag_MouseOut(e)
{
  if ( Drag_CurrObj )
  {
    var Ev=GetEventTarget(e);
    var MouseX=Ev.mx-Drag_CurrInfo.msx;
    var MouseY=Ev.my-Drag_CurrInfo.msy;
    if (
      ( (MouseX<0) || (MouseX>=Drag_CurrInfo.clientsize.width) )
        ||
      ( (MouseY<0) || (MouseY>=Drag_CurrInfo.clientsize.height) )
    )
      Drag_Stop();
  }
}

function Drag_TestBounds()
{
  if ( Drag_CurrInfo.bounds )
  {
    var ObjX=GetProp(Drag_CurrObj,"Left");
    var ObjY=GetProp(Drag_CurrObj,"Top");
    // Drag_CurrInfo.bounds

    if ( ObjX<Drag_CurrInfo.bounds.left )
      Drag_CurrObj.style.left=Drag_CurrInfo.bounds.left+"px";
    else if ( ObjX>=Drag_CurrInfo.bounds.right )
      Drag_CurrObj.style.left=(Drag_CurrInfo.bounds.right-1)+"px";

    if ( ObjY<Drag_CurrInfo.bounds.top )
      Drag_CurrObj.style.top=Drag_CurrInfo.bounds.top+"px";
    else if ( ObjY>=Drag_CurrInfo.bounds.bottom )
      Drag_CurrObj.style.top=(Drag_CurrInfo.bounds.bottom-1)+"px";
  }
}

function Drag_Start(Ev)
{
  Drag_CurrInfo=Ev;
  if ( Ev.target==Drag_CurrObj )
    return;
  Drag_Stop();

  if ( !Drag_CoverImage )
  {
    Drag_CoverImage=document.createElement('IMG');
    Drag_CoverImage.style.position='absolute';
    Drag_CoverImage.style.left=0;
    Drag_CoverImage.style.top=0;
    Drag_CoverImage.width=0;
    Drag_CoverImage.height=0;
    Drag_CoverImage.src=ImagesPath+'tp.gif';
    Drag_CoverImage.ondragstart=Drag_Dummy;
    document.body.appendChild(Drag_CoverImage);
  }

  Drag_CoverImage.style.cursor=Ev.target.style.cursor;

  ClientSize=GetWindowClientSize();
  Drag_CoverImage.width=ClientSize.width;
  Drag_CoverImage.height=ClientSize.height;

  Drag_CoverImage.onmouseup=Drag_MouseUp;
  Drag_CoverImage.onmousemove=Drag_MouseMove;
  Drag_CoverImage.onmouseout=Drag_MouseOut;

  Drag_CurrInfo.clientsize=GetWindowClientSize();

  Drag_CurrInfo.bounds=null;
  if ( Ev.target.Drag_GetBounds )
    Drag_CurrInfo.bounds=Ev.target.Drag_GetBounds(Ev.target);

  Drag_CurrObj=Ev.target;

  Drag_PrevX=GetProp(Drag_CurrObj,"Left");
  Drag_PrevY=GetProp(Drag_CurrObj,"Top");

  Drag_TestBounds();
}

function Drag_Stop()
{
  if ( Drag_CurrObj )
  {
    //Drag_CoverImage.width=0;
    //Drag_CoverImage.height=0;

    Drag_CoverImage.onmouseup=null;
    Drag_CoverImage.onmousemove=null;
    Drag_CoverImage.onmouseout=null;

    document.body.removeChild(Drag_CoverImage);
    Drag_CoverImage=null;

    Drag_CurrObj=null;
  }
}

function HTMLSpecialChars(Str)
{
  return (Str+"")
    .split("&").join("&amp;")
    .split('"').join("&quot;")
    .split('<').join("&lt;")
    .split('>').join("&gt;")
    //.split('&amp;nbsp;').join("&nbsp;")
    ;
}

function AddEventHandler(Elem,EventName,HandlerFunc,CaptureFlag)
{
  if ( Elem.addEventListener )
    Elem.addEventListener(EventName,HandlerFunc,CaptureFlag);
  else
    Elem.attachEvent('on'+EventName,HandlerFunc);
}

function RemoveEventHandler(Elem,EventName,HandlerFunc,CaptureFlag)
{
  if ( Elem.removeEventListener )
    Elem.removeEventListener(EventName,HandlerFunc,CaptureFlag);
  else
    Elem.detachEvent('on'+EventName,HandlerFunc);
}

function NumWord(Num,Form1,Form2,Form5)
{
  Num=Num%100;
  if ( (Num>=11) && (Num<=19) )
    return Form5;
  Num=Num%10;
  if ( Num==1 )
    return Form1;
  if ( (Num>=2) && (Num<=4) )
    return Form2;
  return Form5;
}
