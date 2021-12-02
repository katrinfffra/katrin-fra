
/* (C) 2006-2011 Alexey Loktev, loktev (at) tut by */

var Tree_StorageDoc; // документ, где хранятся данные дерева
/*
хранимые данные:
TreeStrId
IdFieldI;
ParentFieldI;
NameFieldI;
NameExtFieldI;
AccessFieldI;
StyleFieldI;  // -1 - невидимая вершина, иначе - номер стиля
TreeArray;
TreeIndexesH; // хэш, где иду соответствует {'tree_index','parent_id'};
FieldsInfo;
RootNodeId;
ExcludeNodesH;
TreeContainerDivName;
TreeOverContainerDivName;
ComboContainerDivName;
SelectedKeyValue;
SelectedKeyValueSetted;
PrevSelectedKeyValue;
PrevSelectedKeyValueSetted;
DesiredSelectedKeyValue; желательное значение, !=-1 устанавливается если не смогли установиться куда затребовано
StartSelectedKeyValue; установленное снаружи значение, не изменяется при выборе мышью из дерева
VisibleKeysH;
MaxLevel;
AccessValuesArray; // значения доступа: [0] - значение "удалена" [1] - значение "скрыта"  [2] - значение "норма"
TreeInitializing; // дерево в процессе первого построения
Options;
CheckedH;  // помеченные чекбоксами вершины; 0-нет, 1-да, 2-серое
ValueObject;
DroppedDown;
FirstRootItemKeyValue - самый первый из ключей, выделение по дефолту
CurrentFilterExpr - текущее выражение фильтра, используется только снаружи
ContainerDocument - документ, в котором располагается дерево (т.е. фрейм)
ChildNodesH - хэш, по иду вершины получаем массив идов дочерних вершин
OnChangeHandlersA - массив вызовов, которые надо сделать при изменении выбора
EnabledMode - разрешено ли к раскрытию и щелчкам
*/

function Tree_UpdateValueObject(Storage)
{
  if ( Storage.ValueObject )
    switch ( Storage.Options.CheckBoxMode )
    {
      case 1:
        Storage.ValueObject.value=Storage.SelectedKeyValue;
        break;
      case 2:
        var ValueItemsA=[];
        for ( Key in Storage.CheckedH )
          if ( (Storage.CheckedH[Key]) && Tree_GetCheckBoxEnabled(Storage,Key) )
            ValueItemsA.push(Key);
        Storage.ValueObject.value=ValueItemsA.join(",");
        break;
      case 3:
        var ValueItemsA=[];
        for ( Key in Storage.CheckedH )
          if ( (Storage.CheckedH[Key]!=2) && Tree_GetCheckBoxEnabled(Storage,Key) )
            ValueItemsA.push(Key+':'+Storage.CheckedH[Key]);
        Storage.ValueObject.value=ValueItemsA.join(",");
        break;
    }
}

function Tree_IsChildOf(Storage,ParentId,ChildRow)
{
  return (ChildRow[Storage.ParentFieldI]==ParentId)&&!(ChildRow[Storage.IdFieldI] in Storage.ExcludeNodesH);
}

function Tree_SetStorageDoc(StorageDoc)
{
  if ( Tree_StorageDoc && (Tree_StorageDoc!=StorageDoc) )
    alert('Tree_SetStorageDoc: re-set!');
  Tree_StorageDoc=StorageDoc;
}

function Tree_GetStorage(TreeStrId)
{
  if ( ! (TreeStrId in Tree_StorageDoc.ChildrenPermanentInfo) )
  {
    alert('Tree_GetStorage: '+TreeStrId+' not found');
    return null;
  }
  return Tree_StorageDoc.ChildrenPermanentInfo[TreeStrId];
}

function GetNextKeyField(TableStrId)
{
  var NextKey=GetShiftedKeyField(TableStrId,1);
  if ( NextKey!=-1 )
    return NextKey;
  return GetShiftedKeyField(TableStrId,-1);
}

function GetShiftedKeyField(TreeStrId,ShiftVal)
{
  var Storage=Tree_GetStorage(TreeStrId);

  var SelectedI=GetSelectedRowIndex(Storage.TreeArray,Storage.IdFieldI,Storage.SelectedKeyValue);
  var ChildrenOf=Storage.TreeArray[SelectedI][Storage.ParentFieldI];
  var SelfFound=false;
  var LastBeforeKey=-1;
  var FirstAfterKey=-1;
  for ( var i=0; i<Storage.TreeArray.length; i++ )
    //if ( Storage.TreeArray[i][Storage.ParentFieldI]==ChildrenOf )
    if ( Tree_IsChildOf(Storage,ChildrenOf,Storage.TreeArray[i]) )
      if ( Storage.TreeArray[i][Storage.IdFieldI]==Storage.SelectedKeyValue )
        SelfFound=true;
      else
        if ( SelfFound )
        {
          FirstAfterKey=Storage.TreeArray[i][Storage.IdFieldI];
          break;
        }
        else
          LastBeforeKey=Storage.TreeArray[i][Storage.IdFieldI];

  return (ShiftVal==1)?FirstAfterKey:LastBeforeKey;
}

function Tree_ExpandAll(TreeStrId)
{
  var Storage=Tree_GetStorage(TreeStrId);

  Storage.ExpandedKeys.length=0;
  //for ( var i=0; i<Storage.TreeArray.length; i++ )
  //  Storage.ExpandedKeys[Storage.ExpandedKeys.length]=Storage.TreeArray[i][Storage.IdFieldI];
  for ( Id in Storage.ChildNodesH )
    Storage.ExpandedKeys.push(Id);
  Tree_ReShowTree(TreeStrId,true);
  Tree_ScrollIntoView(TreeStrId,Storage.SelectedKeyValue);
}

