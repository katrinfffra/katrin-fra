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

function ComposeExamples(ExamplesA,OptionsH)
{
  var Str="";

  if ( !OptionsH )
    OptionsH={};
  if ( !('fixed' in OptionsH) )
    OptionsH.fixed=true;
  if ( !('leftcolperc' in OptionsH) )
    OptionsH.leftcolperc=50;
  if ( !('codepreformatted' in OptionsH) )
    OptionsH.codepreformatted=false;
  if ( !('vertical' in OptionsH) )
    OptionsH.vertical=false;
  if ( !('leftfontsize' in OptionsH) )
    OptionsH.leftfontsize=15;
  var autoQuoteAttrs=OptionsH.autoquoteattrs||false;

  var TableStyle='';
  if ( OptionsH.fixed )
    TableStyle='table-layout: fixed'
  Str+="<table class='SExamplesTable' style='"+TableStyle+"'>";
  if ( OptionsH.fixed )
    Str+="<col style='width: "+OptionsH.leftcolperc+"%'><col style='width: "+(100-OptionsH.leftcolperc)+"%'>";
  Str+="<tr><th>HTML-код</th>";
  if ( !OptionsH.vertical )
    Str+="<th>Отображение в браузере</th>";
  Str+="</tr>";
  for ( var i=0; i<ExamplesA.length; i++ )
  {
    var ExampleH=ExamplesA[i];
    if ( !('printpreview' in ExampleH) )
      ExampleH.printpreview=false;
    Str+="<tr>";
    var CodeStyle="font-size: "+OptionsH.leftfontsize+"px";
    Str+="<td class='SCode' style='"+CodeStyle+"' "+(ExampleH.printpreview?" rowspan=3":"")+">";
    var Code=ExampleH.code;

    if ( autoQuoteAttrs ) {
      //console.log(Code);
      var attrRE=/\b([a-zA-Z0-9\-]+)=(?:'([а-яА-Яa-zA-Z0-9 ,\/\.:#\-%();"_\$!@]+)'|([a-zA-Z0-9\.\-]+\b))/g;
      Code=Code.replace(attrRE,function(all,attrname,attrval1,attrval2) {
        var attrval=attrval1||attrval2||"";
        //console.log(attrval);
        var urlRE=/\burl\("[^"]+"\)/g;
        attrval=attrval.replace(urlRE,function(url) {
          //console.log(url);
          return url.split("\"").join("'");
        });
        return attrname+"="+'"'+attrval+'"';
      });
      //console.log(Code);
    }

    Code=Code.replace(/\%\([^%]+\)\%/g,"");
    Code=HTMLSpecialChars(Code);
    Code=Code.split('$$$ ').join('$$$&nbsp;&nbsp;');
    var PrevLength=0;
    while ( true )
    {
      Code=Code.split('&nbsp; ').join('&nbsp;&nbsp;&nbsp;');
      if ( PrevLength==Code.length )
        break;
      PrevLength=Code.length;
    }
    if ( OptionsH.codepreformatted )
    {
      Code=Code.split(" ").join("&nbsp;");
      Code=Code.split("\r\n").join("<br>");
    }
    Code=Code.split('$$$').join('<br>');

    Str+=Code;
    Str+="</td>";

    if ( OptionsH.vertical )
    {
      Str+="</tr>";
      Str+="<tr><th>Отображение в браузере</th></tr>";
      Str+="<tr>";
    }

    Str+="<td class='R'>";
    var Res=ExampleH.printpreview?ExampleH.screencode:ExampleH.code;
    Res=Res.split('$$$').join(' ');
    Res=Res.split('%(').join('');
    Res=Res.split(')%').join('');
    Str+=Res;
    Str+="</td>";
    Str+="</tr>";
    if ( ExampleH.printpreview )
    {
      Str+="<tr><th>Отображение на принтере</th></tr>";
      Str+="<tr><td class='R'>";
      var Res=ExampleH.printcode;
      Res=Res.split('$$$').join(' ');
      Res=Res.split('%(').join('');
      Res=Res.split(')%').join('');
      Str+=Res;
      Str+="</td></tr>";
    }
  }
  Str+="</table>";
  return Str;
}

