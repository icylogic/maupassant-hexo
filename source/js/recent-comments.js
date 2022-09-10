!function () {
  let serverURL = document.getElementById("recent-comment").getAttribute("serverURL")
  let count = document.getElementById("recent-comment").getAttribute("count")
  if (!count) {
    count = 10
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
        comments += '<li>' + (index + 1) + '、' + comment.nick + '<a href="https://cirry.cn' + comment.url + '">在此篇文章中</a>'
        comments += comment.pid ? '回复到：' : '评论到：'
        comments += comment.comment + '</li>'
      })
      comments += '</ul>'
      $('#widget-waline-list').append(comments)
    },
  })
}()
