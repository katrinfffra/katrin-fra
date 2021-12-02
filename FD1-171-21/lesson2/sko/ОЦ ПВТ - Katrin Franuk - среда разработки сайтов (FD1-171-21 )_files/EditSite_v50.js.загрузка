var BlocksWidth=310;

var CropLeft;
var CropRight;
var CropTop;
var CropBottom;
var CropBorderWidth=1;

// здесь сохраняются скролл+курсор редактируемых файлов для восстановления
var EditPosH={}; // fileid:{scrolltop:X,selectionstart:X,selectionend:X}
var EnableStoreEditPos=true;

if ( window.localStorage && window.localStorage.EditPos )
{
  var EPH=JSON.parse(window.localStorage.EditPos);
  for ( var FileId in EPH )
  {
    var EP=EPH[FileId];
    if ( EP.scrolltop || EP.selectionstart || EP.selectionend )
      EditPosH[FileId]=EP;
  }
}

function RemoveFractionZeros(S)
{
  while ( S.substr(-1)=="0" )
    S=S.slice(0,-1);
  if ( S.substr(-1)=="." )
    S=S.slice(0,-1);
  return S;
}

function FormatFileSize(FileSize)
{
  if ( FileSize<1000 )
    return FileSize+"б";
  var MulA=[{mul:1024,caption:'кб'},{mul:1024*1024,caption:'мб'},{mul:1024*1024*1024,caption:'гб'}]
  for ( var M=0; M<MulA.length; M++ )
  {
    var Mul=MulA[M].mul;
    var Caption=MulA[M].caption;
    var FileSizeMul=FileSize/Mul;
    if ( FileSize<=9.99*Mul )
      return RemoveFractionZeros(FileSizeMul.toFixed(2))+Caption;
    if ( FileSize<=99.9*Mul )
      return RemoveFractionZeros(FileSizeMul.toFixed(1))+Caption;
    if ( FileSize<=999*Mul )
      return FileSizeMul.toFixed(0)+Caption;
  }
  return RemoveFractionZeros((FileSize/1024/1024/1024/1024).toFixed(2))+"тб";
}

var FilesArray_IdToIndexH={};

function FilesArrayPrepare()
{
  for ( var F=0; F<Files_RowsCount; F++ )
  {
    var FileRow=Files_Array[F];
    var Id=FileRow[Files_ID];
    FilesArray_IdToIndexH[Id]=F;
    var TreeItemText=FileRow[Files_FILENAME];
    var FileType=FileRow[Files_FILETYPE];
    var PostfixA=[];
    if ( FileType!==1 )
    {
      PostfixA.push(FormatFileSize(FileRow[Files_FILESIZE]));
      //PostfixA.push(new Date().getMinutes()+":"+new Date().getSeconds());
      switch ( FileType )
      {
        case 11:
        case 12:
        case 13:
          PostfixA.push("картинка "+FileRow[Files_IMAGE_WIDTH]+"x"+FileRow[Files_IMAGE_HEIGHT]);
          break;
        case 14:
          PostfixA.push("картинка");
          break;
        case 20:
          PostfixA.push("веб-страница");
          break;
        case 25:
          PostfixA.push("стилевой файл");
          break;
        case 30:
          PostfixA.push("JavaScript-файл");
          break;
        case 35:
          PostfixA.push("JSON-файл");
          break;
        case 40:
          PostfixA.push("flash-ролик "+FileRow[Files_IMAGE_WIDTH]+"x"+FileRow[Files_IMAGE_HEIGHT]);
          break;
        case 45:
          PostfixA.push("SVG-изображение");
          break;
        case 50:
          PostfixA.push("шрифтовой файл");
          break;
        case 60:
          PostfixA.push("текстовый файл");
          break;
        case 71:
        case 72:
          PostfixA.push("аудио");
          break;
      }
      TreeItemText+=" ("+PostfixA.join("; ")+")";
    }
    FileRow[Files_TREEITEMTEXT]=TreeItemText;
  }

  // обновим список папок в комбике с "перенести файл в папку"
  var FoldersA=[];
  for ( var F=0; F<Files_RowsCount; F++ )
  {
    var FileRow=Files_Array[F];
    var FileType=FileRow[Files_FILETYPE];
    var FileId=FileRow[Files_ID];
    if ( FileType==1 )
    {
      var FullPath=FileRow[Files_FILENAME];
      var CurrParentFolderId=FileRow[Files_FOLDER];
      while ( CurrParentFolderId>0 )
      {
        if ( !(CurrParentFolderId in FilesArray_IdToIndexH) )
        {
          FullPath=null;
          break;
        }
        var CurrParentFolderIndex=FilesArray_IdToIndexH[CurrParentFolderId];
        var CurrFileRow=Files_Array[CurrParentFolderIndex];
        CurrParentFolderId=CurrFileRow[Files_FOLDER];
        FullPath=CurrFileRow[Files_FILENAME]+" / "+FullPath;
      }
      if ( FullPath )
        FoldersA.push("<option value="+FileId+">"+FullPath+"</option>");
    }
  }
  FoldersA.sort();
  var MoveToComboObj=GetObj('IEditSite_MoveToFolders');
  MoveToComboObj.innerHTML=FoldersA.join();

}

function EditSite_ComposeAllBlocks()
{
  EditSite_ComposeBlock_Permanent();
  //EditSite_ComposeBlock_Project();
  EditSite_ComposeBlock_FileStructure();
  EditSite_ComposeBlock_Folder();
  EditSite_ComposeBlock_File();
  EditSite_ComposeBlock_ImageView();
  EditSite_ComposeBlock_TextEdit();
  EditSite_ComposeBlock_Player();
}

function EditSite_ComposeBlock_Permanent()
{
  var Lines="";

  Lines+="<div id='IEditSiteLogo' class='SEditSite_Block' style='width: "+BlocksWidth+"px; height: 80px'>";
  Lines+="<table style='width: 100%'><tr>";
  Lines+="<td style='padding: 10px 0 0 2px'><img src='images/logo3.png'></td>";
  Lines+="<td style='width: 100%; text-align: center; vertical-align: middle'>Образовательный центр<br>программирования и высоких технологий<div style='padding: 7px 0 7px 0'><b>Среда разработки сайтов</b></div>"+AuthorizedPersonFIO+"&nbsp;&nbsp;<a href='EditSite.php?logout'>выход</a></td>";

  Lines+="</tr></table>";
  Lines+="</div>";

  Lines+="<div id='IEditSitePermanent' class='SEditSite_Block' style='width: "+BlocksWidth+"px'>";
  Lines+="<h1>Действия над списком проектов</h1>";

  if ( Projects_RowsCount )
  {
    Lines+="<div class='SEditSite_Row'>перейти к проекту:<br><select id='IEditSite_GoToSelectedProject_Combo' style='width: 220px'>";
    for ( var P=0; P<Projects_RowsCount; P++ )
    {
      var ProjectRow=Projects_Array[P];
      var ProjectId=ProjectRow[Projects_ID];
      var ProjectName=ProjectRow[Projects_NAME];
      var SelectedStr=(ProjectId==SiteId)?" selected":"";
      Lines+="<option value='"+ProjectId+"'"+SelectedStr+">"+HTMLValue(ProjectName)+"</option>";
    }
    Lines+="</select><input type='button' value='перейти' style='width: 80px' onclick='EditSite_GoToSelectedProject()'></div>";
  }

  Lines+="<div class='SEditSite_Row'>";
  Lines+="<input type='button' value='создать новый проект' style='width: 150px' onclick='EditSite_CreateNewProject()'>";
  Lines+="<input type='button' value='удалить проект' style='width: 150px' onclick='EditSite_DeleteProject()'>";
  Lines+="</div>";

  Lines+="</div>";

  document.write(Lines);
}

