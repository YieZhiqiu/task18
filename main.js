var curPage = 1
var perPageCount = 10
var colSumHeight = []
var nodeWidth = $('.item').outerWidth(true)
var colNum = parseInt($('#pic-ct').width()/nodeWidth)
for(var i=0; i<colNum.length; i++){
  colSumHeight[i] = 0;
}

var isDataArrive = true

start();

function start(){
  getData(function(newsList){
          console.log(newsList)
          isDataArrive = true
          $.each(newsList, function(idx, news){
            var $node = getNode(news)
            $node.find('img').load(function(){
              $('#pic-ct').append($node)
              console.log($node, 'loaded...')
              waterFallPlace($node)
            })
          })
          })
  isDataArrrive = false
}

$(window).scroll(function(){
  if(!isDataArrive) return
  if(isVisible($('#load'))){
    start()
  }
})

function getData(callback){
  $.ajax({
    url: 'http://platform.sina.com.cn/slide/album_tech',
    dataType: 'jsonp',
    jsonp: 'jsonpcallback',
    data: {
      app_key: '1271687855',
      num: perPageCount,
      page: curPage,
    }
  }).done(function(ret){
    if(ret && ret.status && ret.status.code === '0'){
      callback(ret.data);
      curPage++
    }else{
      console.log('get error data');
    }
  });
  
}

function getNode(item){
  var tp1 = ''
      tp1 += '<li class= " "item" >';
      tp1 += '<a href="'+ item.url +'" class="link"><img src="' + item.img_url + '" alt=""></a>';
      tp1 += ' <h4 class="header">'+ item.short_name+'</p>';
      tp1 += '</li>';
  
 return $(tp1)
}

function waterFallPlace($node){
  var idx = 0,
      minSumHeight = colSumHeight[0];
  for(var i=0; i<colSumHeight.length; i++){
    if(colSumHeight[i]<minSumHeight){
      idx = i;
      minSumHeight = colSumHeight[i];
    }
  }
  $node.css({
    left: nodeWidth*idx,
    top: minSumHeight,
    opacity: 1
  });
  
  colSumHeight[idx] = $node.outerHeight(true) + colSumHeight[idx];
  $('#pic-ct').height(Math.max.apply(null,colSumHeight));
}

 function isVisible($e1){
   var scrollH = $(window).scrollTop(),
       winH = $(window).height(),
       top = $e1.offset().top;
   if(top<winH + scrollH){
     return true;
   }else{
     return false;
   }
 }


function checkShow(){
  if(isShow($('#load'))){
    loadAndPlace();
  }
}

function isShow($e1){
  var scrollH = $(window).scrollTop(),
      winH = $(window).height(),
      top = $e1.offset().top;
  if(top<winH + scrollH){
    return true;
    
  }else{
    return false;
  }
}

var curPage = 1,
    perPageCount = 9;
function loadAndPlace(){
  $.ajax({
    url: "http://platform.sina.com.cn/slide/album_tech",
    dataType: 'jsonp',
    jsonp: 'jsoncallback',
    data: {
      app_key: '1271687855',
      num: perPageCount,
      page: curPage
    }
  }).done(function(ret){
    if(ret && ret.status.code ==='0'){
      place(ret.data);
      curPage++
    }else{
      console.log('get error data');
    }
  });
}


function place(nodeList){
  console.log(nodeList);
  $.each(nodeList, function(index,item){
    var $node = getNode(item)
    $node.find('img').load(function(){
      $('#pic-ct').append($node)
      waterFallPlace($node)
    })
  })
}

var colSumHeight = [],
    nodeWidth = $('.item').outerWidth(true),
    colNum = parseInt($('#pic-ct').width()/nodeWidth);

for(var i=0; i<colNum; i++){
  colSumHeight.push(0)
  
}
function waterFallPlace($nodes){
  $nodes.each(function(){
    var $cur = $(this);
    var idx = 0,
        minSumHeight = colSumHeight[0];
    for(var i=0; i<colSumHeight.length; i++){
      if(colSumHeight[i]<minHeight){
        idx = i;
        minSumHeight = colSumHeight[i];
      }
    }
    $cur.css({
      left: nodeWidth*idx,
      top: minSumHeight,
      opacity: 1
    });
    colSumHeight[idx] = $cur.outerHeight(true) + colSumHeight[idx];
    $('#pic-ct').height(Math.max.apply(null,colSumHeight));
  });
}


function getNode(item){
  var tpl = ''
	  tpl += '<li class="item">';
      tpl += ' <a href="'+ item.url +'" class="link"><img src="' + item.img_url + '" alt=""></a>';
	  tpl += ' <h4 class="header">'+ item.short_name +'</h4>';
	  tpl += '<p class="desp">'+item.short_intro+'</p>';
	  tpl += '</li>';
  
  return $(tp1)
}

function rednerData(item){
  var tpl = '',
		$nodes;
	for(var i = 0;i<items.length;i++){
		tpl += '<li class="item">';
		tpl += ' <a href="'+ items[i].url +'" class="link"><img src="' + items[i].img_url + '" alt=""></a>';
		tpl += ' <h4 class="header">'+ items[i].short_name +'</h4>';
		tpl += '<p class="desp">'+items[i].short_intro+'</p>';
		tpl += '</li>';
	}
	$nodes = $(tpl);
	$('#pic-ct').append($nodes);
	return $nodes;
}