function ComposeFootBall()
{
  var Str="";
  Str+="    <table style='width: 100%'>";
  Str+="        <tr><td colspan=2 style='padding: 10px; text-align: center; background-color: lightblue; color: blue; font-size: 20px; border-style: none'>ПРИВЕТ УЧАСТНИКАМ СОРЕВНОВАНИЙ!</tr>";
  Str+="        <tr>";
  Str+="          <td style='vertical-align: top; width: 25%; padding: 10px; background-color: khaki; border-style: none'>";
  Str+="            <p><b>Виды спорта:</b></p>";
  Str+="            <ul style='padding-left: 20px'>";
  Str+="              <li><a href='a'>конькобежный спорт</a>";
  Str+="              <li><a href='a'>биатлон</a>";
  Str+="              <li><a href='a'>футбол</a>";
  Str+="              <li><a href='a'>стрельба из лука</a>";
  Str+="              <li><a href='a'>прыжки в длину</a>";
  Str+="              <li><a href='a'>прыжки в высоту</a>";
  Str+="              <li><a href='a'>фигурное катание</a>";
  Str+="              <li><a href='a'>синхронное плавание</a>";
  Str+="              <li><a href='a'>шахматы</a>";
  Str+="              <li><a href='a'>шашки</a>";
  Str+="            </ul>";
  Str+="          </td>";
  Str+="          <td style='vertical-align: top; padding: 0 10px 10px 20px; border-style: none; background: url(\"images/ball.jpg\") top right repeat-y'>";
  Str+="            <h3 style='text-align: center'>ФУТБОЛ</h3>";
  Str+="            <img src='images/football.jpg' style='float: left; margin-right: 20px; margin-bottom: 10px'>";
  Str+="            <p>Футбол &mdash; командный вид спорта, в котором целью является забить мяч в ворота соперника ногами или другими частями тела (кроме рук) большее количество раз, чем команда соперника.</p>";
  Str+="            <p>Есть 17 официальных правил игры, каждое из которых содержит список оговорок и руководящих принципов. Эти правила предназначены для применения на всех уровнях футбола, хотя есть некоторые изменения для таких групп, как юниоры, взрослые, женщины и люди с ограниченными физическими возможностями. Законы очень часто формулировались в общих чертах, которые позволяют упростить их применения в зависимости от характера игры.</p>";
  Str+="          </td>";
  Str+="        </tr>";
  Str+="        <tr><td colspan=2 style='padding: 20px; text-align: center; background-color: lightblue; color: blue; font-size: 20px; border-style: none'>ГЛАВНОЕ НЕ ПОБЕДА, А УЧАСТИЕ!</tr>";
  Str+="      </table>";
  return Str;
}

