塔网科技前端框架模板v1.0

2018-07-10

框架结构：

Vue 
ElementUI
Axios 
Vuex
VueRouter



模板操作说明及步骤：

步骤一：

修改菜单配置文件：\tn-frame\src\menuConfig.js

文件内容呈现树状结构，暂时最多支持三级，配置文件修改后，系统将自动生成菜单结构。



步骤二：

根据步骤一中url信息，在\tn-frame\src\pages目录下建立相应的目录和文件，如：url=/ListPage/ListPage,
则需在\tn-frame\src\pages目录下建立ListPage目录，并建立ListPage.vue文件。文件内容可复制模板文件\tn-frame\src\templete\List\List.vue，
如列表页面包含增，删，改，查等操作的，在相同目录下建立Form.vue文件，该文件用于定义表单操作，文件内容可复制模板文件：\tn-frame\src\templete\List\Form.vue


步骤三：

修改根据模板生成的新文件，主要包含列表文件和表单文件。

列表文件的相关修改，直接查看模板文件相关注释。
表单文件相关修改，根据表单需求重新构建，根据模板建立的表单，已包含简单前端验证。




