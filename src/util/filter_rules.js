import * as Validate from '@/util/validate'

export default function install(Vue, options) {
    /**
     * 注意:  定义type 规则时 不用做非空验证 
     *        只需要传入 required:true 即可
     * */
    /*保留两位小数*/
    const isvalidateMoney = (rule, value, callback) => {
        if (value != null && value != "") {
            if (!Validate.validateMoneyNumber(value)) {
                callback(new Error('请输入正确的数字，最多保留两位小数!'))
            } else {
                callback()
            }
        }
        else {
            callback();
        }
    }
    /*验证QQ号码*/
    const isvalidateQQ = (rule, value, callback) => {
        if (value != null && value != "") {
            if (!Validate.qq(value)) {
                callback(new Error('您输入的QQ号不正确!'))
            } else {
                callback()
            }
        }
        else {
            callback();
        }
    }
    /*验证手机号*/
    const isvalidateMobile = (rule, value, callback) => {
        if (value != null && value != "") {
            if (!Validate.mobile(value)) {
                callback(new Error('您输入的手机号不正确!'))
            } else {
                callback()
            }
        }
        else {
            callback();
        }
    }
    /*含有非法字符(只能输入字母、汉字)*/
    const isvalidateRegexn = (rule, value, callback) => {
        if (value != null && value != "") {
            if (!Validate.regexn(value)) {
                callback(new Error('含有非法字符(只能输入字母、汉字)!'))
            } else {
                callback()
            }
        }
        else {
            callback();
        }
    }
    /*请输入正整数*/
    const isvalidateInteger = (rule, value, callback) => {
        if (value != null && value != "") {
            if (!Validate.integer(value)) {
                callback(new Error('请输入正整数!'))
            } else {
                callback()
            }
        }
        else {
            callback();
        }
    }
    /*请输入数字*/
    const isvalidateNumber = (rule, value, callback) => {
        console.log("aaaaa");
        if (value != null && value != "") {
            if (!Validate.isNumber(value)) {
                callback(new Error('请输入数字类型!'))
            } else {
                callback()
            }
        }
        else {
            callback();
        }
    }

    /**
     * 参数 item 
     * required true  必填项
     * maxLength  字符串的最大长度
     * min 和 max 必须同时给 min < max  type=number
     * type 手机号 mobile
     *      邮箱   email
     *      网址   url 
     *      各种自定义类型   定义在 src/utils/validate 中    持续添加中.......
     * */

    Vue.prototype.filter_rules = function (item) {
        let rules = [];
        if (item.required) {
            rules.push({ required: true, message: '该输入项为必填项!', trigger: 'blur' });
        }
        if (item.maxLength) {
            rules.push({ min: 1, max: item.maxLength, message: '最多输入' + item.maxLength + '个字符!', trigger: 'blur' })
        }
        if (item.min && item.max) {
            rules.push({ min: item.min, max: item.max, message: '字符长度在' + item.min + '至' + item.max + '之间!', trigger: 'blur' })
        }
        if (item.type) {
            let type = item.type;
            switch (type) {
                case 'email':
                    rules.push({ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' });
                    break;
                case 'qq':
                    rules.push({ validator: isvalidateQQ, trigger: 'blur,change' });
                    break;
                case 'mobile':
                    rules.push({ validator: isvalidateMobile, trigger: 'blur,change' });
                    break;
                case 'regexn':
                    rules.push({ validator: isvalidateRegexn, trigger: 'blur,change' });
                    break;
                case 'integer':
                    rules.push({ validator: isvalidateInteger, trigger: 'blur,change' });
                    break;
                case 'number':
                    rules.push({ validator: isvalidateNumber, trigger: 'blur,change' });
                    break;
                default:
                    rule.push({});
                    break;
            }
        }
        return rules;
    };
}