/*
function EditSite_ComposeBlock_Project()
{
  var Lines="";

  Lines+="<div id='IEditSiteProject' class='SEditSite_Block' style='width: "+BlocksWidth+"px'>";
  Lines+="<h1>Действия с выбранным проектом</h1>";

  Lines+="<div class='SEditSite_Row'>";
  Lines+="<input type='button' value='сделать копию проекта' style='width: 150px' disabled><br>";
  Lines+="<input type='button' value='переименовать проект' style='width: 150px' disabled>";
  Lines+="<input type='button' value='удалить проект' style='width: 150px' disabled>";
  Lines+="</div>";

  Lines+="</div>";

  document.write(Lines);
}
*/

function EditSite_ComposeBlock_FileStructure()
{
  var Lines="";

  Lines+="<div id='IEditSiteFileStructure' class='SEditSite_Block' style='overflow: scroll; width: "+BlocksWidth+"px; height: 200px'>";
  Lines+="<h1>Файлы выбранного проекта</h1>";

  Lines+="<div id='IEditSiteFilesTree'></div>";

  Lines+="</div>";

  document.write(Lines);
}

function EditSite_ComposeBlock_Folder()
{
  var Lines="";

  Lines+="<div id='IEditSiteFolder' class='SEditSite_Block' style='width: "+BlocksWidth+"px'>";
  Lines+="<h1>Действия над выбранной папкой</h1>";
  Lines+="<div class='SEditSite_Row'>создать в папке:<br>";
  Lines+="<input type='button' value='новую веб-страницу' style='width: 150px' onclick='EditSite_CreateNewHTML()'>";
  Lines+="<input type='button' value='новый стилевой файл' style='width: 150px' onclick='EditSite_CreateNewCSS()'><br>";
  Lines+="<input type='button' value='новый JavaScript-файл' style='width: 150px' onclick='EditSite_CreateNewJavaScript()'>";
  Lines+="<input type='button' value='новую подпапку' style='width: 150px' onclick='EditSite_CreateNewFolder()'>";
  Lines+="</div>";
  Lines+="<div class='SEditSite_Row'>загрузить файл с компьютера:<br><form enctype='multipart/form-data' method='post'><input type='file' id='IEditSiteUploadedFile' style='width: 220px'><input type='button' value='загрузить' style='width: 80px' onclick='EditSite_UploadFile()'></form></div>";
  Lines+="<div class='SEditSite_Row'>добавить файл из библиотеки:<br><select  id='IEditSite_AddLibraryFile_Combo' style='width: 220px'>";
  Lines+="<option value='0'></option>";
  for ( var L=0; L<LibFiles_RowsCount; L++ )
  {
    var LibFileRow=LibFiles_Array[L];
    Lines+="<option value='"+LibFileRow[LibFiles_ID]+"'>"+LibFileRow[LibFiles_NAME]+"</option>";
  }
  Lines+="</select><input type='button' value='добавить' style='width: 80px'  onclick='EditSite_AddLibFile()'></div>";
  Lines+="<div class='SEditSite_Row'>";
  Lines+="<input type='button' value='переименовать папку' style='width: 150px' onclick='EditSite_RenameFile()'>";
  Lines+="<input type='button' value='удалить папку' style='width: 150px'  onclick='EditSite_DeleteFile()'>";
  Lines+="</div>";
  Lines+="</div>";

  document.write(Lines);
}

function EditSite_ComposeBlock_File()
{
  var Lines="";

  Lines+="<div id='IEditSiteFile' class='SEditSite_Block' style='width: "+BlocksWidth+"px'>";
  Lines+="<h1>Действия над выбранным файлом</h1>";

  Lines+="<div class='SEditSite_Row'>";
  Lines+="<input type='button' value='сделать копию файла' style='width: 150px' disabled>";
  Lines+="</div>";

  Lines+="<div id='IEditSiteFileHTMLEmpty' class='SEditSite_Row'>";
  Lines+="<input type='button' value='типовое наполнение' style='width: 150px' onclick='EditSite_EditText_AddHTMLDefault()'>";
  Lines+="</div>";

  Lines+="<div id='IEditSiteFileHTML' class='SEditSite_Row' style='padding-bottom: 3px'><a href='' target='_blank' id='IEditSiteFileHTMLHref'>просмотреть веб-страницу</a></div>";

  Lines+="<div id='IEditSiteFileImage' class='SEditSite_Row' style='padding-bottom: 3px'><span id='IEditSite_ConvertImageLabel'>преобразовать изображение:</span>";
  Lines+="<table>";
  Lines+="<tr><td>в формат gif</td><td><input type='button' value='преобразовать' style='width: 105px' onclick='EditSite_ConvertImageTo(12)'></td>";
  Lines+="<tr><td>в формат png</td><td><input type='button' value='преобразовать' style='width: 105px'  onclick='EditSite_ConvertImageTo(13)'></td>";
  Lines+="<tr><td>в формат jpeg</td><td><input type='button' value='преобразовать' style='width: 105px'  onclick='EditSite_ConvertImageTo(11)'>с&nbsp;качеством&nbsp;<input id='IEditSiteJPEGQuality' type='text' value='80' style='width: 25px'></td>";
  Lines+="</table>";
  Lines+="</div>";

  Lines+="<div class='SEditSite_Row'>перенести файл в папку:<br><select id='IEditSite_MoveToFolders' style='width: 220px'></select><input type='button' value='перенести' style='width: 80px' onclick='EditSite_MoveFile()'></div>";
  Lines+="<div class='SEditSite_Row'>";
  Lines+="<input type='button' value='переименовать файл' style='width: 150px' onclick='EditSite_RenameFile()'>";
  Lines+="<input type='button' value='удалить файл' style='width: 150px' onclick='EditSite_DeleteFile()'>";
  Lines+="</div>";

  Lines+="</div>";

  document.write(Lines);
}

