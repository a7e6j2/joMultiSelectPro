/*
 * 无限层全屏选择应用
 *
 * 作者: Joey Wong 黄俊研
 */

Component({
  properties: {

    levels: {
      type: Number,
      value: 2,
    },


    openStatus: {
      type: Boolean,
      value: false,
      
      observer: function (newVal) {
        this.setData({
          isActive: newVal,
          isRootSelected: false,
          pickName:'',
          level: 0,
         
        });
      }
      
    },
    items: null,
  },
  data: {
    isActive: false,
    modelList: [],
    nodeList: [],
    pickList: [],
    pickName:'',
    level:0,

  },

  methods: {

    selectRoot: function (event) {
      let proId = event.target.dataset.id;
     
      this.data.items.forEach((value) => {
        if (value.id === proId) {
          
          var nodeList = 'nodeList[' + this.data.level + ']';
          var pickList = 'pickList[' + this.data.level + ']';

          this.setData({
            
            [nodeList] : value.children,
            [pickList] : value,
            isRootSelected: true,
            pickName: value.name, 
            level: this.data.level+1, 
                  
          });

          console.log('nodelist:',this.data.nodeList);
        }
      });
    },
   

    // 处理返回
    backToPrev: function () {
     
      var pickData = this.data.pickList;
      delete pickData[this.data.level];

      this.setData({
        level: this.data.level-1,
      });
    },

    backToClose: function (){

      this.setData({
        openStatus: false,
      });
    },

  
    selectNode: function (event) {
      let proId = event.target.dataset.id;
      let currentLevel = this.data.level - 1;
      this.data.nodeList[currentLevel].forEach((value) => {
        if (value.id === proId) {
          var nodeList = 'nodeList[' + this.data.level + ']';
          var pickList = 'pickList[' + this.data.level + ']';
          if (value.children === '' || value.children == undefined){
           
            let { index } = event.target.dataset;
            let returnData = { selectedData: this.data.pickList, currentSelected: this.data.nodeList[currentLevel][index] }
            this.triggerEvent('handleSelect', returnData);

          }else{

            this.setData({
              [pickList]: value,
              [nodeList]: value.children,
              pickName: value.name,
              level: this.data.level + 1,

            });

          }
        }
      });
    }
  },
  ready: function () {


    this.setData({
      modelList: this.data.items,
      levels: this.data.levels,

     
    });
  }
})