# React全栈投票实战项目
* 基于nodejs && express的后台服务
* 基于React的前端网页构建
* 前后数据分离



# question
*  加载  flag 标志变化  在请求未终止的时候 不发起第二次请求
* 注册提交 flag 标志变化  在请求未终止的时候  不发起第二次请求



首页
报名页
个人主页
规则页

```
启动服务器

```
> $ npm run start
```

## 项目说明

1. 项目需求
	- 实现投票获奖活动，票数越高，排名越高。
	- 只有报名用户才可以参加投票，每人最多投5票，每一个投票者最多只能投一票给同一个人。
	- 报名用户既是投票者，也是被投票者。
	- 用户未登入时，首页橙色按钮显示我要报名状态，点击进入报名页。
	- 用户已登入，首页橙色按钮显示个人主页，点击进入登入者的个人主页。
	- 用户未登入进行投票，点击投票则提示用户先登入或者报名才可以参与投票。
	- 首页用户信息通过上拉加载刷新进行分页，每页为十条数据。
	- 个人详细页需要显示投票者信息。


2. 后台接口
	- 首页加载用户信息

	```
	method: GET
	url: /vote/index/data?limit=10&offset=0
	参数说明: limit为每页限制数量，offset为偏移量
	返回数据：errno为0，数据正确
	```
	- 首页投票请求

	```
	method: GET
	url: /vote/index/poll?id={被投票者id}&voterId={投票者id}
	返回数据：errno为0，数据正确
	```
	- 首页登入请求

	```
	method: POST
	url: /vote/index/info
	sendData:  {
				   password: {用户密码},
			       id: ｛用户编号｝
			   }
	返回数据：errno为0，数据正确
	```
	- 报名页报名请求

	```
	method: POST
	url: /vote/register/data
	sendData:  {
			       username: {用户名},
				   mobile: {手机号码},
				   description: {描述},
				   gender: {性别, 男：'boy', 女：'girl'},
				   password: {用户密码}
			   }
	返回数据：errno为0，数据正确
	```
	- 个人主页加载数据请求

	```
	method: GET
	url: /vote/all/detail/data?id={用户id}
	返回数据：errno为0，数据正确
	```
