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
import { Image as VanImage } from 'vant';
import { AddressEdit } from 'vant';
import { SwipeCell } from 'vant';
import { NoticeBar } from 'vant';
import { Swipe, SwipeItem } from 'vant';
import { Lazyload } from 'vant';
import { Search } from 'vant';
import { Icon } from 'vant';
import { Skeleton } from 'vant';
import { Empty } from 'vant';
import { Loading } from 'vant';
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant';
import { Stepper } from 'vant';
import { Checkbox, CheckboxGroup } from 'vant';
import { SubmitBar } from 'vant';
import { Card } from 'vant';
import { RadioGroup, Radio } from 'vant';
import { Popup } from 'vant';
import { DropdownMenu, DropdownItem } from 'vant';
import { List } from 'vant';
import { Uploader } from 'vant';
import { DatetimePicker } from 'vant';
import { CountDown } from 'vant';
// import { Tab, Tabs } from 'vant';
// import { Overlay } from 'vant';
// import { Area } from 'vant';
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
Vue.use(VanImage);
Vue.use(AddressEdit);
Vue.use(SwipeCell);
Vue.use(NoticeBar);
Vue.use(Swipe).use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Search);
Vue.use(Icon);
Vue.use(Skeleton);
Vue.use(Empty);
Vue.use(Loading);
Vue.use(GoodsAction).use(GoodsActionButton).use(GoodsActionIcon);
Vue.use(Stepper);
Vue.use(Checkbox).use(CheckboxGroup);
Vue.use(SubmitBar);
Vue.use(Card);
Vue.use(Radio).use(RadioGroup);
Vue.use(Popup);
Vue.use(DropdownMenu).use(DropdownItem);
Vue.use(List);
Vue.use(Uploader);
Vue.use(DatetimePicker);
Vue.use(CountDown);
// Vue.use(Tab).use(Tabs);
// Vue.use(Overlay);
// Vue.use(Area);
// Vue.use(Toast);