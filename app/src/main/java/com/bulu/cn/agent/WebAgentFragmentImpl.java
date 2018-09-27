package com.bulu.cn.agent;

import android.graphics.Bitmap;
import android.graphics.Color;
import android.support.annotation.Nullable;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.LinearLayout;

import com.bulu.cn.R;
import com.just.agentweb.AgentWeb;
import com.just.agentweb.DefaultWebClient;

import java.util.HashMap;

import me.yokeyword.fragmentation.SupportFragment;

/**
 * @Title:WebAgentFragmentImpl
 * @Package:cn.com.zhongguancun.view.ui.fragment.agent
 * @Description:webview显示网页内容的工具类
 * @Auther:YJH
 * @Email:yuannunhua@gmail.com
 * @Date:2018/6/299:50
 */
public class WebAgentFragmentImpl implements IWebAgentFragment {
    private static final String TAG = "WebAgentFragmentImpl";
    private String webUrl;
    private AgentWeb mAgentWeb;
    private SupportFragment mFragment;
    private AgentWeb.PreAgentWeb preAgentWeb;

    public WebAgentFragmentImpl(SupportFragment fragment) {
        mFragment = fragment;
    }

    //获取AgentWeb对象
    public AgentWeb getAgentWeb(){
        return mAgentWeb;
    }
    public void showAgentWebByGo(){
        mAgentWeb = preAgentWeb.go(getWebUrl());//设置 WebSettings。
    }

    @Override
    public String getWebUrl() {

        return webUrl;
    }

    @Override
    public void setWebUrl(String url) {
        this.webUrl = url;
    }

    @Override
    public void webLoading() {

    }

    @Override
    public void webLoadingFinish() {

    }

