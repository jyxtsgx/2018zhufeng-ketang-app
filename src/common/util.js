
// ele表示哪个元素需要加载更多 cb表示滚到底部时执行哪个方法
export function loadMore(ele,cb){
  let timer;
  ele.addEventListener('scroll',function () {
     // 防抖
    clearTimeout(timer); //scroll事件触发多次 只留最后一次
    timer = setTimeout(()=>{
      // offsetHeight屏幕总高 scrollTop是卷去的高度  scrollHeight内容总高
      let {offsetHeight,scrollTop,scrollHeight} = ele;
      if(offsetHeight+scrollTop+20>scrollHeight){
          cb();
      }
    },30)
  },false);
}

export function pullRefresh(ele,cb) {
  let distance = ele.offsetTop; //默认content不动时的位置
  let startY;
  function touchmove(e) {
    let move = e.touches[0].pageY-startY; //移动的距离
    if(move>0){ // 向下拉
      ele.style.top = move + distance + 'px';
    }else{//如果向上拉 移除事件监听
      ele.removeEventListener('touchmove',touchmove);
      ele.removeEventListener('touchend',touchend);
    }
  }
  function touchend() { // 抬起时清空事件
    ele.removeEventListener('touchmove',touchmove);
    ele.removeEventListener('touchend',touchend);
  }
  function touchstart(e) {
    startY = e.touches[0].pageY;//记录开始的位置
    // 当前已经滚到头部 并且这个盒子不是在下拉刷新中
    if(ele.scrollTop === 0&&ele.offsetTop === distance){
      ele.addEventListener('touchmove',touchmove);
      ele.addEventListener('touchend',touchend);
    }
  }
  ele.addEventListener('touchstart',touchstart,false)
}