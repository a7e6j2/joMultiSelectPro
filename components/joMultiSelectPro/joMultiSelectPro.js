/*
 * 两层全屏选择应用
 *
 * 作者: Joey Wong 黄俊研
 */

Component({
  properties: {

    levels: {
      type: Number,
      value: 1,
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
    isRootSelected: false,
    modelList: [],
    nodeList: [],
    rootList:[],
    pickName:'',
    level:0,

  },

  methods: {

    selectRoot: function (event) {
      let proId = event.target.dataset.id;
     
      this.data.items.forEach((value) => {
        if (value.id === proId) {
          
          var nodeList = 'nodeList[' + this.data.level + ']';


          this.setData({
            rootList: value,
            [nodeList] : value.children,
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
      this.setData({
        level: this.data.level-1,
      });
    },

  
    selectNode: function (event) {
      let proId = event.target.dataset.id;
      let currentLevel = this.data.level - 1;
      this.data.nodeList[currentLevel].forEach((value) => {
        if (value.id === proId) {
          var nodeList = 'nodeList[' + this.data.level + ']';
          console.log(value.children)
          console.log('result', value.children === '')
          if (value.children === '' || value.children == undefined){
           
            let { index } = event.target.dataset;
            ///let returnData = { rootData: this.data.rootList, currentData: this.data.secondList[index] }
            this.triggerEvent('handleSelect', index);
          }else{

            this.setData({
              [nodeList]: value.children,
              pickName: value.name,
              level: this.data.level + 1,

            });

          

          }
       
          

          console.log('nodelist2:', this.data.nodeList);
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