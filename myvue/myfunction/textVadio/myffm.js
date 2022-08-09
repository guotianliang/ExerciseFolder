var ffmpeg = require('ffmpeg');
const {creatImgs} = require('./creatImg')
const exec = require('child_process').execSync
const fs= require('fs')
const path= require('path')
let filePath = path.join(__dirname,'input2.mp4')
let outfilePath = path.join(__dirname,'hellow.mp4')
let textPath = formatPath('test.txt')
let typeFacePath = formatPath('typeface.otf')

// creatAudio()

async function creatAudio(){
  // 生成图片备用
  let ext = await creatImgs('input.jpg')
  console.log(ext)
  await Img2aduio(ext,'input2')
  return
  var process = new ffmpeg(filePath);
  process.then(function (video) { 
    video.addCommand('-i',path.join(__dirname,'output.mp3'))
    // 指定音频编码器
    video.addCommand('-c:a','aac')
    
    video.addCommand(`-ar 48k`)
    // 指定视频编码器
    video.addCommand('-c:v','libx264')
    // video.addCommand('-c:v','h264')
    // video.addCommand('-c','copy')


    // video.addCommand('-movflags faststart')
    // 添加字幕
    // -vf delogo=x:y:w:h[:t[:show]]
    // -filter_complex overlay
    // -shortest
    // reload=1:y=h/5:x=w-(mod(8*n\\,w+tw)-tw/100)
// -c copy：直接复制，不经过重新编码（这样比较快）

    // video.setVideoAspectRatio('9:16')
    // video.setVideoSize('540x960', true, false)
    video.setVideoSize('1080x1920', true, false)

    // video.addCommand('-b:v','0')
    // 码率控制 bitrate = file size / duration
    video.addCommand(`-b:v 2000k`)
    
    video.addCommand(`-vf "drawtext=fontsize=80:fontcolor=#0779e4:fontfile=${typeFacePath}:textfile=${textPath}:reload=1:x=(w-text_w)/2:y=(h-text_h)/2:shadowy=2" -qp 0`)
    
    // 视频和音频 选择最小值作为视频长度 -shortest
    video.addCommand('-aspect 9:16 -crf 18 -pix_fmt yuv420p -strict -2 -y')

    // 一般为宽高9：16的比例，分辨率540*960为主

    // 保存视频
    video.save(outfilePath)
    // Video metadata
    // console.log(video.metadata);
    // FFmpeg configuration
    // console.log(video.info_configuration);
  }, function (err) {
    console.log('Error: ' + err);
  });
}

/**
 * 格式化字体
 * @param {字幕路径} v 
 * @returns 
 */
function formatPath(v){
  let value = path.join(__dirname,v)
  return value.replace(/\\/g, "/").replace(':','\\\\:')
}

/**
 * 图片转视频
 * @param {文件后缀} ext 
 * @param {输出文件的名称} outputName 
 * @returns 
 */
 let out = path.join(__dirname,'zhangailing.jpg')
 let inputMp3 =  path.join(__dirname,'1657944340348.mp3')
function Img2aduio(ext){
  
  exec(`ffmpeg -loop 1 -i ${out} -i ${inputMp3} -c:v libx264 -c:a aac  -shortest -y ${outfilePath}`)
  
  return new Promise((reslove)=>{
    reslove()
    return
    try{
      fs.accessSync(path.join(__dirname,`${outputName}.mp4`))
      reslove()
    } catch(err){
      let input = path.join(__dirname,`imgDir/img%03d${ext}`)
      let out = path.join(__dirname,`${outputName}.mp4`)
      exec(`ffmpeg -y -r 80 -i ${input} -vf scale=1080:1920 -vcodec libx264 -pix_fmt yuv420p ${out}`)
      reslove()
    }
  })
}
creatImgs().then(()=>{

  let input = path.join(__dirname,`imglist/img%03d.jpg`)
  exec(`ffmpeg -r 30 -i ${input} -i ${inputMp3} -c:v libx264  -vf "pad=ceil(iw/2)*2:ceil(ih/2)*2" -c:a aac  -shortest -y ${outfilePath}`)
});
