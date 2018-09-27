package com.bulu.cn.agent;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Handler;
import android.os.Looper;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

import com.bulu.cn.BaseApplication;
import com.bulu.cn.event.IAndroidHomePageEvent;
import com.just.agentweb.AgentWeb;

import me.yokeyword.eventbusactivityscope.EventBusActivityScope;


/**
 * @Title:IAndroidCallbackFirstAgent
 * @Package:cn.com.zhongguancun.view.ui.fragment.agent
 * @Description: home 页面的跳转接口
 * @Auther:YJH
 * @Email:yuannunhua@gmail.com
 * @Date:2018/7/415:38
 */
public class IAndroidCallbackHomeAgent {
    private Handler deliver = new Handler(Looper.getMainLooper());
    private AgentWeb mAgent;
    private Activity mActivity;

    public IAndroidCallbackHomeAgent(AgentWeb agent, Activity activity) {
        this.mAgent = agent;
        this.mActivity = activity;
    }

    /**
     * 功能：打开显示新的fragment页面
     * @param pageUrl
     * @param flag 标识的是四个tab，0-1-2-3 从哪个tab起用的；
     *             否则，由于共用一个js接口，调用一个的话其他的tab也会执行；
     */
    @JavascriptInterface
    public void showAndroidHomeNewPage(final String pageUrl, final int flag) {
        deliver.post(new Runnable() {
            @Override
            public void run() {
                Toast.makeText(BaseApplication.getsInstance(), "pageUrl=" + pageUrl, Toast.LENGTH_LONG).show();
                EventBusActivityScope.getDefault(mActivity)
                        .post(new IAndroidHomePageEvent.NewPage(pageUrl,flag));
            }
        });
    }

    /**
     * 功能：Js调用Android->关闭当前的fragment页面调
     * @param flag 标识的是四个tab，0-1-2-3 从哪个tab起用的；
     *             否则，由于共用一个js接口，调用一个的话其他的tab也会执行；
     */
    @JavascriptInterface
    public void closeAndroidHomePage(final int flag) {
        EventBusActivityScope.getDefault(mActivity)
                .post(new IAndroidHomePageEvent.ClosePage(flag));
    }


    /**
     * 拨打电话（跳转到拨号界面，用户手动点击拨打）
     * @param phoneNum 电话号码
     */
    @JavascriptInterface
    public void callPhone(String phoneNum) {
        Intent intent = new Intent(Intent.ACTION_DIAL);
        Uri data = Uri.parse("tel:" + phoneNum);
        intent.setData(data);
        mActivity.startActivity(intent);
    }



}
