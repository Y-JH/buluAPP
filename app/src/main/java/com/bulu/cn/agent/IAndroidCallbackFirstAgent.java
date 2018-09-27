package com.bulu.cn.agent;

import android.app.Activity;
import android.os.Handler;
import android.os.Looper;
import android.webkit.JavascriptInterface;

import com.bulu.cn.event.IAndroidFirstPageEvent;
import com.bulu.cn.event.IAndroidShareSDKEvent;
import com.just.agentweb.AgentWeb;

import me.yokeyword.eventbusactivityscope.EventBusActivityScope;


/**
 * @Title:IAndroidCallbackFirstAgent
 * @Package:cn.com.zhongguancun.view.ui.fragment.agent
 * @Description: 当前的这个类 使用来处理功能Activity作为承载的页面的一级fragment的处理，主要针对，打开新activity页面和关闭activity；
 * @Auther:YJH
 * @Email:yuannunhua@gmail.com
 * @Date:2018/7/415:38
 */
public class IAndroidCallbackFirstAgent {
    private Handler deliver = new Handler(Looper.getMainLooper());
    private AgentWeb mAgent;
    private Activity mActivity;

    public IAndroidCallbackFirstAgent(AgentWeb agent, Activity activity) {
        this.mAgent = agent;
        this.mActivity = activity;
    }

    /**
     * 功能：打开显示新的fragment页面
     * @param pageUrl
     */
    @JavascriptInterface
    public void showAndroidNewFirstPage(final String pageUrl) {
        deliver.post(new Runnable() {
            @Override
            public void run() {
//                Toast.makeText(BaseApplication.getsInstance(), "pageUrl=" + pageUrl, Toast.LENGTH_LONG).show();
                EventBusActivityScope.getDefault(mActivity)
                        .post(new IAndroidFirstPageEvent.NewPage(pageUrl));
            }
        });
    }


    /**
     * 功能：使用sharesdk的分享功能 唤起分享
     */
    @JavascriptInterface
    public void shareWithSDK() {
        EventBusActivityScope.getDefault(mActivity)
                .post(new IAndroidShareSDKEvent.ShareWithSDK());
    }

    /**
     * 功能：Js调用Android->关闭当前的fragment页面调
     * @param flag 标识的是四个tab，0-1-2-3 从哪个tab起用的；
     *             否则，由于共用一个js接口，调用一个的话其他的tab也会执行；
     */
    @JavascriptInterface
    public void closeAndroidFirstPage(final int flag) {
        EventBusActivityScope.getDefault(mActivity)
                .post(new IAndroidFirstPageEvent.ClosePage(flag));
    }


}