function Tree_CollapseAll(TreeStrId)
{
  var Storage=Tree_GetStorage(TreeStrId);
  Storage.ExpandedKeys.length=0;
  Tree_ReShowTree(TreeStrId,true);
  Tree_ScrollIntoView(TreeStrId,Storage.SelectedKeyValue);
}

function Tree_GetNodeStyleName(Storage,SelectedI)
{
  //var Storage=Tree_GetStorage(TreeStrId);
  if ( Storage.AccessFieldI!=-1 )
  {
    var Access=Storage.TreeArray[SelectedI][Storage.AccessFieldI];
    if ( Access==Storage.AccessValuesArray[1] )
      return "SShowTreeFolderHidden";
  }
  if ( Storage.StyleFieldI!=-1 )
  {
    var StyleI=Storage.TreeArray[SelectedI][Storage.StyleFieldI];
    return "SShowTreeFolder"+StyleI;
  }
  return "SShowTreeFolder";
}

function Tree_GetDivNameByKeyValue(TreeStrId,KeyValue)
{
  return "Tree_"+TreeStrId+"_Node_Div_"+KeyValue;
}

function Tree_GetCBINameByKeyValue(TreeStrId,KeyValue)
{
  return "Tree_"+TreeStrId+"_Node_CBI_"+KeyValue;
}

function Tree_IsExpanded(Storage,KeyValue)
{
  //var Storage=Tree_GetStorage(TreeStrId);
  for ( var i=0; i<Storage.ExpandedKeys.length; i++ )
    if ( Storage.ExpandedKeys[i]==KeyValue )
      return true;
  return false;
}

function Tree_ScrollIntoView(TreeStrId,KeyValue)
{
  var CellName=Tree_GetDivNameByKeyValue(TreeStrId,KeyValue)+"_scrollanchor";
  var CellObj=GetObj(CellName);
  if ( CellObj )
    CellObj.scrollIntoView(true);
}

function Tree_Expand(TreeStrId,KeyValue,ReShowFlag,RefreshSelectionFlag)
{
  var Storage=Tree_GetStorage(TreeStrId);
  if ( !Tree_IsExpanded(Storage,KeyValue) )
  {
    Storage.ExpandedKeys[Storage.ExpandedKeys.length]=KeyValue;

    if ( ReShowFlag )
      Tree_ReShowTree(TreeStrId,RefreshSelectionFlag);
  }
}

function Tree_Collapse(TreeStrId,KeyValue,ReShowFlag)
{
  var Storage=Tree_GetStorage(TreeStrId);
  var KeyI=-1;
  for ( var i=0; (i<Storage.ExpandedKeys.length) && (KeyI==-1); i++ )
    if ( Storage.ExpandedKeys[i]==KeyValue )
      KeyI=i;
  if ( KeyI!=-1 )
  {
    var ExpandedKeysOld=Storage.ExpandedKeys;
    var NewLength=0;
    for ( var i=0; i<ExpandedKeysOld.length; i++ )
      if ( i!=KeyI )
        Storage.ExpandedKeys[NewLength++]=ExpandedKeysOld[i];
    Storage.ExpandedKeys.length=NewLength;
  }
  if ( ReShowFlag )
    Tree_ReShowTree(TreeStrId,true);
}

function Tree_Analyse_(Storage,ChildrenOf)
{
  var MaxChildLevel=0;
  var PreSelectedValueExist=false;
  var FirstRootItemKeyValue=-1;

  /*
  for ( var i=0; i<Storage.TreeArray.length; i++ )
  {
    if ( Tree_IsChildOf(Storage,ChildrenOf,Storage.TreeArray[i]) )
    {
      var IdValue=Storage.TreeArray[i][Storage.IdFieldI];
    */
  if ( ChildrenOf in Storage.ChildNodesH )
  {
    var ChildNodesA=Storage.ChildNodesH[ChildrenOf];
    for ( var cn=0; cn<ChildNodesA.length; cn++ )
    {
      var i=ChildNodesA[cn].index;
      var IdValue=ChildNodesA[cn].id;

      Storage.TreeIndexesH[IdValue]={'tree_index':i,'parent_id':ChildrenOf};

      if ( FirstRootItemKeyValue==-1 )
        FirstRootItemKeyValue=IdValue;
      //if ( IdValue in Storage.ChildNodesH )
      {
        var ChildInfo=Tree_Analyse_(Storage,IdValue);
        var ChildLevel=ChildInfo.max_level;
        PreSelectedValueExist=PreSelectedValueExist||ChildInfo.pre_selected_value_exist;
        if ( ChildLevel>MaxChildLevel )
          MaxChildLevel=ChildLevel;
      }
    }
  }
  return {'max_level':MaxChildLevel+1, 'first_root_item_key_value': FirstRootItemKeyValue};
}

