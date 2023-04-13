// 该文件用于 管理需要引入的vant组件
import Vue from "vue";
// 引入vant组件
import { Field } from "vant";
import { Tabbar, TabbarItem } from 'vant';
import { NavBar } from 'vant';
import { Button } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Grid, GridItem } from 'vant';
import { Divider } from 'vant';
import { Form } from 'vant';
// import { Toast } from 'vant';

// 使用vant插件
Vue.use(Field);
Vue.use(Tabbar).use(TabbarItem);
Vue.use(NavBar);
Vue.use(Button);
Vue.use(Cell).use(CellGroup);
Vue.use(Grid).use(GridItem);
Vue.use(Divider);
Vue.use(Form);
// Vue.use(Toast);