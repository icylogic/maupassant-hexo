!function () {
  let serverURL = document.getElementById("recent-comment").getAttribute("serverURL")
  let count = document.getElementById("recent-comment").getAttribute("count")
  if (!count) {
    count = 10
  }

  //格式化时间
  function format( date ) {
    return new Date(date).toLocaleString()
  }

  // 处理评论
  function dealComment( commentStr ) {
    let re = /<a[^>]*href=['"]([^\\"]*)['"][^>]*>(.*?)<\/a>/g;
    let arr = [];
    while (re.exec(commentStr) != null) {
      arr.push(RegExp.$1); //如果是RegExp.$1那么匹配的就是href里的属性了!
      arr.push(RegExp.$2)
    }
    if (arr.length > 0) { // 说明有匹配到回复
      commentStr = commentStr.replace(/<a[^>](.*?)<\/a>/, arr[1])
      return {
        href: arr[0],
        author: arr[1],
        str: commentStr
      }
    }
    return ''
  }

  $.ajax({
    url: serverURL + '/comment?type=recent',
    dataType: 'json',
    data: {
      count
    },
    success: function ( response ) {
      let comments = '<ul>'
      response.forEach(( comment, index ) => {
        comments += '<li>' + (index + 1) + '、 ' + format(comment.insertedAt)
        if (comment.pid) {
          let {href, author, str} = dealComment(comment.comment)
          comments += '<div class="waline-comment-content"><a style="display: block" href=' + window.location.origin + comment.url + href + '>'+ str + '</a></div>'
        } else {
          comments += '<div class="waline-comment-content"><a style="display: block" href=' + window.location.origin + comment.url + '#' + comment.objectId + '>' + comment.comment + '</a></div>'
        }
        comments += '<div class="waline-comment-content-author">' + '--' + comment.nick + '</div></li>'
      })
      comments += '</ul>'
      $('#widget-waline-list').append(comments)
    },
  })
}()