function Tree_ShowTreeBranches_(TreeStrId,MaxLevel,ChildrenOf,CurrentLevel,LastFlagsArray)
{
  var Storage=Tree_GetStorage(TreeStrId);

  var LineA=[];
  var LineStr='';

  var ChildrenTreeArray=new Array();

  var ChildNodesA=Storage.ChildNodesH[ChildrenOf];
  if ( ChildNodesA )
  {
    for ( var cn=0; cn<ChildNodesA.length; cn++ )
    {
      var i=ChildNodesA[cn].index;
      
      if ( (Storage.StyleFieldI==-1) || (Storage.TreeArray[i][Storage.StyleFieldI]!=-1) )
      {
        var Id=Storage.TreeArray[i][Storage.IdFieldI];
        if ( ! (Id in Storage.ExcludeNodesH) )
        {
          var Name=Storage.TreeArray[i][Storage.NameFieldI];
          if ( Storage.NameExtFieldI!=-1 )
            Name+=Storage.TreeArray[i][Storage.NameExtFieldI];
          var StyleName=Tree_GetNodeStyleName(Storage,i);

          ChildrenTreeArray.push([Id,Name,StyleName]);
        }
      }
    }

    for ( var i=0; i<ChildrenTreeArray.length; i++ )
    {
      var ChildrenKeyValue=ChildrenTreeArray[i][0];
      var DivName=Tree_GetDivNameByKeyValue(TreeStrId,ChildrenKeyValue);
      var ScrollAnchorName=DivName+'_scrollanchor';
      var StyleName=ChildrenTreeArray[i][2];

      Storage.VisibleKeysH[ChildrenKeyValue]=true;

      // надо знать, есть ли вообще дочерние элементы данного элемента

      var SubChildrenExists=(ChildrenKeyValue in Storage.ChildNodesH);

      var ExpandedFlag=false;
      if ( SubChildrenExists )
        ExpandedFlag=Tree_IsExpanded(Storage,ChildrenKeyValue);

      var LastFlag=(i==ChildrenTreeArray.length-1);
      LastFlagsArray[CurrentLevel-1]=LastFlag;

      LineStr+="<tr id='"+ScrollAnchorName+"'>";

      var SpanCells=1;
      if ( !Storage.Options.TableMode )
      {
        for ( var l=1; l<CurrentLevel; l++ )
        {
          if ( l==CurrentLevel-1 )
            LineStr+=Tree_ComposeImgCell(Storage,LastFlagsArray[l]?Storage.Options.Img_LastBr_FN:Storage.Options.Img_NotLastBr_FN,"","");
          else
            LineStr+=Tree_ComposeImgCell(Storage,LastFlagsArray[l]?Storage.Options.Img_NoneBr_FN:Storage.Options.Img_SkipBr_FN,"","");
        }
        SpanCells=MaxLevel-CurrentLevel+1;
        if ( SubChildrenExists )
          if ( !ExpandedFlag )
          {
            var OnClickHandler='Tree_Expand("'+TreeStrId+'",'+ChildrenKeyValue+',true,true)';
            LineStr+=Tree_ComposeImgCell(Storage,Storage.Options.Img_PlusBr_FN,OnClickHandler,'cursor: hand');
          }
          else
          {
            var OnClickHandler='Tree_Collapse("'+TreeStrId+'",'+ChildrenKeyValue+',true)';
            LineStr+=Tree_ComposeImgCell(Storage,Storage.Options.Img_MinusBr_FN,OnClickHandler,'cursor: hand');
          }
        else
          LineStr+=Tree_ComposeImgCell(Storage,Storage.Options.Img_OrphanBr_FN,"","");
      }

      //LineStr+="<td width=100% colspan="+SpanCells+" style='border: solid red 1px'>";
      LineStr+="<td colspan="+SpanCells+">";

      LineStr+="<table cellspacing='0' cellpadding='0' border=0 class='STable'><tr>";
      LineStr+="<td></td>";
      if ( Storage.Options.CheckBoxMode!=1 )
      {
        var CheckBoxVisInfo=Tree_GetCheckBoxVisInfo(Storage,ChildrenKeyValue);
        var CheckBoxImageId=Tree_GetCBINameByKeyValue(Storage,ChildrenKeyValue);
        LineStr+="<td><img id='"+CheckBoxImageId+"' src='"+CheckBoxVisInfo.filename+"' width="+Storage.Options.Img_CBWidth+" height="+Storage.Options.Img_CBHeight+" onclick='Tree_CheckBoxClicked(\""+TreeStrId+"\","+ChildrenKeyValue+")' style='"+CheckBoxVisInfo.style+"'></td>";
      }
      var Caption=ChildrenTreeArray[i][1];
      if ( Caption=="" )
        Caption=CMSEmptyTextMarker;
      LineStr+="<td onselectstart='return false'><span id='"+DivName+"' class='"+StyleName+"' onClick='Tree_ItemClicked(\""+TreeStrId+"\","+ChildrenKeyValue+");'><nobr>&nbsp;"+Caption+"</nobr></span>";
      LineStr+="</td></tr></table>";

      //LineStr+="???";

      LineStr+="</td></tr>";

      LineA.push(LineStr);
      LineStr='';

      if ( SubChildrenExists && ExpandedFlag )
        LineA.push(Tree_ShowTreeBranches_(TreeStrId,MaxLevel,ChildrenKeyValue,CurrentLevel+1,LastFlagsArray));
    }
  }
  return LineA.join('');
}

function Tree_ComposeImgCell(Storage,FN,OnClickHandler,AuxStyleStr)
{
  var Line="<td style='width: "+Storage.Options.Img_Width+"px'>";

  Line+="<img src='"+Storage.Options.Img_Path+FN+"' width="+Storage.Options.Img_Width+" height="+Storage.Options.Img_Height;
  if ( OnClickHandler!="" )
    Line+=" onclick='"+OnClickHandler+"'"
  if ( AuxStyleStr!="" )
    Line+=" style='"+AuxStyleStr+"'"
  Line+=">";

  //Line+="!!!";

  Line+="</td>";
  return Line;
}