function ComposeFootBallWide()
{
  var Str="";
  Str+="    <table style='width: 100%'>";
  Str+="        <tr><td colspan=2 style='padding: 10px; text-align: center; background-color: lightblue; color: blue; font-size: 20px; border-style: none'>ПРИВЕТ УЧАСТНИКАМ СОРЕВНОВАНИЙ!</tr>";
  Str+="        <tr>";
  Str+="          <td style='vertical-align: top; width: 25%; padding: 10px; background-color: khaki; border-style: none'>";
  Str+="            <p><b>Виды спорта:</b></p>";
  Str+="            <ul style='padding-left: 20px'>";
  Str+="              <li><a href='a'>конькобежный спорт</a>";
  Str+="              <li><a href='a'>биатлон</a>";
  Str+="              <li><a href='a'>футбол</a>";
  Str+="              <li><a href='a'>стрельба из лука</a>";
  Str+="              <li><a href='a'>прыжки в длину</a>";
  Str+="              <li><a href='a'>прыжки в высоту</a>";
  Str+="              <li><a href='a'>фигурное катание</a>";
  Str+="            </ul>";
  Str+="          </td>";
  Str+="          <td style='vertical-align: top; padding: 0 10px 10px 20px; border-style: none; background: url(\"images/ball.jpg\") top right repeat-y'>";
  Str+="            <h3 style='font-size: 17px; text-align: center'>ФУТБОЛ</h3>";
  Str+="            <img src='images/football.jpg' style='float: left; margin-right: 20px; margin-bottom: 10px'>";
  Str+="            <p>Футбол &mdash; командный вид спорта, в котором целью является забить мяч в ворота соперника ногами или другими частями тела (кроме рук) большее количество раз, чем команда соперника.</p>";
  Str+="            <p>Есть 17 официальных правил игры, каждое из которых содержит список оговорок и руководящих принципов.</p>";
  Str+="          </td>";
  Str+="        </tr>";
  Str+="        <tr><td colspan=2 style='padding: 10px; text-align: center; background-color: lightblue; color: blue; font-size: 20px; border-style: none'>ГЛАВНОЕ НЕ ПОБЕДА, А УЧАСТИЕ!</tr>";
  Str+="      </table>";
  return Str;
}

function ComposeFootBallNarrow()
{
  var Str="";
  Str+="<div style='width: 200px'>";
  Str+="            <h3 style='font-size: 17px; text-align: center'>ФУТБОЛ</h3>";
  Str+="            <img src='images/football.jpg' style='width: 100%'>";
  Str+="            <p>Футбол &mdash; командный вид спорта, в котором целью является забить мяч в ворота соперника ногами или другими частями тела (кроме рук) большее количество раз, чем команда соперника.</p>";
  Str+="            <p>Есть 17 официальных правил игры, каждое из которых содержит список оговорок и руководящих принципов.</p>";
  Str+="            <p style='margin-bottom:5px'><b>Виды спорта:</b></p><div style='font-size: 13px'>";
  Str+="              <a href='a'>конькобежный спорт</a>&nbsp;&nbsp;";
  Str+="              <a href='a'>биатлон</a>&nbsp;";
  Str+="              <a href='a'>футбол</a>&nbsp;&nbsp;";
  Str+="              <a href='a'>стрельба из лука</a>&nbsp;";
  Str+="              <a href='a'>прыжки в длину</a>&nbsp;";
  Str+="              <br><a href='a'>прыжки в высоту</a>&nbsp;";
  Str+="              <br><a href='a'>фигурное катание</a>&nbsp;";
  Str+="</div>";
  Str+="</div'>";

  return Str;
}

function ComposeYoutubeEmbeddedVideo(VideoId,Width,Height,ObjectId,EmbedId)
{
  var HeightDelta=30;
  return ''+
    '<object'+(((ObjectId==undefined)?'':' id="'+ObjectId+'"'))+' width="'+Width+'" height="'+(Height+HeightDelta)+'">'+
    '<param name="movie" value="http://www.youtube.com/v/'+VideoId+'?version=3&amp;hl=ru_RU&amp;rel=0"></param>'+
    '<param name="allowFullScreen" value="true"></param>'+
    '<param name="allowscriptaccess" value="always"></param>'+
    '<param name="wmode" value="transparent">'+
    '<embed'+(((EmbedId==undefined)?'':' id="'+$EmbedId+'"'))+' src="http://www.youtube.com/v/'+VideoId+'?version=3&amp;hl=ru_RU&amp;rel=0" type="application/x-shockwave-flash" width="'+Width+'" height="'+(Height+HeightDelta)+'" allowscriptaccess="always" allowfullscreen="true" wmode="transparent"></embed>'+
    '</object>';
}

var Footer_StartPageNum;
var Footer_CurrPageNum=0;
var Footer_CourseName;
var LessonContentsA=[];
var CurrHTMLFileName="";
var NextAnchorNumber=0;

function InitLesson(CourseName,StartPageNum,HTMLFileName)
{
  Footer_StartPageNum=StartPageNum;
  Footer_CurrPageNum=StartPageNum;
  Footer_CourseName=CourseName;
  CurrHTMLFileName=HTMLFileName;
  AnchorNumber=1;
}