function EditSite_ComposeBlock_ImageView()
{
  var Lines="";

  Lines+="<div id='IEditSiteImageTools' class='SEditSite_Block' style='padding: 0'>";
  Lines+="<table style='margin: 1px 5px 2px 5px'><tr>";
  Lines+="<td>";
  Lines+="&nbsp;Цвет подложки:<br>";
  Lines+="<input type='button' value='белый' style='width: 70px' onclick='EditSite_SetImageBackground(\"white\")'>";
  Lines+="<input type='button' value='зелёный' style='width: 70px' onclick='EditSite_SetImageBackground(\"green\")'>";
  Lines+="<input type='button' value='красный' style='width: 70px' onclick='EditSite_SetImageBackground(\"red\")'>";
  Lines+="<input type='button' value='голубой' style='width: 70px' onclick='EditSite_SetImageBackground(\"lightblue\")'>";
  Lines+="<br><br><input type='button' id='IColorProbeButton' value='Взять пробу цвета' style='margin-bottom: 3px; width: 140px' onclick='EditSite_SwitchMode(1)'>";
  Lines+="<br><span id='IColorProbePattern' style='margin-left: 3px; background-color: white; border: dashed black 1px'>&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;<span id='IColorProbeCode'>код цвета:</span>";
  Lines+="<div style='margin-top: 18px'>";
  Lines+="<input type='button' id='IDataURLButton' value='подготовить data:URL' style='width: 175px' onclick='EditSite_OpenDataURL()'>";
  Lines+="<div id='IDataURLHrefDiv' style='display: none; padding-top: 5px'>&nbsp;<a href='' id='IDataURLHref' target='_blank'>открыть data:URL</a></div>";
  Lines+="<div>";
  Lines+="</td>";                     
  Lines+="<td>";
    Lines+="<div id='ICropToolsContainer'>";
    Lines+="<table class='SCropToolsTable'>";
    Lines+="<tr><td style='padding-right: 5px'>Обрезка:</td><td><input type='button' value='&uarr;' onmousedown='EditSite_ShiftCrop(1,-1)' onmouseup='EditSite_ShiftCropStop()'><br><input type='button' value='&darr;' onmousedown='EditSite_ShiftCrop(1,1)' onmouseup='EditSite_ShiftCropStop()'></td><td id='IEditSite_CropInfo' style='padding-left: 5px'></td></tr>";
    Lines+="<tr><td style='text-align: right'><input type='button' class='H' value='&larr;' onmousedown='EditSite_ShiftCrop(4,-1)' onmouseup='EditSite_ShiftCropStop()'><input type='button' class='H' value='&rarr;' onmousedown='EditSite_ShiftCrop(4,1)' onmouseup='EditSite_ShiftCropStop()'></td><td></td><td><input type='button' class='H' value='&larr;' onmousedown='EditSite_ShiftCrop(2,1)' onmouseup='EditSite_ShiftCropStop()'><input type='button' class='H' value='&rarr;' onmousedown='EditSite_ShiftCrop(2,-1)' onmouseup='EditSite_ShiftCropStop()'></td></tr>";
    Lines+="<tr><td></td><td><input type='button' value='&uarr;' onmousedown='EditSite_ShiftCrop(3,1)' onmouseup='EditSite_ShiftCropStop()'><br><input type='button' value='&darr;' onmousedown='EditSite_ShiftCrop(3,-1)' onmouseup='EditSite_ShiftCropStop()'></td><td style='vertical-align: bottom; padding-left: 10px'><input id='IButtonCancelCrop' type='button' value='отменить обрезку' style='font-size: 11px; height: 20px; width: 110px' onclick='EditSite_CancelCrop()'></td></tr>";
    Lines+="</table>";
    Lines+="</div>";
  Lines+="</td>";
  Lines+="</tr></table>";
  Lines+="</div>";

  Lines+="<div id='IEditSiteImageView' class='SEditSite_Block' style='padding: 0; overflow: scroll; background-color: white'>";
  Lines+="<img id='IEditSiteImageView_Img'>";
  Lines+="<div id='IEditSiteImageView_DivSwf'></div>";
  Lines+="<div id='IEditSiteCropBorder' style='display: none; position: absolute; left: 10px; top: 10px; width: 10px; height: 10px; border: dashed "+CropBorderWidth+"px'></div>";
  Lines+="</div>";

  document.write(Lines);
}

function EditSite_ComposeBlock_TextEdit()
{
  var Lines="";

  Lines+="<div id='IEditSiteTextEdit' class='SEditSite_Block' style='padding: 0; background-color: white'>";
  Lines+="<textarea id='IEditSiteTextEdit_TextArea' spellcheck=false style='margin: 0; border: none; resize: none'></textarea>";
  Lines+="<div id='IEditSiteTextEdit_Instrum' class='SEditSite_Block' style='display: block; border-style: solid none none none'>";
  Lines+="<input type='button' id='IEditSiteSaveButton' value='сохранить' style='width: 100px' onclick='EditSite_SaveEditingText()'>";
  Lines+="</div>";
  Lines+="</div>";

  document.write(Lines);
}

function EditSite_ComposeBlock_Player()
{
  var Lines="";

  Lines+="<div id='IEditSitePlayerContainer' class='SEditSite_Block' style='padding: 0; background-color: white'>";
  Lines+="</div>";

  document.write(Lines);
}