function Tree_ItemClicked(TreeStrId,KeyValue)
{
  var Storage=Tree_GetStorage(TreeStrId);
  Tree_ChangeSelection(TreeStrId,KeyValue,true,true);
  if ( Storage.Options.DropDownMode )
  {
    Tree_UpdateComboText(Storage)
    if ( Storage.DroppedDown && Storage.Options.DropDownSelectAutoClose )
      Tree_DropDownClick(TreeStrId);
  }
}

function Tree_GetCheckBoxState(Storage,KeyValue)
{
  if ( KeyValue in Storage.CheckedH )
    return Storage.CheckedH[KeyValue];
  if ( Storage.Options.CheckBoxMode==2 )
    return 0;
  return 2;
}

function Tree_IsSubChildOf(Storage,ParentId,ChildId)
{
  while ( ChildId!=Storage.RootNodeId )
  {
    ChildId=Storage.TreeIndexesH[ChildId].parent_id;
    if ( ChildId==ParentId )
      return true;
  }
  return false;
}

function Tree_GetCheckBoxEnabled(Storage,KeyValue)
{
  if ( (!Storage.Options.DisableChildForParent[0]) && (!Storage.Options.DisableChildForParent[1]) && (!Storage.Options.DisableChildForParent[2]) )
    return true;

  while ( true )
  {
    KeyValue=Storage.TreeIndexesH[KeyValue].parent_id;
    if ( KeyValue==Storage.RootNodeId )
      break;

    var State=Tree_GetCheckBoxState(Storage,KeyValue);
    if ( Storage.Options.DisableChildForParent[State] )
      return false;
  }
  
  return true;
}

function Tree_GetCheckBoxVisInfo(Storage,KeyValue)
{
  var State=Tree_GetCheckBoxState(Storage,KeyValue);
  var Enabled=Tree_GetCheckBoxEnabled(Storage,KeyValue);
  return {
    filename:(Storage.Options.Img_Path+(Enabled?Storage.Options.Img_CBEnA[State]:Storage.Options.Img_CBDisA[State])),
    style:(Enabled?'cursor:hand':'')
    };
}

function Tree_CheckBoxClicked(TreeStrId,KeyValue)
{
  var Storage=Tree_GetStorage(TreeStrId);
  var State=Tree_GetCheckBoxState(Storage,KeyValue);
  var MaxState=(Storage.Options.CheckBoxMode==2)?1:2;
  var NewState=(State>=MaxState)?0:(State+1);
  Storage.CheckedH[KeyValue]=NewState;
  Tree_UpdateCheckBoxState(Storage,KeyValue);
  Tree_UpdateValueObject(Storage);
  if ( Storage.Options.DisableChildForParent[State]!=Storage.Options.DisableChildForParent[NewState] )
  {
    for ( Id in Storage.VisibleKeysH )
      if ( Tree_IsSubChildOf(Storage,KeyValue,Id) )
        Tree_UpdateCheckBoxState(Storage,Id);
  }
}

function Tree_UpdateCheckBoxState(Storage,KeyValue)
{
  var CheckBoxImageId=Tree_GetCBINameByKeyValue(Storage,KeyValue);
  var CheckBoxVisInfo=Tree_GetCheckBoxVisInfo(Storage,KeyValue);
  GetObj(CheckBoxImageId).src=CheckBoxVisInfo.filename;
}

function Tree_ShowTreeBranches(TreeStrId)
{
  var Storage=Tree_GetStorage(TreeStrId);
  Storage.VisibleKeysH={};
  var LastFlagsArray=new Array();
  return Tree_ShowTreeBranches_(TreeStrId,Storage.MaxLevel,Storage.RootNodeId,1,LastFlagsArray);
}

function Tree_PreloadImages(Storage)
{
  var ImgPath=Storage.Options.Img_Path;

  PreloadImage(ImgPath+Storage.Options.Img_LastBr_FN);
  PreloadImage(ImgPath+Storage.Options.Img_NotLastBr_FN);
  PreloadImage(ImgPath+Storage.Options.Img_NoneBr_FN);
  PreloadImage(ImgPath+Storage.Options.Img_SkipBr_FN);
  PreloadImage(ImgPath+Storage.Options.Img_OrphanBr_FN);
  PreloadImage(ImgPath+Storage.Options.Img_MinusBr_FN);
  PreloadImage(ImgPath+Storage.Options.Img_PlusBr_FN);

  if ( Storage.Options.CheckBoxMode>=2 )
  {
    PreloadImage(ImgPath+Storage.Options.Img_CBEnA[0]);
    PreloadImage(ImgPath+Storage.Options.Img_CBEnA[1]);
    if ( Storage.Options.CheckBoxMode==3 )
      PreloadImage(ImgPath+Storage.Options.Img_CBEnA[2]);

    if ( Storage.Options.DisableChildForParent[0]||Storage.Options.DisableChildForParent[1]||Storage.Options.DisableChildForParent[2] )
    {
      PreloadImage(ImgPath+Storage.Options.Img_CBDisA[0]);
      PreloadImage(ImgPath+Storage.Options.Img_CBDisA[1]);
      if ( Storage.Options.CheckBoxMode==3 )
        PreloadImage(ImgPath+Storage.Options.Img_CBDisA[2]);
    }
  }

  if ( Storage.DropDownMode ) 
  {
    PreloadImage(ImgPath+Storage.Options.Combo_ImgLeft);
    PreloadImage(ImgPath+Storage.Options.Combo_ImgMiddle);
    PreloadImage(ImgPath+Storage.Options.Combo_ImgRightNormal);
    PreloadImage(ImgPath+Storage.Options.Combo_ImgRightPressed);
  }

}

