let app = getApp();
let id = 0;
let colorArray = [
  "#f44336",
  "#ff4081",
  "#ffc107",
  "#2196f3"
];

Page({
  data: {
    userInfo: null,
    title: '',
    desc: '',
    obj: {},
    arr: [],
    finished: [],
    startX: null,
    startY: null,
    tfocus: false,
    dfocus: false,
    editIndex: null
  },

  onReady(e) {
  },

  onLoad() {
    let that = this;

    let arr = this.data.arr;
    let finished = this.data.finished;

    let _arr = arr.map(item => {
      item.color = colorArray[0]
    })

    wx.getStorage({
      key: 'o',
      success: function (res) {
        _arr = res.data.arr;
        finished = res.data.finished;

        that.setData({
          arr: _arr || [],
          finished: finished ||[]
        })
      }
    })
  },

  //share
  onShareAppMessage() {
    return {
      title: 'supertask',
      desc: '高效办公，任务管理',
      path: '/pages/index/index'
    }
  },

  changeTitle(e) {
    this.setData({ title: e.detail.value });
  },

  changeDesc(e) {
    this.setData({ desc: e.detail.value });
  },

  //add a item
  add(e) {
    let obj = {};
    let arr = this.data.arr;
    let idx = this.data.editIndex;

    // this.setData({ title: e.detail.value });

    obj.id = id;
    id += 1;
    obj.title = e.detail.value;
    obj.desc = this.data.desc;
    obj.editState = false;
    obj.color = colorArray[0];

    if (obj.title == '') {
      return false;
    }

    if (idx != null) {
      obj.id = idx;
      arr.splice(idx, 1, obj);
    } else {
      arr.push(obj)
    }
    
    this.setData({
      arr: arr,
      title: '',
      desc: ''
    })

    let o = { arr: arr }
    wx.setStorage({
      key: "o",
      data: o
    })
  },

  //finished a item
  finished(e) {
    let dataset = e.currentTarget.dataset;
    let item = dataset.item;
    let index = dataset.index;
    let arr = this.data.arr;
    let finished = this.data.finished;

    arr.splice(index, 1)
    finished.unshift(item);

    this.setData({
      arr: arr,
      finished: finished
    })

    let o = { arr: arr, finished: finished };

    wx.setStorage({
      key: "o",
      data: o
    })
  },

  //restore a item
  restore(e) {
    let dataset = e.currentTarget.dataset
    let item = dataset.item;
    let index = dataset.index;
    let arr = this.data.arr;
    let finished = this.data.finished;

    finished.splice(index, 1);
    arr.unshift(item);

    this.setData({
      arr: arr,
      finished: finished
    })

    let o = { arr: arr, finished: finished }
    wx.setStorage({
      key: "o",
      data: o
    })
  },

  // edit item
  edit(e) {
    console.log("edit...")
    let dataset = e.currentTarget.dataset
    let item = dataset.item;
    let index = dataset.index;

    let title = item.title;
    let desc = item.desc;

    this.setData({
      editIndex: index,
      tfocus: true,
      title: title,
      desc: desc
    })  
  },

  // remove item
  remove(e) {
    console.log("remove...")
    let dataset = e.currentTarget.dataset
    let item = dataset.item;
    let index = dataset.index;
    let arr = this.data.arr;
    let finished = this.data.finished;

    arr.splice(index, 1)

    this.setData({
      arr: arr
    })

    let o = {arr: arr, finished: finished}

    wx.setStorage({
      key: "o",
      data: o
    })
  },

  // change color
  changeColor(e) {
    let dataset = e.currentTarget.dataset;
    let color = dataset.color;
    let index = dataset.index;
    let colorIndex = colorArray.indexOf(color);
    let arr = this.data.arr;

    if (colorIndex === -1) {
      return false;
    } else {
      let i = colorIndex + 1;
      
      if (i === colorArray.length) {
        i = 0
      }

      arr[index].color = colorArray[i];

      this.setData({
        arr: arr
      })

    }
  },

  // sync 
  sync(e) {
    console.log("同步到服务端....")
  },

  // start
  start(e) {

    let startX = e.touches[0].pageX;
    let startY = e.touches[0].pageY;
    this.setData({
      startX: startX,
      startY: startY
    })
  },

  // touchmove
  move(e) {
    let index =  e.currentTarget.dataset.index;
    let arr = this.data.arr;
    let startX = this.data.startX;
    let startY = this.data.startY;
    let pageX = e.touches[0].pageX;
    let pageY = e.touches[0].pageY;

    let x = pageX - startX;
    let y = pageY - startY;

    // console.log(x)
    // console.log(y)

    if (x > y && x > 0) {
      arr[index].editState = false;
      this.setData({
        arr: arr
      })
    }
    if (x < y && x < 0) {
      arr[index].editState = true;
      this.setData({
        arr: arr
      })
    } 
    if (y > x && y > 0) {
      // console.log("向下")
    } 
    if (y < x && y < 0) {
      // console.log("向上")
    }
  }

});
