package com.bulu.cn.agent;

import android.view.View;

/**
 * @Title:IWebAgentFragment
 * @Package:cn.com.zhongguancun.view.ui.fragment.agent
 * @Description:
 * @Auther:YJH
 * @Email:yuannunhua@gmail.com
 * @Date:2018/6/299:47
 */
public interface IWebAgentFragment {
    String getWebUrl();
    void setWebUrl(String url);
    void webLoading();
    void webLoadingFinish();
    void showWeb(View view);
    void closeWeb();

    void onWebResume();
    void onWebPause();
    void onWebDestroyView();
}