function EditSize_UpdateBlocks()
{
  var LogoBlockObj=GetObj('IEditSiteLogo');
  var PermanentBlockObj=GetObj('IEditSitePermanent');
  //var ProjectBlockObj=GetObj('IEditSiteProject');
  var FileStructureBlockObj=GetObj('IEditSiteFileStructure');
  var FolderBlockObj=GetObj('IEditSiteFolder');
  var FileBlockObj=GetObj('IEditSiteFile');
  var ImageToolsBlockObj=GetObj('IEditSiteImageTools');
  var ImageViewBlockObj=GetObj('IEditSiteImageView');
  var TextEditBlockObj=GetObj('IEditSiteTextEdit');
  var ImageObj=GetObj('IEditSiteImageView_Img');
  var DivSwfObj=GetObj('IEditSiteImageView_DivSwf');
  var PlayerContainerObj=GetObj('IEditSitePlayerContainer');

  //ProjectBlockObj.style.display='none';
  FileStructureBlockObj.style.display='none';
  FolderBlockObj.style.display='none';
  FileBlockObj.style.display='none';
  ImageToolsBlockObj.style.display='none';
  ImageViewBlockObj.style.display='none';
  TextEditBlockObj.style.display='none';
  ImageObj.style.display='none';
  DivSwfObj.innerHTML='';
  DivSwfObj.style.display='none';
  PlayerContainerObj.style.display='none';

  EditSite_SwitchMode(0);

  // "Действия над списком проектов" виден всегда
  LogoBlockObj.style.display='block';
  var NextY=LogoBlockObj.offsetTop+LogoBlockObj.offsetHeight-1;
  PermanentBlockObj.style.top=NextY+"px";
  PermanentBlockObj.style.display='block';
  NextY=PermanentBlockObj.offsetTop+PermanentBlockObj.offsetHeight-1;

  if ( SiteId>0 )
  {
    // "Действия над выбранным проектом" виден если выбран сайт
    //ProjectBlockObj.style.display='block';
    //ProjectBlockObj.style.top=NextY+"px";
    //NextY=ProjectBlockObj.offsetTop+ProjectBlockObj.offsetHeight-1;

    // "Файлы выбранного проекта" виден если выбран сайт
    FileStructureBlockObj.style.display='block';
    FileStructureBlockObj.style.top=NextY+"px";
    NextY=FileStructureBlockObj.offsetTop+FileStructureBlockObj.offsetHeight-1;

    if ( FileId>0 )
    {
      var FileIndex=FilesArray_IdToIndexH[FileId];
      var FileRow=Files_Array[FileIndex];
      var FileType=FileRow[Files_FILETYPE];
      if ( FileType==1 ) // папка
      {
        // "Действия над выбранной папкой" виден если выбран сайт и файл-папка
        FolderBlockObj.style.display='block';
        FolderBlockObj.style.top=NextY+"px";
        NextY=FolderBlockObj.offsetTop+FolderBlockObj.offsetHeight-1;
      }
      else
      {
        // "Действия над выбранным файлом" виден если выбран сайт и файл-непапка
        FileBlockObj.style.display='block';
        FileBlockObj.style.top=NextY+"px";
        NextY=FileBlockObj.offsetTop+FileBlockObj.offsetHeight-1;

        var FileHTMLBlockObj=GetObj('IEditSiteFileHTML');
        var FileHTMLEmptyBlockObj=GetObj('IEditSiteFileHTMLEmpty');
        var FileImageBlockObj=GetObj('IEditSiteFileImage');

        FileHTMLBlockObj.style.display='none';
        FileHTMLEmptyBlockObj.style.display='none';
        FileImageBlockObj.style.display='none';

        var StandartImageFlag=false;
        switch ( FileType )
        {
          case 11:
          case 12:
          case 13: // изображение
            StandartImageFlag=true;
            // НЕРАЗРЫВНО
          case 14: // WebP
          case 40: // flash-ролик
          case 45: // SVG
            FileImageBlockObj.style.display='block';
            var ClientSizeH=GetWindowClientSize();
            var NextTop=0;
            var LeftPos=BlocksWidth+7+2;
            var FreeWidth=ClientSizeH.width-LeftPos-2;

            var CropToolsContainerObj=GetObj('ICropToolsContainer');
            CropToolsContainerObj.style.visibility=StandartImageFlag?'normal':'hidden';

            var ColorProbeButtonObj=GetObj('IColorProbeButton');
            ColorProbeButtonObj.style.display=StandartImageFlag?'inline':'none';

            var DataURLButtonObj=GetObj('IDataURLButton');
            DataURLButtonObj.style.display=StandartImageFlag?'inline':'none';
            DataURLButtonObj.disabled=false;
            GetObj('IDataURLHrefDiv').style.display='none';

            ImageToolsBlockObj.style.display='block';
            ImageToolsBlockObj.style.left=LeftPos+"px";
            ImageToolsBlockObj.style.top=NextTop;
            ImageToolsBlockObj.style.width=FreeWidth+"px";
            var ToolsHeight=ImageToolsBlockObj.offsetHeight;
            NextTop+=ToolsHeight-1;

            ImageViewBlockObj.style.display='block';
            ImageViewBlockObj.style.left=LeftPos+"px";
            ImageViewBlockObj.style.top=NextTop+"px";
            ImageViewBlockObj.style.width=FreeWidth+"px";
            ImageViewBlockObj.style.height=(ClientSizeH.height-3-ToolsHeight)+"px";

            var FileFullPathName=EditSite_GetFileFullPathName(FileId);
            if ( FileType!=40 )
            {
              ImageObj.style.display='';
              ImageObj.src=FileFullPathName;
            }
            else
            {
              var SWFCode=ShowSWF2(FileFullPathName,[6],'','',FileRow[Files_IMAGE_WIDTH],FileRow[Files_IMAGE_HEIGHT],'transparent');
              DivSwfObj.style.display='';
              DivSwfObj.innerHTML=SWFCode;
            }

            CropLeft=0;
            CropRight=0;
            CropTop=0;
            CropBottom=0;

            EditSite_SwitchMode(0);
            break;
          case 20: // веб-страница
            if ( !FileRow[Files_FILESIZE] )
              FileHTMLEmptyBlockObj.style.display='block';
            FileHTMLBlockObj.style.display='block';
            GetObj('IEditSiteFileHTMLHref').href=EditSite_GetFileFullPathName(FileId);
          // НЕРАЗРЫВНО!
          case 25: // стилевой файл
          case 30: // JS-файл
          case 35: // JSON-файл
          case 60: // текстовый файл
            TextEditBlockObj.style.display='block';
            var ClientSizeH=GetWindowClientSize();
            var LeftPos=BlocksWidth+7+2;

            TextEditBlockObj.style.left=LeftPos+"px";
            TextEditBlockObj.style.width=(ClientSizeH.width-LeftPos-2)+"px";
            TextEditBlockObj.style.height=(ClientSizeH.height-3)+"px";

            var InstrumObj=GetObj("IEditSiteTextEdit_Instrum");
            var InstrumHeight=InstrumObj.offsetHeight;

            var TextAreaObj=GetObj('IEditSiteTextEdit_TextArea');
            //console.log('clear text');
            EnableStoreEditPos=false;
            setTimeout(function(){EnableStoreEditPos=true;},0);
            TextAreaObj.value='';
            TextAreaObj.style.width=(ClientSizeH.width-LeftPos-12+5)+"px";
            TextAreaObj.style.height=(ClientSizeH.height-12+4-InstrumHeight)+"px";
            //TextAreaObj.readOnly=true;
            //GetObj('IEditSiteSaveButton').disabled=true;
            EditSite_EnableEditing(false);

            EditSite_GetTextFile();

            //InstrumObj.style.left=LeftPos+"px";
            InstrumObj.style.top=(ClientSizeH.height-InstrumHeight-15+12)+"px";
            InstrumObj.style.width=(ClientSizeH.width-LeftPos-22+14)+"px";

            break;
          case 71: //DivSwfObj
          case 72:
            PlayerContainerObj.style.display='block';
            var LeftPos=BlocksWidth+7+2;
            PlayerContainerObj.style.left=LeftPos+"px";
            var FullPathFileName=EditSite_GetFileFullPathName(FileId);
            var AudioStr="<audio style='margin: 20px' controls>";
            if ( FileType==71 )
              AudioStr+='<source src="'+FullPathFileName+'" type="audio/mpeg">';
            else
              AudioStr+='<source src="'+FullPathFileName+'" type="audio/ogg; codecs=vorbis">';
            AudioStr+="</audio>";
            PlayerContainerObj.innerHTML=AudioStr;
            break;
        }

      }

    }
  }

}