function ShowFooter()
{
  var Str="";

  Str+="<div class='Footer'>";
  Str+="<table style='width: 100%'>";
  Str+="<tr>";
  Str+="<td class='T' style='width: 52%'>"+Footer_CourseName+"</td>";
  Str+="<td rowspan=2 style='padding: 0 7mm 0 7mm'>"+Footer_CurrPageNum+"</td>";
  Str+="<td class='T' style='width: 48%; text-align: right'>Учебное пособие (версия "+HTMLCSS_VersionNum+")</td>";
  Str+="</tr>";
  Str+="<tr>";
  Str+="<td class='B'>Программа Front-end Developer</td>";
  Str+="<td class='B' style='text-align: right'>Алексей Локтев</td>";
  Str+="</tr>";
  Str+="</table>";
  Str+="</div>";

  Footer_CurrPageNum++;
  document.write(Str);
}

/*
function ShowLessonPage(LessonName,ThemeName)
{
  var Str='';

  Str+='<div class="SLessonPage">';
  Str+=LessonName+"<br><b>"+ThemeName+"</b>";
  Str+='</div>';

  document.write(Str);

  LessonContentsA.push({'title':LessonName+'. '+ThemeName,'page':Footer_CurrPageNum,'level':1});
}
*/

function ComposeLessonHeader(LessonNumber,LessonName,ShowFlag)
{
  if ( ShowFlag==undefined )
    ShowFlag=true;
  var AnchorName="ANCHOR"+(AnchorNumber++);
  LessonContentsA.push({'title':(LessonNumber+" "+LessonName),'page':Footer_CurrPageNum,'level':1,'html':CurrHTMLFileName,'anchor':AnchorName});
  document.write("<a name='"+AnchorName+"'></a>");
  if ( ShowFlag )
    document.write("<div class='SThemeName'><b>"+LessonNumber+"</b> "+LessonName+"</div>");
}

function ComposeHeader(Header,ShowFlag,ContentsFlag)
{
  if ( ShowFlag==undefined )
    ShowFlag=true;
  if ( ContentsFlag==undefined )
    ContentsFlag=true;
  if ( ContentsFlag )
  {
    var AnchorName="ANCHOR"+(AnchorNumber++);
    LessonContentsA.push({'title':Header,'page':Footer_CurrPageNum,'level':2,'html':CurrHTMLFileName,'anchor':AnchorName});
    document.write("<a name='"+AnchorName+"'></a>");
  }
  if ( ShowFlag )
    document.write("<div class='SParaName'>"+Header+"</div>");
}

function ComposeContents(StartPageNumVarName)
{
  var Str='<BR><BR><BR>ОГЛАВЛЕНИЕ<br>';
  for ( var C=0; C<LessonContentsA.length; C++ )
  {
    var LessonH=LessonContentsA[C];
    Str+='<br>['+StartPageNumVarName+'+'+(LessonH.page-Footer_StartPageNum)+','+LessonH.level+',"'+LessonH.title.split("<br>").join(" ").split("<br />").join("&lt;br&gt;")+'","'+LessonH.html+'","'+LessonH.anchor+'"],';
  }
  Str+="<BR><BR>";
  document.write(Str);
}

function ComposeContentsPage(ContentsA)
{
  var Str="";

  Str+="<div class='STotalContents'>";
  for ( var L=0; L<ContentsA.length; L++ )
  {
    var ContentA=ContentsA[L];
    var PageNum=ContentA[0];
    var Level=ContentA[1];
    var Title=ContentA[2];
    var HTMLFileName=ContentA[3];
    var AnchorName=ContentA[4];

    var TableClassName="SContent"+Level;
    var HrefText="<a href='"+HTMLFileName+"#"+AnchorName+"' target='_blank'>";

    var TitleA=Title.split("<br>");
    for ( var T=0; T<TitleA.length; T++ )
    {
      if ( T==TitleA.length-1 )
      {
        var LeftPad=0;
        if ( T )
          LeftPad+=15;
        Str+="<table class='"+TableClassName+"'><tr><td class='T' style='padding-left: "+LeftPad+"px'>"+HrefText+TitleA[T]+"</a></td><td class='B'></td><td class='P'>"+HrefText+PageNum+"</a></td></tr></table>";
      }
      else
        Str+="<table class='"+TableClassName+"'><tr><td class='T'>"+HrefText+TitleA[T]+"</a></td><td></td><td></td></tr></table>";
    }


  }
  Str+="</div>";

  document.write(Str);
}