function Tree_ShowTree(_TreeArray,_IdFieldI,_ParentFieldI,_NameFieldI,_NameExtFieldI,_StyleFieldI,_AccessFieldI,_PreSelectedKeyValue,_ContainerDivName,_FieldsInfo,_AccessValuesArray,TreeStrId,_RootNodeId,_ExcludeNodesH,_Options,_OriginalCheckedH,_ValueObject)
{
  if ( !Tree_StorageDoc.ChildrenPermanentInfo[TreeStrId] )
  {
    Tree_StorageDoc.ChildrenPermanentInfo[TreeStrId]=new Array();
    var Storage=Tree_StorageDoc.ChildrenPermanentInfo[TreeStrId];
    Storage.ExpandedKeys=new Array();
  }
  else
    var Storage=Tree_StorageDoc.ChildrenPermanentInfo[TreeStrId];

  Storage.TreeInitializing=true;

  Storage.TreeStrId=TreeStrId;
  Storage.IdFieldI=_IdFieldI;
  Storage.ParentFieldI=_ParentFieldI;
  Storage.NameFieldI=_NameFieldI;
  Storage.NameExtFieldI=_NameExtFieldI;
  Storage.AccessFieldI=_AccessFieldI;
  Storage.StyleFieldI=_StyleFieldI;
  Storage.RootNodeId=_RootNodeId;
  Storage.ExcludeNodesH=_ExcludeNodesH;
  Storage.Options=_Options;
  Storage.TreeContainerDivName=_ContainerDivName;
  Storage.ComboContainerDivName=_ContainerDivName;
  Storage.FieldsInfo=_FieldsInfo;
  Storage.AccessValuesArray=_AccessValuesArray;
  Storage.ValueObject=_ValueObject;
  Storage.DroppedDown=false;
  Storage.CurrentFilterExpr="???";
  Storage.ContainerDocument=this;
  Storage.OnChangeHandlersA=[];
  Storage.EnabledMode=true;

  if ( Storage.ValueObject )
    Storage.ValueObject['tree_str_id']=Storage.TreeStrId;

  Tree_PreloadImages(Storage);

  Tree_SetArray(TreeStrId,_TreeArray,_PreSelectedKeyValue);

  if ( Storage.Options.DropDownMode )
  {
    Storage.TreeContainerDivName=_ContainerDivName+"_Combo";
    Storage.TreeOverContainerDivName=_ContainerDivName+"_OverDiv";

    //alert(Storage.Options.Combo_Width);
    var CenterWidth=Storage.Options.Combo_Width-Storage.Options.Combo_ImgLeftWidth-Storage.Options.Combo_ImgRightWidth;
    var Line='<table cellspacing=0 cellpadding=0 border=0 class="SShowTreeDroppedDownControlTable" style="width: '+Storage.Options.Combo_Width+'px; overflow: hidden">';
    Line+='<col style="width: '+Storage.Options.Combo_ImgLeftWidth+'px"><col style="width: '+CenterWidth+'px"><col style="width: '+Storage.Options.Combo_ImgRightWidth+'px"><tr>';
    Line+='<td style="width: '+Storage.Options.Combo_ImgLeftWidth+'px"><img src="'+Storage.Options.Img_Path+Storage.Options.Combo_ImgLeft+'"></td>';
    var ClickHandler="Tree_DropDownClick('"+TreeStrId+"')";
    var ComboCaptionCellId=TreeStrId+"_combocaptioncell";
    Line+='<td style="width: '+CenterWidth+'px; background-image: url(\''+Storage.Options.Img_Path+Storage.Options.Combo_ImgMiddle+'\'); background-repeat: repeat-x; padding: 2px; cursor: hand" onmousedown="'+ClickHandler+'">';
    Line+='<div id="'+ComboCaptionCellId+'" style="overflow: hidden; height: 14px; width: 1000px" onselectstart="return false">';
    Line+=Storage.Options.DropDownComboDefText;
    Line+='</div>';
    Line+='</td>';
    var ComboRightImgId=TreeStrId+"_comborightimg";
    Line+='<td style="cursor: hand; width: '+Storage.Options.Combo_ImgRightWidth+'px"><img id="'+ComboRightImgId+'" src="'+Storage.Options.Img_Path+Storage.Options.Combo_ImgRightNormal+'" onclick="'+ClickHandler+'"></td>';
    Line+='</tr></table>';
    var ContainerClassName=Storage.Options.TableMode?'SShowTreeDroppedDownTableContainerDiv':'SShowTreeDroppedDownTreeContainerDiv';
    Line+='<div id="'+Storage.TreeOverContainerDivName+'" class="SShowTreeDroppedDownOverContainerDiv"><div id="'+Storage.TreeContainerDivName+'" class="'+ContainerClassName+'"></div></div>';
    GetObj(Storage.ComboContainerDivName).innerHTML=Line;
  }

  Tree_SetValues(TreeStrId,_PreSelectedKeyValue);

  Storage.TreeInitializing=false;
}

