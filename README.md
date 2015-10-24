Maupassant
==========

A simple Hexo template with great performance on different devices, ported from a Typecho theme by [Cho](https://github.com/pagecho), forked and modified from [icylogic](https://github.com/icylogic/maupassant-hexo/).

![template preview](https://ddydeg.by3302.livefilestore.com/y2p1ZgHER4eIFaEHhwaf96MvZH4_iLufEIDj7o8acDgI1GXFDtPI-eRAgvokFoR9irbz738gMmWc_N7yexG6uhB1Dcmelb0cXg8HexpiAdZ5HQ/m.png "Maupassant template preview")

## Installation

- Install theme and renderers:

```
git clone https://github.com/tufu9441/maupassant-hexo.git themes/maupassant
npm install hexo-renderer-sass --save
npm install hexo-renderer-jade --save
```

- Edit `_config.yml` in hexo root, change `theme` to `maupassant`.

## Probable solutions


- Check if your Terminal's current directory is in hexo's root directory which contains `source/`, `themes/`, etc.

- Feel free to open an [issue](https://github.com/tufu9441/maupassant-hexo/issues/new).
 

## Usage

- You can set a **favicon.ico** for your website, please put it into  `/source` folder of hexo directory, recommended size: 32px*32px.

- You can add a website logo for apple devices, please put an image named **apple-touch-icon.png** into `/source` folder of hexo directory, recommended size: 114px*114px.

- You can set your friendly links in `/themes/maupassant/layout/base.jade` like this:

```
 .widget
   .widget-title= __('blogroll')
   ul: != link_to('http://example1.com/', 'site-name 1', {external: true})
   ul: != link_to('http://example2.com/', 'site-name 2', {external: true})
   ul: != link_to('http://example3.com/', 'site-name 3', {external: true})
```

- If you want to use the theme's own highlighted code showcase, please set the `highlight` option in `/_config.yml` of hexo directory like this:

```
highlight:
  enable: false
  line_number: false
  tab_replace:
```

- To customize pages, after creating new folders including `index.md` in `/source`, don't forget to add corresponding contents in `/themes/maupassant/layout/base.jade`:

```
#nav-menu
        +a_with_current(config.root, __('home'))
        +a_with_current(config.archive_dir, __('archive')) 
        +a_with_current(config.about_dir, __('about'))
        +a_with_current(config.feed.path, __('rss'))
```

and `/_config.yml` of hexo directory. Just follow the format of existing items.

```
    # Directory
    source_dir: source
    public_dir: public
    tag_dir: tags
    category_dir: categories
    archive_dir: archives/
    about_dir: about/
    code_dir: downloads/code
    i18n_dir: :lang
    skip_render:
```
- If you want to disable the fancybox effect on certain images, please add a "nofancybox" class to them.

- Two languages are available for this theme currently, English (en) and Chinese (zh-CN). Translation works to other languages are welcome.

## Maupassant on other platforms:

+ Typecho：https://github.com/pagecho/maupassant/
+ Octopress：https://github.com/pagecho/mewpassant/
+ Farbox：https://github.com/pagecho/Maupassant-farbox/
+ Wordpress：https://github.com/iMuFeng/maupassant/
+ Ghost: https://github.com/LjxPrime/maupassant/
