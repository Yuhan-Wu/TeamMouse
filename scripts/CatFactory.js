var CatFactory=(function () {
    var factory;
    var stupid_max=5;
    function init() {
        return {
            createCat: function (catType,config) {
                switch (catType) {
                    case CatType.STUPID:
                        return new StupidCat(config);
                    default:
                        return new StupidCat(config);
                }
            },
            stupid_total:0
        }
    }

    return{
        getInstance:function () {
            if(!factory){
                factory=init();
            }
            return factory;
        }
    }
})();