function Tree_SetValues(TreeStrId,_PreSelectedKeyValue)
{
  var Storage=Tree_GetStorage(TreeStrId);

  Storage.CheckedH={};
  if ( Storage.ValueObject )
  {
    switch ( Storage.Options.CheckBoxMode )
    {
      case 1:
        if ( Storage.ValueObject.value in Storage.TreeIndexesH )
        {
          Storage.SelectedKeyValue=Storage.ValueObject.value;
          Storage.DesiredSelectedKeyValue=-1;
        }
        else
        {
          Storage.SelectedKeyValue=Storage.FirstRootItemKeyValue;
          Storage.DesiredSelectedKeyValue=Storage.ValueObject.value;
        }
        Storage.SelectedKeyValueSetted=true;
        break;
      case 2:
        var CheckedA=Storage.ValueObject.value.split(",");
        for ( var i=0; i<CheckedA.length; i++ )
        {
          var Val=CheckedA[i];
          if ( Val!="" )
            Storage.CheckedH[Val]=1;
        }
        break;
      case 3:
        var CheckedA=Storage.ValueObject.value.split(",");
        for ( var i=0; i<CheckedA.length; i++ )
        {
          var Val=CheckedA[i];
          if ( Val!="" )
          {
            var ValA=Val.split(":");
            Storage.CheckedH[ValA[0]]=Number(ValA[1]);
          }
        }
        break;
    }

  }
  else
  {
    if ( _PreSelectedKeyValue in Storage.TreeIndexesH )
    {
      Storage.SelectedKeyValue=_PreSelectedKeyValue;
      Storage.DesiredSelectedKeyValue=-1;
    }
    else
    {
      Storage.SelectedKeyValue=Storage.FirstRootItemKeyValue;
      Storage.DesiredSelectedKeyValue=_PreSelectedKeyValue;
    }
    Storage.SelectedKeyValueSetted=true;
  }

  if ( (!Storage.Options.DropDownMode) || Storage.DroppedDown )
  {
    Tree_ExpandForSelected(Storage);
    Tree_ReShowTree(Storage.TreeStrId,false);
  }

  if ( Storage.Options.CheckBoxMode==1 )
  {
    if ( (!Storage.Options.DropDownMode) || Storage.DroppedDown )
    {
      Tree_ChangeSelection(Storage.TreeStrId,Storage.SelectedKeyValue,false,true);
      Tree_ScrollIntoView(Storage.TreeStrId,Storage.SelectedKeyValue);
    }
    else
      Tree_UpdateComboText(Storage);
  }

}

function Tree_ExpandForSelected(Storage)
{
  if ( Storage.Options.CheckBoxMode==1 )
    Tree_ExpandFor(Storage,Storage.SelectedKeyValue);
  else
  {
    for ( Key in Storage.CheckedH )
      Tree_ExpandFor(Storage,Key);
  }
}

function Tree_ExpandFor(Storage,KeyValue)
{
  if ( KeyValue in Storage.TreeIndexesH )
    while ( true )
    {
      KeyValue=Storage.TreeIndexesH[KeyValue].parent_id;
      if ( (KeyValue==Storage.RootNodeId) && (KeyValue==-1) )
        break;
      if ( !(KeyValue in Storage.TreeIndexesH) )
        break;
      Tree_Expand(Storage.TreeStrId,KeyValue,false,false);
    }
}

function Tree_UpdateComboText(Storage)
{
  //var Storage=Tree_GetStorage(TreeStrId);
  if ( Storage.SelectedKeyValue in Storage.TreeIndexesH )
  {
    var SelectedI=Storage.TreeIndexesH[Storage.SelectedKeyValue].tree_index;
    var ComboCaptionCellId=Storage.TreeStrId+"_combocaptioncell";
    var ComboCaption=Storage.TreeArray[SelectedI][Storage.NameFieldI];
    if ( ComboCaption=="" )
      ComboCaption=CMSEmptyTextMarker;
    GetObj(ComboCaptionCellId).innerHTML=ComboCaption;
  }
}

function Tree_SetEnabledMode(TreeStrId,EnabledMode)
{
  var Storage=Tree_GetStorage(TreeStrId);
  if ( Storage.EnabledMode!=EnabledMode )
  {
    Tree_DropUp(TreeStrId);
    Storage.EnabledMode=EnabledMode;
    if ( Storage.Options.DropDownMode )
    {
      var ComboCaptionCellId=TreeStrId+"_combocaptioncell";
      var ComboCaptionCellObj=GetObj(ComboCaptionCellId);
      ComboCaptionCellObj.style.color=(EnabledMode?'':CMSFrameField_Disabled_TextColor);
      ComboCaptionCellObj.style.backgroundColor=(EnabledMode?'':CMSFrameField_Disabled_BgColor);
      ComboCaptionCellObj.style.cursor=(EnabledMode?'':'default');
    }
  }
}

function Tree_DropUp(TreeStrId)
{
  var Storage=Tree_GetStorage(TreeStrId);
  if ( 'TreeStrId' in Storage )
    if ( Storage.Options.DropDownMode && Storage.DroppedDown )
      Storage.ContainerDocument.Tree_DropDownClick(TreeStrId);
}

function Tree_DropDownClick(TreeStrId)
{
  var Storage=Tree_GetStorage(TreeStrId);

  if ( Storage.EnabledMode )
  {
    if ( !Storage.DroppedDown )
    {
      // надо посхлопывать все остальные деревья
      for ( _TreeStrId in Tree_StorageDoc.ChildrenPermanentInfo )
        if ( _TreeStrId!=TreeStrId )
          Tree_DropUp(_TreeStrId);
    }

    Storage.DroppedDown=!Storage.DroppedDown;
    var ComboRightImgId=TreeStrId+"_comborightimg";
    GetObj(ComboRightImgId).src=Storage.Options.Img_Path+(Storage.DroppedDown?Storage.Options.Combo_ImgRightPressed:Storage.Options.Combo_ImgRightNormal);

    var TreeOverDivObj=GetObj(Storage.TreeOverContainerDivName);
    if ( Storage.DroppedDown )
    {
      Tree_ExpandForSelected(Storage);
      Tree_ReShowTree(TreeStrId,false);
      Tree_ChangeSelection(TreeStrId,Storage.SelectedKeyValue,false,true);
      Tree_ScrollIntoView(TreeStrId,Storage.SelectedKeyValue);
      TreeOverDivObj.style.visibility='visible';
    }
    else
      TreeOverDivObj.style.visibility='hidden';
  }
}