function EditSite_WindowResized()
{
  EditSize_UpdateBlocks();
}

function EditSite_GetSiteDir(_SiteId)
{
  return "Sites/"+Str0L(_SiteId,7);
}

function EditSite_GetFolderFullPath(_FolderId)
{
  var FullPath="";
  while ( true )
  {
    var FolderIndex=FilesArray_IdToIndexH[_FolderId];
    var FolderRow=Files_Array[FolderIndex];
    var ParentFolderId=FolderRow[Files_FOLDER];
    if ( ParentFolderId<=0 )
      break;
    //if ( FullPath!="" )
    //  FullPath="/"+FullPath;
    FullPath=FolderRow[Files_FILENAME]+"/"+FullPath;
    _FolderId=ParentFolderId;
  }
  return EditSite_GetSiteDir(SiteId)+"/"+FullPath;
}

function EditSite_GetFileFullPathName(_FileId)
{
  var FileIndex=FilesArray_IdToIndexH[_FileId];
  var FileRow=Files_Array[FileIndex];
  var FileName=FileRow[Files_FILENAME];
  var Folder=FileRow[Files_FOLDER];
  return EditSite_GetFolderFullPath(Folder)+FileName;
}

function EditSite_UpdateFilesStructure(recid)
{
  var TreeStrId='Files_Table';

  var Options=new Tree_Options();
  Options.ExpandAllMode=0;
  Tree_ShowTree(Files_Array,Files_ID,Files_FOLDER,Files_TREEITEMTEXT,-1,-1,-1,recid,'IEditSiteFilesTree',[],[0,1,2],TreeStrId,-1,{},Options,{},null);

  var Storage=Tree_GetStorage(TreeStrId);
  Storage.ExpandedKeys=[];

  var CurrId=FileId;
  while ( true )
  {
    Storage.ExpandedKeys.push(CurrId);
    var CurrIndex=FilesArray_IdToIndexH[CurrId];
    var CurrFileH=Files_Array[CurrIndex];
    var ParentId=CurrFileH[Files_FOLDER];
    if ( ParentId==-1 )
      break;
    CurrId=ParentId;
  }

  /*
  for ( var F=0; F<Files_Array.length; F++ )
  {
    var FileRow=Files_Array[F];
    if ( FileRow[Files_FOLDER]==-1 )
    {
      Storage.ExpandedKeys.push(FileRow[Files_ID]);
      break;
    }
  } */

  Tree_ReShowTree(TreeStrId,true);

}

function Event_TreeNodeSelected(TreeStrId,SelectedKeyValue)
{
  if ( TreeStrId=='Files_Table' )
  {
    //if ( FileId!=SelectedKeyValue )
    {
      if ( FileId )
      {
        var FileIndex=FilesArray_IdToIndexH[FileId];
        var FileRow=Files_Array[FileIndex];
        var FileType=FileRow[Files_FILETYPE];
        if ( (FileType==20) || (FileType==25) || (FileType==30) || (FileType==35) )
        {
          // редактировался файл html/css/js, надо запомнить прокрутку
          /*
          var TextAreaObj=GetObj('IEditSiteTextEdit_TextArea');
          //console.log('store '+FileId+' '+TextAreaObj.scrollTop+' '+TextAreaObj.selectionStart+' '+TextAreaObj.selectionEnd);
          EditPosH[FileId]={scrolltop:TextAreaObj.scrollTop,selectionstart:TextAreaObj.selectionStart,selectionend:TextAreaObj.selectionEnd}; //fileid:{scrolltop:X,selectionstart:X,selectionend:X}
          if ( window.localStorage )
            window.localStorage.EditPos=JSON.stringify(EditPosH);
          */
          EditSite_StoreCurrEditPos();
        }
      }
    }
    FileId=SelectedKeyValue;
    EditSize_UpdateBlocks();
  }
}

function EditSite_StoreCurrEditPos()
{
  if ( EnableStoreEditPos )
  {
    var TextAreaObj=GetObj('IEditSiteTextEdit_TextArea');
    //console.log(TextAreaObj.value);
    var ST=TextAreaObj.scrollTop;
    var SS=TextAreaObj.selectionStart;
    var SE=TextAreaObj.selectionEnd;

    /*
    var FileIndex=FilesArray_IdToIndexH[FileId];
    var FileRow=Files_Array[FileIndex];
    var FileName=FileRow[Files_FILENAME];
    console.log('store f='+FileId+' fn='+FileName+' st='+ST+' ss='+SS+' se='+SE);
    */

    if ( ST || SS || SE )
      EditPosH[FileId]={scrolltop:ST,selectionstart:SS,selectionend:SE};
    else
      delete EditPosH[FileId];
    if ( window.localStorage )
      window.localStorage.EditPos=JSON.stringify(EditPosH);
  }
}

function EditSite_GoToSelectedProject()
{
  var SelectObj=GetObj('IEditSite_GoToSelectedProject_Combo');
  location.href='EditSite.php?site='+SelectObj.value;
}

function GetProjectRow(_ProjectId)
{
  for ( var P=0; P<Projects_RowsCount; P++ )
  {
    var ProjectRow=Projects_Array[P];
    var ProjectId=ProjectRow[Projects_ID];
    if ( ProjectId==_ProjectId )
      return ProjectRow;
  }
  return null;
}

function EditSite_DeleteProject()
{
  var SelectObj=GetObj('IEditSite_GoToSelectedProject_Combo');
  var SelectedProjectId=SelectObj.value;
  if ( SelectedProjectId>1 )
  {
    var ProjectRow=GetProjectRow(SelectedProjectId);
    if ( ProjectRow )
    {
      if ( SelectedProjectId==SiteId )
      {
        alert('Нельзя удалить редактируемый сейчас проект!');
      }
      else
      {
        var ProjectName=ProjectRow[Projects_NAME];
        if ( confirm("Вы уверены, что хотите УДАЛИТЬ проект '"+ProjectName+"'?\nВосстановить удалённый проект НЕВОЗМОЖНО!") )
        {
          var ArgsH={p:SelectedProjectId,cp:SiteId};
          Ajax_LoadToDiv('IAjaxContainer','','esdp',ArgsH);
        }
      }
    }
  }
}

