<template>
  <div class="login-box">
    <el-button type="primary" class="login-btn" @click="loginFormVisibleFun('sign_in')" v-show="isSignOut">sign in</el-button>
	<el-button type="primary" class="login-btn" @click="loginFormVisibleFun('sign_up')" v-show="isSignOut">sign up</el-button> 
    <h4 v-show="!isSignOut">用户:{{ userName }}</h4>
	<!-- 弹出框 -->
    <el-dialog :title="dialogTitle" :visible.sync="loginFormVisible" width="400px">
      <el-form :model="loginForm" ref="loginForm" :rules="rules" status-icon>
        <el-form-item label="用户名：" prop="name">
        	<el-input v-model="loginForm.name" auto-complete="off" class="login-input"></el-input>
		</el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input v-model="loginForm.password" auto-complete="off" class="login-input"></el-input>
        </el-form-item>
		<span class="login-fial" v-show="loginFial">用户名或者密码输入错误</span>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeFormVisible('loginForm')">取 消</el-button>
        <el-button type="primary" @click="dialogTitle.indexOf('登录') > 0 ? goSignIn('loginForm') : goSignUp('loginForm') ">{{ dialogTitle.indexOf('登录') > 0 ? '登录' : '注册' }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Utils from '@/assets/utils'
export default {
	name: 'loginBox',
	data () {
		let _this = this
		var validateName = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入用户名'));
			} else {
				if (_this.dialogTitle.indexOf('登录') > 0) {
					callback();
				} else {
					_this.isNameAPI().then(res => {
						callback(res)
					}).catch(res => {
						callback(new Error('用户名已存在，请重新输入'));
					})
				}
			}
		};
		var validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'));
			} else {
				callback();
			}
		};
    return {
			isSignOut: true,
			userName: '',
			loginFial: false,
			loginFormVisible: false,
        	loginForm: {
            	name: '',
            	password: ''
			},
			dialogTitle: "",
			rules: {
				password: [
					{ validator: validatePass, trigger: 'blur' }
				],
				name: [
					{ validator: validateName, trigger: 'blur' }
				],
			}
    }
	},
	created () {
		this.isLogin()
	},
	watch: {
		is_login (old) {
			if (!old) this.hideUserName()
		}
	},
	computed: {
		is_login () {
			return this.$store.state.is_login
		}
	},
	mounted () {
		
	},
	components: {
  },
	methods: {
		isLogin () {
			let _this = this
			Utils.post('isLogin', '' ,res => {
				_this.showUerName(res)
				_this.$store.commit('login')
			}, res => {
				console.log(res)
			})
		},
		goSignIn (formName) {
			let _this = this
        	this.$refs[formName].validate((valid) => {
				if (!valid) return false
				else {	
					Utils.post('signIn', this.loginForm, res => {	
						if (res === '登录失败') {
							_this.loginFial = true
						} else {
							_this.$store.commit('login')
							_this.showUerName(res)
						}	
					}, res => {
						console.log(res)
					})
				}
			});
		},
		showUerName (name) {
			this.isSignOut = false
			this.userName = name
			this.closeFormVisible()
		},
		hideUserName () {
			this.isSignOut = true
			this.userName = ''
		},
		isNameAPI (err, cb) {
			return new Promise((resolve, reject) => {
				let parmas = {
					name: this.loginForm.name
				}
				Utils.post('signUpName', parmas, res => {
					if (res === '可正常注册') {
						resolve()
					} else {
						reject()
					}
				})
			})
		}, 
		goSignUp (formName) {
			let _this = this
			this.$refs[formName].validate((valid) => {
				if (!valid) return false
				else {	
					Utils.post('signUp', this.loginForm, res => {
						_this.isSignOut = false
						_this.userName = res
						_this.closeFormVisible()
					})
				}
			});
		},
		loginFormVisibleFun (type) {
			this.loginFormVisible = true
			if (type === 'sign_in') {
				this.dialogTitle = "欢迎登录dingding's blog"
			} else {
				this.dialogTitle = "欢迎注册dingding's blog"
			}
		},
		closeFormVisible (formName) {
			this.loginFial = false
			// 关闭弹窗
			this.loginFormVisible = false
			// 清空表单
			if (this.$refs[formName]!==undefined) {
     			this.$refs[formName].resetFields();
 			}
			// this.$refs[formName].resetFields();
			this.loginForm.name = ''
			this.loginForm.password = ''
		}  
	}
}
</script>

<style lang="less">
	.login-box {
		position: absolute;
		width: auto;
		right: 20px;
		.el-form-item__label {
			width: 80px;
		}
		.el-form {
			width: auto;
		}
		.el-dialog {
			padding-top: 20px;
		}
		.login-input {
			float: left;
			width: 250px;
		}
		.el-form-item__error {
			left: 80px;
		}
		.login-fial {
			font-size: 14px;
			color: #fa5555;
		}
	}
</style>
