const app = new require('koa');
app.use(function*() {
	this.body = { new: new Date() };
});

app.listen(3001);