function EditSite_AddLibFile()
{
  var SelectObj=GetObj('IEditSite_AddLibraryFile_Combo');
  var SelectedLibFile=SelectObj.value;
  if ( SelectedLibFile )
  {
    var ArgsH={fd:SelectedLibFile,f:FileId};
    Ajax_LoadToDiv('IAjaxContainer','','eslf',ArgsH);
  }
}

function EditSite_CreateNewProject()
{
  var NewProjectName=prompt('Введите имя нового проекта:');
  if ( NewProjectName )
  {
    var ArgsH={pn:NewProjectName};
    Ajax_LoadToDiv('IAjaxContainer','','escp',ArgsH);
  }
}

function EditSite_CreateNewHTML()
{
  var NewFileName=prompt('Введите имя новой веб-страницы (БЕЗ расширения):');
  if ( NewFileName )
  {
    var ArgsH={fn:NewFileName,f:FileId};
    Ajax_LoadToDiv('IAjaxContainer','','escw',ArgsH);
  }
}

function EditSite_CreateNewCSS()
{
  var NewFileName=prompt('Введите имя нового стилевого файла (БЕЗ расширения):');
  if ( NewFileName )
  {
    var ArgsH={fn:NewFileName,f:FileId};
    Ajax_LoadToDiv('IAjaxContainer','','escc',ArgsH);
  }
}

function EditSite_CreateNewJavaScript()
{
  var NewFileName=prompt('Введите имя нового JavaScript-файла (БЕЗ расширения):');
  if ( NewFileName )
  {
    var ArgsH={fn:NewFileName,f:FileId};
    Ajax_LoadToDiv('IAjaxContainer','','escj',ArgsH);
  }
}

function EditSite_CreateNewFolder()
{
  var NewFileName=prompt('Введите имя подпапки:');
  if ( NewFileName )
  {
    var ArgsH={fn:NewFileName,f:FileId};
    Ajax_LoadToDiv('IAjaxContainer','','escf',ArgsH);
  }
}

function EditSite_UploadFile()
{
  var FileObj=GetObj('IEditSiteUploadedFile');
  //alert(FileObj);
  var ArgsH={fd:FileObj,f:FileId};
  Ajax_LoadToDiv('IAjaxContainer','','escu',ArgsH);
}

function EditSite_GetTextFile()
{
  var ArgsH={f:FileId};
//  Ajax_LoadToDiv('IAjaxContainer','','esgt',ArgsH);
  JsHttpRequest.query(AjaxHandlerPage+'?af=esgt&random='+Math.random(),ArgsH,EditSite_GetTextFile_Ready);

}

function EditSite_GetTextFile_Ready(ResultH,Errors)
{
  eval(GetParsedString(ResultH.php,""));
  //console.log(ResultH.php);
  var TextAreaObj=GetObj('IEditSiteTextEdit_TextArea');
  TextAreaObj.selectionStart=0;
  TextAreaObj.selectionEnd=0;
  if ( FileId in EditPosH )
  {
    var PosH=EditPosH[FileId];

    /*
    var FileIndex=FilesArray_IdToIndexH[FileId];
    var FileRow=Files_Array[FileIndex];
    var FileName=FileRow[Files_FILENAME];
    console.log('retrieve f='+FileId+' fn='+FileName+' st='+PosH.scrolltop+' ss='+PosH.selectionstart+' se='+PosH.selectionend);
    */

    TextAreaObj.selectionStart=PosH.selectionstart;
    TextAreaObj.selectionEnd=PosH.selectionend;
    TextAreaObj.scrollTop=PosH.scrolltop;
  }
  else
  {
    var FileIndex=FilesArray_IdToIndexH[FileId];
    var FileRow=Files_Array[FileIndex];
    var FileName=FileRow[Files_FILENAME];
    console.log('retrieve f='+FileId+' fn='+FileName+' NONE');
  }
  TextAreaObj.focus();
}

function EditSite_SetTextFile(Txt)
{
  EditSite_EnableEditing(false);
  var ArgsH={f:FileId,t:Txt};
  Ajax_LoadToDiv('IAjaxContainer','','esst',ArgsH);
}

function EditSite_EnableEditing(EnableFlag)
{
  var TextAreaObj=GetObj('IEditSiteTextEdit_TextArea');
  TextAreaObj.readOnly=!EnableFlag;
  GetObj('IEditSiteSaveButton').disabled=!EnableFlag;
  TextAreaObj.onkeypress=EnableFlag?EditSite_TextAreaKeyPress:null;
  TextAreaObj.onkeydown=EnableFlag?EditSite_TextAreaKeyDown:null;
  TextAreaObj.onkeyup=EnableFlag?EditSite_TextAreaKeyUp:null;
}

// === chrome		=== FF			=== IE
// TAB:
// which=9		which=9
// keyCode=9		keyCode=9		keyCode=9
// SHIFT:
// which=16		which=16
// keyCode=16		keyCode=16		keyCode=16
// shiftKey=true	shiftKey=true		shiftKey=true

function EditSite_TextAreaKeyDown(e)
{
  var EventInfoH=GetEvent(e);
  if ( EventInfoH.keyCode==9 ) // TAB
  {
    if ( EventInfoH.shiftKey )
      EditSite_ShiftSelectedText(-2);
    else
      EditSite_ShiftSelectedText(2);
    if (EventInfoH.preventDefault)
      EventInfoH.preventDefault();
    else
      EventInfoH.returnValue=false;
    //EventInfoH.preventDefault();
    EventInfoH.stopPropagation();
    EventInfoH.cancelBubble=true;
  }
}

function EditSite_TextAreaKeyUp(e)
{
  var EventInfoH=GetEvent(e);
  if ( EventInfoH.keyCode==9 ) // TAB
  {
    if (EventInfoH.preventDefault)
      EventInfoH.preventDefault();
    else
      EventInfoH.returnValue=false;
    //EventInfoH.preventDefault();
    EventInfoH.stopPropagation();
    EventInfoH.cancelBubble=true;
  }
}

