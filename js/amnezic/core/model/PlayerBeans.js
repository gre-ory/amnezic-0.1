Aria.beanDefinitions({
    $package : "amnezic.core.model.PlayerBeans",
    $description : "Player beans",
    $namespaces : {
        "json" : "aria.core.JsonTypes"
    },
    $beans : {
        "Player" : {
            $type : "json:Object",
            $description : "Player bean",
            $properties : {
                "icon" : {
                    $type : "json:String",
                    $description : "Icon"
                },
                "name" : {
                    $type : "json:String",
                    $description : "Name",
                    $mandatory : true
                },
                "score" : {
                    $type : "json:Integer",
                    $description : "Score",
                    $mandatory : true
                }
            }
        }
    }
});
