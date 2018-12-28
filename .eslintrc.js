module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended'],

  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    //组件单行属性个数定义
    'vue/max-attributes-per-line': [
      2,
      {
        //组件代码为一行时，每行最多属性个数
        singleline: 6,
        multiline: {
          max: 1,
          //不允许属性放在组件定义第一行
          allowFirstLine: false
        }
      }
    ],
    //组件prop需设置默认值
    'vue/require-default-prop': 'off',
    //组件name格式定义，如：name: 'MyComponent'
    'vue/name-property-casing': ['error', 'PascalCase'],
    // 定义对象的set存取器属性时，强制定义get
    'accessor-pairs': 2,
    //=>的前/后括号
    'arrow-spacing': [2, { before: true, after: true }],
    //如果代码块是单行的时候，代码块内部前后需要留一个空格
    'block-spacing': [2, 'always'],
    //大括号语法采用『1tbs』,允许单行样式
    'brace-style': [
      2,
      '1tbs',
      {
        allowSingleLine: true
      }
    ],
    //强制使用骆驼拼写法命名约定
    camelcase: [
      0,
      {
        properties: 'always'
      }
    ],
    //在定义对象或数组时，最后一项不能加逗号
    'comma-dangle': [2, 'never'],
    //在写逗号时，逗号前面不需要加空格，而逗号后面需要添加空格
    'comma-spacing': [2, { before: false, after: true }],
    //如果逗号可以放在行首或行尾时，那么请放在行尾
    'comma-style': [2, 'last'],
    //在constructor函数中，如果classes是继承其他class，那么请使用super。否者不使用super
    'constructor-super': 2,
    //在if-else语句中，如果if或else语句后面是多行，那么必须加大括号。如果是单行就应该省略大括号。
    curly: [2, 'multi-line'],
    //该规则规定了.应该放置的位置，
    'dot-location': [2, 'property'],
    //该规则要求代码最后面需要留一空行，（仅需要留一空行）
    'eol-last': 2,
    //使用=== !== 代替== != .
    eqeqeq: 'off',
    //该规则规定了generator函数中星号两边的空白。
    'generator-star-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    // 规定callback 如果有err参数，只能写出err 或者 error .
    'handle-callback-err': [2, '^(err|error)$'],
    //强制使用一致的缩进,2个空格
    indent: [
      2,
      2,
      {
        //case缩进
        SwitchCase: 1
      }
    ],
    //强制在 JSX 属性中一致地使用双引号或单引号
    'jsx-quotes': [2, 'prefer-single'],
    //该规则规定了在对象字面量语法中，key和value之间的空白，冒号前不要空格，冒号后面需要一个空格
    'key-spacing': [
      2,
      {
        beforeColon: false,
        afterColon: true
      }
    ],
    //关键字前后空格
    'keyword-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    //构造函数首字母大写
    'new-cap': [
      2,
      {
        newIsCap: true,
        capIsNew: false
      }
    ],
    //在使用构造函数时候，函数调用的圆括号不能够省略
    'new-parens': 2,
    //禁止使用Array构造函数
    'no-array-constructor': 2,
    //禁止使用arguments.caller和arguments.callee
    'no-caller': 2,
    //禁用console
    'no-console': 'off',
    //禁止覆盖class命名，也就是说变量名不要和class名重名
    'no-class-assign': 2,
    //在条件语句中不要使用赋值语句
    'no-cond-assign': 2,
    //const申明的变量禁止修改
    'no-const-assign': 2,
    //在正则表达式中禁止使用控制符
    'no-control-regex': 0,
    //禁止使用delete删除var申明的变量
    'no-delete-var': 2,
    //函数参数禁止重名
    'no-dupe-args': 2,
    //class中的成员禁止重名
    'no-dupe-class-members': 2,
    //在对象字面量中，禁止使用重复的key
    'no-dupe-keys': 2,
    //在switch语句中禁止重复的case
    'no-duplicate-case': 2,
    //禁止使用不匹配任何字符串的正则表达式
    'no-empty-character-class': 2,
    //禁止使用空正则表达式
    'no-empty-pattern': 2,
    //禁止使用eval函数
    'no-eval': 2,
    //禁止对catch语句中的参数进行赋值
    'no-ex-assign': 2,
    //禁止扩展原生对象
    'no-extend-native': 2,
    //禁止在不必要的时候使用bind函数
    'no-extra-bind': 2,
    //在一个本来就会自动转化为布尔值的上下文中就没必要再使用!! 进行强制转化了。
    'no-extra-boolean-cast': 2,
    //禁止使用多余的圆括号
    'no-extra-parens': [2, 'functions'],
    //这条规则，简单来说就是在case语句中尽量加break，避免不必要的fallthrough错误
    'no-fallthrough': 2,
    //简单来说不要写这样的数字.2 2.。应该写全，2.2 2.0 .
    'no-floating-decimal': 2,
    //禁止对函数名重新赋值
    'no-func-assign': 2,
    //禁止使用类eval的函数。
    'no-implied-eval': 2,
    //禁止在代码块中定义函数（下面的规则仅限制函数）
    'no-inner-declarations': [2, 'functions'],
    //RegExp构造函数中禁止使用非法正则语句
    'no-invalid-regexp': 2,
    //禁止使用不规则的空白符
    'no-irregular-whitespace': 2,
    //禁止使用__iterator__属性
    'no-iterator': 2,
    //label和var申明的变量不能重名
    'no-label-var': 2,
    //禁止使用label语句
    'no-labels': [
      2,
      {
        allowLoop: false,
        allowSwitch: false
      }
    ],
    //禁止使用没有必要的嵌套代码块
    'no-lone-blocks': 2,
    //不要把空格和tab混用
    'no-mixed-spaces-and-tabs': 2,
    //顾名思义，该规则保证了在逻辑表达式、条件表达式、
    //申明语句、数组元素、对象属性、sequences、函数参数中不使用超过一个的空白符。
    'no-multi-spaces': 2,
    //该规则保证了字符串不分两行书写。
    'no-multi-str': 2,
    //空行不能够超过2行
    'no-multiple-empty-lines': [
      2,
      {
        max: 2
      }
    ],
    //该规则保证了不重写原生对象。
    'no-native-reassign': 2,
    //在in操作符左边的操作项不能用! 例如这样写不对的：if ( !a in b) { //dosomething }
    'no-negated-in-lhs': 2,
    //不要通过new Object（），来定义对象
    'no-new-object': 2,
    //禁止把require方法和new操作符一起使用。
    'no-new-require': 2,
    //禁止把symbol方法和new操作符一起使用。
    'no-new-symbol': 2,
    //当定义字符串、数字、布尔值就不要使用构造函数了，String、Number、Boolean
    'no-new-wrappers': 2,
    //禁止无意得把全局对象当函数调用了，比如下面写法错误的：Math(), JSON()
    'no-obj-calls': 2,
    //不要使用八进制的语法
    'no-octal': 2,
    //用的少
    'no-octal-escape': 2,
    'no-path-concat': 2,
    //不要使用__proto__
    'no-proto': 2,
    //不要重复申明一个变量
    'no-redeclare': 2,
    //正则表达式中不要使用空格
    'no-regex-spaces': 2,
    //return语句中不要写赋值语句
    'no-return-assign': [2, 'except-parens'],
    //不要给自身作assign
    'no-self-assign': 2,
    //不要和自身作比较
    'no-self-compare': 2,
    //不要使用逗号操作符
    'no-sequences': 2,
    //禁止对一些关键字或者保留字进行赋值操作，比如NaN、Infinity、undefined、eval、arguments等。
    'no-shadow-restricted-names': 2,
    //函数调用时，圆括号前面不能有空格
    'no-spaced-func': 2,
    //禁止使用稀疏数组
    'no-sparse-arrays': 2,
    //在调用super之前不能使用this对象
    'no-this-before-super': 2,
    //抛出Error错误
    'no-throw-literal': 2,
    //行末禁止加空格
    'no-trailing-spaces': 2,
    //禁止使用没有定义的变量，除非在／＊global＊／已经申明
    'no-undef': 2,
    //禁止把undefined赋值给一个变量
    'no-undef-init': 2,
    //禁止在不需要分行的时候使用了分行
    'no-unexpected-multiline': 2,
    //禁用死循环
    'no-unmodified-loop-condition': 2,
    //禁止使用没有必要的三元操作符，因为用些三元操作符可以使用其他语句替换
    'no-unneeded-ternary': [
      2,
      {
        defaultAssignment: false
      }
    ],
    //不包含不执行代码
    'no-unreachable': 2,
    //不包含不安全的finally
    'no-unsafe-finally': 2,
    //不包含声明了，但无用的变量
    'no-unused-vars': [
      2,
      {
        vars: 'all',
        args: 'none'
      }
    ],
    //禁用无意义call   Function.prototype.call()
    'no-useless-call': 2,
    //禁用无效计算值作为对象属性
    'no-useless-computed-key': 2,
    //禁用无效构造函数
    'no-useless-constructor': 2,
    //禁用无效转义
    'no-useless-escape': 0,
    'no-whitespace-before-property': 2,
    //禁用with
    'no-with': 2,
    //不允许对const作连续声明
    'one-var': [
      2,
      {
        const: 'never'
      }
    ],
    //换行时运算符在行尾还是行首
    'operator-linebreak': [
      2,
      'after',
      {
        overrides: {
          '?': 'before',
          ':': 'before'
        }
      }
    ],
    //块语句内行首行尾不需要空行
    'padded-blocks': [2, 'never'],
    // 使用单引号
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    //语句强制分号结尾
    semi: [2, 'always'],
    //分号前后空格
    'semi-spacing': [2, { before: false, after: true }],
    //代码块前面需要加空格---------------------------
    'space-before-blocks': [0, 'always'],
    //函数圆括号前面不需要加空格
    'space-before-function-paren': [2, 'never'],
    //圆括号内部不需要加空格
    'space-in-parens': [2, 'never'],
    //操作符前后需要加空格
    'space-infix-ops': 2,
    //一元操作符前后是否需要加空格，单词类操作符需要加，而非单词类操作符不用加
    'space-unary-ops': [2, { words: true, nonwords: false }],
    //注释符号｀／*｀ ｀／／｀，后面需要留一个空格
    'spaced-comment': [
      2,
      'always',
      {
        markers: [
          'global',
          'globals',
          'eslint',
          'eslint-disable',
          '*package',
          '!',
          ','
        ]
      }
    ],
    //要求或禁止模板字符串中的嵌入表达式周围空格的使用
    'template-curly-spacing': [2, 'never'],
    //推荐使用isNaN方法，而不要直接和NaN作比较
    'use-isnan': 2,
    //在使用typeof操作符时，作比较的字符串必须是合法字符串eg:'string' 'object'
    'valid-typeof': 2,
    //立即执行函数需要用圆括号包围
    'wrap-iife': [2, 'any'],
    'yield-star-spacing': [2, 'both'],
    //yoda条件语句就是字面量应该写在比较操作符的左边，而变量应该写在比较操作符的右边。
    //而下面的规则要求，变量写在前面，字面量写在右边
    yoda: [2, 'never'],
    //要求使用 const 声明那些声明后不再被修改的变量
    'prefer-const': 2,
    //开发模式下允许debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    //大括号内不允许不必要的空格
    'object-curly-spacing': [
      2,
      'always',
      {
        objectsInObjects: false
      }
    ],
    //不允许非空数组里面有多余的空格
    'array-bracket-spacing': [2, 'never']
  }
};