function EditSite_ShiftSelectedText(SpacesCount)
{
  var TextAreaObj=GetObj('IEditSiteTextEdit_TextArea');
  var SelStart=TextAreaObj.selectionStart;
  var SelEnd=TextAreaObj.selectionEnd;
  var LinesA=TextAreaObj.value.split('\n');
  var I=0;
  var NewLinesA=[];
  var LinesBeg=-1;
  var LinesEnd=-1;
  var LenChange=0;
  for ( var L=0; L<LinesA.length; L++ )
  {
    var LineText=LinesA[L];
    var LineLen=LineText.length;
    var LineEnd=I+LineLen+1;
    if ( LineEnd==SelEnd )
      SelEnd--;
//console.log(TextAreaObj.value.substring(I,LineEnd+1));
    if
    (
      (SelStart>=I)&&(SelStart<LineEnd)
        ||
      (SelStart<I)&&(SelEnd>=LineEnd)
        ||
      (SelEnd>=I)&&(SelEnd<LineEnd)
    )
    {
      if ( LinesBeg==-1 )
        LinesBeg=I;
      LinesEnd=LineEnd;
      if ( SpacesCount>0 )
      {
        for ( var S=0; S<SpacesCount; S++ )
          LineText=" "+LineText;
        LenChange+=SpacesCount;
      }
      else
      {
        for ( var S=0; S<-SpacesCount; S++ )
        {
          if ( LineText.substr(0,1)==" " )
          {
            LineText=LineText.substr(1);
            LenChange--;
          }
        }
      }
    }
    NewLinesA.push(LineText);

    I=LineEnd;
  }
  TextAreaObj.value=NewLinesA.join('\n');
  TextAreaObj.selectionStart=LinesBeg;
  TextAreaObj.selectionEnd=LinesEnd+LenChange-1;
  //alert(SelectedLinesA.join('\n'));
  /*
  var Text=TextAreaObj.value.substring(SelStart,SelEnd);
  alert(Text);
  */
  /*
  StoreCaretPos(TextAreaObj);
  var Txt=GetCaretSelectedText();
  //alert(Txt);
  ReplaceCaretSelectedText("{{{"+Txt+"}}}");
  TextAreaObj.selectionStart=OldSelStart;
  TextAreaObj.selectionEnd=OldSelEnd;
  */
}

function EditSite_TextAreaKeyPress(e)
{
  var EventInfoH=GetEvent(e);
  if ( EventInfoH.keyCode==9 ) // TAB
  {
    if (EventInfoH.preventDefault)
      EventInfoH.preventDefault();
    else
      EventInfoH.returnValue=false;
    //EventInfoH.preventDefault();
    EventInfoH.stopPropagation();
    EventInfoH.cancelBubble=true;
  }
}

function EditSite_SetEditingText(_FileId,Txt)
{
  //console.log(_FileId+" "+FileId);
  // может приходить уже устаревший FileId!
  
  if ( _FileId==FileId )
  {
    var TextAreaObj=GetObj('IEditSiteTextEdit_TextArea');
    //TextAreaObj.innerHTML=Txt;
    TextAreaObj.value=Txt;

    var FileIndex=FilesArray_IdToIndexH[FileId];
    var FileRow=Files_Array[FileIndex];
    var FileType=FileRow[Files_FILETYPE];
    if ( FileType!=60 )
      EditSite_EnableEditing(true);
  }
}

function EditSite_SaveEditingText()
{
  EditSite_StoreCurrEditPos();
  var TextAreaObj=GetObj('IEditSiteTextEdit_TextArea');
  //alert(TextAreaObj.value);
  EditSite_SetTextFile(TextAreaObj.value);
}

function EditSite_EditText_AddHTMLDefault()
{
  var TextAreaObj=GetObj('IEditSiteTextEdit_TextArea');
  TextAreaObj.value=
    '<!DOCTYPE html>\n'+
    '<html>\n'+
    '  <head>\n'+
//    '    <meta http-equiv="content-type" content="text/html; charset=utf-8" />\n'+
    '    <meta charset=UTF-8>\n'+
    '    <title>???</title>\n'+
    '  </head>\n'+
    '  <body>\n'+
    '    ???\n'+
    '  </body>\n'+
    '</html>\n'+
    '';
  var FileHTMLEmptyBlockObj=GetObj('IEditSiteFileHTMLEmpty');
  FileHTMLEmptyBlockObj.style.display='none';
}

function EditSite_MoveFile()
{
  var FileIndex=FilesArray_IdToIndexH[FileId];
  var FileRow=Files_Array[FileIndex];
  if ( confirm('Вы действительно хотите перенести файл '+FileRow[Files_FILENAME]+' в указанную папку?') )
  {
    var OldFolderId=FileRow[Files_FOLDER];

    var ComboFolderObj=GetObj('IEditSite_MoveToFolders');
    var NewFolderId=ComboFolderObj.value;

    if ( OldFolderId==NewFolderId )
      alert('Перемещение невозможно - файл уже находится в выбранной папке!');
    else
    {
      var ArgsH={f:FileId,nf:NewFolderId};
      Ajax_LoadToDiv('IAjaxContainer','','esmf',ArgsH);
    }
  }
}

function EditSite_RenameFile()
{
  var FileIndex=FilesArray_IdToIndexH[FileId];
  var FileRow=Files_Array[FileIndex];
  var Folder=FileRow[Files_FOLDER];
  if ( Folder==-1 )
    alert("Невозможно переименовать корневую папку сайта!");
  else
  {
    var FileType=FileRow[Files_FILETYPE];
    var NewFileName=prompt('Введите новое имя '+((FileType==1)?'папки':'файла')+' (БЕЗ расширения):');
    if ( NewFileName )
    {
      var ArgsH={f:FileId,nn:NewFileName};
      Ajax_LoadToDiv('IAjaxContainer','','esrf',ArgsH);
    }
  }
}

function EditSite_DeleteFile()
{
  var FileIndex=FilesArray_IdToIndexH[FileId];
  var FileRow=Files_Array[FileIndex];
  var FileType=FileRow[Files_FILETYPE];
  var FileFolder=FileRow[Files_FOLDER];
  if ( FileFolder<=0 )
    alert('Невозможно удалить корневую папку сайта!');
  else if ( confirm('Вы действительно хотите удалить '+((FileType==1)?'папку':'файл')+' '+FileRow[Files_FILENAME]+'?') )
  {
    var ArgsH={f:FileId};
    Ajax_LoadToDiv('IAjaxContainer','','esdf',ArgsH);
  }
}

function EditSite_SetImageBackground(ColorName)
{
  var ViewObj=GetObj('IEditSiteImageView');
  ViewObj.style.backgroundColor=ColorName;
  EditSite_SwitchMode(0);
}

var EditSite_CropBorderInterval=0;
var EditSite_ShiftCropInterval=0;

