package com.bulu.cn.agent;

import android.app.Activity;
import android.os.Handler;
import android.os.Looper;
import android.webkit.JavascriptInterface;

import com.bulu.cn.event.IAndroidSecondPageEvent;
import com.just.agentweb.AgentWeb;

import me.yokeyword.eventbusactivityscope.EventBusActivityScope;


/**
 * @Title:IAndroidCallbackSecondAgent
 * @Package:cn.com.zhongguancun.view.ui.fragment.agent
 * @Description: 当前的这个类 使用来处理功能Activity作为承载的二级页面的fragment的处理，主要针对，打开新页面和回退；
 * @Auther:YJH
 * @Email:yuannunhua@gmail.com
 * @Date:2018/09/25 17:38
 */
public class IAndroidCallbackSecondAgent {
    private Handler deliver = new Handler(Looper.getMainLooper());
    private AgentWeb mAgent;
    private Activity mActivity;

    public IAndroidCallbackSecondAgent(AgentWeb agent, Activity activity) {
        this.mAgent = agent;
        this.mActivity = activity;
    }

    /**
     * 功能：从当前的二级fragment页面-打开显示新的fragment页面
     * @param pageUrl
     */
    @JavascriptInterface
    public void showAndroidNewSecondPage(final String pageUrl) {
        deliver.post(new Runnable() {
            @Override
            public void run() {
//                Toast.makeText(BaseApplication.getsInstance(), "pageUrl=" + pageUrl, Toast.LENGTH_LONG).show();
                EventBusActivityScope.getDefault(mActivity)
                        .post(new IAndroidSecondPageEvent.NewPage(pageUrl));
            }
        });
    }


    /**
     * 功能：从当前的二级fragment页面-Js调用Android->关闭当前的fragment页面调
     */
    @JavascriptInterface
    public void closeAndroidSecondPage() {
        EventBusActivityScope.getDefault(mActivity)
                .post(new IAndroidSecondPageEvent.ClosePage());
    }


}
