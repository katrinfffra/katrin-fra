var ImagesPath=RootDirRel+"images/";
var JSCachePath=RootDirRel+"js_cache/";

function SendVote(VoteQuestId,VoteDivId,ShowNextButton)
{
  var FormId="IVoteForm"+VoteQuestId;
  var FormObj=GetObj(FormId);
  var VoteRadioObj=FormObj.vote;
  var SelectedVote=GetRadioGroupValue(VoteRadioObj);
  if ( !SelectedVote )
    alert("Выберите пожалуйста Ваш вариант ответа!");
  else
  {
    var VoteText='';
    if ( 'votetext' in FormObj )
      VoteText=FormObj.votetext.value;
    var ArgsH={vq:VoteQuestId, va:SelectedVote, vd:VoteDivId, vt:VoteText, nb:ShowNextButton};
    Ajax_LoadToDiv(VoteDivId,'','vt',ArgsH);

    var SecDivId="IVoteSec"+VoteQuestId; // "лишняя" форма голосования
    var SecDivObj=GetObj(SecDivId);
    if ( SecDivObj )
      SecDivObj.innerHTML="";
  }
}

function SendMultiVote(VoteQuestId,VoteDivId,ShowNextButton)
{
  var FormId="IVoteForm"+VoteQuestId;
  var FormObj=GetObj(FormId);
  var AnswersA=[];
  for ( var I=0; I<FormObj.elements.length; I++ )
    if ( FormObj.elements[I].checked )
      AnswersA.push(FormObj.elements[I].value);
  if ( !AnswersA.length )
    alert("Выберите пожалуйста хотя бы один вариант ответа!");
  else
  {
    var VoteText='';
    if ( 'votetext' in FormObj )
      VoteText=FormObj.votetext.value;
    var ArgsH={vq:VoteQuestId, va:AnswersA.join(","), vd:VoteDivId, vt:VoteText, nb:ShowNextButton};
    Ajax_LoadToDiv(VoteDivId,'','vt',ArgsH);

    var SecDivId="IVoteSec"+VoteQuestId; // "лишняя" форма голосования
    var SecDivObj=GetObj(SecDivId);
    if ( SecDivObj )
      SecDivObj.innerHTML="";
  }
  
}

function SendVoteSkip(VoteQuestId,VoteDivId)
{
  AjaxLoad(VoteDivId,'','vs','vq='+VoteQuestId+'&vd='+VoteDivId);
}

var GroupsList_SortFieldName;
function GroupsList_Compare(Row1,Row2)
{
  var Val1=Row1[GroupsList_SortFieldName];
  var Val2=Row2[GroupsList_SortFieldName];
  if ( Val1<Val2 )
    return -1;
  if ( Val1>Val2 )
    return 1;
  return 0;
}

function GroupsList_Recompose(SortFieldName)
{
  var GroupsList_Arr=[];
  for ( var j in GroupsList_Array )
    GroupsList_Arr.push(GroupsList_Array[j]);

  GroupsList_SortFieldName=SortFieldName;
  GroupsList_Arr.sort(GroupsList_Compare);

  var Line='';
  Line+=GroupsList_TableHeader;
  for ( var i=0; i<GroupsList_Arr.length; i++ )
  {
    var DataRowH=GroupsList_Arr[i];
    Line+="<tr>";
    Line+="<td class='C'>"+DataRowH['kind']+"</td>";
    Line+="<td class='L'>"+DataRowH['course']+"</td>";
    Line+="<td class='NW'>"+DataRowH['time']+"</td>";
    Line+="<td class='C NW'>"+DataRowH['date']+"</td>";
    if ( GroupsList_ShowAcceptColumn )
      Line+="<td>"+DataRowH['accept']+"</td>";
    Line+="</tr>";
  }
  Line+='</table>';

  GetObj('IGroupsListContainer').innerHTML=Line;
}

function ViewSlides_PreFormatCode(Code)
{
  Code=Code.split('\n ').join('\n&nbsp;&nbsp;');
  
  var PrevLength=0;
  while ( true )
  {
    Code=Code.split('&nbsp; ').join('&nbsp;&nbsp;&nbsp;');
    if ( PrevLength==Code.length )
      break;
    PrevLength=Code.length;
  }
  /*
  if ( OptionsH.codepreformatted )
  {
    Code=Code.split(" ").join("&nbsp;");
    Code=Code.split("\r\n").join("<br>");
  }
  */
  
  return Code;
}
