# Little-targets
任务管理平台
小目标 ：（主要针对移动端网页，因此界面设计属于移动ui，pc端体验不佳）
1.用户第一次使用，（无数据储存时）初进入界面无任务会自动弹出请输入第一个任务；
2.界面左上方的图标点击即可添加新目标；
3.每个目标前的选框标记为是否完成，选中记为完成。当所有目标全部完成时（即全部选中），会有弹出框提示目标全部完成；
4.每个目标都可独自删除，界面右上方的图标为‘全部删除’；
5.主界面底部的‘已完成’‘全部’‘未完成’点击可筛选；
6.双击每个目标都可进入‘专注模式’；
7‘专注模式’有5分钟，30分钟，60分钟可选，一旦点击按钮计时开始，返回键便会失效，直到计时结束，方能返回。
8。需要本地安装wamp启动数据库，将文件内的sql.txt文件导出到数据库，否则将无法正常运行。

‘小目标’主要运用ionic的移动ui，少量css，angularJs，部分原生JavaScript，以及自定义favion图标技术实现，此前没有用php+mysql与前端结合开发过，这次初学，拙略实现。望包涵。