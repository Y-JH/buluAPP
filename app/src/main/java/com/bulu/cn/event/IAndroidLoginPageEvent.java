package com.bulu.cn.event;

/**
 * @Auther: YJH
 * @Package: BuluApp-com.bulu.cn.event
 * @Created time: 2018/9/25-15:27
 * @description: 打开新的web页面的事件指令
 */

public interface IAndroidLoginPageEvent {

    class Register {
        //打开新的web页面指令
        public final String NEW_PAGE_EVENT = "NEW_PAGE_EVENT";

        public Register() {
        }
    }

    class FrogetPasswd {
        //打开新的web页面指令
        public final String NEW_PAGE_EVENT = "NEW_PAGE_EVENT";

        public FrogetPasswd() {
        }
    }

    class SetFrogetPasswdSuccess {
        //打开新的web页面指令
        public final String NEW_PAGE_EVENT = "NEW_PAGE_EVENT";

        public SetFrogetPasswdSuccess() {
        }
    }

    class Login {
        //打开新的web页面指令
        public final String NEW_PAGE_EVENT = "NEW_PAGE_EVENT";

        public Login() {
        }
    }

    class registerSuccess {
        //打开新的web页面指令
        public final String NEW_PAGE_EVENT = "NEW_PAGE_EVENT";

        public registerSuccess() {
        }
    }


    class ClosePage {
        //关闭当前的web页面的指令
        public final String CLOSE_PAGE_EVENT = "CLOSE_PAGE_EVENT";

        public ClosePage(){
        }
    }
}
