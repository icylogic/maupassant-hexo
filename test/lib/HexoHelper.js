var Hexo    = require('hexo'),
    del     = require('del');


function HexoHelper(hexoInstallPath){
    this.hexoInstallPath = hexoInstallPath;
    this.hexo = new Hexo(hexoInstallPath, {});
}

HexoHelper.prototype.cleanPublic = function(){
    return del.sync(this.hexoInstallPath + '/public/*');
};

module.exports = HexoHelper;
