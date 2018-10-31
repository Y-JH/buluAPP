package com.bulu.cn.fragment.login;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.bulu.cn.BaseApplication;
import com.bulu.cn.MainFragment;
import com.bulu.cn.R;
import com.bulu.cn.agent.IAndroidCallbackLoginAgent;
import com.bulu.cn.agent.WebAgentFragmentImpl;
import com.bulu.cn.base.BaseMainFragment;
import com.bulu.cn.constant.ConsActions;
import com.bulu.cn.event.IAndroidLoginPageEvent;
import com.bulu.cn.tool.SharedPreferencesHelper;
import com.just.agentweb.AgentWeb;
import com.orhanobut.logger.Logger;

import org.greenrobot.eventbus.Subscribe;

import me.yokeyword.eventbusactivityscope.EventBusActivityScope;
import me.yokeyword.fragmentation.SupportFragment;


/**
 * @Title:LoginFragment
 * @Package:cn.com.zhongguancun.view.ui.fragment.home.one
 * @Description: 登录页面
 * @Auther:YJH
 * @Email:yuannunhua@gmail.com
 * @Date:2018/9/26 19:54
 */
public class LoginFragment extends BaseMainFragment {
    private static final String TAG = "LoginFragment";
    private WebAgentFragmentImpl mWebAgent;


    public static LoginFragment newInstance() {
        Bundle args = new Bundle();
        LoginFragment fragment = new LoginFragment();
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
        String fileUrl = "file:///android_asset/buluApp/templates/login/login.html";
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
     * 功能：eventbus 登录，进入登录页面
     * @param event
     */
    @Subscribe
    public void onLoginToHomePage(IAndroidLoginPageEvent.Login event) {
        if(ConsActions.NEW_PAGE_EVENT.equals(event.NEW_PAGE_EVENT)){
            SharedPreferencesHelper.putSharedPreferences(BaseApplication.getsInstance(), "cid", event.cid);
            Logger.e(TAG, "event.cid=="+event.cid);
            startBrotherFragment(MainFragment.newInstance());
        }
    }

    /**
     * 功能：eventbus 注册，进入注册页面
     * @param event
     */
    @Subscribe
    public void onLoginToRegisterPage(IAndroidLoginPageEvent.Register event) {
        if(ConsActions.NEW_PAGE_EVENT.equals(event.NEW_PAGE_EVENT)){
            startBrotherFragment(RegisterFragment.newInstance());
        }
    }

    /**
     * 功能：eventbus 忘记密码，进入找回密码页面
     * @param event
     */
    @Subscribe
    public void onLoginToForgetPasswdPage(IAndroidLoginPageEvent.FrogetPasswd event) {
        if(ConsActions.NEW_PAGE_EVENT.equals(event.NEW_PAGE_EVENT)){
            startBrotherFragment(ForgetPasswdFragment.newInstance());
        }
    }



    /**
     * start other BrotherFragment
     */
    public void startBrotherFragment(SupportFragment targetFragment) {
        start(targetFragment);
    }
}