function Tree_UpdateContainer(TreeStrId)
{
  var Storage=Tree_GetStorage(TreeStrId);

  var TreeOverDivObj=GetObj(Storage.TreeOverContainerDivName);
  var ComboDivObj=GetObj(Storage.ComboContainerDivName);
  var TreeDivObj=GetObj(Storage.TreeContainerDivName);

  var ComboPos=GetObjectPos(Storage.ComboContainerDivName);
  var OverDivLeft=ComboPos.left;
  var OverDivTop=ComboPos.top+ComboDivObj.offsetHeight;
  TreeOverDivObj.style.left=OverDivLeft;
  TreeOverDivObj.style.top=OverDivTop;

  var ClientSize=GetWindowClientSize();

  var DesiredWidth=TreeDivObj.offsetWidth+25;
  var DesiredHeight=TreeDivObj.offsetHeight+2;

  var MinLeftOffset=2;
  var MinRightOffset=2;
  var MinTopOffset=2;
  var MinBottomOffset=2;

  if ( DesiredWidth<Storage.Options.Combo_Width )
    DesiredWidth=Storage.Options.Combo_Width;
  var MaxNoShiftWidth=ClientSize.width-OverDivLeft-MinRightOffset;
  var MaxWidth=ClientSize.width-MinRightOffset-MinLeftOffset;
  if ( DesiredWidth<=MaxNoShiftWidth )
    TreeOverDivObj.style.width=DesiredWidth+"px";
  else if ( DesiredWidth<=MaxWidth )
  {
    TreeOverDivObj.style.width=DesiredWidth+"px";
    TreeOverDivObj.style.left=(OverDivLeft-(DesiredWidth-MaxNoShiftWidth))+"px";
  }
  else
  {
    TreeOverDivObj.style.width=MaxWidth+"px";
    TreeOverDivObj.style.left=MinLeftOffset+"px";
    DesiredHeight+=20;
  }

  var MaxHeight=ClientSize.height-OverDivTop-MinBottomOffset;
  if ( MaxHeight>=DesiredHeight )
    TreeOverDivObj.style.height=DesiredHeight+"px";
  else
  {
    var MaxHeight2=ComboPos.top-MinTopOffset;
    if ( Storage.Options.TableMode && (MaxHeight2>MaxHeight) )
    {
      // если это таблица и выше комбика больше места, можно разложить вверх
      if ( MaxHeight2>=DesiredHeight )
      {
        TreeOverDivObj.style.top=(ComboPos.top-DesiredHeight)+"px";
        TreeOverDivObj.style.height=DesiredHeight+"px";
      }
      else
      {
        TreeOverDivObj.style.top=MinTopOffset+"px";
        TreeOverDivObj.style.height=MaxHeight2+"px";
      }
    }
    else
      TreeOverDivObj.style.height=MaxHeight+"px";
  }
}

function Tree_ChangeSelection(TreeStrId,NewSelectedKeyValue,AutoExpand,EnableUpdateDetailFields)
{
  var Storage=Tree_GetStorage(TreeStrId);

  if ( AutoExpand && Storage.Options.EnableAutoExpand )
    Tree_Expand(TreeStrId,NewSelectedKeyValue,true,false);

  if ( Storage.SelectedKeyValueSetted && (Storage.Options.CheckBoxMode==1) )
  {
    var DivName=Tree_GetDivNameByKeyValue(TreeStrId,Storage.SelectedKeyValue);
    //var DivObj=document.all[DivName];
    var DivObj=document.getElementById(DivName);
    if ( DivObj )
    {
      var SelectedI=GetSelectedRowIndex(Storage.TreeArray,Storage.IdFieldI,Storage.SelectedKeyValue);
      var StyleName=Tree_GetNodeStyleName(Storage,SelectedI);
      DivObj.className=StyleName;
    }
  }

  Storage.SelectedKeyValue=NewSelectedKeyValue;
  Storage.SelectedKeyValueSetted=true;
  Storage.DesiredSelectedKeyValue=-1;

  if ( Storage.SelectedKeyValueSetted && (Storage.Options.CheckBoxMode==1) && Storage.Options.EnableSelectedHighlight )
  {
    var DivName=Tree_GetDivNameByKeyValue(TreeStrId,Storage.SelectedKeyValue);
    //var DivObj=document.all[DivName];
    var DivObj=document.getElementById(DivName);
    if ( DivObj )
      DivObj.className="SShowTreeFolderSelected";
  }

  if ( (!Storage.PrevSelectedKeyValueSetted) || (Storage.PrevSelectedKeyValue!=Storage.SelectedKeyValue) )
  {
    Storage.PrevSelectedKeyValueSetted=true;
    Storage.PrevSelectedKeyValue=Storage.SelectedKeyValue;
  }

  if ( Tree_StorageDoc.Event_TreeNodeSelected )
    Tree_StorageDoc.Event_TreeNodeSelected(TreeStrId,Storage.SelectedKeyValue);

  if ( EnableUpdateDetailFields )
    UpdateDetailFields(TreeStrId,'');

  if ( Storage.Options.DropDownMode )
    Tree_UpdateComboText(Storage);

  Tree_UpdateValueObject(Storage);

  for ( var i=0; i<Storage.OnChangeHandlersA.length; i++ )
    eval(Storage.OnChangeHandlersA[i]);
}

