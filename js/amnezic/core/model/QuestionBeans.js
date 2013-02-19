Aria.beanDefinitions({
    $package : "amnezic.core.model.QuestionBeans",
    $description : "Question beans",
    $namespaces : {
        "json" : "aria.core.JsonTypes",
        "music" : "amnezic.model.MusicBeans"
    },
    $beans : {
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
                }
            }
        },
        "Answer" : {
            $type : "json:Object",
            $description : "Answer bean",
            $properties : {
                "number" : {
                    $type : "json:Integer",
                    $description : "Number",
                    $mandatory : true
                },
                "title" : {
                    $type : "json:String",
                    $description : "Title",
                    $mandatory : true
                },
                "hint" : {
                    $type : "json:String",
                    $description : "Hint"
                },
                "solution" : {
                    $type : "json:Boolean",
                    $description : "Solution flag"
                },
                "weight" : {
                    $type : "json:Integer",
                    $description : "Weight"
                }
            }
        },
        "Question" : {
            $type : "json:Object",
            $description : "Question bean",
            $properties : {
                "theme" : {
                    $type : "Theme",
                    $description : "theme",
                    $mandatory : true
                },
                "musics" : {
                    $type : "json:Array",
                    $description : "Musics",
                    $contentType : {
                        $type : "Music",
                        $description : "Address of a contact"
                    }
                },
                "playing" : {
                    $type : "json:Boolean",
                    $description : "Playing flag"
                }
            }
        }
    }
});
