module.exports = function ($page){
    var metas = {};

    $page('meta').each(function(){
        var $this = $page(this);

        var findMetaKey = function(possibleKeys){
            var foundKey;
            possibleKeys.forEach(function(i){
                if($this.attr(i) && $this.attr(i).length){
                    foundKey = $this.attr(i);
                    return;
                }
            });
            return foundKey;
        };
        var key = findMetaKey([
            'http-equiv',
            'property',
            'name',
        ]);

        metas[key] = $this.attr('content');
    });
    return metas;
};
