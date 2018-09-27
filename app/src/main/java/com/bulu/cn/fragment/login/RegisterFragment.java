package com.bulu.cn.fragment.login;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.bulu.cn.MainFragment;
import com.bulu.cn.R;
import com.bulu.cn.agent.IAndroidCallbackLoginAgent;
import com.bulu.cn.agent.WebAgentFragmentImpl;
import com.bulu.cn.base.BaseBackFragment;
import com.bulu.cn.constant.ConsActions;
import com.bulu.cn.event.IAndroidLoginPageEvent;
import com.just.agentweb.AgentWeb;

import org.greenrobot.eventbus.Subscribe;

import me.yokeyword.eventbusactivityscope.EventBusActivityScope;
import me.yokeyword.fragmentation.SupportFragment;


/**
 * @Title:RegisterFragment
 * @Package:cn.com.zhongguancun.view.ui.fragment.home.one
 * @Description: 注册页面
 * @Auther:YJH
 * @Email:yuannunhua@gmail.com
 * @Date:2018/9/26 19:54
 */
public class RegisterFragment extends BaseBackFragment {
    private static final String TAG = "RegisterFragment";
    private WebAgentFragmentImpl mWebAgent;


    public static RegisterFragment newInstance() {
        Bundle args = new Bundle();
        RegisterFragment fragment = new RegisterFragment();
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        EventBusActivityScope.getDefault(getActivity()).register(this);
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_bulo_login, container, false);
        mWebAgent = new WebAgentFragmentImpl(this);
        String fileUrl = "file:///android_asset/buluApp/templates/login/register.html";
        mWebAgent.setWebUrl(fileUrl);
        return view;
    }


    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);

        mWebAgent.showWeb(getView());

        AgentWeb curAgentWeb = mWebAgent.getAgentWeb();
        if (null != curAgentWeb) {
            //注入对象,很关键
            //注入的是home首页 与js的交互接口
            curAgentWeb.getJsInterfaceHolder()
                    .addJavaObject("android", new IAndroidCallbackLoginAgent(curAgentWeb, this.getActivity()));
        }
    }

    @Override
    public void onLazyInitView(@Nullable Bundle savedInstanceState) {
        super.onLazyInitView(savedInstanceState);

    }

    @Override
    public void onDestroyView() {
        mWebAgent.onWebDestroyView();
        super.onDestroyView();

        EventBusActivityScope.getDefault(getActivity()).unregister(this);
    }


    @Override
    public void onResume() {
        mWebAgent.onWebResume();
        super.onResume();
    }

    @Override
    public void onPause() {
        mWebAgent.onWebPause();
        super.onPause();
    }

    /**
     * 功能：eventbus 完成注册，进入首页页面
     * @param event
     */
    @Subscribe
    public void onRegisterSuccessToHomPage(IAndroidLoginPageEvent.registerSuccess event) {
        if(ConsActions.NEW_PAGE_EVENT.equals(event.NEW_PAGE_EVENT)){
            startBrotherFragment(MainFragment.newInstance());
        }
    }

    /**
     * 功能：eventbus 关闭当前页面
     * @param event
     */
    @Subscribe
    public void closePage(IAndroidLoginPageEvent.ClosePage event) {
        if(ConsActions.CLOSE_PAGE_EVENT.equals(event.CLOSE_PAGE_EVENT)){
            pop();
        }
    }

    /**
     * start other BrotherFragment
     */
    public void startBrotherFragment(SupportFragment targetFragment) {
        start(targetFragment);
    }
}
