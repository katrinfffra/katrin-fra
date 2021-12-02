/* (C) 2005-2014 Alexey Loktev, loktev (at) tut by */

function CMS_SetButtonEnableS(ButtonStr,EnableFlag)
{
  var ButtonObj;
  eval('ButtonObj='+ButtonStr+';');
  if ( ButtonObj )
    ButtonObj.disabled=EnableFlag?false:true;
}

function UpdateDetailFieldsCommon(FrameStrId,FieldsInfo,DataRow,SelectedI,AccessValues,OrderUpEnabled,OrderDownEnabled)
{
  var DropDownClosedH={};
  var DetailFramesH={};
  for ( var f=0; f<FieldsInfo.length; f++ )
  {
    var AssignToElement=FieldsInfo[f][4];
    if ( AssignToElement!="" )
    {

      var FieldFrameStrId=FieldsInfo[f][7];
      if ( (FrameStrId!="") && (FrameStrId!=FieldFrameStrId) )
        continue;

      //var FieldFrameObj=parent.frames[FieldFrameStrId];
      var FieldFrameObj=IFrame_GetSiblingWindow(FieldFrameStrId);
      if ( !FieldFrameObj.LoadedFlag )
        continue;

      DetailFramesH[FieldFrameStrId]=true;

      if ( FieldFrameObj.ButtonInsertExists && !FieldFrameObj.ButtonUpdateExists )
        continue;

      if ( !(FieldFrameStrId in DropDownClosedH) )
      {
        DropDownClosedH[FieldFrameStrId]=true;
        if ( FieldFrameObj.Controls_CloseAllDropDowns )
          FieldFrameObj.Controls_CloseAllDropDowns();
      }

      var FieldI=FieldsInfo[f][0];
      var FieldV=DataRow[FieldI];
      var AssignMethod=FieldsInfo[f][5];

      // AssignMethod:
      // 0 - просто строка
      // 1 - кнопки access с именами ButtonAccess0..ButtonAccess2
      // 2 - ссылка-div с именем файла
      // 3 - ссылка-div с именем файла + img с файлом
      // 4 - radio-контрол
      // 5 - кнопки order с именами ButtonOrderUp, ButtonOrderDown
      // 6 - checkbox
      // 7 - memo
      // 8 - ссылка-div с именем файла и ссылкой на уменьшенную копию файла
      // 9 - combo
      // 10 - дерево
      switch ( AssignMethod )
      {
        case 0:
          //eval(AssignToElement+'=br2nl(FieldV);');
          eval(AssignToElement+'=FieldV;');
          break;
        case 1:
          CMS_SetButtonEnableS(AssignToElement+'GetObj("ButtonAccess0")',FieldV!=AccessValues[0]);
          CMS_SetButtonEnableS(AssignToElement+'GetObj("ButtonAccess1")',FieldV!=AccessValues[1]);
          CMS_SetButtonEnableS(AssignToElement+'GetObj("ButtonAccess2")',FieldV!=AccessValues[2]);
          break;
        case 3:
        {
          var FileDirFieldIndex=FieldsInfo[f][6];
          var FileDir=DataRow[FileDirFieldIndex];
          var ImgId=AssignToElement+"_img";
          eval(ImgId+'.style.display="none";');
          if ( FieldV!="" )
          {
            var FileExt=GetFileExt(FieldV);
            if ( InArray(FileExt,['JPG','JPEG','PNG','GIF']) )
            {
              //eval(ImgId+'.src="'+FileDir+'/'+FieldV+'";');
              //eval(ImgId+'.style.display="";');
              eval('var DivContObj='+ImgId);
              DivContObj.innerHTML="<img src='"+FileDir+'/'+FieldV+"'>";
              DivContObj.style.display="";
            }
            else if ( FileExt=="SWF" )
            {
              //console.log(AssignToElement);
              
              //var AjaxDivId="AjaxFieldDiv";
              //var LineStr="<div id='"+AjaxDivId+"'>bbb</div>";

              /*
              LineStr='';
              LineStr+='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"';
              LineStr+=' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0"';
              LineStr+=' align=""';
              LineStr+='>';
              LineStr+='<param name="movie" value="'+FileDir+'/'+FieldV+'">';
              LineStr+='<param name="quality" value="high">';
              LineStr+='<param name="wmode" value="transparent">';

              LineStr+='<embed src="'+FileDir+'/'+FieldV+'" quality="high"';
              LineStr+=' wmode="transparent"';
              LineStr+=' align="middle" type="application/x-shockwave-flash"';
              LineStr+='>';

              LineStr+='</object>';
              */

              eval('var DivContObj='+ImgId);
              //console.log(DivContObj);
              DivContObj.innerHTML='';
              DivContObj.style.display="";
              
              JsHttpRequest.query(AjaxHandlerPage,{af:'ScaledSWF',h:FileDir+'/'+FieldV,mw:ShowMethod314_MaxWidth,mh:ShowMethod314_MaxHeight,e:ImgId},CMSAjaxReady);
            }
          }
        }
        // Ќ≈–ј«–џ¬Ќќ
        case 2:
        case 8:
        {
          var FileDirFieldIndex=FieldsInfo[f][6];
          //var FileDir=Array[SelectedI][FileDirFieldIndex];
          var FileDir=DataRow[FileDirFieldIndex];
          var FieldVEncoded=urlencode(FieldV);
          var FilePFN=FileDir+'/'+FieldVEncoded;

          var DivId=AssignToElement+"_div";
          var HrefId=AssignToElement+"_href";
          eval(DivId+'.innerHTML="'+FieldV+'";');
          eval(HrefId+'.href="'+FilePFN+'";');

          var HrefId3=AssignToElement+"_href3";
          if ( FieldVEncoded=='' )
            eval(HrefId3+'.innerHTML="";');
          else
          {
            var DivId3=AssignToElement+"_div3";
            var DBFieldName='?';
            eval('DBFieldName='+DivId3+'.innerHTML;');
            eval(HrefId3+'.href="javascript:CMSFrameFields_RenameFile(\''+DBFieldName+'\',\''+FieldVEncoded+'\')";');
            eval(HrefId3+'.innerHTML="rename";');
          }
          //eval(DivId3+'.innerHTML="";');

          if ( AssignMethod==8 )
          {
            var FileExt=GetFileExt(FilePFN);
            var EnableResized=InArray(FileExt,["JPG","JPEG","PNG"]);
            var DivId2=AssignToElement+"_div2";
            if ( EnableResized )
            {
              var HrefId2=AssignToElement+"_href2";
              eval(DivId2+'.innerHTML="preview";');
              eval(HrefId2+'.href="GetScaledImage.php?mw='+ShowMethod314_MaxWidth+'&mh='+ShowMethod314_MaxHeight+'&fpn='+FilePFN+'";');
            }
            else
              eval(DivId2+'.innerHTML="";');
          }

          break;
        }
        case 4: // radio
        {
          eval("SetRadioGroupValue("+AssignToElement+","+FieldV+");");
          break;
        }
        case 5:
          eval('var ContainerObj='+AssignToElement);
          var ButtObj=ContainerObj.getElementById('ButtonOrderUp');
          if ( ButtObj )
            ButtObj.disabled=!OrderUpEnabled;
          var ButtObj=ContainerObj.getElementById('ButtonOrderDown');
          if ( ButtObj )
            ButtObj.disabled=!OrderDownEnabled;
          var ButtObj=ContainerObj.getElementById('ButtonOrderTop');
          if ( ButtObj )
            ButtObj.disabled=!OrderUpEnabled;
          var ButtObj=ContainerObj.getElementById('ButtonOrderBottom');
          if ( ButtObj )
            ButtObj.disabled=!OrderDownEnabled;
          break;
        case 6:
          eval(AssignToElement+'=((FieldV==1)?true:false);');
          break;
        case 7:
          eval(AssignToElement+'=br2nl(FieldV);');
          break;
        case 9:  // combo
          // AssignToElement - полный путь к объекту комбо
          eval('var ComboObj='+AssignToElement);
          var ComboWindow=ComboObj.CMS_Window;
          ComboWindow.CMSFrameFields_UpdateCombo(ComboObj,FieldV);
          break;
        case 10: // дерево
          eval(AssignToElement+'=FieldV;');
          var OriginFieldName=FieldsInfo[f][8];
          var FieldFrameObj=IFrame_GetSiblingWindow(FieldFrameStrId);
          var TreeStrId=FieldFrameObj.FrameStrId+'_Tree_'+OriginFieldName;
          FieldFrameObj.Tree_SetValues(TreeStrId,-1);
          var Storage=FieldFrameObj.Tree_GetStorage(TreeStrId);
          Storage.StartSelectedKeyValue=FieldV;
          break;
      }
    }
  }

  // пол€ дитэйлов изменились - проапдейтим там кондишны
  for ( FieldFrameStrId in DropDownClosedH )
  {
    //var FieldFrameObj=parent.frames[FieldFrameStrId];
    var FieldFrameObj=IFrame_GetSiblingWindow(FieldFrameStrId);
    FieldFrameObj.CMSFrameFields_UpdateConditions();
  }

  for ( FieldFrameStrId in DetailFramesH )
  {
    var FieldFrameObj=IFrame_GetSiblingWindow(FieldFrameStrId);
    FieldFrameObj.FormChangedFlag=false;
  }

}

function GetSelectedRowIndex(Arr,KeyFieldI,SelectedKeyValue)
{
  var SelectedI=-1;
  if ( /*Arr &&*/ Arr.length && Arr[0] )
    for ( var i=0; i<Arr.length; i++ )
    {
      if ( Arr[i][KeyFieldI]==SelectedKeyValue )
      {
        SelectedI=i;
        break;
      }
    }
  return SelectedI;
}
