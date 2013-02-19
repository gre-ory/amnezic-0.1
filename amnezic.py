#!/usr/bin/python

# ##################################################
# import

import ConfigParser
from string import Template

# ##################################################
# paths

config_file = 'amnezic.ini'
config = ConfigParser.ConfigParser()
config.read( config_file )

# ##################################################
# version

html5_shiv_version = None
aria_templates_version = None
jquery_version = None
sound_manager_version = None
normalize_version = None
twitter_bootstrap_version = None

section = 'version'

html5_shiv_version = None # config.get( section, 'html5.shiv' )
aria_templates_version = config.get( section, 'aria.templates' )
jquery_version = config.get( section, 'jquery' )
sound_manager_version = None # config.get( section, 'sound.manager' )
normalize_version = config.get( section, 'normalize' )
twitter_bootstrap_version = config.get( section, 'twitter.bootstrap' )

# ##################################################
# paths

html5_shiv_path = None
aria_templates_path = None
jquery_path = None
sound_manager_path = None
normalize_path = None
twitter_bootstrap_path = None

section = 'path'

if html5_shiv_version:
    html5_shiv_path = Template( config.get( section, 'html5.shiv' ) or '' ).substitute( version = html5_shiv_version )
if aria_templates_version:
    aria_templates_path = Template( config.get( section, 'aria.templates' ) or '' ).substitute( version = aria_templates_version )
if jquery_version:
    jquery_path = Template( config.get( section, 'jquery' ) or '' ).substitute( version = jquery_version )
if sound_manager_version:
    sound_manager_path = Template( config.get( section, 'sound.manager' ) or '' ).substitute( version = sound_manager_version )
if normalize_version:
    normalize_path = Template( config.get( section, 'normalize' ) or '' ).substitute( version = normalize_version )
if twitter_bootstrap_version:
    twitter_bootstrap_path = Template( config.get( section, 'twitter.bootstrap' ) or '' ).substitute( version = twitter_bootstrap_version )

# ##################################################
# html

print 'Content-Type: text/html'
print

print '<html xmlns="http://www.w3.org/1999/xhtml">'

# ##################################################
# head

print '    <head>'
print '        <title>Amnezic</title>'
print '        <link href="img/musique.png" type="image/x-icon" rel="shortcut icon">'
print '        <meta charset="utf-8">'
print '        <meta name="description" content="Amnezic">'
print '        <meta name="viewport" content="width=device-width, initial-scale=1.0">'

# ##################################################
# javascript

if html5_shiv_path:
    print '        <!--[if lt IE 9]><script src="%s/js/html5shiv-printshiv.js" media="all"></script><![endif]-->' % html5_shiv_path

if aria_templates_path:
    print '                <script type="text/javascript">Aria = { debug: true }</script>'
    print '                <script type="text/javascript" src="%s/aria/ariatemplates-%s.js"></script>' % ( aria_templates_path, aria_templates_version )
    print '                <script type="text/javascript" src="%s/aria/css/atskin-%s.js"></script>' % ( aria_templates_path, aria_templates_version )
    print '                <script type="text/javascript">'
    print '                    aria.core.IO.defaultPostHeader = "application/json; charset=utf-8";'
    print '                    aria.core.AppEnvironment.setEnvironment({'
    print '                        defaultWidgetLibs : {'
    print '                            "aria": "aria.widgets.AriaLib",'
    print '                            "html": "amnezic.html.Library"'
    print '                        },'
    print '                        requestHandler : {'
    print '                            implementation : "aria.modules.requestHandler.JSONRequestHandler"'
    print '                        }'
    print '                    });'
    print '                    aria.core.DownloadMgr.updateRootMap({'
    print '                        amnezic : {'
    print '                            "*" : "js/"'
    print '                        }'
    print '                    });'
    print '                </script>'

if jquery_path:        
    print '                <script type="text/javascript" src="%s/jquery-%s.js"></script>' % ( jquery_path, jquery_version )
    print '                <script type="text/javascript">'
    print '                    jQuery.noConflict();'
    print '                </script>'
        
if twitter_bootstrap_path:
    print '                <script type="text/javascript" src="%s/js/bootstrap.min.js"></script>' % twitter_bootstrap_path
        
if sound_manager_path:
    print '                <script src="%s/soundmanager2-jsmin.js"></script>' % sound_manager_path
    print '                <script type="text/javascript">'
    print '                    soundManager.setup({'
    print '                        url: "%s/swf/",' % sound_manager_path
    print '                        onready: function() { console.log("soundmanager READY"); },'
    print '                        ontimeout: function() { console.log("soundmanager FAILED"); }'
    print '                    });'
    print '                </script>'

# ##################################################
# css
   
if normalize_path:
    print '                <link href="%s/css/normalize.css" media="all" type="text/css" rel="stylesheet">' % normalize_path
        
if twitter_bootstrap_path:
    print '                <link href="%s/css/bootstrap.min.css" media="all" type="text/css" rel="stylesheet">' % twitter_bootstrap_path
    print '                <link href="%s/css/bootstrap-responsive.min.css" media="all" type="text/css" rel="stylesheet">' % twitter_bootstrap_path

print '                <link href="css/amnezic.css" media="all" type="text/css" rel="stylesheet">'
print '                <link href="css/animation.css" media="all" type="text/css" rel="stylesheet">'
print '            </head>'

# ##################################################
# body

print '            <body class="amnezic">'
print '                <div id="main"></div>'
print '                <script type="text/javascript">'
print '        			Aria.loadTemplate( {'
print '                        classpath: "amnezic.core.view.Main",'
print '                        div: "main",'
print '                        moduleCtrl: {'
print '                            classpath : "amnezic.core.controller.ControllerImpl"'
print '                        }'
print '                    } );'
print '                </script>'
print '            </body>'    
print '        </html>'