function UpdateDetailFields(TreeStrId,FrameStrId)
{
  var Storage=Tree_GetStorage(TreeStrId);

  if ( Storage.FieldsInfo.length )
  {
    var SelectedI=GetSelectedRowIndex(Storage.TreeArray,Storage.IdFieldI,Storage.SelectedKeyValue);

    var BeforeExists=false;
    var AfterExists=false;
    var SelfFound=false;
    if ( SelectedI!=-1 )
    {
      var ChildrenOf=Storage.TreeArray[SelectedI][Storage.ParentFieldI];
      var ChildNodesA=Storage.ChildNodesH[ChildrenOf];
      for ( var cn=0; cn<ChildNodesA.length; cn++ )
      {
        if ( ChildNodesA[cn].id==Storage.SelectedKeyValue )
          SelfFound=true;
        else
          if ( SelfFound )
            AfterExists=true;
          else
            BeforeExists=true;
      }

      UpdateDetailFieldsCommon(FrameStrId,Storage.FieldsInfo,Storage.TreeArray[SelectedI],SelectedI,Storage.AccessValuesArray,BeforeExists,AfterExists);
    }
  }
}

function Tree_ReShowTree(TreeStrId,RefreshSelectionFlag)
{
  var Storage=Tree_GetStorage(TreeStrId);

  var LineStr="";

  if ( Storage.Options.ExpandAllMode )
  {
    LineStr+='<nobr>';
    LineStr+='<input type="button" class="SShowTreeButton" value="'+Storage.Options.ExpandAll_Caption+'" onclick="javascript:Tree_ExpandAll(\''+TreeStrId+'\');">'
    LineStr+='<input type="button" class="SShowTreeButton" value="'+Storage.Options.CollapseAll_Caption+'" onclick="javascript:Tree_CollapseAll(\''+TreeStrId+'\');">'
    LineStr+='</nobr>';
  }

  LineStr+="<table cellspacing=0 cellpadding=0 border=0 class='STable' style='font-size: 5px'>";
  LineStr+=Tree_ShowTreeBranches(TreeStrId);
  LineStr+="</table>";

  var TreeContainerDivObj=GetObj(Storage.TreeContainerDivName);
  TreeContainerDivObj.innerHTML=LineStr;

  if ( Storage.SelectedKeyValueSetted )
  {
    var VisFlag=false;
    while ( (!VisFlag) && (Storage.SelectedKeyValue!=-1) )
    {
      if ( Storage.SelectedKeyValue in Storage.VisibleKeysH )
        VisFlag=true;
      var ParentFound=false;
      if ( !VisFlag )
      {
        // SelectedKeyValue не виден, перейдём к родителю
        if ( Storage.SelectedKeyValue in Storage.TreeIndexesH )
        {
          Storage.SelectedKeyValue=Storage.TreeIndexesH[Storage.SelectedKeyValue].parent_id;
          RefreshSelectionFlag=true;
          ParentFound=true;
        }
      }
      if ( !ParentFound )
        break;
    }
    //if ( RefreshSelectionFlag )
      Tree_ChangeSelection(TreeStrId,Storage.SelectedKeyValue,false,true);
  }

  if ( Storage.Options.DropDownMode )
    Tree_UpdateContainer(TreeStrId);
}

function Tree_SetExcludeNodes(TreeStrId,_ExcludeNodesH)
{
  var Storage=Tree_GetStorage(TreeStrId);
  Storage.ExcludeNodesH=_ExcludeNodesH;
  if ( (!Storage.Options.DropDownMode) || Storage.DroppedDown )
    Tree_ReShowTree(TreeStrId,false);
}

function Tree_SetArray(TreeStrId,_TreeArray,_PreSelectedKeyValue)
{
  var Storage=Tree_GetStorage(TreeStrId);

  {
    Storage.SelectedKeyValue=0;
    Storage.SelectedKeyValueSetted=false;
    Storage.PrevSelectedKeyValue=0;
    Storage.PrevSelectedKeyValueSetted=false;
    Storage.DesiredSelectedKeyValue=-1;
    Storage.StartSelectedKeyValue=-1;
  }

  Storage.TreeArray=_TreeArray;

  // подготовим список дочерних вершин для каждой вершины
  Storage.ChildNodesH={};
  for ( var i=0; i<Storage.TreeArray.length; i++ )
  {
    var ChildRow=Storage.TreeArray[i];
    var ParentId=ChildRow[Storage.ParentFieldI];
    if ( Tree_IsChildOf(Storage,ParentId,ChildRow) )
    {
      var Id=ChildRow[Storage.IdFieldI];
      if ( !(ParentId in Storage.ChildNodesH) )
        Storage.ChildNodesH[ParentId]=[];
      Storage.ChildNodesH[ParentId].push({id:Id,index:i});
    }
  }
  //alert(GetObjectProps(Storage.ChildNodesH));

  Storage.TreeIndexesH={};

  var TreeInfo=Tree_Analyse_(Storage,Storage.RootNodeId/*,_PreSelectedKeyValue*/);
  Storage.MaxLevel=TreeInfo.max_level-1;
  Storage.FirstRootItemKeyValue=TreeInfo.first_root_item_key_value;
}
