const fs= require('fs')
const path= require('path')
const exec = require('child_process').execSync
let typeFacePath = formatPath('typeface.otf')
var root_path=path.join(__dirname,'imgOrigin');
// creatImgs('input.jpg',500)
function creatImgs(imgPath='',textPath='test.txt'){
  const imglist =  getAllFiles(root_path)
  let imgList = path.join(__dirname,'imglist')
  let ext='.jpg'
  return new Promise(reslove=>{
    fs.access(imgList,async (err)=>{
      if(err){
        fs.mkdirSync(imgList)
      }else{
        reslove(ext)
        return
      }
      for(let i=1;i<600;i++){
        let outValue =''
        let pt = path.join(imgList,`img${(i+'').padStart(3,0)}${ext}`)
        if(i<150){
          outValue = imglist[0]
        }else if(i<300){
          outValue = imglist[1]
        }else if(i<500){
          outValue = imglist[2]
        }else{
          outValue = imglist[4]
        }
        fs.copyFileSync(outValue,pt)
      }
      reslove(ext)
      
      function callback(err) {
        if (err) throw err;
      }
    })
  })
  
  // textPath = formatPath(textPath)
  // let ext = path.extname(imgPath)
  // let value = path.join(__dirname,imgPath)
  // let outValue =path.join(__dirname,'outimg2.jpg')
  // let imgDir = path.join(__dirname,'imgDir')
  // -vf "drawtext=fontsize=150:fontcolor=#0779e4:fontfile=${typeFacePath}:textfile=${textPath}:reload=1:x=(w-text_w)/2:y=(h-text_h)/2:shadowy=2"
  exec(`ffmpeg -i ${value}  -qp 0 -y ${outValue}`)
  
  return new Promise(reslove=>{
    reslove(ext)
    return
    fs.access(imgDir,async (err)=>{
      if(err){
        fs.mkdirSync(imgDir)
      }else{
        reslove(ext)
        return
      }
      for(let i=1;i<num;i++){
        let pt = path.join(imgDir,`img${(i+'').padStart(3,0)}${ext}`)
        fs.copyFileSync(outValue,pt)
      }
      reslove(ext)
      
      function callback(err) {
        if (err) throw err;
      }
    })
  })

  
}
function formatPath(v){
  let value = path.join(__dirname,v)
  return value.replace(/\\/g, "/").replace(':','\\\\:')
}
function getAllFiles(root){
  var res = [] , files = fs.readdirSync(root);
  files.forEach(function(file){
    var pathname = root+'/'+file
    , stat = fs.lstatSync(pathname);

    if (!stat.isDirectory()){
       res.push(pathname);
    } else {
       res = res.concat(getAllFiles(pathname));
    }
  });
  return res
}
// console.log(getAllFiles(root_path))
exports.creatImgs=creatImgs