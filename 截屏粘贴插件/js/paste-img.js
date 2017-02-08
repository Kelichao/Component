/*!
 * @ description: 通过截屏并在网页中实现黏贴上传功能
 * @ 新版cef可用
 * @ author: kelichao
 * @ update: 2017-2-8
 */

;(function(undefined) {
    
    // flag是否进行base64编码
    function PasteImg(flag, id, fn) {
        this.input = document.querySelector("#img_input");
        this.fn = fn;
        this.event(flag);
    }

    PasteImg.prototype = {
        constrctor: PasteImg,
        // 文件处理函数
        _fileProcess: function(data, flag) {
            var reader = new FileReader();
            var _this = this;

            if (flag === true) {
                // filderReader成功读取数据
                reader.onload = function(e){
                    var baseCode = e.target.result;
                    // 这里也可以用this.result代替e.target.result
                    _this.fn(baseCode);
                };

                // fileReader读取数据
                reader.readAsDataURL(data);
            } else {
                _this.fn(data);
            }

        },
        event : function(flag) {
            var input = this.input;
            var _this = this;

            input.addEventListener("paste", function(event){
                var clipboard = event.clipboardData;
                var fileData,// 图片base64数据容器
                    property,// 浏览器获取图片数据后载体的
                    kind,// 获取到的文件类型
                    typeFlag,// 文件是否符合要求的标志位
                    type;// 

                // 如果存在获取截屏功能
                if (clipboard) {

                    // 如果有数据
                    if (clipboard.items) {
                        property = clipboard.items[0];

                        // 剪贴板总文件类型列表 - Files
                        // type = clipboard.types[0];

                        // 如果存在数据
                        if (property) {
                            kind = property.kind;// file
                            type = property.type;// "image/png"
                            typeFlag = (type.search("image") !== -1);
                            if (kind === "file" && typeFlag) {
                                fileData = property.getAsFile();
                                _this._fileProcess(fileData, flag);
                            }
                        }
                    }
                }
            });
        }
    };

    window.PasteImg = PasteImg;
    
    // 兼容 AMD 规范
    if (typeof define === 'function' && define.amd) {

        // 要求是define包裹，然后返回整个key对象即可
        define('PasteImg', [], function() {
            return PasteImg;
        });
    }

    // 兼容CMD规范
    // 需要在文件底部注册CMD规范，以underscore为例
    if(typeof define === "function" && define.cmd) {
      define(function() {
        return PasteImg;
      });
    }


})();