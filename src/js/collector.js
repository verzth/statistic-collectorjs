(function ($) {
    var $_VERSION = "0.0.1-alpha001";
    var $_BUILD = 1;

    this.Collector = function () {
        var defaults = {
            host: "",
            key: "",
            type: "",
        };

        this.params = {};

        if(arguments[0] && typeof arguments[0] === "object"){
            this.options = extendDefaults(defaults,arguments[0]);
        }else this.options = defaults;
    };

    Object.defineProperties(this.Collector, {
        HIT: {
            value: "hit",
            writable: false
        },
        CONTENT: {
            value: "content",
            writable: false
        },
        EVENT: {
            value: "event",
            writable: false
        },
        HOURLY: {
            value: "hourly",
            writable: false
        },
        DAILY: {
            value: "daily",
            writable: false
        },
        WEEKLY: {
            value: "weekly",
            writable: false
        },
        MONTHLY: {
            value: "monthly",
            writable: false
        },
        COLUMN_PAGE: {
            value: "page",
            writable: false
        },
        COLUMN_PAGE_TYPE: {
            value: "page_type",
            writable: false
        }
    });

    function extendDefaults(source,properties) {
        var property;
        for(property in properties){
            if(properties.hasOwnProperty(property)){
                source[property] = properties[property];
            }
        }
        return source;
    }

    Collector.prototype.prepareHit = function(){
        this.options.type = Collector.HIT;

        return this;
    };

    Collector.prototype.prepareContent = function(){
        this.options.type = Collector.CONTENT;

        Collector.prototype.setID = function (id) {
            this.params.id = id;
            return this;
        };

        Collector.prototype.setAction = function () {
            this.params.action = Array.from(arguments);
            return this;
        };

        Collector.prototype.setCategory = function (category) {
            this.params.category = category;
            return this;
        };

        Collector.prototype.setType = function (type) {
            this.params.type = type;
            return this;
        };

        return this;
    };

    Collector.prototype.prepareEvent = function(){
        this.options.type = Collector.EVENT;

        Collector.prototype.setID = function (id) {
            this.params.id = id;
            return this;
        };

        Collector.prototype.setName = function () {
            this.params.name = Array.from(arguments);
            return this;
        };

        Collector.prototype.setCategory = function (category) {
            this.params.category = category;
            return this;
        };

        Collector.prototype.setType = function (type) {
            this.params.type = type;
            return this;
        };

        return this;
    };

    Collector.prototype.setRange = function (startDate, endDate) {
        this.params._start = moment(startDate).toISOString();
        this.params._end = moment(endDate).toISOString();
        return this;
    };

    Collector.prototype.setDevice = function (device) {
        if(typeof device === 'object'){
            this.params.device = device;
        }else{
            this.params.device = {id: device};
        }
        return this;
    };

    Collector.prototype.setLocation = function (location) {
        if(typeof location === 'object'){
            this.params.location = location;
        }
        return this;
    };

    Collector.prototype.setAttributes = function (attributes) {
        if(typeof attributes === 'object'){
            this.params.attributes = attributes;
        }
        return this;
    };

    Collector.prototype.merge = function () {
        this.params.merge = 1;
        return this;
    };

    Collector.prototype.setUserID = function (userID) {
        this.params.user_id = userID;
        return this;
    };

    Collector.prototype.setPage = function (page) {
        this.params.page = page;
        return this;
    };

    Collector.prototype.setPageType = function (pageType) {
        this.params.page_type = pageType;
        return this;
    };

    Collector.prototype.setAge = function (age) {
        this.params.age = age;
        return this;
    };

    Collector.prototype.setGender = function (gender) {
        this.params.gender = gender;
        return this;
    };

    Collector.prototype.setInteraction = function (isInteraction) {
        this.params.isInteraction = isInteraction;
        return this;
    };

    Collector.prototype.withColumns = function () {
        this.params.columns = Array.from(arguments);
        return this;
    };

    function collect(time, callback) {
        switch (this.options.type) {
            case Collector.CONTENT:{
                    $.ajax({
                        type : "POST",
                        url : this.options.host+"content/"+time,
                        headers : {
                            'Authorization': 'Basic '+btoa(this.options.key+":"),
                            'Accept': 'application/json',
                        },
                        contentType : 'application/json',
                        dataType : 'json',
                        data : JSON.stringify(this.params),
                        success: function (res) {
                            if(res.status===1){
                                callback.success(res.data);
                            }else{
                                callback.failed();
                            }
                        },
                        error: function (xhr) {
                            callback.failed();
                        }
                    });
                }break;
            case Collector.EVENT:{
                    $.ajax({
                        type : "POST",
                        url : this.options.host+"event/"+time,
                        headers : {
                            'Authorization': 'Basic '+btoa(this.options.key+":"),
                            'Accept': 'application/json',
                        },
                        contentType : 'application/json',
                        dataType : 'json',
                        data : JSON.stringify(this.params),
                        success: function (res) {
                            if(res.status===1){
                                callback.success(res.data);
                            }else{
                                callback.failed();
                            }
                        },
                        error: function (xhr) {
                            callback.failed();
                        }
                    });
                }break;
            default:{
                $.ajax({
                    type : "POST",
                    url : this.options.host+"hit/"+time,
                    headers : {
                        'Authorization': 'Basic '+btoa(this.options.key+":"),
                        'Accept': 'application/json',
                    },
                    contentType : 'application/json',
                    dataType : 'json',
                    data : JSON.stringify(this.params),
                    success: function (res) {
                        if(res.status===1){
                            callback.success(res.data);
                        }else{
                            callback.failed();
                        }
                    },
                    error: function (xhr) {
                        callback.failed();
                    }
                });
            }
        }
    }

    Collector.prototype.collect = function (time,callback) {
        collect.call(this,time,callback);
        this.params = {};
    };
}(jQuery));