    @Override
    public void showWeb(View view) {
//        mAgentWeb = preAgentWeb.go(getWebUrl()); //WebView载入该url地址的页面并显示。
        preAgentWeb = AgentWeb.with(mFragment)//
                .setAgentWebParent((LinearLayout) view, -1, new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT))//传入AgentWeb的父控件。
                .useDefaultIndicator(-1, 3)//设置进度条颜色与高度，-1为默认值，高度为2，单位为dp。
                .setWebViewClient(mWebViewClient)//WebViewClient ， 与 WebView 使用一致 ，但是请勿获取WebView调用setWebViewClient(xx)方法了,会覆盖AgentWeb DefaultWebClient,同时相应的中间件也会失效。
                .setWebChromeClient(mWebChromeClient) //WebChromeClient
                .setSecurityType(AgentWeb.SecurityType.STRICT_CHECK) //严格模式 Android 4.2.2 以下会放弃注入对象 ，使用AgentWebView没影响。
                .setMainFrameErrorView(R.layout.agentweb_error_page, -1) //参数1是错误显示的布局，参数2点击刷新控件ID -1表示点击整个布局都刷新， AgentWeb 3.0.0 加入。
                .setOpenOtherPageWays(DefaultWebClient.OpenOtherPageWays.DISALLOW)//打开其他页面时，弹窗质询用户前往其他应用 AgentWeb 3.0.0 加入。
                .interceptUnkownUrl() //拦截找不到相关页面的Url AgentWeb 3.0.0 加入。
                .createAgentWeb()//创建AgentWeb。
                .ready();
        showAgentWebByGo();
        //修改 AgentWeb 默认的背景色
        FrameLayout frameLayout = mAgentWeb.getWebCreator().getWebParentLayout();
        frameLayout.setBackgroundColor(Color.WHITE);
        // AgentWeb 没有把WebView的功能全面覆盖 ，所以某些设置 AgentWeb 没有提供 ， 请从WebView方面入手设置。
//        mAgentWeb.getWebCreator().getWebView().setOverScrollMode(WebView.OVER_SCROLL_NEVER);
        //mAgentWeb.getWebCreator().getWebView()  获取WebView .

    }

    @Override
    public void closeWeb() {

    }

    @Override
    public void onWebResume() {
        mAgentWeb.getWebLifeCycle().onResume();//恢复
    }

    @Override
    public void onWebPause() {
        mAgentWeb.getWebLifeCycle().onPause(); //暂停应用内所有WebView ， 调用mWebView.resumeTimers();/mAgentWeb.getWebLifeCycle().onResume(); 恢复。

    }

    @Override
    public void onWebDestroyView() {
        mAgentWeb.getWebLifeCycle().onDestroy();
    }


    protected WebChromeClient mWebChromeClient = new WebChromeClient() {
        @Override
        public void onProgressChanged(WebView view, int newProgress) {
            //  super.onProgressChanged(view, newProgress);
            Log.e(TAG, "onProgressChanged:" + newProgress + "  view:" + view);
        }

        @Override
        public void onReceivedTitle(WebView view, String title) {
            super.onReceivedTitle(view, title);
//            if (mTitleTextView != null && !TextUtils.isEmpty(title)) {
//                if (title.length() > 10) {
//                    title = title.substring(0, 10).concat("...");
//                }
//            }
//            mTitleTextView.setText(title);
        }
    };
    protected WebViewClient mWebViewClient = new WebViewClient() {

        private HashMap<String, Long> timer = new HashMap<>();

        @Override
        public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
            Log.e(TAG, "error:" + error + "  request:" + request.getMethod());
            super.onReceivedError(view, request, error);
        }

        @Override
        public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
            Log.e(TAG, "view:" + view + "  request:" + request.getUrl());
            return shouldOverrideUrlLoading(view, request.getUrl() + "");
        }

        @Nullable
        @Override
        public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
            return super.shouldInterceptRequest(view, request);
        }

        //
        @Override
        public boolean shouldOverrideUrlLoading(final WebView view, String url) {

            //intent:// scheme的处理 如果返回false ， 则交给 DefaultWebClient 处理 ， 默认会打开该Activity  ， 如果Activity不存在则跳到应用市场上去.  true 表示拦截
            //例如优酷视频播放 ，intent://play?...package=com.youku.phone;end;
            //优酷想唤起自己应用播放该视频 ， 下面拦截地址返回 true  则会在应用内 H5 播放 ，禁止优酷唤起播放该视频， 如果返回 false ， DefaultWebClient  会根据intent 协议处理 该地址 ， 首先匹配该应用存不存在 ，如果存在 ， 唤起该应用播放 ， 如果不存在 ， 则跳到应用市场下载该应用 .
            if (url.startsWith("intent://") && url.contains("com.youku.phone")) {
                return true;
            }
            /*else if (isAlipay(view, mUrl))   //1.2.5开始不用调用该方法了 ，只要引入支付宝sdk即可 ， DefaultWebClient 默认会处理相应url调起支付宝
			    return true;*/


            return false;
        }

        @Override
        public void onPageStarted(WebView view, String url, Bitmap favicon) {

            Log.e(TAG, "mUrl:" + url + " onPageStarted  target:" + getWebUrl());
            timer.put(url, System.currentTimeMillis());
//            if (url.equals(getUrl())) {
//                pageNavigator(View.GONE);
//            } else {
//                pageNavigator(View.VISIBLE);
//            }

        }

        @Override
        public void onPageFinished(WebView view, String url) {
            super.onPageFinished(view, url);

            if (timer.get(url) != null) {
                long overTime = System.currentTimeMillis();
                Long startTime = timer.get(url);
                Log.e(TAG, "  page mUrl:" + url + "  used time:" + (overTime - startTime));
            }

        }
		/*错误页回调该方法 ， 如果重写了该方法， 上面传入了布局将不会显示 ， 交由开发者实现，注意参数对齐。*/
	   /* public void onMainFrameError(AbsAgentWebUIController agentWebUIController, WebView view, int errorCode, String description, String failingUrl) {
            Log.i(TAG, "AgentWebFragment onMainFrameError");
            agentWebUIController.onMainFrameError(view,errorCode,description,failingUrl);
        }*/

        @Override
        public void onReceivedHttpError(WebView view, WebResourceRequest request, WebResourceResponse errorResponse) {
            super.onReceivedHttpError(view, request, errorResponse);

//			Log.i(TAG, "onReceivedHttpError:" + 3 + "  request:" + mGson.toJson(request) + "  errorResponse:" + mGson.toJson(errorResponse));
        }

        @Override
        public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
            super.onReceivedError(view, errorCode, description, failingUrl);

//			Log.i(TAG, "onReceivedError:" + errorCode + "  description:" + description + "  errorResponse:" + failingUrl);
        }
    };
}
