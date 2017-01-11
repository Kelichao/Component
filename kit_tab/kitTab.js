;(function() {
	function KitTab(option) {
		
		// 参数糅合
		this.option = $.extend(KitTab.DEFAULT, option);

		// 全局化标签体对象
		this.items = $(this.option.itemCont + ">li");
		// 全局化内容体对象
		this.conts = $(this.option.contentCont + ">div");
		//初始化
		this.init();
	}
	
	// 默认配置
	KitTab.DEFAULT = {
		itemOn: "on",
		contOn: "show",
		type: "click",
	};

	KitTab.prototype = {
		constructor: KitTab,
		init: function() {
			var option = this.option;
			// 改变回调内部指向
			var event = this.event.bind(this);
			
			// 绑定事件
			this.items.on(option.type, event);

			// 选中默认项
			if (option.default) {
				this.defaultFunction(option.default);
			}
		},
		changeItemClass: function(obj) {
			obj.siblings().removeClass(this.option.itemOn);
			obj.addClass(this.option.itemOn);
		},
		changeContClass: function(obj) {
			obj.siblings().removeClass(this.option.contOn);
			obj.addClass(this.option.contOn);
		},
		defaultFunction: function(defa) {
			var _this = this;
			// 如果默认data-tab符合要求
			if (typeof defa === "string") {
				this.items.each(function(key, value) {
					if ($(value).attr("data-tab") == defa) {
						$(value).trigger(_this.option.type);
						return false;// 退出循环
					}
				});
			}
		},
		event: function(e) {
			var totalCont = null,
				tag = $(e.target),
				dataTab = this.dataTab = tag.attr("data-tab");

			// 改变item样式
			this.changeItemClass(tag);

			// 通过data-tab的值，匹配cont容器
			$(this.conts).each(function(key, value){
				var $value = $(value);
				var flag = ($value.attr("data-tab") == dataTab);
				if (flag) {
					totalCont = $value;
					return false;// return false退出循环
				}	
			});

			// 改变内容体样式
			this.changeContClass(totalCont);

			// 触发回调
			this.option.callback(this.dataTab);
		}
	};

	window.KitTab = KitTab;
})();