function EditSite_SwitchMode(Mode)
{
  // Mode:
  // 0 - normal
  // 1 - проба цвета
  // 2 - обрезка

  var ViewObj=GetObj('IEditSiteImageView');
  ViewObj.style.cursor='auto';
  ViewObj.onmousedown=null;
  if ( EditSite_CropBorderInterval )
  {
    clearInterval(EditSite_CropBorderInterval);
    EditSite_CropBorderInterval=0;
  }
  if ( EditSite_ShiftCropInterval )
  {
    clearInterval(EditSite_ShiftCropInterval);
    EditSite_ShiftCropInterval=0;
  }

  GetObj('IColorProbePattern').style.visibility='hidden';
  GetObj('IColorProbeCode').style.visibility='hidden';

  var CropBorderObj=GetObj('IEditSiteCropBorder');
  CropBorderObj.style.display='none';
  GetObj('IButtonCancelCrop').style.visibility='hidden';
  GetObj('IEditSite_CropInfo').innerHTML='';

  GetObj('IEditSite_ConvertImageLabel').innerHTML='преобразовать изображение:';

  switch ( Mode )
  {
    case 1:
      ViewObj.style.cursor='crosshair';
      ViewObj.onmousedown=EditSite_ColorProbe;
      break;
    case 2:
      CropBorderObj.style.display='';
      EditSite_CropBorderInterval=setInterval(EditSite_CropBorderTick,300);
      GetObj('IButtonCancelCrop').style.visibility='visible';
      GetObj('IEditSite_ConvertImageLabel').innerHTML='сохранить обрезанное изображение:';
      break;
  }

}

function EditSite_ColorProbe(e)
{
  var Ev=GetEvent(e);
  //alert(GetObjectProps(Ev));
  // CH+IE offsetX offsetY
  // FF+CH layerX layerY

  var ClickX=(Ev.offsetX!==undefined)?Ev.offsetX:Ev.layerX;
  var ClickY=(Ev.offsetY!==undefined)?Ev.offsetY:Ev.layerY;

  EditSite_SwitchMode(0);

  //alert(ClickX+' '+ClickY);
  var ArgsH={f:FileId,x:ClickX,y:ClickY};
  Ajax_LoadToDiv('IAjaxContainer','','esgc',ArgsH);
}

function EditSite_SetColorProbe(ColorHexStr)
{
  var PatternObj=GetObj('IColorProbePattern');
  var CodeObj=GetObj('IColorProbeCode');

  PatternObj.style.visibility='visible';
  PatternObj.style.backgroundColor=ColorHexStr;

  CodeObj.style.visibility='visible';
  CodeObj.innerHTML='код цвета: '+ColorHexStr;
}

function EditSite_ConvertImageTo(DestType)
{
  var NewFileName=prompt('Введите имя нового изображения (БЕЗ расширения):');
  if ( NewFileName )
  {
    var JPEGQualityObj=GetObj('IEditSiteJPEGQuality');
    var JPEGQuality=parseInt(JPEGQualityObj.value);
    var ArgsH={fn:NewFileName,f:FileId,t:DestType,cl:CropLeft,cr:CropRight,ct:CropTop,cb:CropBottom,q:JPEGQuality};
    Ajax_LoadToDiv('IAjaxContainer','','esci',ArgsH);
  }
}

function EditSite_UpdateCropBorder()
{
  var ImgObj=GetObj('IEditSiteImageView_Img');
  var ImageWidth=ImgObj.width;
  var ImageHeight=ImgObj.height;
  var CropWidth=ImageWidth-CropLeft-CropRight;
  var CropHeight=ImageHeight-CropTop-CropBottom;
  var CropBorderObj=GetObj('IEditSiteCropBorder');
  CropBorderObj.style.left=(-CropBorderWidth+CropLeft)+"px";
  CropBorderObj.style.top=(-CropBorderWidth+CropTop)+"px";
  CropBorderObj.style.width=CropWidth+"px";
  CropBorderObj.style.height=CropHeight+"px";
  EditSite_CropBorderTick();

  GetObj('IEditSite_CropInfo').innerHTML='x='+CropLeft+' y='+CropTop+'<br>w='+CropWidth+' h='+CropHeight;
}

var ShiftCrop_Side;
var ShiftCrop_Shift;
var ShiftCrop_Counter;
function EditSite_CropBorderShiftTick()
{
  if ( (!ShiftCrop_Counter) || (ShiftCrop_Counter>10) )
  {
    var Side=ShiftCrop_Side;
    var Shift=ShiftCrop_Shift*(ShiftCrop_Counter?5:1);
    
    var ImgObj=GetObj('IEditSiteImageView_Img');
    var ImageWidth=ImgObj.width;
    var ImageHeight=ImgObj.height;

    if ( Shift<0 )
    {
      switch ( Side )
      {
        case 1: // верхняя
          CropTop=Math.max(CropTop+Shift,0);
          break;
        case 3: // нижняя
          CropBottom=Math.max(CropBottom+Shift,0);
          break;
        case 2: // правая
          CropRight=Math.max(CropRight+Shift,0);
          break;
        case 4: // левая
          CropLeft=Math.max(CropLeft+Shift,0);
          break;
      }
    }
    else
    {
      switch ( Side )
      {
        case 1: // верхняя
          CropTop=Math.min(CropTop+Shift,ImageHeight-CropBottom-1);
          break;
        case 3: // нижняя
          CropBottom=Math.min(CropBottom+Shift,ImageHeight-CropTop-1);
          break;
        case 2: // правая
          CropRight=Math.min(CropRight+Shift,ImageWidth-CropLeft-1);
          break;
        case 4: // левая
          CropLeft=Math.min(CropLeft+Shift,ImageWidth-CropRight-1);
          break;
      }
    }

    EditSite_UpdateCropBorder();
  }
  ShiftCrop_Counter++;
}

function EditSite_ShiftCrop(Side,Shift)
{
  EditSite_SwitchMode(2);

  ShiftCrop_Side=Side;
  ShiftCrop_Shift=Shift;
  ShiftCrop_Counter=0;
  EditSite_CropBorderShiftTick();

  if ( EditSite_ShiftCropInterval )
  {
    clearInterval(EditSite_ShiftCropInterval)
    EditSite_ShiftCropInterval=0;
  }

  EditSite_ShiftCropInterval=setInterval(EditSite_CropBorderShiftTick,50);
}

function EditSite_ShiftCropStop()
{
  if ( EditSite_ShiftCropInterval )
  {
    clearInterval(EditSite_ShiftCropInterval)
    EditSite_ShiftCropInterval=0;
  }
}

var CropBorderTick=0;
function EditSite_CropBorderTick()
{
  CropBorderTick++;
  var CropBorderObj=GetObj('IEditSiteCropBorder');
  var ColorsA=["blue","magenta","#808000"];
  var ColorI=CropBorderTick%(ColorsA.length);
  CropBorderObj.style.borderColor=ColorsA[ColorI];
}

function EditSite_CancelCrop()
{
  EditSite_SwitchMode(0);
}

function EditSite_OpenDataURL()
{
  GetObj('IDataURLButton').disabled=true;
  var ArgsH={f:FileId};
  Ajax_LoadToDiv('IAjaxContainer','','esdu',ArgsH);
}

function EditSite_DataURLReady(DataURL)
{
  alert('data:URL подготовлен. Длина - '+DataURL.length+' байт.');
  GetObj('IDataURLButton').style.display='none';
  GetObj('IDataURLHrefDiv').style.display='block';
  GetObj('IDataURLHref').href=DataURL;
}
