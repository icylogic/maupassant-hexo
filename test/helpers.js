var HexoHelper  = require('./lib/HexoHelper'),
    chai        = require('chai');

var hexoInstallPath = process.cwd() + '/test/hexo/'; // slash required

var helper = new HexoHelper(hexoInstallPath);

before(function(done){
    helper.hexo.init()
    .then(function(){
        return helper.hexo.load();
    })
    .then(function(){
        return done();
    });
});

describe('Helpers', function(){
    it('plural.js', function(){
        var pluralData = ['заметка', 'заметки', 'заметок']; // testing via russian

        var p9r = helper.hexo.extend.helper.store.plural; // this a hexo helper, loaded from scripts/ directory

        p9r.should.be.a('function'); // helper is loaded ok

        p9r(1, pluralData).should.equal('заметка');
        p9r(2, pluralData).should.equal('заметки');
        p9r(8, pluralData).should.equal('заметок');
    });

    it('tag_post_count.js', function(){
        var tag_post_count = helper.hexo.extend.helper.store.tag_post_count;

        tag_post_count.should.be.a('function'); // helper is loaded ok

        tag_post_count('hello').should.equal(2);
        tag_post_count('world').should.equal(1);

        tag_post_count('empty-tag').should.equal(0); // should just return 0, no errors
    });
});

