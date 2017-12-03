<template>
  <div class="login-box">
    <el-button type="primary" class="login-btn" @click="loginFormVisibleFun('sign_in')" v-show="isSignOut">sign in</el-button>
	<el-button type="primary" class="login-btn" @click="loginFormVisibleFun('sign_up')" v-show="isSignOut">sign up</el-button> 
    <h4 v-show="!isSignOut">用户:{{ userName }}</h4>
	<!-- 弹出框 -->
    <el-dialog :title="dialogTitle" :visible.sync="loginFormVisible" width="400px">
      <el-form :model="loginForm" ref="loginForm" :rules="rules">
        <el-form-item label="用户名：" prop="name">
        	<el-input v-model="loginForm.name" auto-complete="off" class="login-input"></el-input>
		</el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input v-model="loginForm.password" auto-complete="off" class="login-input"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="loginFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogTitle.indexOf('登录') > 0 ? goSignIn() : goSignUp('loginForm') ">{{ dialogTitle.indexOf('登录') > 0 ? '登录' : '注册' }}</el-button>
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
				_this.isNameAPI().then(res => {
					callback(res)
				}).catch(res => {
					callback(new Error('用户名已存在，请重新输入'));
				})
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
		
	},
    components: {
    },
	methods: {
		goSignIn () {
        	this.loginFormVisible = false
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

						// 关闭弹窗
						_this.loginFormVisible = false
						// 清空表单
						_this.loginForm.name = ''
						_this.loginForm.password = ''
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
	}
</style>