function ProcessCode(Code)
{
  Code=HTMLSpecialChars(Code);
  Code=Code.split('$$$ ').join('$$$&nbsp;&nbsp;');
  var PrevLength=0;
  while ( true )
  {
    Code=Code.split('&nbsp; ').join('&nbsp;&nbsp;&nbsp;');
    if ( PrevLength==Code.length )
      break;
    PrevLength=Code.length;
  }
  Code=Code.split('$$$').join('<br>');
  return Code;
}

function ComposeTagInfo(InfosA,OptionsH)
{
 
  if ( OptionsH==undefined )
    OptionsH={};

  var PropPerc=OptionsH.propperc||'';
  var PropLineHeight=OptionsH.proplineheight||'';
  
  var TagStyleA=[];
  //HeaderStyleA.push('font-size: '+FontSize+'px');
  //if ( HeaderPerc!='' )
  //  HeaderStyleA.push('width: '+HeaderPerc+'%');

  var PropStyleA=[];
  PropValueStylesA=[];
  //ArgStyleA.push('font-size: '+FontSize+'px');
  if ( PropPerc!='' )
    PropStyleA.push('width: '+PropPerc+'%');
  if ( PropLineHeight!='' )
    PropValueStylesA.push('line-height: '+PropLineHeight);


  var TagStyles=TagStyleA.join(';');
  var PropsStyles=PropStyleA.join(';');
  var PropValueStyles=PropValueStylesA.join(';');

  var Str='';
  Str+="<table class='SExamplesTable'>";
  Str+="<tr><th style='"+TagStyles+"'><b>тег</b>, <i>описание</i></th><th style='"+PropsStyles+"'>основные <b style='color:blue'>атрибуты</b>, <b style='color:green'>стилевые&nbsp;свойства</b></th></tr>";

  for ( var I=0; I<InfosA.length; I++ )
  {
    var InfoH=InfosA[I];

    var Tag=InfoH.tag;
    Tag=Tag.split("$$$  ").join("$$$&nbsp;&nbsp;&nbsp;&nbsp;");
    Tag=Tag.split("$$$").join("<br>");
    Tag=Tag.split(" - ").join("&nbsp;&mdash; ");

    var Props=InfoH.props;
    Props=Props.split("$$$  ").join("$$$&nbsp;&nbsp;&nbsp;&nbsp;");
    Props=Props.split("$$$").join("<br>");
    Props=Props.split(" - ").join("&nbsp;&mdash; ");

    Str+="<tr>";
    Str+="<td style='"+/*HeaderStyles+*/"'>";
    if ( Tag!="" )
      Str+="<b style='display: block; padding-bottom: 5px'>"+Tag+"</b>";
    Str+="<div style='font-style: italic'>"+InfoH.description+"</div>";
    Str+="</td>";
    Str+="<td style='"+PropValueStyles+"'>"+Props+"</td>";
    Str+="</tr>";
  }

  Str+="</table>";
  return Str;
}

function ComposeNotesPage()
{
  var ComposedPage=Footer_CurrPageNum;
  document.write("<div class='SPage SPageHTML'>");
  ComposeHeader('Для заметок',true,false);
  for ( var L=1; L<23; L++ )
    document.write("<div style='height: 1cm; border-bottom: solid #BBBBBB 1px'></div>");
  ShowFooter();
  document.write("</div>");
  return ComposedPage;
}
