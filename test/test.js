var HexoHelper      = require('./lib/HexoHelper'),
    chai            = require('chai'),
    should          = chai.should(),
    w3c             = require('w3cjs'),
    fs              = require('fs'),
    getMeta         = require('./lib/getMeta'),
    cheerio         = require('cheerio');

var skipW3c         = false;
var skipGenerate    = false;

var w3cTimeout      = 10000; // ms

var hexoInstallPath = process.cwd() + '/test/hexo/'; // slash required

var path = function(name){
    return hexoInstallPath + 'public/' + name;
};
var $load = function(file){
    return cheerio.load(fs.readFileSync(path(file)), {xmlMode: true});
};

var $pages = {};

var load$pages = function(){
    $pages.home             = $load('index.html');
    $pages.firstPost        = $load('default/hello-world/index.html');
    $pages.secondPost       = $load('default/hello/index.html');
    $pages.firstTagPage     = $load('tags/big-ammount-of-similar-posts/index.html');
    $pages.secondTagPage    = $load('tags/big-ammount-of-similar-posts/page/2/index.html');

    Object.keys($pages).forEach(function(i){ // loading meta (cheerio can not select meta tags)
        $pages[i].meta = getMeta($pages[i]);
    });
};

var helper = new HexoHelper(hexoInstallPath);

before(function(done){

    if(!skipGenerate){

        // setup a hexo dir may be sloow
        this.timeout(15000);
        helper.hexo.init().then(function(){
            return helper.hexo.load();
        })
        .then(function(){
            helper.cleanPublic();
            return helper.hexo.call('clean', {});
        })
        .then(function(){
            return helper.hexo.call('generate', {});
        })
        .then(function(){
            load$pages();
            return done();
        });
    }
    else{
        load$pages();
        done();
    }
});

describe('Home page', function(){
    if(!skipW3c){
        it('is w3c valid', function(done){

            this.timeout(w3cTimeout);

            w3c.validate({
                file:       path('index.html'),
                callback:   function (result){
                    console.log(result.messages);
                    result.messages.should.not.have.length.above(2); // By default, w3c gives two warning messages
                    done();
                }
            });
        });
    }
    it('has valid RSS link', function(){
        $pages.home('link[rel="alternate"]').attr('href').should.be.eql('/rss/index.xml'); // тесты на HTML ебашить так.
    });
    it('has no <br> tags (scripts/strip-br.js)', function(){
        $pages.home('br').length.should.equal(0);
    });
});

describe('Post page', function(){
    if(!skipW3c){
        it('is w3c valid', function(done){

            this.timeout(w3cTimeout);

            w3c.validate({
                file:       path('default/hello-world/index.html'),
                callback:   function(result){
                    console.log(result.messages);
                    result.messages.should.not.have.length.above(2); // By default, w3c gives two warning messages
                    done();
                }
            });
        });
    }
});
describe('Tag page', function(){
    it('Next tag page post count', function(){
        var nextPageCaption = $pages.firstTagPage('section.bottom.pagination>a').text();
        var nextPageCount   = nextPageCaption.match(/\d+/)[0];
        nextPageCount.should.be.equal('2');
    });
    it('Previous tag page post count', function(){
        var prevPageCaption = $pages.secondTagPage('section.top.pagination>a').text();
        var prevPageCount   = prevPageCaption.match(/\d+/)[0];
        prevPageCount.should.be.equal(helper.hexo.config.per_page.toString());
    });
    it('Next archive page post count', function(){
        var nextPageCaption = $pages.home('section.bottom.pagination>a').text();
        var nextPageCount   = nextPageCaption.match(/\d+/)[0];
        nextPageCount.should.be.equal('4');
    });
});

describe('opengraph', function(){
    it('og:url', function(){
        $pages.home.meta['og:url'].should.be.equal('http://localhost/index.html');
        $pages.firstPost.meta['og:url'].should.be.equal('http://localhost/default/hello-world/index.html');
    });
    it('fb:admin_id', function(){
        $pages.home.meta['fb:admin_id'].should.be.equal('100500');
        $pages.firstPost.meta.should.not.have.property('fb:admin_id'); // fb:admin_id is intended to be at home page only
    });
    it('og:image', function(){
        $pages.secondPost.meta['og:image'].should.be.equal('http://localhost/default/hello/test.png');
    });
    it('og:type === "article"', function(){
        $pages.home.meta.should.not.have.property('og:type');
        $pages.firstTagPage.should.not.have.property('og:type'); // og_type inteded to be only at post page
        $pages.firstPost.meta['og:type'].should.be.equal('article');
        $pages.firstPost.meta['article:author'].should.be.equal('https://facebook.com/zukerman');
    });
    it('og:description', function(){
        $pages.home.meta['og:description'].should.be.equal('Test blog description herer');          // default blog description
        $pages.firstPost.meta['og:description'].should.be.equal('First post custom description');   // custom description via front-matter
        $pages.secondPost.meta['og:description'].should.be.equal('Second post og:description');     // custom og:description via front-matter
    });
    it('og:title', function(){
        $pages.home.meta['og:title'].should.be.equal('Hexo');                   // default title in _config.xml
        $pages.secondPost.meta['og:title'].should.be.equal('og:Hello world');   // custom og:title configured via front-matter
    });
});
