Aria.beanDefinitions({
    $package : "amnezic.core.model.MusicBeans",
    $description : "Music beans",
    $namespaces : {
        "json" : "aria.core.JsonTypes"
    },
    $beans : {
        "Music" : {
            $type : "json:Object",
            $description : "Music bean",
            $properties : {
                "song" : {
                    $type : "json:String",
                    $description : "Song",
                    $mandatory : true
                },
                "artist" : {
                    $type : "json:String",
                    $description : "Artist",
                    $mandatory : true
                },
                "time" : {
                    $type : "json:Integer",
                    $description : "Time"
                },
                "year" : {
                    $type : "json:Integer",
                    $description : "Year"
                },
                "album" : {
                    $type : "json:String",
                    $description : "Album"
                },
                "genre" : {
                    $type : "json:String",
                    $description : "Style"
                },
                "url" : {
                    $type : "json:String",
                    $description : "Url"
                }
            }
        },
        "Theme" : {
            $type : "json:Object",
            $description : "Theme bean",
            $properties : {
                "icon" : {
                    $type : "json:String",
                    $description : "Icon"
                },
                "title" : {
                    $type : "json:String",
                    $description : "Title",
                    $mandatory : true
                },
                "musics" : {
                    $type : "json:Array",
                    $description : "Musics",
                    $contentType : {
                        $type : "Music",
                        $description : "Music"
                    }
                }
            }
        }
    }
});
