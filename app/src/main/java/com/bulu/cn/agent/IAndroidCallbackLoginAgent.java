package com.bulu.cn.agent;

import android.app.Activity;
import android.os.Handler;
import android.os.Looper;
import android.webkit.JavascriptInterface;

import com.bulu.cn.event.IAndroidLoginPageEvent;
import com.just.agentweb.AgentWeb;

import me.yokeyword.eventbusactivityscope.EventBusActivityScope;


/**
 * @Title:IAndroidCallbackFirstAgent
 * @Package:cn.com.zhongguancun.view.ui.fragment.agent
 * @Description: 登录
 * @Auther:YJH
 * @Email:yuannunhua@gmail.com
 * @Date:2018/7/415:38
 */
public class IAndroidCallbackLoginAgent {
    private Handler deliver = new Handler(Looper.getMainLooper());
    private AgentWeb mAgent;
    private Activity mActivity;

    public IAndroidCallbackLoginAgent(AgentWeb agent, Activity activity) {
        this.mAgent = agent;
        this.mActivity = activity;
    }

    /**
     * 功能：注册
     */
    @JavascriptInterface
    public void registerToPage() {
        deliver.post(new Runnable() {
            @Override
            public void run() {
                EventBusActivityScope.getDefault(mActivity)
                        .post(new IAndroidLoginPageEvent.Register());
            }
        });
    }

    /**
     * 功能：点击完成注册
     */
    @JavascriptInterface
    public void registerSuccessToHomePage() {
        deliver.post(new Runnable() {
            @Override
            public void run() {
                EventBusActivityScope.getDefault(mActivity)
                        .post(new IAndroidLoginPageEvent.registerSuccess());
            }
        });
    }

    /**
     * 功能：登录
     */
    @JavascriptInterface
    public void loginToHome(final String cid) {
        deliver.post(new Runnable() {
            @Override
            public void run() {
                EventBusActivityScope.getDefault(mActivity)
                        .post(new IAndroidLoginPageEvent.Login(cid));
            }
        });
    }

    /**
     * 功能：忘记密码
     */
    @JavascriptInterface
    public void forgetPasswdToPage() {
        deliver.post(new Runnable() {
            @Override
            public void run() {
//                Toast.makeText(BaseApplication.getsInstance(), "forgetPasswdToPage", Toast.LENGTH_LONG).show();
                EventBusActivityScope.getDefault(mActivity)
                        .post(new IAndroidLoginPageEvent.FrogetPasswd());
            }
        });
    }


    /**
     * 功能：完成忘记密码页面的密码重置，跳转到登录页
     */
    @JavascriptInterface
    public void setFrogetPasswdSuccess() {
        deliver.post(new Runnable() {
            @Override
            public void run() {
//                Toast.makeText(BaseApplication.getsInstance(), "forgetPasswdToPage", Toast.LENGTH_LONG).show();
                EventBusActivityScope.getDefault(mActivity)
                        .post(new IAndroidLoginPageEvent.SetFrogetPasswdSuccess());
            }
        });
    }

    /**
     * 功能：关闭当前页面
     */
    @JavascriptInterface
    public void closePage(){
        deliver.post(new Runnable() {
            @Override
            public void run() {
//                Toast.makeText(BaseApplication.getsInstance(), "forgetPasswdToPage", Toast.LENGTH_LONG).show();
                EventBusActivityScope.getDefault(mActivity)
                        .post(new IAndroidLoginPageEvent.ClosePage());
            }
        });
    }

}
