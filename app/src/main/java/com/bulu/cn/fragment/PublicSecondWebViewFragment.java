package com.bulu.cn.fragment;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.bulu.cn.R;
import com.bulu.cn.agent.IAndroidCallbackSecondAgent;
import com.bulu.cn.agent.WebAgentFragmentImpl;
import com.bulu.cn.base.BaseBackFragment;
import com.bulu.cn.constant.ConsActions;
import com.bulu.cn.event.IAndroidSecondPageEvent;
import com.just.agentweb.AgentWeb;

import org.greenrobot.eventbus.Subscribe;

import me.yokeyword.eventbusactivityscope.EventBusActivityScope;
import me.yokeyword.fragmentation.SupportFragment;

/**
 * @Auther: YJH
 * @Package: Bulo-com.buluedu.baselib.fragment
 * @Created time: 2018/8/15-15:21
 * @description: 由首页进入的新的二级webview页面，公共使用页面；
 */
public class PublicSecondWebViewFragment extends BaseBackFragment {
    private static final String TAG = "PublicSecondWebViewFragment";
    private WebAgentFragmentImpl mWebAgent;
    private static final String WEB_URL = "WEB_URL";
    public static PublicSecondWebViewFragment newInstance(String url) {

        Bundle args = new Bundle();
        PublicSecondWebViewFragment fragment = new PublicSecondWebViewFragment();
        args.putString(WEB_URL, url);
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
        View view = inflater.inflate(R.layout.fragment_web_public, container, false);
        return view;
    }

    private void initView(View view) {
        String url = this.getArguments().getString(WEB_URL);
        mWebAgent = new WebAgentFragmentImpl(this);
        mWebAgent.setWebUrl(url);
        mWebAgent.showWeb(view);

        AgentWeb curAgentWeb = mWebAgent.getAgentWeb();
        if (null != curAgentWeb) {
            //注入对象,很关键
            curAgentWeb.getJsInterfaceHolder()
                    .addJavaObject("android", new IAndroidCallbackSecondAgent(curAgentWeb, this.getActivity()));
        }
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);

        initView(getView());
    }

    @Override
    public void onLazyInitView(@Nullable Bundle savedInstanceState) {
        super.onLazyInitView(savedInstanceState);

    }

    @Override
    public void onSupportInvisible() {
        super.onSupportInvisible();
        hideSoftInput();
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
     * 功能：创建显示新的一级fragment页面
     * @param event
     */
    @Subscribe
    public void showAndroidNewSecondPage(IAndroidSecondPageEvent.NewPage event) {
        if(ConsActions.NEW_PAGE_EVENT.equals(event.NEW_PAGE_EVENT)){
            startBrotherFragment(PublicThirdWebViewFragment.newInstance(event.pageUrl));
        }
    }

    /**
     * 功能：关闭显示上一级fragment页面
     * @param event
     */
    @Subscribe
    public void closeAndroidSecondPage(IAndroidSecondPageEvent.ClosePage event) {
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

//    @Override
//    public boolean onBackPressedSupport() {
//        EventBusActivityScope.getDefault(_mActivity).post(new TabStatusEvent(MainActivity.MINE_CENTER));
//        return super.onBackPressedSupport();
//
//    }

}
