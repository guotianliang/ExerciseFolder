<template>
  <div>
      <!-- v-click-outside -->
      <!-- <el-input></el-input> -->
      <div class="data_pannel" v-show="isVisible">
          <div class="pannel_nav">
              <i class="el-icon-d-arrow-left left"></i>
              <i class="el-icon-arrow-left left" @click="minusMonth"></i>
              <span>{{moment(this.value).format("YYYY")}}年</span>
              <span>{{moment(this.value).format("MM")}}月</span>
              <i class="el-icon-d-arrow-right right"></i>
              <i class="el-icon-arrow-right right" @click="addMonth"></i>
          </div>
          <div class="pannel_content">
              <div class="pannel_days">
                  <div>
                      <span v-for="j in 7" :key="'_'+j">
                          {{weekDays[j-1]}}
                  </span>
                  </div>
                  <div v-for="i in 6" :key="i">
                      <span v-for="j in 7" :key="j+changeIndex" @click="chooseDate(visibeDays[(i-1)*7+(j-1)])"
                      :class="{
                      'available':isAvailable(visibeDays[(i-1)*7+(j-1)]),
                      'istoday':isToday(visibeDays[(i-1)*7+(j-1)]),
                      'isselect':isSelect(visibeDays[(i-1)*7+(j-1)]),

                      }"
                      >
                          <span :class="{'isdisabled':isDisabled(visibeDays[(i-1)*7+(j-1)])}">
                              {{visibeDays[(i-1)*7+(j-1)].format("DD")}}
                          </span>
                      </span>
                  </div>
              </div>
          </div>
          <div class="pannel_footer"></div>
          <!-- content -->
      </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
    directives:{
        clickOutside:{
            bind(el,bindings,vnode){
                let handler = (e)=>{
                    console.log(el,e.target,"----")
                    if(el.contains(e.target)){
                        !vnode.context.isVisible&&vnode.context.focus();
                    }else{
                        vnode.context.isVisible&&vnode.context.blur();
                    }
                }
                el.handler=handler;
                document.addEventListener('click',handler);
            },
            unbind(el){
                document.removeEventListener('click',el.handler)
            }
        }
    },
    props:{
        selectType:{
            type:String,
            default:"week"
        }
        // value:{
        //     type:Date,
        //     default:()=>new Date()
        // }
    },
    data(){
        return {
            weekDays:["一","二","三","四","五","六","日",],
            isVisible:true,
            value:new Date(),
            selectWeek:{}, //选择的周集合
            selectDay:{    //选择的天集合
                // checkedList:[],  //选中的天
                // uncheckedList:[], //取消选中的天
            },
            changeIndex:0
        }
    },
    mounted(){
        console.log(this.visibeDays,"-")
    },
    methods:{
        moment,
        focus(){
            this.isVisible=true;
        },
        blur(){
            this.isVisible=false;
        },
        isCurrentMonth(date){
            return date.format("YYYYMM")===moment().format("YYYYMM")
        },
        isToday(date){
             return date.format("YYYYMMDD")===moment().format("YYYYMMDD")
        },
        chooseDate(date){
            if(this.isDisabled(date)){
                return
            }
            if(this.selectType==="week"){
                this.isWeekType(date)
            }else{
                this.isDayType(date)
            }
            this.changeIndex++;
            // this.$emit('input',date);
        },
        isWeekType(date){
            let week = date.day();
            if(this.selectWeek[week]){
                this.selectWeek[week]=0;
            }else{
                this.selectWeek[week]=1
            }
        },
        isDayType(date){
            let week = date.day();
            let day = date.format("YYYYMMDD");
            if(this.selectDay[day]&&this.selectWeek[week]){
                this.selectDay[day]=0;
            }else{
                this.selectDay[day]=1;
            }
        },
        isSelect(date){
            let week = date.day();
            let day=date.format("YYYYMMDD");
            let flag = false;
            if(this.selectWeek[week]&&!this.isDisabled(date)){
                flag = true
            }
            return flag;
        },
        isAvailable(date){
            return date.format("YYYYMM")!==moment(this.value).format("YYYYMM")
        },
        addMonth(){
            this.value = moment(this.value).add('month',1);
        },
        minusMonth(){
            this.value = moment(this.value).subtract('month',1);
        },
        isDisabled(date){
            return date<moment()&&date.format("YYYYMMDD")!==moment().format("YYYYMMDD");
        }
    },
    computed:{
        visibeDays(){
          //获取当前月周几开始
          let fisrtDay = moment(this.value).startOf('month');
          let curentFirst=fisrtDay.day();
          curentFirst=curentFirst?curentFirst:7;
          let statDay = fisrtDay.subtract(curentFirst-1,'day');

          let arr=[]
          for (let i =0;i<42;i++){
              arr.push(moment(statDay).add(i,'day'))
          }
          return arr
        },
        formatDate(){
            return moment(this.value).format("YYYY-MM-DD")
        }
    }
}
</script>

<style lang="less" scoped>
.data_pannel{
    width: 320px;
    border-radius: 10px;
    padding: 10px 0;
    border: 1px solid #e4e7ed;
    background: #ffffff;
    box-shadow:0 2px 12px 0 #cccccc;
    // overflow: hidden;
    color: #606266;
    // position: absolute;
    .pannel_nav{
        text-align: center;
        margin: 12px 50px;
        &>i{
            cursor: pointer;
        }
        .left{
            float: left;
        }
        .right{
            float: right;
        }
    }
    .pannel_content{
        .pannel_days{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            &>div span{
                width: 32px;
                height: 30px;
                display: inline-block;
                padding: 4px 0;
                box-sizing: border-box;
                text-align: center;
                cursor: pointer;
                user-select: none;
                position: relative;
                &:hover{
                    color: #409eff;
                }
            }
            span.available{
                color: #c0c4cc;
            }
            span.istoday{
                color: #409eff;
                font-weight: 700;
            }
            span.isdisabled {
                background-color: #F5F7FA;
                opacity: 1;
                cursor: not-allowed;
                color: #C0C4CC;
            }
            span.isselect span{
                width: 26px;
                height: 26px;
                border-radius: 50%;
                background-color: #409eff;
                color: #fff;
            }
        }
    }
}
</style>